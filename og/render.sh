#!/usr/bin/env bash
# Renders og/<name>.html to public/og[-<name>].jpg at 1200x630.
# Usage: og/render.sh [home|works ...]   (default: all)
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(ls -d ~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}"
[ -x "$CHROME" ] || { echo "chrome-headless-shell not found: npx @puppeteer/browsers install chrome-headless-shell, or set CHROME=" >&2; exit 1; }

for name in "${@:-home works}"; do
  for n in $name; do
    out=../public/og.jpg; [ "$n" = home ] || out="../public/og-$n.jpg"
    png="$(mktemp -t og).png"
    "$CHROME" --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
      --virtual-time-budget=8000 --screenshot="$png" "file://$PWD/$n.html" >/dev/null 2>&1
    magick "$png" -strip -quality 90 "$out" && rm "$png"
    echo "$out"
  done
done
