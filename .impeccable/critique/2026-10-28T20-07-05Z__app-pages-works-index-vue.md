---
target: works index page (/works)
total_score: 27
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/index.vue"
target_fingerprint: "sha256:014f244ffb790645e7552fec7ccdabd16b5f12aaca1e448cc502fca0d674d057"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/index.vue
timestamp: 2026-10-28T20-07-05Z
slug: app-pages-works-index-vue
---
Method: dual-agent (A: af69c588ac2e39ce1 · B: ac0a02310ddf86b22)

Target: app/pages/works/index.vue (/works, /en/works). Checked in dark and light, IT and EN, desktop (1440x900 and 1024x768) and mobile (375x812). Live-server overlay: skipped because parallel reviewers share the browser. Second run, after the fixes for tool grid, accordion jump, mailto CTAs and the mobile open-row thumbnail.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | The open state is clear (filled green ×, green title, tint) and the clicked row now stays put (0px delta in 7 desktop and mobile samples). The "Il tuo progetto" pill and the end CTA give no hint that they open the mail client. |
| 2 | Match System / Real World | 3 | Copy is plain and in first person. Rows show only name and client ("DBD Builds / Kaish79", "ALIRDB / ALIR Community"), so a non-technical reader can't tell what each project is. The stack column is recruiter jargon. |
| 3 | User Control and Freedom | 3 | Native details, `#slug` deep link, row and focus restored on Back, scroll compensation. An open row on mobile is up to 1256px (Beacon) and can only be closed from its top. A rated this 4; moderated to 3 for that gap. |
| 4 | Consistency and Standards | 3 | Up from 2: the tool grid no longer collapses, and the pill is now a real link. Tools on mobile still use a different pattern from projects: the year is centred mid-row, while in projects it sits above the title. The pill reads as a diagram node but acts as a mailto. |
| 5 | Error Prevention | 3 | The jump that caused mis-taps is gone. Contact is mailto only, with no "copia l'indirizzo" fallback like the home close has. |
| 6 | Recognition Rather Than Recall | 3 | Everything is visible. The kind label (Cliente/Personale) only appears when a row is open. The preview shows on hover only, never on keyboard focus. |
| 7 | Flexibility and Efficiency | 3 | Deep links and Back restore work. A hash change while already on /works still doesn't open the row, because the logic only runs in `onMounted` (index.vue:29). |
| 8 | Aesthetic and Minimalist Design | 3 | The closed list and the end band are clean. The open row is overloaded: full description, up to 9 feature pills, full stack, up to 3 buttons. |
| 9 | Error Recovery | 3 | Missing links are explained honestly ("Progetto privato, niente link pubblico."). There is no fallback when no mail client is set up. |
| 10 | Help and Documentation | n/a | A portfolio Experience surface has no task that needs help. If forced: 2. |
| **Total** | | **27/36** | **Good (75%)**. On a full /40 basis with H10 = 2: **29/40**. |

## Design Specificity Verdict

**LLM assessment.** Partly authored. The registry is a well-known portfolio pattern: rows with year, name and stack, plus a screenshot that trails the cursor. The craft is what lifts it:
- native details;
- the clicked row now stays put;
- after Back, the row reopens and focus returns to it;
- the peek leans with pointer speed.

The content is Andrea's: clients named as people, "in corso" markers, real screenshots. **La base comune** is the one element only he could draw. A green "Il tuo progetto" pill hangs his four services on wires, with Bastion as the base, and the copy turns that into a client benefit ("non sulla trentesima riscrittura del login"). "Strumenti" is generic: a template, a URL shortener, an API.

**Deterministic scan.** `impeccable detect --json app/pages/works/index.vue` exited 0 with 1 advisory finding, `design-system-font-size` at index.vue:314 (`clamp(1.25rem, 2.3vw, 1.75rem)`). It is a **false positive**: DESIGN.md line 214 says fluid titles stay `clamp()` in the component. No anti-pattern or brand rules fired. As in the first run, every real defect came from the browser and the design review.

