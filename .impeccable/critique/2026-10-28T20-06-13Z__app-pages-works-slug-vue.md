---
target: project detail page /works/[slug]
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/[slug].vue"
target_fingerprint: "sha256:60ba9fe37cda696150a152f294aa2de626fe0cae82c462fe97197f21c1adad86"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/[slug].vue
timestamp: 2026-10-28T20-06-13Z
slug: app-pages-works-slug-vue
---
Method: dual-agent (A: afe45135de681fa25 · B: aca92b1ef423513f4). Overlay injection skipped: parallel reviewers share the browser.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Lightbox counter/caption are aria-live; stepping changes caption and counter before the 1920px image arrives (no loading state). |
| 2 | Match System / Real World | 3 | Up from 2: client line is labelled ("Per Federico Liuzzi"). Still: Stack aside and pills like "API pubblica in lettura, senza chiave" are jargon to the primary user; "Per Personal trainer" (gymtrack) reads wrong. |
| 3 | User Control and Freedom | 3 | Esc, backdrop, arrows, focus returns to the opening thumbnail. No swipe in the lightbox; page behind the modal scrolls (no scroll lock). |
| 4 | Consistency and Standards | 3 | Feature pills share the stack-chip style; mobile gallery first card differs from the rest; DESIGN.md l.227 still documents "simili" before the band. |
| 5 | Error Prevention | 3 | Prefilled mailto subject plus the address now shown as text. |
| 6 | Recognition Rather Than Recall | 3 | Captions, counter, labelled controls. Arrow-key nav in the lightbox is not hinted; mobile strip has no position indicator. |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface. On a /40 basis: 2. |
| 8 | Aesthetic and Minimalist Design | 2 | Down from 3: head is hollow at desktop (content in the left ~300px, rest hex texture); Beacon body is a 678-char paragraph + 9 ungrouped pills (16 lines + 357px of pills on a phone). |
| 9 | Error Recovery | 3 | On-brand 404 with two exits. |
| 10 | Help and Documentation | n/a | Portfolio surface. On a /40 basis: 2. |
| **Total** | | **23/32** | **Good (72%)** |

On a full /40 basis (7 = 2, 10 = 2): **27/40**, unchanged. The +1 on H2 (labelled client line) is cancelled by -1 on H8 (now that the band moved up, the hollow head and the text/pill wall are the most visible weakness).

## Design Specificity Verdict

**LLM assessment:** Brand-dressed template. The skin is unmistakably HeyAtom (hexed head, mono meta in green-light, hairlines, real 16:9 screenshot as LCP, mailto subject naming the project) and the CTA band now speaks in a one-person voice ("rispondo io"). The skeleton is still the generic dev case study: back link, giant title, screenshot, about + stack aside, thumbnails, CTA, related cards. The body is third-person product copy; the only "io" on the page is in the CTA band. Nothing in the structure records what Andrea did, for whom, and how it went.

**Deterministic scan:** `impeccable detect --json "app/pages/works/[slug].vue"` exit 0, 1 advisory finding: `design-system-font-size` at l.183 (`.head h1 { font-size: clamp(3rem, 8vw, 5.5rem) }`). False positive: DESIGN.md l.204 documents this exact value in prose; the frontmatter has no token for it. No hardcoded colours. The detector caught nothing the review missed. Browser evidence (B) independently confirmed the mobile gallery defect A found, and added one A missed: the lightbox does not lock page scroll.

**Visual overlays:** skipped, parallel reviewers share the browser; no overlay is visible to the user. Manual browser evidence: no console/hydration errors in any theme/viewport/locale; no horizontal overflow at 1024/375/320; all text pairs pass AA in both themes (lowest: `.meta`/`.count`/`.more` in light at 4.93:1); heading outline h1 then h2s, no skips; all images have alt + width/height + aspect-ratio (low CLS); h1 and hero paint at opacity 1 (only `y` animated).

## Overall Impression

