---
target: home page (app/pages/index.vue)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:4ef3135288cebae62eacc06b66894770540d7004888a4dbaecd932e747ad1556"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue
timestamp: 2026-10-28T20-05-29Z
slug: app-pages-index-vue
---
Method: dual-agent (A: afa7ba0352e38c385 · B: aa592bfa643ef3b6f)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Progress bar, lit path nodes, copy button now has a success state + role=status. Success cue is a 12.8px mono text swap for 1.8s; failure shows nothing. |
| 2 | Match System / Real World | 3 | Warm first-person voice. Facts row ("Medas Solutions", "Element Gaming") unexplained; offers intro still says "accessi, immagini, contenuti, eventi ed email poggiano su una base comune". |
| 3 | User Control and Freedom | 3 | Pinned travel strip short; deck deliberately out of the a11y tree; everything else plain links. |
| 4 | Consistency and Standards | 2 | Header "Scrivimi" = mailto, hero "Raccontami il progetto" = #contatti. Four solid green primaries on one page (header, hero, "Scarica il CV", close). New "copia l'indirizzo" is a sentence in JetBrains Mono (breaks the Mono per i Dati rule). |
| 5 | Error Prevention | 3 | Improved: subject now on both mailto links (L418, L425), copy fallback exists. |
| 6 | Recognition Rather Than Recall | 3 | Labels visible; but 2 of 3 deck captions are covered (Puma 10%, Tai Chi 20% visible at 1440 fanned) and the medal sits on the centre card at 375. |
| 7 | Flexibility and Efficiency | n/a (2 on /40 basis) | Persuade surface. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and on-brand; close band has 5 actions, CV primary competes mid-page. |
| 9 | Error Recovery | 2 | Copy fallback added, but `.catch(() => {})` (L120) and `navigator.clipboard?.` make denied/insecure clipboard a silent no-op; aria-label pinned to "copia l'indirizzo" while visible text says "indirizzo copiato". |
| 10 | Help and Documentation | n/a (2 on /40 basis) | Landing page. |
| **Total** | | **22/32** (69%, Acceptable, 1 pt under Good) | Full /40 equivalent: **26/40**. Reviewer A alone scored 19/32; synthesis removed double counting of the clipboard failure (H1 and H9) and credited picks below for labelling 2 of the 3 deck projects. |

## Design Specificity Verdict

LLM: authored, not interchangeable. Hand-in-bubble mark (Halloween edition), tilted deck of real screenshots next to "Ciao, sono Andrea.", lit path with logo watermarks, candid copy ("E parli sempre con me, non con un'agenzia", "Se non sono la persona giusta, te lo dico"). Drift toward generic dev portfolio: stack-chip panel ending in a full-width green "Scarica il CV", travel strip as "about me" trope.

