---
target: "https://heyatom.dev/ review completa"
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue"
target_fingerprint: "sha256:f7715f453b1068f75b51132218a9b399d88dac54df08cce7c976ea65c10b0862"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/index.vue
timestamp: 2026-10-22T09-10-22Z
slug: app-pages-index-vue
---
# Critique + audit heyatom.dev (2026-10-22)
Method: dual-agent (A: design review · B: detector + browser), + audit codice nel parent.
Heuristics 24/32 (7,10 n/a). Audit 15/20.
## Priority issues
- [P1] H1 IT "web app su misura." coperto dal deck a 1440 (index.vue:442 .nw su tutto titleB)
- [P1] /works mobile senza immagini; /works/[slug] senza CTA contatto finale
- [P2] Picks home linkano siti esterni invece di /works/<slug> (index.vue:281)
- [P2] Percorso: Medas (credenziale principale) terzo; copy recruiter "non cerco un impiego" vs PRODUCT.md
- [P2] Strip viaggi pinnata domina il lavoro (principio 5)
- [P2] 21.5KB font cyrillic-ext base64 inline bloccati da CSP (25% HTML)
- [P2] Lightbox scarica 1920w a dialog chiusa; hero detail data-intro su immagine LCP
- [P2] Touch target < 44px header/footer/uses
- [P3] Jargon esempi offerte (Beacon, AlertConnector), pill base comune
- [P3] Drift: 29 font-size fuori ramp, rgba verde hardcoded ~19x, dialog backdrop
- Deploy live indietro rispetto a main (deck element vs beacon); PRODUCT.md tema stale
