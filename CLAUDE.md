# heyatom-portfolio

Sito personale heyatom.dev. **Nuxt 4 + Vue 3 + CSS puro + GSAP**, SSR Node, pnpm. Niente Vuetify, niente Pinia, niente Nuxt Content, niente DB: i contenuti sono file TS in `app/data/`.

Panoramica, comandi, env e deploy: [`README.md`](README.md). Qui solo quello che serve per lavorarci.

## Struttura

```
app/
  app.vue                 # head globale: hreflang, canonical, theme-color, og default
  assets/main.css         # token (:root + [data-theme='light']) e stili condivisi
  components/             # SiteHeader, SiteFooter, Icon
  data/works.ts           # progetti IT (fonte) + projects/platform/platformBase/tools/localize
  data/works.en.ts        # override EN per slug
  data/uses.ts            # /uses, EN inline nel campo `en`
  data/editions.ts        # edizioni speciali della mano + finestre di date
  composables/useMark.ts  # mano del giorno (edizione o favicon)
  pages/                  # index, uses, works/index, works/[slug]
  utils/motion.ts         # gsap + useMotion, revealLines, magnetic
  utils/img.ts            # img/srcset per FileHarbor (?width=N)
  plugins/motion.client.ts# ScrollTrigger.refresh dopo la page transition
i18n/locales/{it,en}.json # testi UI
server/api/__sitemap__/   # URL /works/<slug> per la sitemap
og/                       # sorgenti HTML delle og image + render.sh
brand/render.py           # genera il kit SVG in public/brand/ (pagina /brand)
brand/guide.html + pdf.sh  # guida di brand → public/brand/heyatom-brand.pdf
brand/kit.py              # zip del kit (SVG + PNG 1x/2x + PDF), bottone "Scarica il kit"
cv/                       # cv.html + render.sh → public/assets/cv-tombolato.pdf
scripts/shots.mjs         # screenshot siti cliente (Playwright)
```

## Regole

- **Stile**: CSS scoped nei componenti + token da `main.css`. Mai colori hardcoded: usare `var(--green)`, `var(--ink-2)`, ecc. Ogni token nuovo va definito sia in `:root` (dark, default) sia in `:root[data-theme='light']`.
- **Vincoli di brand fissati**: sfondo `#1e201e`, verde `#00a86b` / `#007a4d` / `#33bf89`, Manrope + JetBrains Mono. Neutri non tinti di verde. Prima di toccare UI leggere `docs/DESIGN.md`.
- **Tema**: segue l'OS, dark se non c'è preferenza (`@nuxtjs/color-mode` `preference: 'system'`, attributo `data-theme`, cookie). Il light usa `--green-light: #007a4d` per il contrasto.
- **i18n**: IT default su `/`, EN su `/en` (`prefix_except_default`). Ogni stringa UI va in **entrambi** `it.json` e `en.json`. Link interni con `useLocalePath()`.
- **Progetti**: `works.ts` è la fonte italiana (commento in testa: generato da `website4`); le traduzioni stanno in `works.en.ts` e passano da `localize(w, locale)`. Non mettere testo EN in `works.ts`. `images` in `works.en.ts` = titoli galleria nello stesso ordine dell'IT.
- **Motion**: sempre via `useMotion(root, (mm, el) => …)` di `utils/motion.ts`, che scopa a `gsap.matchMedia` e fa revert all'unmount. Animazioni dentro `mm.add(MOTION_OK, …)` per rispettare `prefers-reduced-motion`. La classe `js` su `<html>` (settata in `app.vue`) nasconde gli elementi `[data-intro]` solo se ci sarà motion. **Mai** `data-intro` né `autoAlpha: 0` su hero copy e `.head` delle pagine: sono l'LCP, devono dipingersi con l'HTML; lì si anima solo `y`/`blur`.
- **Immagini**: URL FileHarbor → `img(url, w)` / `srcset(url, widths)`. Screenshot locali in `public/shots/<slug>/`: `img()` mappa `1.webp` + width a `1-<width>.webp`, generati da `pnpm shots` (`SHOT_WIDTHS` in `utils/img.ts`); dopo aver aggiunto file a mano: `pnpm shots --resize`.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo/descrizione; og:image con URL assoluto da `useRuntimeConfig().public.siteUrl`.
- **Contatti**: solo `mailto:hey@heyatom.dev`. Nessun form, nessun backend.
- **Posizionamento**: HeyAtom è una persona, non un'azienda. Mai copy da software house ("il nostro team", "i nostri servizi").

## Quando aggiungi/modifichi un progetto

1. Voce in `app/data/works.ts` (con `preview`), override in `works.en.ts`.
2. Screenshot: `pnpm shots <slug>` (aggiungere il sito in `SITES` di `scripts/shots.mjs`) oppure upload su FileHarbor.
3. OG: `og/render.sh work`; se cambia il numero di progetti aggiornare il testo in `og/works.html` e rigenerare `works`.
4. Sitemap: automatica.

## Quando cambi il marchio

Il kit di `/brand` (`public/brand/*.svg`) è generato, non disegnato a mano: mano da `public/favicon.svg`, scritta "HeyAtom" in Manrope 800 da `cv/fonts/` convertita in tracciati. Dopo aver cambiato favicon o font: `uvx --with fonttools --with brotli python brand/render.py`.

La guida in PDF (`public/brand/heyatom-brand.pdf`, linkata da `/brand`) ha come sorgente `brand/guide.html`, solo in italiano: quando cambiano marchio, token o regole di `/brand`, aggiornarla e lanciare `brand/pdf.sh` (dopo `render.py` se sono cambiati gli SVG).

Il bottone "Scarica il kit" punta a `public/brand/heyatom-brand-kit.zip`: dopo `render.py` o `pdf.sh` rigenerarlo con `DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib uvx --with cairosvg python brand/kit.py` (serve `cairo` da Homebrew), poi aggiornare `kitMB` in `app/pages/brand.vue` con la dimensione che stampa.

Edizioni speciali (Pride, Halloween, Natale): disegnate in `brand/render.py`, date in `app/data/editions.ts`. `useMark()` sceglie la mano del giorno lato server; header, footer, home, hero di `/brand` e favicon la usano, quindi la mano non va mai scritta come `/favicon.svg` fisso nei componenti.

## Quando aggiorni il CV

1. Testo in `cv/cv.html` (unica fonte; il PDF linkato dalla home è `public/assets/cv-tombolato.pdf`). Il CV lo legge anche il datore di lavoro attuale: niente che sembri freelance o secondo lavoro.
2. `cv/render.sh` stampa il PDF A4 con chrome-headless-shell (come `og/render.sh`).
3. Controllare che resti leggibile da ATS/AI: `uvx --from pdfminer.six pdf2txt.py public/assets/cv-tombolato.pdf` deve dare testo pulito, in ordine, senza parole spezzate.
4. Vincoli di layout per l'estrazione: font locali in `cv/fonts/` (mai Google Fonts, i subset spezzano il testo), niente `letter-spacing` largo, niente colonne/griglie che separano etichetta e valore (le competenze sono righe `Etichetta: valori`).

## Verifica

Nessun lint, test o typecheck: il check è `pnpm build` (lo stesso della CI). Per vedere modifiche UI usare il preview `portfolio` di `.claude/launch.json` (porta 3210), controllando dark e light, IT e EN, mobile.

## Doc collegati

- `docs/DESIGN.md` — design system (fonte per token e componenti)
- `docs/PRODUCT.md` — utenti, posizionamento, vincoli di brand, principi
- `og/README.md` — immagini di share