Deterministic: `impeccable detect --json app/pages/index.vue` exit 0, 7 advisory findings, 0 actionable. bounce-easing L631 (medal back.out, documented exception DESIGN.md L340/342); design-system-font-size L687, L712, L949, L963 (all documented clamps, DESIGN.md L205/207/309); design-system-radius L732 (2px on 2px track); design-system-color L918 (#000 alpha stop in mask-image). SiteHeader.vue: 1 advisory L121 (same 2px FP); SiteFooter.vue clean. Nothing caught that the review missed; the review caught the one new rule breach (mono sentence on the copy button) that the detector does not check.

Overlays: skipped, parallel reviewers share the browser. No user-visible overlay.

Browser evidence (B): 0 console errors/warnings IT+EN; one h1, clean h2/h3/h4 order; 15 imgs, 0 broken, 0 missing alt; no horizontal overflow at 1024 or 375; contrast min 6.08:1 dark, 4.93:1 light (#007a4d green text, thin margin); deck vs facts row at 375: no intersection at scroll 0 or 300 once intro animations settle (31px gap); tap targets under 44 at 375: "base comune" link 111x24, `.mail` 205x38; copy button 137x44, native button, role=status sibling; live feedback unverifiable in pane (clipboard NotAllowedError, document not focused), which is itself the silent-failure path.

## What's Working
1. First viewport delivers the brief: at 1440x900 h1 80px, CTA y=633, facts end y=827, all above the fold; at 375 CTA y=450 and deck peeks at y=593. Person + real work in first paint.
2. Voice consistent and credible in IT and EN; recruiter line now sits after the actions, where it belongs.
3. Craft basics: 2px green-light focus ring, AA contrast everywhere in both themes, no overflow, reduced-motion branches, copy button 44px with a live region.

## Priority Issues

[P1] Picks still lead with gaming, and deck/picks still repeat 2 of 3 projects. index.vue L19 deck = puma-arts, sgweb, kaish-dbd; L21-25 picks = kaish-dbd (wide lead), sgweb, beacon. Overlap went 3 to 2; the lead image is still a Dead by Daylight build editor and 2 of 3 picks are gaming/streaming. Fix: picks = sgweb (wide), puma-arts, kaish-dbd (or prociv/gymtrack in place of Puma if the deck keeps Puma); Beacon moves to offers examples only; rewrite home.picks.* around the client's job. Command: /impeccable clarify.

[P1] Copy fallback fails silently exactly when it is needed. L114-120: `navigator.clipboard?.writeText(...).catch(() => {})`; denied permission (in-app browsers from LinkedIn/Instagram) or insecure context = nothing happens. aria-label (L419) keeps the name "copia l'indirizzo" while the visible text reads "indirizzo copiato" (label-in-name mismatch). Fix: on catch or missing API, select the address (`getSelection().selectAllChildren(mailEl)`) and show a "selezionato, copialo tu" state (new home.close.* key IT+EN); drop the static aria-label; hold success ~2.5s with a check icon. Command: /impeccable harden.

[P2] Deck hides both client-site captions. At 1440 fanned: Studio Arte Puma caption 10% visible ("Studi…"), Tai Chi Sesto 20%, DBD Builds 100%; at 375 Puma and Tai Chi 15% each and the 88px medal covers the Tai Chi screenshot. The only readable card is the gaming one. Fix: put a client site in the front slot (last in `deck`) or offset .shot--0/.shot--1 so figcaptions clear the front card; at <=900px move .medal off the centre card (corner, ~72px). Command: /impeccable layout.

[P2] Recruiter path competes with the client path mid-page. `.stack` ends in `btn--primary cv` (L385) with the same glow and magnetic pull as the contact CTA; on mobile the panel adds ~686px before the close band (close starts y=6414 of 7751). Contradicts "non cerco un impiego" and the one-primary-per-block rule. Fix: `.cv` to btn--ghost or an inline "CV (PDF)" link by the heading; at <=900px collapse chips into one mono line per group. Command: /impeccable distill.

[P2] Close band: 5 actions, one duplicate, copy styled as a caption. Giant `.mail` link and "Scrivimi una mail" do the same thing; "copia l'indirizzo" is 12.8px mono ink-3 and wraps under the address on mobile like a label. Fix: make address + copy one unit (Manrope --text-sm 600 + copy icon); LinkedIn/GitHub to a quieter icon row; at <=560px shrink the orb so heading + address land on the first close screen. Command: /impeccable quieter.

## Persona Red Flags
Jordan (first-timer): facts row names "Medas Solutions" / "Element Gaming" with no gloss; "base comune" link in offers intro is jargon (and a 24px tap target).
Riley (stress tester): clipboard denied = silent no-op (reproduced in pane); mailto with no client still has only the small copy button; copy-state name mismatch for screen readers; deck click goes to /works, not the clicked project; SplitText h1 re-mask on fonts.ready (L135-137) can hide already-painted words.
Casey (mobile): 7751px page, close band at 6414; medal on the middle deck card; .mail 38px tall; light theme 12% hex texture behind close-band copy and ghost buttons.
Association secretary comparing 2-3 names: first big image in picks is a purple gaming site; client-site captions in the deck unreadable; must scroll past tech chips and a solid "Scarica il CV" to reach "Raccontamelo"; reassurance copy is excellent once she arrives.

## Minor Observations
- Offers intro (it.json L62) sentence 2 still lists backend parts; prior suggested benefit rewrite not applied.
- mailto subject interpolated without encodeURIComponent (L418, L425).
- EN copy states differ in length ("copy the address" 16 vs "address copied" 14): small reflow.
- freelanceAvailable false in dev: no availability pill in the hero; confirm prod env.
- Stale duplicate CSS comments above .picks.
- "Tutti i 10 lavori" vs 15 projects in the surface brief: confirm the count excludes platform/tools intentionally.
- Offer example "Protezione Civile Settimo Milanese" under "Collegare i tuoi strumenti" is a weak fit.
- Light theme: medal looks washed out on the light bg.

## Questions to Consider
- If the primary visitor is an association secretary, why does a gaming build editor get the largest image on the page?
- "Non cerco un impiego", yet the second-loudest button is "Scarica il CV": who is it for, and could it live on LinkedIn?
- The deck is the signature moment but labels only one card: would a client site in front say "persona + prova" better than DBD?
