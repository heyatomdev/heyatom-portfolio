---
target: works index page (/works)
total_score: 26
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/index.vue"
target_fingerprint: "sha256:dd5c5c47d55f9e9824e79f268d4ad16717a74a0854b607232e6c5fe219534f95"
target_path: /Users/atombolato/Developer/heyatom/heyatom-portfolio/app/pages/works/index.vue
timestamp: 2026-10-28T19-37-29Z
slug: app-pages-works-index-vue
---
Method: dual-agent (A: a7fe1c133ba6cf127 · B: a05d887df74f563f9)

Target: app/pages/works/index.vue (/works, /en/works). Checked in dark and light, IT and EN, desktop and mobile (375x812). Live-server overlay: skipped because parallel reviewers share the browser.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | The open state is clear: "+" turns into a filled green ×, the title turns green-light and the row gets a 7% tint. When a second row opens, the clicked row jumps out from under the cursor. |
| 2 | Match System / Real World | 3 | The registry copy is human and in first person. The base comune cards end in mono stack lines and "Codice privato". The client "Kaish79" means nothing to a non-technical reader. |
| 3 | User Control and Freedom | 3 | Native `<details>` toggle. Opening one row silently closes the one before. A long open row on mobile can only be closed from its top. |
| 4 | Consistency and Standards | 2 | The strumenti grid breaks at ≤900px. The "Il tuo progetto" pill looks like the primary button but does nothing. Feature pills look like tappable chips. |
| 5 | Error Prevention | 3 | The accordion jump leads to mis-taps and lost place. Nothing else here can go wrong. |
| 6 | Recognition Rather Than Recall | 3 | On desktop the screenshots only show on hover. The stack column is cut to 3 tags, usually "Nuxt · Vuetify · …". |
| 7 | Flexibility and Efficiency | 3 | `#slug` deep links work, and coming back from a project reopens the row and restores focus. A hash change while already on /works does not open the row. |
| 8 | Aesthetic and Minimalist Design | 3 | The registry and the next band are clean. The base comune cards are dense (6–7 elements each plus the Bastion band). |
| 9 | Error Recovery | 3 | There are few error states. Private and no-link projects are explained honestly ("Progetto privato, niente link pubblico."). |
| 10 | Help and Documentation | n/a | A portfolio Experience surface has no task that needs help. If forced: 2. |
| **Total** | | **26/36** | **Good (72%)**. On a full /40 basis with H10 = 2: **28/40**. |

The 25/40 goal is met with 3 points to spare. Fixing the two P1 issues would lift H4 to 3 and H1/H5 toward 4, which gives a realistic 30–31/40.

## Design Specificity Verdict

**LLM assessment.** The page is mostly authored for this site, but the registry itself is a known portfolio pattern: a list of rows that reveal an image on hover, with mono years. What lifts it is the craft:
- native `<details>`;
- deep links;
- after "back", the row reopens and focus returns to it;
- a `quickTo` peek that leans with pointer speed.

What only this site has is **La base comune**: a green "Il tuo progetto" pill feeding four services on wires, with Bastion as the band underneath. It turns a private backend platform into a promise to the client: your project starts on services that already exist. Remove that section and the page could belong to any developer.

The voice stays first person singular in both languages, never agency. The missed opportunities:
- The desktop registry is the one place where proof (screenshots) stays invisible until hover. That works against principle #2 "Prova, non promessa".
- The 10 rows give a client no way to tell them apart except year and client name.

**Deterministic scan.** `impeccable detect --json app/pages/works/index.vue` exited 0 with 1 advisory finding:
- `design-system-font-size` at index.vue:309 (`clamp(1.25rem, 2.3vw, 1.75rem)`). **False positive**: DESIGN.md line 207 documents exactly this value for the registry names, and line 214 says fluid titles stay `clamp()` in the component.

A second scan of the shared chrome found 1 advisory:
- `design-system-radius` at SiteHeader.vue:121 (`border-radius: 2px`). **False positive**: this is the documented 2px scroll-progress hairline.

No anti-pattern rules fired: no side-stripe, gradient text, glass or nested cards. The detector found no real problems. The real bugs (tool grid, accordion jump, dead CTA) came from the browser and the design review, not from static rules.

**Visual overlays.** Skipped: parallel reviewers share the browser, so no user-visible overlay exists. Browser fallback signal:
- Console: 0 errors and 0 warnings across dark, light, mobile and EN.
- Mobile horizontal overflow: none, with or without an open row.
- Images: 0 missing alt; the 12 empty alts are correctly decorative.
- Heading outline is sequential: H1 Lavori → 10× H2 project → H2 base comune → H3×5 → H2 strumenti → H2 next.
- All text contrast passes AA in both themes. The tightest is the year in light mode, #007a4d at 4.93:1 at 14px.

## Overall Impression

