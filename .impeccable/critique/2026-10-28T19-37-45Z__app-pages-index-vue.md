---
target: home page (app/pages/index.vue)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:3af7996f85c30b442c44c79f6a744be6ceb51ef0e7b5adb7a4a58534fcff6bd7"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue
timestamp: 2026-10-28T19-37-45Z
slug: app-pages-index-vue
---
Method: dual-agent (A: a465731be01389d7f · B: a6cd973345c67b604)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Header progress bar, path nodes lighting up, aria-current on Lavori. "Percorso" anchor never shows active state; gone from header at <=760px. |
| 2 | Match System / Real World | 3 | Warm first-person voice; recruiter/dev vocabulary leaks into client paths ("base comune", OAuth, Prometheus, "Full-stack"). |
| 3 | User Control and Freedom | 3 | Pinned strip short, not a trap. Hero copy + CTAs fade to ~60% opacity while still on screen during scatter. |
| 4 | Consistency and Standards | 3 | Header "Scrivimi" = mailto, hero "Raccontami il progetto" = #contatti jump; deck and picks repeat the same 3 projects. |
| 5 | Error Prevention | 2 | mailto-only contact, no copy fallback; .mail link (L406) has no subject while the button (L408) does; CV download gives no format/size. |
| 6 | Recognition Rather Than Recall | 3 | Labels always visible; pick links carry ~200-char accessible names. |
| 7 | Flexibility and Efficiency | n/a (2 on /40 basis) | Persuade surface, no repeat use. Skip link + anchors exist, no copy-email accelerator. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong token/hairline discipline; diluted by duplicated proof, 6-line offers intro on mobile, recruiter aside inside the client CTA. |
| 9 | Error Recovery | 2 | If mailto does nothing (no mail client), recovery = manual text selection. |
| 10 | Help and Documentation | n/a (2 on /40 basis) | Landing page; never says what happens after the mail (reply time, next step, cost handling). |
| **Total** | | **22/32** (69%, top of Acceptable, 1 pt under Good) | Full /40 equivalent: **26/40** |

## Design Specificity Verdict

LLM: ~75% grounded. Real 16:9 screenshots dealt as a tilted deck next to "Ciao, sono Andrea.", mono date ranges, path with logo watermarks and lighting track, speech-bubble orb with the (Halloween edition) hand, measured travel strip. Residue: offers = generic site/app/integrations triad as rows; facts row = stats row with company names; close = stock dev-portfolio ending. Biggest self-inflicted weakness: deck and picks are the same three projects.

