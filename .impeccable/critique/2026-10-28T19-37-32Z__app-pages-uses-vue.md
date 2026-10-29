---
target: /uses page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/uses.vue"
target_fingerprint: "sha256:a4c8e9dcbdeed10f2e9a80df6da7c79c950ad577bce46b0a42743e6adbc60916"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/uses.vue
timestamp: 2026-10-28T19-37-32Z
slug: app-pages-uses-vue
---
Method: dual-agent (A: a3b27031133ee04c5 · B: a28eb04d6da07a5f9)

# Critique: /uses (app/pages/uses.vue, data app/data/uses.ts)

Checked: IT + EN, dark + light, desktop 1440 + mobile 375. Live-server overlay: skipped: parallel reviewers share the browser.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sticky group label (desktop), counters and "Aggiornata il" date work. Clipboard failure is silent (`.catch(() => {})`, uses.vue:31). Counters flash an orphan "00" before reveal. |
| 2 | Match System / Real World | 2 | Primary reader is a non-technical client, but notes use WQHD, G-Sync, CI/CD, VPS, DNS/CDN, token, knowledge graph, "Max", "self-hosted" without context. Intro says "postazione" but page also lists hosted services and AI skills. |
| 3 | User Control and Freedom | 3 | Plain links, Back works. Clicking a group label both jumps the scroll and tries to copy, which is unexpected. |
| 4 | Consistency and Standards | 2 | Tags mean four different things by group. Rows have no closing hairline, against DESIGN.md "Ogni riga è chiusa da hairline" (which lists "voci di /uses"). Non-link rows get the link hover. No closing band like /works. |
| 5 | Error Prevention | 3 | Little can go wrong; two unlinked rows (Acer, Magic Trackpad) still look clickable on hover. |
| 6 | Recognition Rather Than Recall | 3 | Labels visible and sticky; the "#" that reveals the label is a link only exists on hover/focus, invisible on touch. |
| 7 | Flexibility and Efficiency | n/a | Read-only reference list, no repeated tasks (forced score: 2, no jump nav across 5 groups / 5.5 mobile screens). |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and restrained. Apple spec-sheet notes and an 8-item AI-skills group dilute it; left column is mostly empty on desktop. |
| 9 | Error Recovery | 3 | Only failure path (clipboard) gives no feedback, URL hash still updates. |
| 10 | Help and Documentation | n/a | Static page needs no help (forced score: 3, intro explains the page, nothing explains tags). |
| **Total** | | **22/32** | **Acceptable (69%)** |

Full /40 basis (7 = 2, 10 = 3): **27/40, Acceptable.** Above the 25/40 floor by 2 points; the two P1s and the hover/tag fixes are what move H2, H4 and H8 up.

## Design Specificity Verdict

**LLM assessment**: The structure is the generic developer /uses template (category label left, rows of name + arrow + tag pill + note); swap the tokens and any dev site could use it. The brand lives entirely in styling, and that styling is faithful: single hex cell marker, green→hair gradient rule, mono two-digit counter, elastic "Uses" letters that hop on hover, green used as light. The missed opportunity is the North Star "banco da lavoro di una persona sola" plus principle "Prova, non promessa": Hostinger VPS, Cloudflare, Umami, Better Stack are exactly what runs the platform on /works#piattaforma and client sites, but the page never connects a tool to the work. It reads as a gear inventory that opens with Mac mini RAM and ends with AI-text tools.

**Deterministic scan**: `impeccable detect --json app/pages/uses.vue` → 1 finding, advisory (exit 0): `design-system-radius` at uses.vue:161, `border-radius: 4px` on `.anchor:focus-visible`. True positive, trivial: DESIGN.md allows only 10/14px and the global focus rule is radius 6px. Nothing else flagged; the documented exceptions (14px tracking-0 group labels, mono counts/date, hex marker, tag pop) correctly passed. The detector missed everything the review found (it reads markup/CSS only): the broken tag rotation, the hover on non-link rows, the missing row hairlines, the orphan "00".

**Visual overlays**: not available. Injection skipped (parallel reviewers share the browser). Browser evidence instead: no console errors/warnings on /uses or /en/uses; no horizontal overflow at 375 or 1440; no stuck reveals after full scroll; h1 never hidden (only y/rotation animated).

## Overall Impression

A well-crafted, on-brand list that does nothing for the person the site is for. Accessibility and token discipline are solid. The biggest opportunity: reorder and trim so the page proves reliability to a client ("what your project runs on") and ends with an invitation instead of "Humanizer" and the footer.

## What's Working