This is a well-engineered registry with one real signature (the base comune diagram) and a page that falls apart at the end. On phones the strumenti section is visibly broken. The final CTA sends people back to the home page instead of to email, and the strongest-looking button on the page, "Il tuo progetto", is a dead div. The biggest opportunity is a cheap one: fix the mobile grid and make the page's last two calls to action actually reach `mailto:`.

## What's Working

1. **The registry interaction is engineered properly.** Native `<details>` gives keyboard support (Enter/Space) and semantics for free; the focus ring is a 2px green-light inset. A `#slug` link from the home page opens the right row. Coming back from `/works/[slug]` reopens the row and focuses its summary (index.vue:26–39). The peek follows the pointer exactly (measured at pointer +28/−90), hides on the open row, and goes static under reduced motion.
2. **La base comune draws the argument instead of claiming it.** The diagram shows a client project hanging on shared, already-built services, and the copy ties that to time and money. It is the most product-specific asset on the site.
3. **Token discipline in both themes.** Every text pair passes AA in dark and light, and the hairline language is consistent. Private projects are labelled honestly rather than hidden.

## Priority Issues

**[P1] Strumenti rows break on every phone and tablet (≤900px)**
- **Where:** app/pages/works/index.vue:588, inside `@media (max-width: 900px)` (line 568): `.year { grid-area: year; font-size: var(--text-xs); }`.
- **Cause:** the rule is not scoped to `summary`, so it also hits `.tool-list .year`. The tool grid (line 539, overridden at 598) has no `year` area, so the browser creates implicit tracks. Measured at 375px: `grid-template-columns: 56px 144px 40px 0px 30.7px`, with rows 407, 273 and 249px tall.
- **What the user sees:** the tool name and description are crushed into a 56px column and wrap one word per line. The GitHub icon floats mid-row and the year drops to the bottom right.
- **Why it matters:** this is the most visibly broken spot on the page, and it is on the device the primary client uses (PRODUCT.md: non-technical client reading on a phone). It says "careless" on a page whose job is to prove craft.
- **Fix:** change line 588 to `summary .year { grid-area: year; font-size: var(--text-xs); }`. Scope `.name` and `.plus` (lines 589–590) to `summary` the same way, for safety.
- **Suggested command:** /impeccable adapt

**[P1] Opening a second row makes the clicked row jump away**
- **Where:** index.vue:134, `<details :open="open === w.slug">`, together with `toggle()` at lines 42–54. Together they make an exclusive accordion: opening B closes A, which sits above it, so B's summary moves up by A's height.
- **Measured:** at 1440×900 with DBD Builds open, clicking Studio Arte Puma moved its summary from y=825 to y=339. The cursor ends up on other content, and on mobile the row can leave the screen.
- **Why it matters:** this is the page's signature interaction, and it misbehaves exactly when someone browses more than one project.
- **Fix:** in `toggle()`, inside `if (details.open)`, read the position before changing state, then correct the scroll after the DOM updates:

  ```js
  const s = details.querySelector('summary')!
  const top = s.getBoundingClientRect().top
  open.value = slug
  nextTick(() => window.scrollBy(0, s.getBoundingClientRect().top - top))
  ```

  The simpler alternative is to drop the exclusivity: bind nothing to `:open` and only track `lastOpen`. Several rows can then be open at once, and nothing jumps.
- **Suggested command:** /impeccable polish

**[P2] The end band sends people back to the home page instead of to email**
- **Where:** index.vue:239, `<a class="btn btn--primary" :href="localePath('/#contatti')">{{ t('common.tellMe') }}`.
- **What happens:** a plain `<a>` causes a full reload of the home page. The intro plays again, and the user still has to find the mailto.
- **Why it matters:** PRODUCT.md says the only conversion channel is `mailto:hey@heyatom.dev`, and `/works/[slug]` already goes straight to email with a subject (`[slug].vue:13`). This button is the page's last impression and its main conversion point.
- **Fix:**
  - Add `const ask = computed(() => \`mailto:hey@heyatom.dev?subject=${encodeURIComponent(t('works.askSubject'))}\`)`.
  - Add `works.askSubject` to it.json and en.json.
  - Render `<a class="btn btn--primary" :href="ask"><Icon name="mail" /> {{ t('common.tellMe') }}</a>`.
- **Suggested command:** /impeccable clarify

**[P2] "Il tuo progetto" looks like the primary button but is a dead div**
- **Where:** index.vue:185, `<div class="core" aria-hidden="true">`, styled at lines 410–425. It is filled `--green` with `on-green` 700 text and the primary-style green glow, so it reads exactly like `.btn--primary`.
- **Why it matters:** a client on a phone (Jordan) taps the most prominent green thing on screen and nothing happens. A false affordance on the brand's strongest colour weakens trust in every other button.
- **Fix:** make it the real action:
  - Change `<div class="core" aria-hidden="true">` to `<a class="core" :href="ask">` using the same mailto as above, and drop `aria-hidden`.
  - Add `text-decoration: none` to `.core`.
  - Optionally add a small `<Icon name="mail" :size="16" />`.

  The diagram stays as it is, and the pill now does what it promises.
