// Fonte: website4/content/uses/*.json (IT). Aggiorna `updated` ogni volta che tocchi la lista.
// `en` holds the English text; the Italian fields stay the source (and the group anchors).
export const updated = '2026-09-30'

export interface UsesItem {
  name: string
  url?: string
  tag?: string
  note: string
  en: { note: string; tag?: string }
}

export interface UsesGroup {
  title: string
  en: string
  items: UsesItem[]
}

export const uses: UsesGroup[] = [
  {
    title: 'Workstation',
    en: 'Workstation',
    items: [
      { name: 'Mac Mini M1 (2020)', url: 'https://www.apple.com/it/mac-mini/', tag: 'principale', note: '16GB RAM. Desktop fisso principale, silenzioso e potente per lo sviluppo quotidiano.', en: { tag: 'main', note: '16GB RAM. My main desktop, quiet and powerful for everyday development.' } },
      { name: 'MacBook Air 13" M3 (2024)', url: 'https://www.apple.com/it/macbook-air/', tag: 'portatile', note: '16GB RAM, 512GB SSD. Display Liquid Retina 13,6", videocamera FaceTime HD 1080p, Touch ID. Colorazione Mezzanotte.', en: { tag: 'laptop', note: '16GB RAM, 512GB SSD. 13.6" Liquid Retina display, 1080p FaceTime HD camera, Touch ID. Midnight finish.' } },
      { name: 'ASUS ROG SWIFT PG279QE 27"', url: 'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-pg279qe-model/', tag: 'monitor primario', note: 'WQHD 2560×1440, pannello IPS, G-Sync. Ottimo equilibrio tra risoluzione e fluidità per lavoro e gaming.', en: { tag: 'primary monitor', note: 'WQHD 2560×1440, IPS panel, G-Sync. A great balance of resolution and smoothness for work and gaming.' } },
      { name: 'Acer Predator XB271HK 27"', tag: 'monitor secondario', note: '4K Ultra HD, IPS, G-Sync, 60Hz, 4ms, HDMI/DP/USB 3.0. Usato per documentazione e finestre di supporto.', en: { tag: 'secondary monitor', note: '4K Ultra HD, IPS, G-Sync, 60Hz, 4ms, HDMI/DP/USB 3.0. Used for docs and side windows.' } },
      { name: 'Logitech MX Mechanical', url: 'https://www.logitech.com/it-it/shop/p/mx-mechanical', note: 'Tastiera meccanica wireless con retroilluminazione smart. Perfetta per lunghe sessioni di scrittura e codice.', en: { note: 'Wireless mechanical keyboard with smart backlighting. Perfect for long writing and coding sessions.' } },
      { name: 'Apple Magic Trackpad', note: 'Colorazione grigio siderale. Gestures precise e integrazione nativa perfetta con macOS.', en: { note: 'Space gray. Precise gestures and seamless native integration with macOS.' } },
    ],
  },
  {
    title: 'Sviluppo',
    en: 'Development',
    items: [
      { name: 'JetBrains Suite', url: 'https://www.jetbrains.com/', tag: 'a pagamento', note: 'WebStorm per il web (Vue/Nuxt/TS), IntelliJ IDEA per Java e Grails, DataGrip per la gestione dei database.', en: { tag: 'paid', note: 'WebStorm for the web (Vue/Nuxt/TS), IntelliJ IDEA for Java and Grails, DataGrip for databases.' } },
      { name: 'Warp + Oh My Zsh', url: 'https://www.warp.dev/', tag: 'gratis', note: 'Warp come terminale principale per la sua UI moderna e il completamento AI. Oh My Zsh con alias personalizzati per git e npm.', en: { tag: 'free', note: 'Warp as my main terminal for its modern UI and AI completion. Oh My Zsh with custom aliases for git and npm.' } },
      { name: 'GitHub + GitKraken', url: 'https://github.com/andreacw5', note: 'GitHub per hosting e CI/CD. GitKraken come client visuale per gestire branch, PR e diff in modo chiaro.', en: { note: 'GitHub for hosting and CI/CD. GitKraken as a visual client to handle branches, PRs and diffs clearly.' } },
      { name: 'Docker Desktop', url: 'https://www.docker.com/products/docker-desktop/', tag: 'gratis', note: 'Indispensabile per ambienti locali consistenti, specialmente con Grails e Java.', en: { tag: 'free', note: 'Essential for consistent local environments, especially with Grails and Java.' } },
      { name: 'Postman', url: 'https://www.postman.com/', tag: 'gratis', note: 'Per testare e documentare le API. Ottimo per organizzare collection e ambienti condivisi.', en: { tag: 'free', note: 'For testing and documenting APIs. Great for organizing collections and shared environments.' } },
    ],
  },
  {
    title: 'Design & produttività',
    en: 'Design & productivity',
    items: [
      { name: 'Figma', url: 'https://www.figma.com/', tag: 'gratis', note: 'Wireframe, mockup e handoff.', en: { tag: 'free', note: 'Wireframes, mockups and handoff.' } },
      { name: 'Notion', url: 'https://www.notion.com/', tag: 'gratis', note: 'Note personali, appunti di progetto, idee.', en: { tag: 'free', note: 'Personal notes, project notes, ideas.' } },
      { name: 'Spark', url: 'https://sparkmailapp.com/', note: "Client email per macOS. Molto più veloce dell'interfaccia web.", en: { note: 'Email client for macOS. Much faster than the web interface.' } },
    ],
  },
  {
    title: 'Servizi & infra',
    en: 'Services & infra',
    items: [
      { name: 'Hostinger VPS', url: 'https://www.hostinger.com/it/vps', note: 'Due server VPS in replica per il deploy dei progetti che richiedono un backend persistente. Affidabile e conveniente.', en: { note: 'Two replicated VPS servers for deploying projects that need a persistent backend. Reliable and affordable.' } },
      { name: 'Cloudflare', url: 'https://www.cloudflare.com/', tag: 'gratis', note: 'DNS e CDN per tutti i domini. Il piano gratuito copre tutto quello che mi serve.', en: { tag: 'free', note: 'DNS and CDN for all my domains. The free plan covers everything I need.' } },
      { name: 'Claude Code', url: 'https://claude.com/product/claude-code', tag: 'Max', note: 'Per debug, code review, bozze di testo e, come in questo caso, costruire il mio sito.', en: { tag: 'Max', note: 'For debugging, code review, text drafts and, as in this case, building my site.' } },
      { name: 'Simple Analytics', url: 'https://www.simpleanalytics.com/', tag: 'a pagamento', note: "Analytics conforme al GDPR, senza cookie e senza banner. Traccia solo l'essenziale, rispettando la privacy degli utenti.", en: { tag: 'paid', note: 'GDPR-compliant analytics, with no cookies and no banner. It tracks only the essentials and respects users’ privacy.' } },
      { name: 'Basin', url: 'https://usebasin.com/', tag: 'gratis', note: 'Gestione dei form di contatto senza backend. Basta un action HTML e le submission arrivano direttamente via email.', en: { tag: 'free', note: 'Contact forms without a backend. An HTML action is all it takes, and submissions arrive straight by email.' } },
      { name: 'Better Stack', url: 'https://betterstack.com/', note: 'Monitoraggio uptime e status page per le mie applicazioni. Mi avvisa appena qualcosa va giù.', en: { note: 'Uptime monitoring and status pages for my apps. It tells me as soon as something goes down.' } },
    ],
  },
  {
    title: 'Skill per Claude',
    en: 'Claude skills',
    items: [
      { name: 'Caveman', url: 'https://github.com/JuliusBrussee/caveman', tag: 'costi', note: 'Risposte compresse all\'osso: meno token, stessa sostanza tecnica.', en: { tag: 'cost', note: 'Answers cut to the bone: fewer tokens, same technical substance.' } },
      { name: 'Ponytail', url: 'https://github.com/DietrichGebert/ponytail', tag: 'codice', note: 'Spinge verso la soluzione più semplice che funziona: meno codice, meno astrazioni inutili.', en: { tag: 'code', note: 'Pushes toward the simplest solution that works: less code, fewer pointless abstractions.' } },
      { name: 'graphify', url: 'https://github.com/Graphify-Labs/graphify', tag: 'codice', note: 'Trasforma codebase, documentazione, schemi SQL e config in un knowledge graph interrogabile.', en: { tag: 'code', note: 'Turns codebases, docs, SQL schemas and configs into a queryable knowledge graph.' } },
      { name: 'Impeccable', url: 'https://github.com/pbakaus/impeccable', tag: 'design', note: 'Linee guida di design per agenti AI: gerarchia, tipografia, spaziature, accessibilità.', en: { tag: 'design', note: 'Design guidelines for AI agents: hierarchy, typography, spacing, accessibility.' } },
      { name: 'Taste Skill', url: 'https://github.com/Leonxlnx/taste-skill', tag: 'design', note: 'Dà gusto alle interfacce generate, lontano dai layout da template.', en: { tag: 'design', note: 'Gives generated interfaces some taste, far from template layouts.' } },
      { name: 'Logo Design', url: 'https://github.com/kaankiziltug/logo-design-skill/tree/main', tag: 'design', note: 'Dal brief al logo in SVG, con test di leggibilità e varianti pronte per la consegna.', en: { tag: 'design', note: 'From brief to SVG logo, with legibility tests and delivery-ready variants.' } },
      { name: 'Stop Slop', url: 'https://github.com/hardikpandya/stop-slop', tag: 'scrittura', note: 'Toglie dai testi i pattern prevedibili della scrittura AI.', en: { tag: 'writing', note: 'Strips the predictable patterns of AI writing from text.' } },
      { name: 'Humanizer', url: 'https://github.com/blader/humanizer', tag: 'scrittura', note: 'Riscrive il testo perché suoni come chi scrive, senza cambiarne il senso.', en: { tag: 'writing', note: 'Rewrites text so it sounds like the person who wrote it, without changing its meaning.' } },
    ],
  },
]
