#!/usr/bin/env bash
# Renders brand/guide.html to public/brand/heyatom-brand.pdf (A4 landscape, one board per page).
# Usage: brand/pdf.sh   (run brand/render.py first if the SVGs changed)
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(ls -d ~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}"
[ -x "$CHROME" ] || { echo "chrome-headless-shell not found: npx @puppeteer/browsers install chrome-headless-shell, or set CHROME=" >&2; exit 1; }

"$CHROME" --allow-file-access-from-files --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf=../public/brand/heyatom-brand.pdf "file://$PWD/guide.html" >/dev/null 2>&1
echo public/brand/heyatom-brand.pdf
