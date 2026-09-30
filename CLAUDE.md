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
  pages/                  # index, uses, works/index, works/[slug]
  utils/motion.ts         # gsap + useMotion, revealLines, magnetic
  utils/img.ts            # img/srcset per FileHarbor (?width=N)
  plugins/motion.client.ts# ScrollTrigger.refresh dopo la page transition
i18n/locales/{it,en}.json # testi UI
server/api/__sitemap__/   # URL /works/<slug> per la sitemap
og/                       # sorgenti HTML delle og image + render.sh
scripts/shots.mjs         # screenshot siti cliente (Playwright)
```

## Regole

- **Stile**: CSS scoped nei componenti + token da `main.css`. Mai colori hardcoded: usare `var(--green)`, `var(--ink-2)`, ecc. Ogni token nuovo va definito sia in `:root` (dark, default) sia in `:root[data-theme='light']`.
- **Vincoli di brand fissati**: sfondo `#1e201e`, verde `#00a86b` / `#007a4d` / `#33bf89`, Manrope + JetBrains Mono. Neutri non tinti di verde. Prima di toccare UI leggere `DESIGN.md`.
- **Tema**: dark di default a prescindere dall'OS (`@nuxtjs/color-mode`, attributo `data-theme`, cookie). Il light usa `--green-light: #007a4d` per il contrasto.
- **i18n**: IT default su `/`, EN su `/en` (`prefix_except_default`). Ogni stringa UI va in **entrambi** `it.json` e `en.json`. Link interni con `useLocalePath()`.
- **Progetti**: `works.ts` è la fonte italiana (commento in testa: generato da `website4`); le traduzioni stanno in `works.en.ts` e passano da `localize(w, locale)`. Non mettere testo EN in `works.ts`. `images` in `works.en.ts` = titoli galleria nello stesso ordine dell'IT.
- **Motion**: sempre via `useMotion(root, (mm, el) => …)` di `utils/motion.ts`, che scopa a `gsap.matchMedia` e fa revert all'unmount. Animazioni dentro `mm.add(MOTION_OK, …)` per rispettare `prefers-reduced-motion`. La classe `js` su `<html>` (settata in `app.vue`) nasconde gli elementi d'ingresso solo se ci sarà motion.
- **Immagini**: URL FileHarbor → `img(url, w)` / `srcset(url, widths)`. Screenshot locali in `public/shots/<slug>/`.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo/descrizione; og:image con URL assoluto da `useRuntimeConfig().public.siteUrl`.
- **Contatti**: solo `mailto:hey@heyatom.dev`. Nessun form, nessun backend.
- **Posizionamento**: HeyAtom è una persona, non un'azienda. Mai copy da software house ("il nostro team", "i nostri servizi").

## Quando aggiungi/modifichi un progetto

1. Voce in `app/data/works.ts` (con `preview`), override in `works.en.ts`.
2. Screenshot: `pnpm shots <slug>` (aggiungere il sito in `SITES` di `scripts/shots.mjs`) oppure upload su FileHarbor.
3. OG: `og/render.sh work`; se cambia il numero di progetti aggiornare il testo in `og/works.html` e rigenerare `works`.
4. Sitemap: automatica.

## Verifica

Nessun lint, test o typecheck: il check è `pnpm build` (lo stesso della CI). Per vedere modifiche UI usare il preview `portfolio` di `.claude/launch.json` (porta 3210), controllando dark e light, IT e EN, mobile.

## Doc collegati

- `DESIGN.md` — design system (fonte per token e componenti)
- `PRODUCT.md` — utenti, posizionamento, vincoli di brand, principi
- `og/README.md` — immagini di share
