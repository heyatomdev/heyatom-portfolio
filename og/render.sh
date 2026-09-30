#!/usr/bin/env bash
# Renders og/<name>.html to public/og[-<name>].jpg at 1200x630,
# and og/work.html once per project to public/og/works/<slug>.jpg.
# Usage: og/render.sh [home|works|work ...]   (default: all)
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(ls -d ~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}"
[ -x "$CHROME" ] || { echo "chrome-headless-shell not found: npx @puppeteer/browsers install chrome-headless-shell, or set CHROME=" >&2; exit 1; }

shot() { # <url> <out.jpg>
  local png; png="$(mktemp -t og).png"
  "$CHROME" --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
    --virtual-time-budget=8000 --screenshot="$png" "$1" >/dev/null 2>&1
  magick "$png" -strip -quality 90 "$2" && rm "$png"
  echo "$2"
}

for n in ${@:-home works work}; do
  if [ "$n" = work ]; then
    mkdir -p ../public/og/works
    # One "<slug> <query string>" line per project, straight from app/data/works.ts.
    node -e '
      const kind = { "cliente": "Cliente", "open-source": "Open source", "personale": "Personale" }
      import("../app/data/works.ts").then(({ projects }) => {
        for (const w of projects) {
          const img = w.preview.startsWith("/") ? `../public${w.preview}` : `${w.preview}?width=1440`
          const q = new URLSearchParams({ slug: w.slug, title: w.title, client: w.client, img,
            meta: `${w.year} · ${kind[w.kind]}${w.current ? " · in corso" : ""}` })
          console.log(w.slug, q.toString())
        }
      })' | while read -r slug qs; do
      shot "file://$PWD/work.html?$qs" "../public/og/works/$slug.jpg"
    done
  else
    out=../public/og.jpg; [ "$n" = home ] || out="../public/og-$n.jpg"
    shot "file://$PWD/$n.html" "$out"
  fi
done