The fixes landed where they were aimed: the ask now sits right after the proof in first person with a visible address, the gallery no longer repeats the hero, the client line is labelled, Beacon EN links to /en. But the score did not move, because the biggest gap of the last run (the page never says what Andrea did) is untouched, the "same kind first" ranking is a no-op on this dataset, and the new phone strip shipped with a layout bug. Biggest opportunity: one sentence under the h1 saying what the project is and what Andrea did, which also fills the empty half of the head.

## What's Working

- **Conversion craft.** Band directly after the proof, "Scrivimi due righe... rispondo io", address as selectable text, project name in the mailto subject (l.13). Specific to a single person; a studio can't say it.
- **Lightbox engineering.** Native `<dialog>` (`:modal`), Esc/backdrop/arrows, focus moves in and returns to the opening thumbnail, aria-live caption, full-size image fetched only on first open, 48x48 controls that don't overlap on phones.
- **Brand discipline and quiet edge cases.** Tokens hold in both themes; long titles (prociv, 34 chars) wrap cleanly at 48px on 320-375; missing gallery/links degrade by omission plus the private note.

## Priority Issues

**[P1] The first viewport never says what the project is or what Andrea did** (carried over, unresolved)
- **What:** `.head` (l.71-89) is meta + h1 + client line + buttons. The description sits under a 644px (desktop) / 193px (phone) screenshot; on Beacon at 1440x900 it starts at y≈1150. Personal projects get no subtitle at all, and the body never uses first person.
- **Why it matters:** PRODUCT.md principles 1-3 ("una persona", "prova, non promessa", "capisce in 5 secondi"). Clients arrive on a shared link; recruiters skim.
- **Fix:** Add a `summary` (one sentence, what it is) and an optional first-person `mine` (what Andrea did) to `Work` in works.ts with overrides in works.en.ts; render `summary` as a lede under the h1 in `.head`, `mine` as the first paragraph of the body. At >=901px make `.head` two columns like the /works head (h1 + lede left; client, role, buttons right) to fill the empty hex half. Only true facts.
- **Suggested command:** /impeccable clarify, then /impeccable layout

**[P1] Mobile gallery strip: first card narrower and flush to the screen edge** (regression from the snap-strip fix)
- **What:** at 375px `getComputedStyle(.shots).gridTemplateColumns` = `260px 281.25px 281.25px 281.25px` (320px: `260px 236px 236px 236px`); on load `scrollLeft = 16` and card 1 sits at x=0 with no gutter; captions at different heights.
- **Why:** the desktop `grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr))` still creates one explicit track inside `@media (max-width: 560px)` (l.~366), and `scroll-snap-align: start` snaps to the scrollport edge because `scroll-padding-inline` is `auto`.
- **Why it matters:** the first thing a phone visitor swipes looks broken; Casey is the primary client persona.
- **Fix:** in that media query add `grid-template-columns: none; scroll-padding-inline: var(--gutter);`. Optionally a mono "1 / 4" counter or dots under the strip (element has 13 shots with no index).
- **Suggested command:** /impeccable adapt

**[P2] "Progetti simili": the same-kind boost is a no-op**
- **What:** 9 of the 10 `projects` are `cliente` (only beacon is `personale`), so `+10` at l.29 lifts everyone and stack overlap still decides. sgweb (Tai Chi association) still gets DBD Builds, Element Gaming Links, Element Gaming: all gaming, two from one client. Puma Arts or prociv would be more relevant. On phones the section is a ~1050px stack after the CTA, so the last impression is "more stuff".
- **Fix:** add an audience/sector field (local professional/association, gaming/community, ...) and rank by it before stack; dedupe by `client`; under 560px reuse the swipe strip or compact rows.
- **Suggested command:** /impeccable clarify (data), /impeccable adapt (mobile)