1. **Accessibility baseline, measured.** Contrast dark/light: note 11.06/9.69, ink-3 meta 6.63/5.63, tag 8.87/9.06, group h2 6.99/4.93. Visible 2px focus rings on rows and anchors, logical tab order, sections with `aria-labelledby`, h1 keeps `aria-label="Uses"` + `lang="en"` after SplitText, row hit area is the whole `li` (359×75–151px on mobile).
2. **Brand fidelity.** Hex cell, gradient rule, mono counters, `--r-sm` row hover, curves (elastic letters, back.out tags, expo.inOut rule) match DESIGN.md; green never fills a surface.
3. **Robust structure.** Anchors stay on stable Italian slugs across locales, honest "updated" date, sticky running label on desktop, clean one-column collapse, full IT/EN parity for all 28 items.

## Priority Issues

**[P1] Dead end: the page ends on AI-writing tools and the footer**
- **Why it matters**: The only conversion channel is a mailto; the header CTA hides while scrolling down. By peak-end, the last thing a visitor sees is "Humanizer" and then nothing. /works and /works/[slug] both close with a `cta-band`; /uses does not.
- **Fix**: In app/pages/uses.vue after the `v-for` section (line 99, before `</div>` at line 100) add `<section class="cta-band hexed" aria-labelledby="uses-next">` copied from app/pages/works/index.vue:237 (h2 + primary mailto + link to `/works`), with new `uses.next.*` strings in both it.json and en.json, and `.cta-band { margin: var(--section) 0 0; }` in the scoped style. Reuse the `revealLines` + `magnetic` calls from works/index.vue:98,111 inside the existing `useMotion`.
- **Suggested command**: /impeccable shape

**[P1] "Skill per Claude" works against the positioning**
- **Why it matters**: 8 of 28 rows (uses.ts:64-77), the largest group, all third-party prompt packs; with Claude Code (uses.ts:58, tag "Max", "costruire il mio sito") 9/28 are AI tooling. "Stop Slop" and "Humanizer" invite a client or recruiter to read the site's first-person copy as AI-generated and then disguised, undercutting "Prova, non promessa" and the craft claim. "costi" (fewer tokens) means nothing to a client. The current employer reads the CV and the footer links Uses: a paid Max plan plus nine AI tools reads as heavy side investment.
- **Fix**: In app/data/uses.ts delete Caveman, Stop Slop, Humanizer (lines 68, 74, 75) and either drop the group or fold Claude Code + 1-2 skills (Impeccable, Ponytail) into "Sviluppo" (lines 33-42) with one line each on what they do for the work. Move Claude Code out of "Servizi & infra" (line 58), it is not infrastructure. Bump `updated` (line 3).
- **Suggested command**: /impeccable distill

**[P2] Hover states: tag rotation is dead, unlinked rows lie, focus gets nothing**
- **Why it matters**: The tween `.from(s('.tag'), { scale: 0, rotation: -20 })` (uses.vue:64) leaves inline `translate/rotate/scale: none` on every tag, which overrides `li:hover .tag { rotate: -6deg }` (uses.vue:211); the documented tilt never fires when motion is on. `li:hover` (lines 175, 183, 211) tints, shifts and greens rows without a link (Acer Predator, Apple Magic Trackpad), a false click affordance. Keyboard focus shows a ring but none of the hover treatment.
- **Fix**: Add `clearProps: 'translate,rotate,scale,transform'` to the tag tween at uses.vue:64. Change the selectors at lines 175, 183, 195, 211 from `li:hover` to `li:has(a):hover, li:has(a:focus-visible)`.
- **Suggested command**: /impeccable polish

**[P2] Group anchors: hidden on touch, 34px target, silent copy failure**
- **Why it matters**: The "#" cue is hover/focus only (uses.vue:159-160), so on touch the label looks like plain text but tapping it scrolls and copies. Measured height on `pointer: coarse` is 34px (uses.vue:162), DESIGN.md says /uses anchors reach 44px. If `navigator.clipboard` rejects (seen in the pane: "Write permission denied") nothing is shown (uses.vue:31).
- **Fix**: uses.vue:162 → `@media (pointer: coarse) { .anchor { display: inline-flex; align-items: center; min-height: 44px; } .hash { opacity: 1; } }`. In the `.catch` at line 31 set a fallback status (e.g. `uses.linkReady` "link nella barra degli indirizzi" / "link is in the address bar") in both locale files. While there, line 161 `border-radius: 4px` → `var(--r-sm)` (detector finding).
- **Suggested command**: /impeccable harden

