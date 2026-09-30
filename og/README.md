# Immagini di condivisione (Open Graph)

Sorgenti HTML delle immagini di share, 1200×630.

| Sorgente | Output | Pagina |
|---|---|---|
| `home.html` | `public/og.jpg` | tutte (default in `app/app.vue`) |
| `works.html` | `public/og-works.jpg` | `/works` (override in `app/pages/works/index.vue`) |
| `work.html` | `public/og/works/<slug>.jpg` | `/works/<slug>`, una per progetto (override in `app/pages/works/[slug].vue`) |

## Rigenerare

```bash
og/render.sh          # tutte
og/render.sh works    # solo una
og/render.sh work     # tutte le pagine progetto
```

Serve `chrome-headless-shell` (preso dalla cache di puppeteer, oppure `CHROME=/path/al/binario`) e ImageMagick (`magick`) per la conversione in JPG. Font da Google Fonts e screenshot da FileHarbor: serve la rete.

Per un'anteprima apri l'HTML nel browser con la finestra a 1200×630.

## Quando rigenerare

- `works.html` ha il numero di progetti scritto a mano ("9 progetti"): aggiornalo quando cambia `projects` in `app/data/works.ts`.
- Gli screenshot in `works.html` sono i `preview` di Element Gaming, Protezione Civile e DBD Builds.
- `work.html` legge titolo, cliente, anno e `preview` da `app/data/works.ts` (serve Node con type stripping, ≥ 22.18): rigenera quando aggiungi o modifichi un progetto.
- Cambi di colori o testi della home.

Dopo aver cambiato un'immagine, i social tengono la versione in cache: forzare il refresh dal Sharing Debugger di Facebook / Post Inspector di LinkedIn.
