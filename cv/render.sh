#!/usr/bin/env bash
# Renders cv/cv.html to public/assets/cv-tombolato.pdf (A4).
# Usage: cv/render.sh
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(ls -d ~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}"
[ -x "$CHROME" ] || { echo "chrome-headless-shell not found: npx @puppeteer/browsers install chrome-headless-shell, or set CHROME=" >&2; exit 1; }

"$CHROME" --allow-file-access-from-files --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf=../public/assets/cv-tombolato.pdf "file://$PWD/cv.html" >/dev/null 2>&1
echo public/assets/cv-tombolato.pdf