Deterministic: `impeccable detect --json app/pages/index.vue` exit 0, 7 advisory findings, 0 true positives. bounce-easing L613 (medal back.out, documented exception DESIGN.md L340); design-system-font-size L669, L694, L931, L937 (all documented clamps in DESIGN.md L205/L207/L309); design-system-radius L714 (2px pill on 2px track); design-system-color L900 (#000 alpha stop in mask-image). SiteHeader.vue: 1 advisory L121 (same 2px radius FP). SiteFooter.vue clean. The detector caught nothing the review missed.

Overlays: skipped, parallel reviewers share the browser. No user-visible overlay.

Browser evidence (B): 0 console errors; one h1, clean h2/h3 order; 15 imgs, 0 missing alt; no horizontal overflow at 375; no text <12px; 0 contrast failures in both themes (thinnest: light green-light #007a4d 4.93, light ink-3 5.63); backdrop-filter only on header; visible focus ring verified.

## What's Working
1. Hero deck next to the name (index.vue L228-263): proof beside the person in first paint, kept out of the a11y tree (aria-hidden, tabindex -1) because the ghost "Vedi tutti i lavori" duplicates it.
2. Voice: "e parli sempre con me, non con un'agenzia", "Se non sono la persona giusta, te lo dico." First person singular everywhere, EN keeps tone.
3. Token discipline holds in both themes: every measured pair passes AA, ghost border 3:1+, pointer:coarse targets 43-50px.

## Priority Issues

[P1] Hero deck and picks show the same three projects, two of them gaming/streaming. index.vue L18 deck = beacon, sgweb, kaish-dbd; L20-24 picks = kaish-dbd, sgweb, beacon. Visible at once at desktop scroll 500. Fix: picks lead with sgweb (wide), then prociv + gymtrack (or puma-arts); keep the deck as the character set; move home.picks.* lines in both locales. Command: /impeccable clarify.

[P2] Mobile scatter: front deck card covers the facts row while it's being read. index.vue L554 (.shot--2 --lift: 140px), scatter tween L128-134 registered under mm.add(MOTION_OK) at L117 (all widths); L960 grid 'copy' 'stage' 'facts'. Measured at 375px, scroll 700: card bottom 220px vs first fact top 199px. Fix: move the stage scatter tween into the (min-width: 901px) branch at L186, or under 900px override .shot--2 { --lift: -120px }. Command: /impeccable adapt.

[P2] Close mixes audiences at the conversion moment and has no mailto fallback. index.vue L405 recruiter aside between reassurance and address; L406 .mail has no ?subject=; L409-410 GitHub same weight as LinkedIn. Fix: move L405 below .actions; add the subject to L406; add a "Copia" button next to the address (navigator.clipboard + mono confirmation, as on /uses); optionally drop the GitHub ghost (footer has it). Command: /impeccable harden.

[P2] Offers intro long and technical. it.json L62 home.offers.intro (+ en), rendered index.vue L301-303; 6 lines at 375px, backend vocabulary, link sends a non-technical client to an architecture diagram. Fix: keep sentence 1; rewrite sentence 2 as a client benefit ("E non parto da zero: le parti che servono sempre, come accessi, email e immagini, le ho già costruite e collaudate."), keep {link} on that clause. Command: /impeccable clarify.

[P3] Hero h1 can be re-hidden after painting. index.vue L123-126: on document.fonts.ready SplitText masks lines and gsap.from(yPercent: 118) drops words out of view, conflicting with the CLAUDE.md rule that hero copy paints with HTML and animates only y/blur. Fix: skip the split if performance.now() > ~300ms, or tween words from yPercent: 30 without mask: 'lines'. Command: /impeccable animate.

## Persona Red Flags
Jordan: "HeyAtom" (header) vs "Andrea" (h1) only reconciled in the footer; Halloween hand differs from the LinkedIn favicon; "Medas Solutions" / "Element Gaming" facts unexplained.
Riley: no mail client = header Scrivimi, address and "Scrivimi una mail" all silently fail; fast mobile scroll hides facts; hero CTAs dim to ~60% while on screen; pick links read the whole card as one name; lang=en cookie redirects / to /en on return.
Casey: 7,688px page (~9.5 screens); same 3 screenshots twice in the first 3 screens; 6-line offers intro; full screen of stack chips + green "Scarica il CV"; "Percorso" missing from header at <=760px; footer Uses/Brand 36-41px wide.
Association president (~60, phone, word of mouth): first work shown is a Dead by Daylight build editor then a Twitch team page; "full-stack", "base comune", "OAuth, Prometheus" mean nothing; no hint of cost or timing; last line before the button is addressed to recruiters.

## Minor Observations
- Pinned travel strip leaves the bottom third empty at 1440x900.
- home.off.text mentions gaming, no image shows it.
- .mail 38px tall on touch (button below is 50px).
- Path duration floor (L48) shows "1 anno" for 21 months at Element.
- Deck alts are inside aria-hidden: dead DOM weight.
- freelanceAvailable false in dev: hero has no availability pill; check prod flag.
- Duplicate/stale CSS comments L637-638.
- Header icon controls on desktop (theme 32x32, IT/EN 29x29) are the smallest targets (mouse context, acceptable).

## Questions to Consider
- Why is the most saturated button between hero and close "Scarica il CV" (L373) if the reader you want is a client?
- Could the deck show breadth (many small cards) and the picks show depth, instead of the same three twice?
- Would one honest line on cost or reply time convert more than the whole stack panel?
- Is "Cosa posso fare per te" the client's question, or is "come lavoriamo: mi scrivi, ti rispondo io, ti propongo una strada" the better section?
