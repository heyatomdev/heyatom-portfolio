---
target: project detail page /works/[slug]
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/[slug].vue"
target_fingerprint: "sha256:8fe0877686afadd10a5cabdaf80ab82c1f5f27f2caa210d29ed99ca9b6d9e962"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/[slug].vue
timestamp: 2026-10-28T19-35-57Z
slug: app-pages-works-slug-vue
---
Method: dual-agent (A: a731cd7588681f722 · B: a167c540c3111efaa). Overlay injection skipped: parallel reviewers share the browser.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Lightbox counter and caption are aria-live (l.149-151). "Visita il sito" (l.80) leaves in the same tab, signalled only by an icon. |
| 2 | Match System / Real World | 2 | "Progetti simili" is ranked by shared stack (l.26-33), so Tai Chi Sesto, a client site for an association, gets three gaming projects. The "Stack" aside is jargon to the primary user. "Federico Liuzzi" (l.78) has no label and reads as the author. |
| 3 | User Control and Freedom | 3 | The lightbox closes with Escape, the backdrop and the button, and focus goes back to the opening thumbnail (verified by A and B). No swipe on touch. |
| 4 | Consistency and Standards | 3 | Close match to DESIGN.md. Duplicates: Beacon shows "Personale" in the meta and "Progetto personale" in the client line; the first gallery image equals the hero; "Tutti i lavori" appears twice. |
| 5 | Error Prevention | 3 | Real 404 status for unknown slugs and a mailto with a pre-filled subject. The mailto has no visible-address fallback in the band. |
| 6 | Recognition Rather Than Recall | 3 | Captions and counter are good. The client line is unlabelled. |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface. On a /40 basis: 2 (arrow keys work, but no prev/next project and no swipe). |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained, green used as light. On sgweb the Stack panel is mostly empty; Beacon has 9 pills and 7 chips under a ~110-word paragraph. |
| 9 | Error Recovery | 3 | Friendly 404 with two routes. On a /works/* miss the primary button goes home rather than to /works (app/error.vue l.30-32). |
| 10 | Help and Documentation | n/a | Portfolio surface. On a /40 basis: 2 (nothing says what happens after the mail). |
| **Total** | | **23/32** | **Good (72%)** |

On a full /40 basis (7 = 2, 10 = 2): **27/40**, which is in the Acceptable band and clears the 25/40 goal by 2 points.

## Design Specificity Verdict

**LLM assessment:** The skin is HeyAtom's but the composition is generic. Anthracite, green hairlines, mono years, the hex texture, the tight Manrope h1 and a mailto subject naming the project all follow DESIGN.md closely. The structure underneath, though, is the stock case-study template: back link, title, buttons, big screenshot, description plus tech sidebar, thumbnail grid, related cards, CTA band. Without the tokens it would pass for a studio's case study. The "banco da lavoro di una persona sola" never reaches the content. The body is a third-person product blurb, and nowhere does the page say what Andrea did, for whom, or that he worked alone. The hand mark and the orb are missing, and the page never links to the shared platform (Bastion, FileHarbor and the rest), which is the one thing no studio can copy.

**Deterministic scan:** 1 finding, advisory, exit 0. `design-system-font-size` at [slug].vue:179 (`.head h1 { font-size: clamp(3rem, 8vw, 5.5rem) }`). It is a **false positive**: DESIGN.md l.204 documents this value in prose, but the frontmatter has no token for it. Adding a `display-detail` token to the frontmatter would silence it. No hardcoded colours, no slop patterns. The detector found nothing the review missed.

**Visual overlays:** skipped because parallel reviewers share the browser, so no overlay is visible to the user. The browser evidence was gathered by hand:
- No console errors besides the intentional 404.
- No failed images.
- Every image has alt text and width/height.
- No horizontal overflow at 375px.
- All measured text pairs pass AA in both themes. The lowest is the meta line in light at 4.93:1.
- The heading outline is clean: h1 followed by four h2.
- The unknown slug returns a real HTTP 404 with noindex.

## Overall Impression

The page is technically clean and on-brand: accessible, fast LCP, a good lightbox and solid theming. It works as proof, but as a proof of a product, not of the person. The biggest opportunity is one first-person line per project saying what Andrea did, plus "simili" chosen for the visitor's situation rather than the codebase's.

## What's Working

- **The mailto subject names the project** ("Qualcosa come Tai Chi Sesto", l.13). The conversation starts from whatever convinced the visitor, which is a specific, personal touch.
- **The lightbox is a native `<dialog>` done right** (l.146-160). It opens with showModal, focus moves inside, it closes with Escape or the backdrop, focus returns to the thumbnail, arrows wrap, and the caption and counter are aria-live. The full-size image loads only on first open (l.40). Both assessments verified it.
- **LCP discipline and theming.** The hero screenshot paints with the HTML and only settles in y (l.59). It has `fetchpriority="high"` and a full srcset. Contrast holds AA in light (green-light #007a4d), and focus rings are visible on every interactive element.

## Priority Issues

**[P1] The page never says what Andrea did**
- **Element:** `section[aria-labelledby=about]`, [slug].vue l.97-103. It renders only `w.description`, a third-person product blurb (works.ts, sgweb at l.167, beacon at l.212).
- **Why it matters:** PRODUCT.md's first two principles are "una persona, non un'azienda" and "prova, non promessa". A client can't tell that one person built it, and a recruiter can't tell the role, scope or outcome.
- **Fix:** Add an optional `mine?: string` field to `Work` in works.ts, with EN overrides in works.en.ts. Render it as `<p class="lead">` under `.client` (after l.78), or as the first paragraph above `.desc` at l.99. Use only true facts, e.g. "Ho progettato e sviluppato il sito da solo, dal primo incontro con Federico alla messa online."
- **Suggested command:** /impeccable clarify

**[P1] "Progetti simili" is ranked by stack only**
- **Element:** the `similar` computation, [slug].vue l.26-33, scored at l.29.
- **Why it matters:** The client site for a Tai Chi association surfaces DBD Builds, Beacon and Element Gaming Links. The primary user (associations, small local businesses) reads that as "this person does gaming sites, not for me".
- **Fix:** In l.29 use `score: (p.kind === src.kind ? 10 : 0) + p.stack.filter(s => src.stack.includes(s)).length`, and keep the `> 0` filter and the year tie-break.
- **Suggested command:** /impeccable clarify

**[P1] The conversion band comes after three exits and offers no reassurance**
- **Element:** `.similar` (l.124-139) renders before `.cta-band` (l.141-144). The band holds only an h2 and a button.
- **Why it matters:** On mobile the ask sits at about 3,850px of a 4,480px page, right after five competing links, and the header "Scrivimi" hides while scrolling down. If mailto opens nothing, the address only appears in the footer.
- **Fix:** Add one `<p>` to the band between l.142 and l.143, in first person, with the address as text. For example, a new key `work.askText`: "Scrivimi due righe su cosa ti serve: rispondo io, da hey@heyatom.dev." in it.json, with an EN equivalent in en.json. Optionally move the `.cta-band` section above `.similar`. Don't invent response times.
- **Suggested command:** /impeccable layout

**[P2] The gallery repeats the hero and becomes a ~1,400px wall on mobile**
- **Element:** `shots` at l.36 and the `.shots` grid at l.229-236.
- **Why it matters:** `images[0].image === preview` on sgweb (works.ts l.187/190) and beacon. At 1440px the 5th thumbnail is orphaned on its own row. At 375px there are five full-width stacked shots, and tapping one opens a lightbox that shows the same image at the same size with no swipe.
- **Fix:** `const shots = computed(() => (w.value.images ?? []).filter(s => s.image !== w.value.preview))`, which also fixes the orphan with 4 items. Under 560px use `.shots { grid-auto-flow: column; grid-auto-columns: 82%; overflow-x: auto; scroll-snap-type: x mandatory }` with `li { scroll-snap-align: start }`.
- **Suggested command:** /impeccable adapt

**[P2] The client line is redundant or unlabelled**
- **Element:** `<p class="client">` at l.78, under the meta at l.74-76.
- **Why it matters:** Beacon reads "Personale" and then "Progetto personale". ALIR Community repeats its own title. "Federico Liuzzi", with no label, can read as the author.
- **Fix:** Use `<p v-if="w.kind === 'cliente' && w.client !== w.title" class="client">{{ t('work.for', { client: w.client }) }}</p>`, with new keys `"work.for": "Per {client}"` in it.json and `"For {client}"` in en.json.
- **Suggested command:** /impeccable clarify

## Persona Red Flags

**Jordan (non-technical small client, on a phone):**
- The only raised panel on the page is "Stack" (l.104-109), and Nuxt, Vuetify and TypeScript mean nothing to Jordan.
- "Federico Liuzzi" (l.78) has no label.
- "Progetti simili" shows gaming sites under a Tai Chi project.
- The ask is about 4.7 screens down, and the header CTA hides on scroll-down.
- Nothing says what working with Andrea looks like.
- The screenshots are desktop-only, so a phone user can't see the site on a phone.

**Sam (screen reader / keyboard):**
- Mostly solid: visible focus, native modal, focus return, labelled thumbnails ("Ingrandisci: La pratica").
- The "simili" link names duplicate their text: "Schermata di DBD Builds 2025 DBD Builds Nuxt · Vuetify · NestJS". Fix with `alt=""` at l.132, since the title is already in the link.
- The dialog's name is the generic "Schermate" (l.146), with no project title.
- "Visita il sito" doesn't announce that it goes to an external site.

**Casey (distracted, mobile):**
- The page is 4,481px tall: about 1,400px of gallery and 1,100px of simili.
- The lightbox has no swipe; its arrow buttons are in thumb reach, which helps.
- The h2 line reveals (`revealLines`, l.60) were caught half-masked on fast scroll ("Similar projects", "Need something like this?").
- "← Tutti i lavori" is 42px tall on mobile, just under 44.

**Riccardo (recruiter or tech lead, desktop skim, from PRODUCT.md):**
- Wants role, scope, architecture and duration; gets a marketing blurb and chips.
- No first-person "what I built".
- No link from a project to the shared platform it runs on (Bastion, FileHarbor), which is the strongest seniority signal on the site.
- No prev/next project, so every skim goes back to /works.

## Minor Observations

- The lightbox arrows overlap the image at desktop width: at 1440px the prev button spans x 16-64 and the image starts at x 48. The `.box` padding at l.289-299 needs about `padding-inline: max(clamp(1rem, 4vw, 3rem), 4.5rem)` above 900px.
- On /en/works/beacon the website link points to `https://beacon.heyatom.dev/it` (works.ts l.239). Add a `website` override in works.en.ts.
- The 404 for `/works/*` makes "Torna alla home" the primary and "Vedi i lavori" the ghost (app/error.vue l.30-32). For a stale project link, swap them. The statusMessage "Progetto non trovato" (l.9) is never shown.
- The ALIR Community "screenshot" is a logo card, not a real 16:9 screenshot. Its page has no features and no gallery, so the body is one paragraph next to a box.
- Feature pills and stack chips share the same chip look but are inert, so they read like filters.
- The global 6px focus-ring radius on the 14px "simili" cards looks slightly off.
- In light theme, page text faintly bleeds through the lightbox backdrop (94% veil).
- Detector false positive at l.179: add a `display-detail` token to the DESIGN.md frontmatter to silence it.

## Questions to Consider

- If Jordan never reads "Stack", why does the stack get the only raised panel while "what I did for Federico" gets nothing?
- Should "simile" mean similar to the client and their problem rather than to the codebase?
- "Visita il sito" is the green primary at the top. Do you want to send your best lead to someone else's site before they've read a word about you?
- The shared platform is what no studio can copy. Why doesn't any project page say "built on Bastion + FileHarbor" and link there?