**Visual overlays.** Skipped: parallel reviewers share the browser, so no user-visible overlay exists. Fallback DOM evidence:
- Console: 0 errors and 0 warnings.
- Mobile horizontal overflow: none (375 = 375).
- Contrast: every key text is ≥ 4.5:1 in both themes. The lowest is the light-theme year/kind at 4.93, and 4.58 on the hover tint.
- Images: all 22 have alt text, and the decorative ones are empty.
- Headings run in order: h1 → 10 h2s in summaries → h2 + 5 h3s → h2 → h2.
- Global `:focus-visible` is a 2px green ring. The summary uses an inset (-2px) offset.
- The end CTA and the pill are both `mailto:hey@heyatom.dev?subject=…`.
- Accordion delta: 0px across 7 samples.
- An open mobile row hides its thumbnail (`display:none`).
- Tool grid on mobile: `56px 207px 40px`, with no implicit tracks.
- Tap targets under 44px tall:
  - the `.core` pill: 124×40 on mobile;
  - the base comune "Codice" links (`.svc-link`): 299×22.

## Overall Impression

This is clearly better than the first run. All four reported bugs are fixed, and they are confirmed by measurement, not by eye. The page now works. What is left is editorial. The open row is a full case study crammed into an accordion, even though a detail page exists. The rows still don't tell a non-technical client what each project is. The biggest opportunity is to cut the open row down to proof plus one sentence plus one button, and to give each row a plain "what it is" line.

## What's Working

- **Rows stay put.** Clicking a row below an open one keeps it exactly where it was: desktop 446→445px, mobile 649→649px, 0px in B's 7 samples. Back-navigation restores the open row and its focus. This is careful interaction work on the page's signature interaction.
- **La base comune turns infrastructure into a client promise.** The pill-to-services-to-Bastion diagram is the most persuasive and most personal element on the page. It now leads to email too.
- **Accessibility basics hold.** Native disclosure, an h2 per project, a visible focus ring, a sensible tab order, sr-only titles on the main buttons, every contrast ≥ 4.5:1 in both themes, no overflow, and reduced motion respected via `MOTION_OK`.

## Priority Issues

**[P1] The open row is a full case study crammed into the accordion**
- **What:**
  - The open row shows the full description (Beacon: 14 lines on mobile), every feature pill (9 for Beacon), the full stack, then the links.
  - Beacon's detail is 1256px tall on mobile and 700px on desktop.
  - "Scheda e schermate" ends up about 1200px below the row the user tapped.
- **Why it matters:** the primary user is a non-technical client on a phone who should grasp the project in seconds. A wall of text sits between them and the next step, and `/works/[slug]` already exists for this depth.
- **Fix:**
  - Show a 1–2 sentence teaser: a new short field in works.ts / works.en.ts, or a line-clamp on `.desc` (index.vue:159).
  - Cap features with `w.features.slice(0, 4)` (:161), or drop them from the open row entirely.
  - On mobile, put the links right after the screenshot.
  - Make the detail screenshot (:153) link to `/works/<slug>`.
- **Suggested command:** /impeccable distill

**[P2] Rows don't say what each project is**
- **What:**
  - A row is title plus client only. "Kaish79", "ALIR Community" and "Element Gaming ASD" (twice) mean nothing to a newcomer.
  - Cliente/Personale only appears once a row is open.
  - On desktop, 0.8fr of the row goes to a mono stack column aimed at recruiters.
- **Why it matters:** the client's real question is "has he made something like mine?" They can't answer it without opening rows one by one.
- **Fix:**
  - Add a plain "what it is" field in works.ts / works.en.ts ("Sito per una scuola di Tai Chi", "Vetrina per un pittore").
  - Show it in place of, or next to, `.client` (index.vue:146).
  - Shrink or demote the stack column (:148).
  - Drop the client when it repeats the title (Protezione Civile).
- **Suggested command:** /impeccable clarify

**[P2] Strumenti on mobile no longer breaks, but it doesn't follow the list's pattern**
- **What:**
  - At 375px the grid is `56px 207px 40px`.
  - The year is centred 71px from the row top while the title starts at 18px, so the year floats detached.
  - Descriptions wrap to 4–5 lines in 207px, and rows are 140–189px tall.
  - In the project list the year sits above the title.
- **Fix:** in the ≤900px block (index.vue:~607), give `.tool-list a`:
  - `grid-template-areas: 'year gh' 'name gh'`
  - `grid-template-columns: minmax(0,1fr) 2.5rem`
  - `align-items: start`

  That mirrors the summary layout at :577–581 and gives the text back about 70px.
- **Suggested command:** /impeccable adapt

**[P2] "Il tuo progetto" is a diagram node that secretly sends email**
- **What:**
  - `.core` (index.vue:190) is now a mailto, which was the previous fix.
  - On mobile the wires are hidden (:603), so it becomes a floating glowing green pill with a noun label, no verb and no mail icon.
  - It is the strongest CTA-looking thing mid-page, and only 40px tall on mobile.
