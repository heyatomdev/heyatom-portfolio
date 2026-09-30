# heyatom.dev

Portfolio e biglietto da visita freelance di Andrea Tombolato (HeyAtom). Nuxt 4, SSR su Node, bilingue IT/EN.

Riscrittura di [website4](https://github.com/andreacw5/website4) (Nuxt + Vuetify + Nuxt Content): stesso brand, niente Vuetify né CMS, contenuti in `app/data/` (i progetti sono stati importati da `website4/content/`).

## Pagine

| Route | Contenuto |
|---|---|
| `/` | Home: hero, offerte, percorso, stack, viaggi, chiusura con contatti |
| `/works` | Registro progetti + piattaforma (Bastion, FileHarbor, Articuno, Gatherly, Herald) + tool |
| `/works/<slug>` | Dettaglio progetto con galleria |
| `/uses` | Strumenti e servizi usati |

Italiano su `/`, inglese sotto `/en`. Al primo accesso la lingua segue il browser, poi resta nel cookie `lang`.

## Sviluppo

Serve Node ≥ 22.18 (type stripping per `og/render.sh`) e pnpm 10.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # output in .output/
pnpm preview
```

## Configurazione

Runtime config pubblica, sovrascrivibile da env:

| Variabile | Default | Effetto |
|---|---|---|
| `NUXT_PUBLIC_FREELANCE_AVAILABLE` | `false` | `true` mostra il badge "disponibile" in header e home |
| `NUXT_PUBLIC_SITE_URL` | `https://heyatom.dev` | Base per URL assoluti (canonical, og:image) |

Nessun segreto, nessun backend: i contatti sono `mailto:hey@heyatom.dev`.

## Contenuti

Tutto in `app/data/`, niente CMS:

- `works.ts` — progetti in italiano (fonte). `projects` = lista principale, `platform`/`platformBase` = servizi condivisi, `tools` = tooling.
- `works.en.ts` — override inglesi per slug, separati così rigenerare `works.ts` non li cancella.
- `uses.ts` — lista `/uses`, testo EN inline; aggiornare `updated` a ogni modifica.
- `i18n/locales/{it,en}.json` — testi UI e home.

Le immagini stanno su FileHarbor (`fileharbor.heyatom.dev`, ridimensionate con `?width=N`) oppure in `public/shots/<slug>/`.

Un nuovo progetto in `works.ts` entra da solo nella sitemap (`server/api/__sitemap__/urls.ts`).

## Screenshot e immagini di share

```bash
pnpm shots [slug...]   # screenshot dei siti cliente → public/shots/<slug>/<n>.webp (Playwright)
og/render.sh [home|works|work]   # immagini Open Graph 1200×630 → public/og*.jpg
```

Dettagli e requisiti in [`og/README.md`](og/README.md).

## Deploy

- `Dockerfile` multi-stage: build con pnpm, immagine finale con solo `.output`, utente non root, porta 3000.
- Push di un tag → GitHub Actions builda e pubblica `registry.gitlab.com/heyatomdev/heyatom-portfolio:<tag>` + scan Trivy.
- Ogni push/PR → `pnpm build` (unico check: niente lint né test).

## Design

- [`DESIGN.md`](DESIGN.md) — token, tipografia, componenti, motion, do/don't.
- [`PRODUCT.md`](PRODUCT.md) — utenti, posizionamento, vincoli di brand.
