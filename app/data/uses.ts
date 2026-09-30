// Fonte: website4/content/uses/*.json (IT). Aggiorna `updated` ogni volta che tocchi la lista.
export const updated = '2026-09-30'

export interface UsesGroup {
  title: string
  items: { name: string; url?: string; tag?: string; note: string }[]
}

export const uses: UsesGroup[] = [
  {
    title: 'Workstation',
    items: [
      { name: 'Mac Mini M1 (2020)', url: 'https://www.apple.com/it/mac-mini/', tag: 'principale', note: '16GB RAM. Desktop fisso principale, silenzioso e potente per lo sviluppo quotidiano.' },
      { name: 'MacBook Air 13" M3 (2024)', url: 'https://www.apple.com/it/macbook-air/', tag: 'portatile', note: '16GB RAM, 512GB SSD. Display Liquid Retina 13,6", videocamera FaceTime HD 1080p, Touch ID. Colorazione Mezzanotte.' },
      { name: 'ASUS ROG SWIFT PG279QE 27"', url: 'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-pg279qe-model/', tag: 'monitor primario', note: 'WQHD 2560×1440, pannello IPS, G-Sync. Ottimo equilibrio tra risoluzione e fluidità per lavoro e gaming.' },
      { name: 'Acer Predator XB271HK 27"', tag: 'monitor secondario', note: '4K Ultra HD, IPS, G-Sync, 60Hz, 4ms, HDMI/DP/USB 3.0. Usato per documentazione e finestre di supporto.' },
      { name: 'Logitech MX Mechanical', url: 'https://www.logitech.com/it-it/shop/p/mx-mechanical', note: 'Tastiera meccanica wireless con retroilluminazione smart. Perfetta per lunghe sessioni di scrittura e codice.' },
      { name: 'Apple Magic Trackpad', note: 'Colorazione grigio siderale. Gestures precise e integrazione nativa perfetta con macOS.' },
    ],
  },
  {
    title: 'Sviluppo',
    items: [
      { name: 'JetBrains Suite', url: 'https://www.jetbrains.com/', tag: 'a pagamento', note: 'WebStorm per il web (Vue/Nuxt/TS), IntelliJ IDEA per Java e Grails, DataGrip per la gestione dei database.' },
      { name: 'Warp + Oh My Zsh', url: 'https://www.warp.dev/', tag: 'gratis', note: 'Warp come terminale principale per la sua UI moderna e il completamento AI. Oh My Zsh con alias personalizzati per git e npm.' },
      { name: 'GitHub + GitKraken', url: 'https://github.com/andreacw5', note: 'GitHub per hosting e CI/CD. GitKraken come client visuale per gestire branch, PR e diff in modo chiaro.' },
      { name: 'Docker Desktop', url: 'https://www.docker.com/products/docker-desktop/', tag: 'gratis', note: 'Indispensabile per ambienti locali consistenti, specialmente con Grails e Java.' },
      { name: 'Postman', url: 'https://www.postman.com/', tag: 'gratis', note: 'Per testare e documentare le API. Ottimo per organizzare collection e ambienti condivisi.' },
    ],
  },
  {
    title: 'Design & produttività',
    items: [
      { name: 'Figma', url: 'https://www.figma.com/', tag: 'gratis', note: 'Wireframe, mockup e handoff.' },
      { name: 'Notion', url: 'https://www.notion.com/', tag: 'gratis', note: 'Note personali, appunti di progetto, idee.' },
      { name: 'Spark', url: 'https://sparkmailapp.com/', note: "Client email per macOS. Molto più veloce dell'interfaccia web." },
    ],
  },
  {
    title: 'Servizi & infra',
    items: [
      { name: 'Hostinger VPS', url: 'https://www.hostinger.com/it/vps', note: 'Due server VPS in replica per il deploy dei progetti che richiedono un backend persistente. Affidabile e conveniente.' },
      { name: 'Cloudflare', url: 'https://www.cloudflare.com/', tag: 'gratis', note: 'DNS e CDN per tutti i domini. Il piano gratuito copre tutto quello che mi serve.' },
      { name: 'Claude Code', url: 'https://claude.com/product/claude-code', tag: 'Max', note: 'Per debug, code review, bozze di testo e, come in questo caso, costruire il mio sito.' },
      { name: 'Simple Analytics', url: 'https://www.simpleanalytics.com/', tag: 'a pagamento', note: "Analytics conforme al GDPR, senza cookie e senza banner. Traccia solo l'essenziale, rispettando la privacy degli utenti." },
      { name: 'Basin', url: 'https://usebasin.com/', tag: 'gratis', note: 'Gestione dei form di contatto senza backend. Basta un action HTML e le submission arrivano direttamente via email.' },
      { name: 'Better Stack', url: 'https://betterstack.com/', note: 'Monitoraggio uptime e status page per le mie applicazioni. Mi avvisa appena qualcosa va giù.' },
    ],
  },
  {
    title: 'Skill per Claude',
    items: [
      { name: 'Caveman', url: 'https://github.com/JuliusBrussee/caveman', tag: 'costi', note: 'Risposte compresse all\'osso: meno token, stessa sostanza tecnica.' },
      { name: 'Ponytail', url: 'https://github.com/DietrichGebert/ponytail', tag: 'codice', note: 'Spinge verso la soluzione più semplice che funziona: meno codice, meno astrazioni inutili.' },
      { name: 'graphify', url: 'https://github.com/Graphify-Labs/graphify', tag: 'codice', note: 'Trasforma codebase, documentazione, schemi SQL e config in un knowledge graph interrogabile.' },
      { name: 'Impeccable', url: 'https://github.com/pbakaus/impeccable', tag: 'design', note: 'Linee guida di design per agenti AI: gerarchia, tipografia, spaziature, accessibilità.' },
      { name: 'Taste Skill', url: 'https://github.com/Leonxlnx/taste-skill', tag: 'design', note: 'Dà gusto alle interfacce generate, lontano dai layout da template.' },
      { name: 'Logo Design', url: 'https://github.com/kaankiziltug/logo-design-skill/tree/main', tag: 'design', note: 'Dal brief al logo in SVG, con test di leggibilità e varianti pronte per la consegna.' },
      { name: 'Stop Slop', url: 'https://github.com/hardikpandya/stop-slop', tag: 'scrittura', note: 'Toglie dai testi i pattern prevedibili della scrittura AI.' },
      { name: 'Humanizer', url: 'https://github.com/blader/humanizer', tag: 'scrittura', note: 'Riscrive il testo perché suoni come chi scrive, senza cambiarne il senso.' },
    ],
  },
]