**[P2] The body is a wall and features read as tags**
- **What:** Beacon: one 678-character paragraph plus 9 pills styled exactly like stack chips (l.211-219); kaish-dbd has 8. On a phone: 16 lines + 357px of pills.
- **Fix:** split the description into short paragraphs ("Cosa fa" / first-person "Cosa ho fatto"); render features as a hairline list (DESIGN "Righe non Card"), capped around 5, with a style distinct from stack chips; demote the Stack aside to a mono line for the client persona.
- **Suggested command:** /impeccable distill

**[P2] Client line and band copy edge cases**
- **What:** `t('work.for')` assumes a proper name: gymtrack renders "Per Personal trainer" / "For Personal trainer". prociv renders "Per Protezione Civile di Settimo Milanese" under the h1 "Protezione Civile ..." because the guard at l.79 only catches exact equality. prociv's only action is "Codice" (GitHub), useless to a non-technical visitor. `work.askText` "rispondo io, da hey@..." / EN "I reply myself, from" is unidiomatic, and the address is linked twice in the band (inline link + button, two identical tab stops).
- **Fix:** reword data ("Un personal trainer") or add a role/name distinction; loosen the guard (e.g. skip when `w.title` includes or is included by `w.client`); copy like "Scrivimi due righe su cosa ti serve: ti rispondo io, di persona, da hey@heyatom.dev." / EN "Tell me in a couple of lines what you need. I'll answer personally."; make the inline address plain selectable text, not a second link.
- **Suggested command:** /impeccable clarify

## Persona Red Flags

**Jordan (first-timer, lands on /works/beacon from a link):** sees "2025 · Personale · in corso / Beacon / Visita il sito". Nothing says what Beacon is or who Andrea is until past the screenshot. "Personale" can read as hobby, "in corso" as unfinished.

**Casey (mobile):** first gallery card misaligned and flush to the edge; no position indicator on a 13-shot strip (element); lightbox image only ~343x193 with no swipe or pinch; page behind the lightbox scrolls; ~1050px tail of stacked "simili" after the ask. `.back` is 42px tall (2px short of 44).

**Sam (screen reader / keyboard):** low risk. Native modal, focus return, labelled buttons, aria-live caption, contrast >= 4.93:1. Flags: arrow keys not discoverable; caption announced before the image loads; duplicate mail link in the band = two identical tab stops.

**Small local client (e.g. a Tai Chi teacher opening a WhatsApp link on a phone, from PRODUCT.md):** learns what the site contains, not what working with Andrea was like (what he handled, hosting, ongoing care, what "in corso" means). Stack aside is noise. "Simili" are all gaming, signalling "he's a gaming dev". The prefilled subject and visible address are the parts that work.

## Minor Observations

- Lightbox does not lock page scroll: wheel over the open modal moved `scrollY` 1173 → 1673 (native `<dialog>` default). `html:has(dialog[open]) { overflow: hidden }` fixes it.
- Gallery thumbs are 640x360 sources in a 16:10 box (slight crop), single `src`, no `srcset`.
- At desktop the right half of `.head` is only hex texture; in light mode the CTA-band hexes at 0.18 read as grey cells, busier than in dark.
- gymtrack's hero is a logo splash, not a screenshot, and it has no gallery: no real proof on that page.
- "Open source" kind label is hardcoded, not i18n (l.15).
- "Visita il sito" opens in the same tab.
- Touch targets under 44: `.back` 42px, footer "Uses"/"Brand" 36-41px wide, header brand 36px wide.
- DESIGN.md l.227 still documents "simili" before the band; update it to match the new order.
- Detector false positive at l.183: a `display-detail` token in DESIGN.md frontmatter would silence it.

## Questions to Consider

- If a visitor reads only the first screen, what one sentence should they leave with, and why is it not on the page?
- Should "Progetti simili" answer "what has he done for someone like me" rather than "what else uses Vuetify"?
- Is this page a spec sheet of the project or a record of Andrea's work? Where is the "io" between the h1 and the CTA band?