- **Suggested command:** /impeccable clarify

**[P3] An open row on mobile repeats the screenshot and runs long**
- **Where:** index.vue:137 (`.thumb`) together with lines 571–587. The 104px thumbnail stays in the summary right above the full-width detail screenshot.
- **What happens:** DBD Builds open is about 1.3 screens tall (8 stacked pills) and can only be closed from the top.
- **Fix:** inside the ≤900px block, add:

  ```css
  details[open] .thumb { display: none; }
  details[open] summary { grid-template-columns: minmax(0, 1fr) 2.5rem; grid-template-areas: 'year plus' 'name plus'; }
  ```
- **Suggested command:** /impeccable distill

## Persona Red Flags

**Jordan (non-technical client, first visit):**
- Taps the green "Il tuo progetto" pill (line 185) and nothing happens.
- The base comune cards end in `NestJS · TypeScript · Prisma · PostgreSQL` and "Codice privato", which carry no meaning for Jordan.
- Clients "Kaish79" and "Personal trainer" give no context.
- The final "Raccontami il progetto" button (line 239) reloads the home page instead of opening an email.

**Casey (mobile, one hand):**
- The strumenti rows are broken (P1, line 588).
- The clicked row jumps when a second one opens.
- Open rows are long, and can only be closed from the top.
- The 104px thumbnails are too small to judge the work.
- The base comune "Codice" links (`.svc-link`, line 490) are 22.4px tall, under the 24px WCAG 2.5.8 minimum.
- "Federico Liuzzi ·" wraps, leaving a dangling dot with "in corso" alone on the next line (line 141).

**Sam (keyboard and screen reader):**
- Mostly good: native disclosure, a visible inset focus ring, and sr-only ": {title}" on "Scheda e schermate" and "Visita il sito".
- The GitHub ghost button in each detail (lines 166–168) lacks that sr-only title, so the page has several identical "Codice" links.
- The summary's accessible name starts with the year and runs on: "2026 Tai Chi Sesto Federico Liuzzi in corso Nuxt · Vuetify · TypeScript".
- Keyboard focus on a summary gets the outline but not the 7% tint that hover gets (lines 301–302 cover only `:hover` and `[open]`).

**Recruiter / tech lead (desktop scan):**
- Years and stack scan well.
- `w.stack.slice(0, 3)` (line 143) mostly shows "Nuxt · Vuetify · …", which is repetitive and low-signal.
- The strongest engineering (Herald, Bastion) is marked "Codice privato" and can't be checked.
- The registry has no link to the GitHub profile; it only appears inside single rows and in the footer.

## Minor Observations

- The peek sits at `clientX + 28, clientY − 90` (lines 74–75), so on the hovered row it covers the stack column ("Nuxt · NestJS · Prisma") and the "+". Flip it to the left of the cursor when `clientX > innerWidth * 0.6`.
- On desktop, the Beacon detail is 913px tall, but its 16:9 screenshot is only 220px. That leaves about 650px of empty left column. Making the image `position: sticky; top: 7rem` would keep the proof in view.
- A hash change while already on /works scrolls but does not open the row, because the logic only runs `onMounted` (lines 28–39). Watching `useRoute().hash` would fix it.
- The `.head h1` is split into masked chars (`yPercent: 120`, line 91), so the LCP heading is in effect hidden until `fonts.ready` resolves and the tween ends. CLAUDE.md allows only y/blur on `.head`; a masked y behaves like a hide. Real timing could not be verified because the review tabs ran in the background with rAF throttled.
- The detail repeats the kind label ("Cliente") under a client line that already names the client. Protezione Civile labelled "Cliente" reads oddly, since Andrea volunteers there.
- Gym Track and ALIR Community use logo cards instead of screenshots, so their peek shows a logo, which is weaker proof.
- In light mode, the hex texture in the next band reads as grey blotches.
- The sticky glass header covers the non-sticky "Anno / Progetto / Stack" column header when scrolling.
- `a.brand` in the header is 36×44 on mobile. The "+" circles are 40×40, but they sit inside a 128px-tall summary, so the tap target is fine.

## Questions to Consider

1. "Prova, non promessa" is principle #2. Why is the desktop registry the one place on the site where screenshots stay hidden until hover? What if each desktop row showed a small thumbnail, as mobile already does?
2. Is La base comune written for the client or for the recruiter? If it is for the client, why does every card end in a stack line and "Codice privato"?
3. Does "Strumenti e codice aperto" belong on a page whose main reader is a non-technical client, or would it fit better on GitHub or /uses?
4. Ten equal rows can only be told apart by year. Would leading with the three client projects still running ("in corso") serve Jordan better than a flat timeline?
