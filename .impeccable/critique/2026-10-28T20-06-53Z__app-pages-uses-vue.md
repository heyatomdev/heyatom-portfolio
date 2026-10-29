---
target: /uses page (second run)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/uses.vue"
target_fingerprint: "sha256:f0edb4ee465b44937533188ea415ff7f5ef53785bfe5127a2f6176ceb87ce4d3"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/uses.vue
timestamp: 2026-10-28T20-06-53Z
slug: app-pages-uses-vue
---
Method: dual-agent (A: ab8861ebf93616220 · B: aaf2c8bf1f496e62c)

# Critique: /uses (app/pages/uses.vue, data app/data/uses.ts), second run

Checked: IT + EN, dark + light, desktop + mobile 375 (coarse pointer). Live-server overlay: skipped: parallel reviewers share the browser.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Date, sticky label and role=status work. The counter still shows alone: the SSR count ("05", "08") is visible while the group's h2/li are at opacity 0, and "00" shows for ~200ms after the trigger. |
| 2 | Match System / Real World | 3 | "Uses" is an English dev idiom as the h1 of the IT page; "Max", "costi", "self-hosted" assume insider context. The intro covers most of it. |
| 3 | User Control and Freedom | 3 | Plain links, Back works. Anchor jumps land 192px down (double offset: `[id]` scroll-margin + `html` scroll-padding, main.css:133/135). |
| 4 | Consistency and Standards | 2 | The row's hit area shrinks to the title line on hover (transform on `strong` captures `a::after`). Link rows and plain rows differ only by a 16px arrow at 0.6. EN links to `/it` vendor pages. |
| 5 | Error Prevention | 3 | Little can fail; the trap is a dead click on the description of a hovered row. |
| 6 | Recognition Rather Than Recall | 3 | Sticky group names on desktop; at ≤900px no sticky label and no group index across ~5.9 screens. |
| 7 | Flexibility and Efficiency | n/a | Read-only portfolio surface (forced score for /40 basis: 2, no jump nav). |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and on-system. Spec-sheet notes and a mostly empty 0.8fr column on desktop. |
| 9 | Error Recovery | 3 | Clipboard failure is still silent (`.catch(() => {})`); the hash still updates. |
| 10 | Help and Documentation | n/a | Static page (forced score for /40 basis: 3). |
| **Total** | | **23/32** | **Good (72%)** |

Full /40 basis (7 = 2, 10 = 3): **28/40, Good** (previous 27/40).

## Design Specificity Verdict

**LLM assessment**: The visual layer is authored for this brand: a single hex cell per group, mono two-digit counters, the green-to-hair rule, tags that tilt and fill green, elastic "Uses" letters that hop again on hover. All of it follows DESIGN.md. The structure and content are the generic uses.tech page: category, then tool + note, and the notes read like spec sheets ("Affidabile e conveniente", "Perfetta per lunghe sessioni", "Colorazione Mezzanotte"). Nothing ties a tool to Andrea's work (Hostinger VPS → Bastion/Herald), and there is no photo of the actual desk, the one thing no template can copy. The new CTA band closes the page properly, but its heading is a stock question unrelated to the page.

**Deterministic scan**: `impeccable detect --json app/pages/uses.vue` → exit 0, `[]`, 0 findings. The previous run's only finding (`design-system-radius`, `border-radius: 4px` on `.anchor:focus-visible`) is gone. As before, the detector reads markup/CSS only and cannot see the hover hit-area collapse, the counter timing or the copy issues.

**Visual overlays**: not available. Injection skipped (parallel reviewers share the browser). Browser evidence instead: no console errors or warnings in IT/EN; no horizontal overflow at 375 or desktop; no duplicate ids, unlabeled links or images without alt; heading outline h1 > 5 group h2 > CTA h2; all measured contrast ≥ 4.5:1 in both themes (tightest: light arrow 4.54, light group name 4.93).

## Overall Impression

The fixes landed: the page now ends with an invitation, hover/focus belong only to link rows, the tag tilt works, touch anchors are 44px with a visible "#", and the detector is clean. The fix for hover introduced one real regression (the clickable area shrinks while hovered), and the counter fix did not fully hold. The biggest remaining opportunity is unchanged and content-side: the list proves gear, not how Andrea would build a client's project.

## What's Working

1. **Hover and focus only on link rows, verified.** Mac mini hover: li tint `rgba(0,168,107,0.07)`, title `translateX(6px)` in green-light, tag `rotate(-6deg)` filled green. Acer Predator and Magic Trackpad (no URL): no tint, no transform. Keyboard focus: li 2px green-light outline, offset 2px, radius 10px (`--r-sm`). Tags carry no inline style after the intro (`clearProps` works).
2. **Touch anchors meet the spec.** Under `(pointer: coarse)` anchors measure 101x44 (EN 108x44), `display: inline-flex`, "#" at opacity 1. Fine pointer: "#" on hover/focus, 2px ring.
3. **Closing band + motion discipline.** `.cta-band` (surface, green radial, hex texture) with `mailto:hey@heyatom.dev?subject=Progetto%20da%20heyatom.dev` (EN: "Project from heyatom.dev"), CTA text contrast 6.13. All GSAP sits in `mm.add(MOTION_OK)`, counts are SSR, `.head` has no `data-intro`, reduced motion removes the tilt transitions.

## Priority Issues

