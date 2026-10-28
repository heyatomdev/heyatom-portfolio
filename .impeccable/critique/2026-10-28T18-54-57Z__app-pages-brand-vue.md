---
target: /en/brand
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/brand.vue"
target_fingerprint: "sha256:4bc9e4fdcdfccd07671024bf47270fb2473c7cbe12fbc7845452c71c59e45a16"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/brand.vue
timestamp: 2026-10-28T18-54-57Z
slug: app-pages-brand-vue
---
Method: dual-agent (A: design review · B: detector + browser)

Score 28/40 (Good). H1 3, H2 3, H3 3, H4 2, H5 3, H6 3, H7 3, H8 2, H9 3, H10 3.

Specificity: authored (editions + live hero, voice pairs, "me first") inside the standard brand-guide frame.

Priority issues:
- [P1] Still breaks its own rules: mono on phrases (figcaptions, icon variant labels, shape labels, "Hover or tap", "Live now", Yes/No kickers, motion strong.mono); .live hand-written rgba/#33bf89; .space radius 4px (526); #5c635e hardcoded (493).
- [P1] No default for the logo seeker: files 3000px down, no "most people need" pair, no sizes on ZIP/PDF, PDF forced download, no usage/credit line.
- [P2] Hood appendix after the natural end; h3 with whole description in span (screen reader reads one long heading).
- [P2] TOC links 21px tall on touch (DESIGN.md wants 44px on coarse); no sticky/current cue on 15k px mobile.
- [P3] "Jade" vs green naming; redundant alt on icon/edition images that repeat captions.

Minor: glass specimen outside header without caption; hover green on light card ~3:1; aria-pressed on decorative wave; hero edition vs plain ladder unexplained; X label magic left:20%; hero blur intro reads out of focus.

Detector: 2 advisory (#5c635e :493, 4px :526); components SiteHeader 2px :121. Overlay: repeating stripes (clear-space hatch, FP), grid background (site-wide, intended). All 18 downloads 200; no overflow; nothing <12px; no missing alt/names.
