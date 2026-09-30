// Screenshots of client sites -> public/shots/<slug>/<n>.webp (stable names, overwrite on rerun).
// Usage: pnpm shots [slug...]
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const SITES = {
  'kaish-dbd': {
    base: 'https://dbd-builds.it',
    pages: [
      ['/', 'Homepage'],
      ['/builds/kaish/killers', 'Kaish Top Builds'],
      ['/builds', 'Build della community'],
      ['/builds/random', 'Generatore di build casuali'],
      ['/killers', 'Killer'],
      ['/survivors', 'Sopravvissuti'],
      ['/perks', 'Perk'],
      ['/addons/killers', 'Add-on'],
      ['/maps', 'Mappe'],
      ['/queues', 'Tempi di attesa'],
      ['/articles', 'Articoli'],
      ['/wiki', 'Wiki'],
      ['/users/andreacw', 'Profilo utente'],
    ],
  },
  'sgweb': {
    base: 'https://taichisesto.it',
    pages: [
      ['/', 'Homepage'],
      ['/pratica', 'La pratica'],
      ['/sedi', 'Sedi'],
      ['/insegnanti', 'Insegnanti'],
      ['/corsi', 'Corsi e orari'],
    ],
  },
  'element': {
    base: 'https://element-gaming.eu',
    dismiss: 'Rifiuta i cookie',
    // streamer dashboard and marketplace need login: still on FileHarbor
    pages: [
      ['/', 'Homepage'],
      ['/players', 'Elenco giocatori'],
      ['/players/andreacw', 'Dettaglio giocatori'],
      ['/streamers', 'Elenco streamer'],
      ['/streamers/lucullusgames', 'Dettaglio streamer'],
      ['/games', 'Elenco delle sezioni'],
      ['/teams', 'Elenco dei team'],
      ['/teams/element-dark-side-2023819', 'Dettaglio del team'],
      ['/events', 'Elenco degli eventi'],
      ['/events/evento-natalizio-2023114', 'Dettaglio evento'],
      ['/article', 'Elenco delle news'],
      ['/article/ubisoft-annunci-prince-of-persia-the-lost-crown-ricevera-nuovi-dlc-gratuiti-nel-corso-del-2024-2024125', 'Dettaglio news'],
    ],
  },
  'emt-links': {
    base: 'https://links.element-gaming.eu',
    pages: [['/', 'Homepage']],
  },
  'puma-arts': {
    base: 'https://studioartepuma.it',
    pages: [
      ['/', 'Homepage'],
      ['/about', 'Su di me'],
    ],
  },
}

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES)
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 2, locale: 'it-IT' })
const page = await ctx.newPage()
const encoder = await ctx.newPage() // about:blank, no site CSP blocking data: URLs

for (const slug of slugs) {
  const { base, pages, dismiss } = SITES[slug]
  const dir = `public/shots/${slug}`
  await mkdir(dir, { recursive: true })
  for (const [i, [path, title]] of pages.entries()) {
    await page.goto(base + path, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    // cookie banner: declined once, the choice sticks for the rest of the context
    const banner = dismiss && page.getByRole('button', { name: dismiss })
    if (banner && await banner.isVisible()) await banner.click()
    // no networkidle: site polls forever (live streams, queues)
    await page.addStyleTag({ content: '::-webkit-scrollbar{display:none}' })
    await page.waitForTimeout(1500)
    // autofocused inputs show a focus ring; banner click can scroll the page
    await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0) })
    const png = await page.screenshot({ animations: 'disabled', caret: 'hide' })
    // Chromium encodes WebP natively, no image lib needed
    const webp = await encoder.evaluate(async b64 => {
      const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob())
      const c = new OffscreenCanvas(bmp.width, bmp.height)
      c.getContext('2d').drawImage(bmp, 0, 0)
      const blob = await c.convertToBlob({ type: 'image/webp', quality: 0.85 })
      const bytes = new Uint8Array(await blob.arrayBuffer())
      let s = ''
      for (let j = 0; j < bytes.length; j += 0x8000) s += String.fromCharCode(...bytes.subarray(j, j + 0x8000))
      return btoa(s)
    }, png.toString('base64'))
    const file = `${dir}/${i + 1}.webp`
    await writeFile(file, Buffer.from(webp, 'base64'))
    console.log(`${file}  ${title}`)
  }
}

await browser.close()