**[P2] Tags mean four different things**
- **Why it matters**: Workstation tags are roles (principale, portatile, monitor primario), Sviluppo/Design/Servizi are price or plan (gratis, a pagamento, Max, self-hosted), Skills are categories (costi, codice, design, scrittura). "gratis" is uneven (Figma/Notion yes, GitHub/Spark no). The same component means something new in every group, with no legend; on mobile long tags wrap to their own line.
- **Fix**: In app/data/uses.ts give `tag` one meaning (price only: gratis / a pagamento / self-hosted, applied to every item) or remove tags where it does not apply; drop role tags from Workstation (lines 24-27) and move that info into the note.
- **Suggested command**: /impeccable clarify

## Persona Red Flags

**Jordan (first-timer)**: "Uses" is a dev-culture English term on the Italian page; the intro ("compongono la mia postazione") only half explains it. Jargon without context: WQHD, G-Sync, CI/CD, VPS, DNS/CDN, token, knowledge graph, "Max", "self-hosted". No tag legend. Group labels are links that look like labels. No next step at the end.

**Casey (mobile)**: 4479px, 5.5 screens at 375 with no jump nav. Sticky label off at ≤900px (`.side { position: static }`, uses.vue:215), so mid-list in an 8-item group context is lost. Anchors 34px. "Scrivimi" only at the top and hides on scroll down; no CTA in the thumb zone or at the end.

**Sam (accessibility)**: Mostly good (focus rings, tab order, contrast, aria-labelledby, role=status). Flags: silent clipboard failure; "#" cue hover/focus only; tag chips sit outside the `<a>`, so "gratis" is read as loose text after the link; the `.out` arrow, the only visual "link" cue, is 2.88:1 in light theme at opacity 0.45 (below 3:1); SplitText injects block `<div>`s inside the h1 (pass `tag: 'span'`).

**Paola (project persona: president of a local association, on her phone, tapped "Uses" in the footer)**: Reads Mac mini RAM, monitor refresh rates, then AI token-saving tools. The proof she would care about (two replicated servers, uptime alerts, analytics with no cookie banner) is buried in group 4 and worded for developers. "Humanizer" and Claude Code "costruire il mio sito" raise a question she did not have: "will my site be written by an AI?" She leaves with no invitation to write.

## Minor Observations

- **[P3] Orphan "00" flash**: SSR paints real counts, then uses.vue:58 resets every `.count` to "00" while `h2`/`li` are hidden by `.from(opacity 0)`, so groups appear as a lone "00" until their ScrollTrigger fires (seen on desktop and mobile, first group included). Set `count.textContent` inside the timeline's `onStart`, or animate in-viewport groups with y/blur only.
- **[P3] Rows have no hairlines**: DESIGN.md Layout says every row (incl. "voci di /uses") is closed by a hairline; /works rows have them, /uses rows do not. Either add `border-bottom: 1px solid var(--hair)` on `li` (uses.vue:166) or correct DESIGN.md.
- **[P3] Light-theme arrow**: `.out` at `opacity: 0.45` (uses.vue:192) is 2.88:1 on light bg; raise to 0.6 or use `color: var(--ink-3)` at full opacity.
- Deep links land ~192px from the top (not the 96px scroll-margin) with the previous group visible above, and the target is not highlighted.
- Copy: "Gestures precise" → "Gesture precise"; "perfetta" twice in Workstation; salesy adjectives ("Ottimo equilibrio", "Indispensabile", "Affidabile e conveniente"); Apple spec-sheet text in the MacBook note says nothing about Andrea; "Mac Mini" → "Mac mini"; "ASUS ROG SWIFT" all caps.
- Warp note says "alias per git e npm" while the platform is pnpm-only; a technical reader will notice.
- Intro and SEO description (it.json:138,141) cover only "postazione / sviluppo / design", not services and skills.
- Basin ("form di contatto senza backend") listed while the site deliberately has no forms; irrelevant to clients.
- On desktop the row hover band spans the full 2fr column while notes cap at 62ch.
- `.anchor` accessible name is its text; the `title` "copia link alla sezione" becomes a description, and the link also navigates, which the label does not say.

## Questions to Consider

- If clients are the primary audience, why does the page open with a Mac mini's RAM and close with an AI-text humanizer? What if the first group were "what your project runs on"?
- Does this page prove craft, or admit automation? Would you be comfortable with a client reading "Stop Slop" right after your first-person home page?
- What does a tag mean? If it can't be said in one word for all 28 items, should tags exist?
- Could each infrastructure row point to where it runs (Hostinger VPS → Bastion on /works#piattaforma), turning the list into proof?