- **Why it matters:** the label doesn't match the action. Jordan taps to learn more and a mail client opens; without a mail client, nothing happens.
- **Fix:** pick one:
  - Give it a verb and the mail icon ("Il tuo progetto → scrivimi"), with `min-height: 44px`.
  - Or make it a non-interactive node again and let the end band carry the ask.

  Either way, add the home's "copia l'indirizzo" fallback to the end band (:244).
- **Suggested command:** /impeccable clarify

**[P3] Interaction polish defects (observed live, confirmed in source)**
- **(a) Sticky hover on touch.** `summary:hover .title { transform: translateX(6px) }` (:320) isn't inside `@media (hover:hover)`. After a tap, the open title stays shifted 6px from its year and client line.
- **(b) The tapped row reflows on mobile.** Hiding the thumbnail (:598) makes the summary jump from 174 to 127px and moves the title about 145px left, right under the finger. Fade the thumbnail out, or keep its column during the open animation.
- **(c) Preview stuck at viewport (0,0).** The peek only gets a position on pointermove (:71–80). If a row is hovered with no move (cursor at rest, then a wheel scroll), the screenshot shows over the header logo. Call `move(e)` from `@pointerenter` at :140.
- **(d) Dangling separator.** "Federico Liuzzi ·" wraps away from "in corso". Move ` · ` inside the nowrap `<em>` at :146.
- **Suggested command:** /impeccable polish

## Persona Red Flags

**Jordan (first-timer):**
- Row names don't say what the thing is.
- "Stack" and the mono tags are unexplained.
- "Il tuo progetto" opens the mail client unexpectedly.
- "Codice / Codice privato" in base comune is noise for Jordan.

**Casey (mobile):**
- The open row runs up to 1256px, with the CTA under 9 stacked pills.
- The tapped row reflows (thumbnail vanishes, title jumps 145px), plus the 6px sticky-hover shift.
- Thumbnails are about 104px wide, too small to judge the work.
- Tool descriptions are squeezed into 207px.
- The `.core` pill is 40px tall, and the `.svc-link` "Codice" links are 22px.

**Sam (keyboard and screen reader):**
- Well served overall: inset 2px focus ring, tab order header → summary → "Scheda e schermate: <title>" → "Visita il sito: <title>" → next summary.
- Still open: the detail's GitHub "Codice" button (:171–173) and the platform "Codice" links (:201–203) have no sr-only project name, so a links list reads "Codice, Codice, Codice".
- The summary's accessible name runs on: "2026 Tai Chi Sesto Federico Liuzzi · in corso Nuxt · Vuetify · TypeScript".
- Focus gets the ring but not the 7% hover tint.

**Small non-technical client (PRODUCT.md, association president on a phone):**
- Can't scan for "someone who has made a site like mine".
- The kind label is hidden until a row is opened.
- The platform cards slip into stack lines.
- The end band offers no reassurance (that he answers personally) and no copy-address fallback.
- Positioning holds: first person throughout, nothing agency-like.

## Minor Observations

- **EN:** the title "Protezione Civile Settimo Milanese" sits above the client "Settimo Milanese Civil Protection", the same thing twice in two languages.
- **h1 masked chars:** the h1 is split into masked characters (`yPercent: 120`, index.vue:93–96). The SSR-painted "Lavori" can vanish and re-enter on a late font load. That keeps the letter of the y/blur-only rule for `.head`, but not its intent.
- **Focus tint:** add `summary:focus-visible::before { opacity: 1 }` to match hover.
- **i18n:** "Open source" is hardcoded in `kindLabel` (:17).
- **Stale brief:** the surface brief still says 15 projects. The page has 10 rows, 5 services and 3 tools.
- **Entry timing:** the `data-intro` list cascade ends about 2s in.
- **Off-screen click:** a programmatic `.click()` on an off-screen summary shifted it by -662px. No real user can trigger this, so it is noted, not counted.

## Questions to Consider

1. Who is the open row for? If the detail page exists, could the open row be a screenshot, one sentence and one button? Or should rows link straight to the detail page?
2. La base comune is the most persuasive block for a client. Why is it two screens down, after 10 rows, rather than a bridge after the first 3–4 projects?
3. Should "Strumenti" (recruiter and dev audience) sit right before the closing ask, or move to /uses or GitHub so the page ends on the client's story?
