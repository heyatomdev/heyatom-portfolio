---
target: /en/brand
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/brand.vue"
target_fingerprint: "sha256:07b155fcd8b4e986c73099545f182f3eaa427c01ceb67459475f095ae5510262"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/brand.vue
timestamp: 2026-10-28T18-37-32Z
slug: app-pages-brand-vue
---
Method: dual-agent (A: design review · B: detector + browser)

Score 23/40 (Acceptable). H1 2, H2 3, H3 2, H4 2, H5 3, H6 2, H7 2, H8 3, H9 1, H10 3.

Specificity: authored content (hand, editions + Live badge, Yes/No voice, real clear-space geometry) on generic brand-guidelines skeleton (12 identical "The X." sections).

Priority issues:
- [P1] Page breaks its own Don'ts: card grids for files/icons (brand.vue:197,384-397), mono h3 (256,385), red #e5484d don't icon (728), glass on .ground .dl (529).
- [P1] "Download the kit" (121) is an anchor to #file; no ZIP, no PNG; 17 separate SVGs.
- [P1] Contrast: --on-green on #007A4D swatch 3.5:1 hex, 2.9:1 role line at opacity .8 (both themes).
- [P2] No wayfinding on 9.9k/15k px page; Files at the bottom.
- [P2] Duplicate download surfaces: Icon + Editions sections repeat Files groups (25 links / 17 files).
- [P2] Copy feedback keyed by hex (63-71,250,263): duplicate hexes flip together; clipboard failure swallowed silently.

Minor: display spec label 2.7rem vs style 2.2rem (51); hero/tab demo hard-code plain mark while header shows live edition; "Hover the hand" dead on touch; .theme .role hidden <900px; 11.2px clear-space labels; no personal close at end.

Detector: 7 advisory (font-size clamp mins 51-52, 0.7rem 491; #5c635e 453, #e5484d 728; radius 4px 486, SiteHeader 2px 121). Overlay: grid background (intended, DESIGN.md), stripes 487 (intended demo), low-contrast green-dark swatch (real).