**[P1] The row's clickable area collapses to the title line while hovered**
- **Why it matters**: `li:has(a):hover strong { transform: translateX(6px) }` (uses.vue:196) makes `strong` the containing block of `li a::after { position: absolute; inset: 0 }` (uses.vue:199). At rest the overlay covers the li (~75px); on hover it shrinks to 777x30 (strong only), so `elementFromPoint` on `.note` returns a span outside the link. The whole row turns green, the user clicks the description, nothing happens and the cursor turns to text. The comment and DESIGN.md promise a full-row hit area.
- **Fix**: Move the 6px shift off `strong`: wrap name + arrow inside the `a` in a `<span class="nm">` and translate that (and `.tag`), keeping `strong` and `a` untransformed and unpositioned. Or drop the translateX; tint, colour and tag tilt already signal hover. Also `border-radius: inherit` on `a::after` inherits 0 from the `a`; set `var(--r-sm)`.
- **Suggested command**: /impeccable polish

**[P2] Counter still shows on its own**
- **Why it matters**: the "no lone 00" fix moved the reset into `onStart` (uses.vue:60) but the count itself is never hidden. Before the trigger the SSR value ("05" for #sviluppo, "08" for #skill-per-claude) sits alone in the bottom ~18% of the viewport while h2, rule and rows are invisible. After the trigger an rAF trace showed "00" with h2 and li at opacity 0 from 44ms to 244ms, because the h2 fade starts at 0.2.
- **Fix**: include `.count` in the h2 `.from(..., { x: -30, opacity: 0 }, 0.2)` and set `pad(0)` in the counter tween's own `onStart` (uses.vue:63), not the timeline's.
- **Suggested command**: /impeccable animate

**[P2] The notes describe gear, not a person (and the page ends on AI skills)**
- **Why it matters**: PRODUCT.md principles 1 and 2. A small client reads RAM, ports and colours and learns nothing about how Andrea would build their thing. The last and largest group (8 of 28 rows, 29%) is AI skills, two of which (Stop Slop, Humanizer) rewrite text to sound human, immediately before "Ti serve una mano con un progetto?" on a site that promises "rispondo io". Group content kept on purpose; the note voice and the CTA heading are not part of that decision.
- **Fix**: rewrite notes in `app/data/uses.ts` as first-person "what I use it for", cut port/colour trivia; optional `project?: slug` on `UsesItem` rendering "→ Bastion" to `/works/<slug>`; make `uses.next` heading refer to the page (e.g. tools are mine, the project is yours) in both locale files.
- **Suggested command**: /impeccable clarify

**[P2] EN page leaks Italian**
- **Why it matters**: `/en/uses` links to `apple.com/it/mac-mini`, `apple.com/it/macbook-air`, `logitech.com/it-it/…`, `hostinger.com/it/vps`. An EN recruiter lands on Italian vendor pages.
- **Fix**: `url` in the `en` override of `uses.ts` (already merged with `{...i, ...i.en}`) or locale-neutral URLs.
- **Suggested command**: /impeccable harden

**[P3] Long mobile list with no orientation**
- **Why it matters**: ~4800px at 375 (5.9 screens), `.side { position: static }` at ≤900px (uses.vue:230), no group index; the CTA is only at the very end and the header "Scrivimi" hides on scroll down. Tags wrapping under long names (ASUS PG279QE, Acer XB271HK) keep a 6.4px left margin and sit indented. EN CTA button wraps to two lines with line-height 1.0 (cramped).
- **Fix**: a compact row of the 5 group anchors under `.head` at ≤900px, or a sticky label with background; `margin-left: 0` on wrapped tags (flex gap on `strong`); `line-height: 1.2` on wrapping `.btn`.
- **Suggested command**: /impeccable adapt

## Persona Red Flags

**Jordan (first-timer)**: h1 "Uses" untranslated on the IT page; "Skill per Claude", "Max", "costi" unexplained. At rest the only link cue is the 16px arrow at 0.6; Acer and Trackpad look the same otherwise. Clicking a group name copies a link and jumps; the only hint is a `title` tooltip.

**Sam (keyboard / screen reader)**: Order is sane (skip link, header, anchor, rows) and focus is visible on rows and anchors. The anchor's accessible name is just the group name; the copy side effect lives in `title`, not reliably announced (use `aria-describedby`). Clipboard failure announces nothing.

**Casey (mobile, one hand)**: Targets are fine (rows 84–160px via `::after`, anchors 44px). No group index over ~4800px; CTA only at the bottom; anchor jumps leave 192px of dead space (~24% of an 812px screen).

**Paola (president of a local association, on her phone, from the footer)**: Reads Mac mini RAM and monitor ports, then 8 AI skills including "Humanizer", then "Ti serve una mano con un progetto?". The band now gives her a way to write, but the question "will my site be written by an AI?" arrives right before it, and nothing links a tool to a project she could trust.

## Minor Observations

- Double anchor offset: `html { scroll-padding-top: 6rem }` + `[id] { scroll-margin-top: 6rem }` (main.css:133/135) → land at 192px. Global, likely on other pages too.
- `li a::after { border-radius: inherit }` inherits 0 from the `a`, not the li.
- Anchor focus ring (10px radius on a ~25px box) reads as a pill and excludes the hex marker on `h2::before`.
- Desktop: 0.8fr column holds a ~100px label in ~330px; notes capped at 62ch leave the right side empty.
- DESIGN.md "Righe" still says every row (incl. /uses) closes with a hairline; rows have none by decision. Update the doc so it stops contradicting the code.
- Header has no "Uses" entry or current-page state; the page is reachable only from the footer.
- External item links open in the same tab (fact, not scored).

## Questions to Consider

- If a non-technical client remembers one thing from this page, should it be "nice monitors" or "this is how he'd build mine"? What if each group closed with one project built with those tools?
- Is an 8-item AI-skills group, last before the hire CTA, the impression you want right before "rispondo io"?
- Why no photo of the actual desk, the one artifact no studio, template or AI can fake?
