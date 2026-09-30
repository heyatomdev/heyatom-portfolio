// Fonte: website4/content/projects/*.md (IT). Rigenera da lì se cambiano.
export type WorkKind = "cliente" | "open-source" | "personale"

export interface Work {
  slug: string
  title: string
  year: number
  current: boolean
  kind: WorkKind
  client: string
  description: string
  features: string[]
  stack: string[]
  website?: string
  github?: string
  preview: string
}

export const works: Work[] = [
  {
    "slug": "articuno",
    "title": "Articuno",
    "year": 2026,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Microservizio CMS multi-tenant costruito con NestJS, Prisma e PostgreSQL. Gestisce articoli, commenti e utenti con isolamento completo per tenant, moderazione automatica tramite lista di parole vietate e soglie di segnalazione, consegna asincrona di webhook con pattern outbox e semantica exactly-once.",
    "features": [
      "Isolamento multi-tenant",
      "Moderazione automatica",
      "Gestione segnalazioni",
      "Webhook con pattern outbox",
      "Autenticazione API key",
      "Ciclo di vita dei contenuti"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL"
    ],
    "github": "https://github.com/heyatomdev/articuno",
    "preview": "https://fileharbor.heyatom.dev/v2/images/336db078-c00b-4135-85b0-dc93d6f06adb"
  },
  {
    "slug": "gatherly",
    "title": "Gatherly",
    "year": 2026,
    "current": false,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Event manager multi-tenant open source costruito con NestJS 10, Prisma ORM e PostgreSQL. Ogni client accede esclusivamente ai propri eventi tramite token, con supporto a eventi ricorrenti secondo lo standard RFC 5545 e pulizia automatica degli eventi passati.",
    "features": [
      "Multi-Tenant",
      "Gestione partecipanti",
      "Eventi ricorrenti",
      "Pulizia automatica"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL"
    ],
    "github": "https://github.com/heyatomdev/gatherly",
    "preview": "https://fileharbor.heyatom.dev/v2/images/a89676ac-41ec-40ad-adc8-7ae537b6d8cc"
  },
  {
    "slug": "beacon",
    "title": "Beacon",
    "year": 2025,
    "current": true,
    "kind": "personale",
    "client": "Progetto personale",
    "description": "Microservizio NestJS per il monitoraggio in tempo reale dei canali Twitch. Rileva eventi live, cambio gioco e variazioni di viewership, distribuisce notifiche via webhook multi-piattaforma (Discord e HTTP) con retry automatico e log di delivery, e persiste i dati su PostgreSQL via Prisma. REST API protetta da JWT Bastion e documentata con Swagger.",
    "features": [
      "Monitoraggio live",
      "Notifiche multi-piattaforma",
      "Analytics stream",
      "API sicura"
    ],
    "stack": [
      "NestJS",
      "Prisma",
      "TypeScript",
      "PostgreSQL",
      "Twitch API",
      "Swagger"
    ],
    "preview": "https://fileharbor.heyatom.dev/v2/images/94ba2630-6a1f-47b6-a5b5-bb194fa9d7fe"
  },
  {
    "slug": "kaish-dbd",
    "title": "DBD Builds",
    "year": 2025,
    "current": true,
    "kind": "cliente",
    "client": "Kaish79",
    "description": "Sito personale per lo streamer Kaish79 con un builder interattivo di build per Dead by Daylight. Frontend in Nuxt.js + Vuetify, backend NestJS con Prisma su PostgreSQL. Include autenticazione con ruoli, upload immagini via FileHarbor, tracciamento visualizzazioni e pannello admin per la gestione delle build in evidenza.",
    "features": [
      "Build builder completo",
      "Sistema utenti e ruoli",
      "Upload immagini via FileHarbor",
      "Build in evidenza e metriche",
      "Wiki completa di gioco",
      "Traduzione completa",
      "Tempi di attesa lobby",
      "Mappe con callout e regni"
    ],
    "stack": [
      "Nuxt",
      "Vuetify",
      "NestJS",
      "Prisma",
      "TypeScript",
      "PostgreSQL"
    ],
    "website": "https://kaish-dbd.it",
    "preview": "https://fileharbor.heyatom.dev/v2/images/293f4c8b-7fa8-472f-92b3-027f5011cc99"
  },
  {
    "slug": "fileharbor",
    "title": "FileHarbor",
    "year": 2024,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Microservizio open source multi-tenant per la gestione degli upload di immagini, costruito con NestJS 10 e Prisma su PostgreSQL. Supporta conversione automatica in WebP con Sharp, ridimensionamento on-demand, album pubblici/privati con accesso token-based, autenticazione JWT + API key, job schedulati per l'ottimizzazione e rimozione EXIF, e documentazione Swagger auto-generata.",
    "features": [
      "Architettura multi-tenant",
      "Gestione immagini",
      "Sistema avatar",
      "Album pubblici e privati",
      "Ottimizzazione automatica",
      "Ridimensionamento on-demand",
      "Accesso sicuro",
      "Documentazione API"
    ],
    "stack": [
      "NestJS",
      "Prisma",
      "TypeScript",
      "PostgreSQL",
      "Node.js",
      "Swagger"
    ],
    "website": "https://fileharbor.heyatom.dev/",
    "github": "https://github.com/andreacw5/fileharbor",
    "preview": "https://fileharbor.heyatom.dev/v2/images/f2c695d8-7d1a-4131-b1b5-0cc2376d38d9"
  },
  {
    "slug": "emt-links",
    "title": "Element Gaming Links",
    "year": 2023,
    "current": false,
    "kind": "cliente",
    "client": "Element Gaming ASD",
    "description": "Landing page personalizzata in stile Linktree per Element Gaming, costruita con Nuxt.js e SSR abilitato. Aggrega in un'unica pagina tutti i link rilevanti del brand — social, comunicati e risorse — con personalizzazione grafica completa e caricamento rapido.",
    "features": [
      "Gestione dei link",
      "Profili social integrati",
      "Personalizzazione brand"
    ],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX",
      "Sass"
    ],
    "website": "https://links.element-gaming.eu",
    "preview": "https://fileharbor.heyatom.dev/v2/images/7acfe6a7-6da0-4782-9b40-1a5952496855"
  },
  {
    "slug": "nuxt-vuetify-template",
    "title": "Nuxt Starter Template",
    "year": 2023,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Template open source per avviare rapidamente progetti Nuxt 4 con Vuetify 3. Include TypeScript, Pinia, i18n (it/en), SEO ottimizzato con @nuxtjs/seo, tema chiaro/scuro, app bar responsive e un'architettura modulare pronta alla personalizzazione.",
    "features": [
      "Stack moderno: Nuxt 4 + Vuetify 3",
      "Internazionalizzazione",
      "UI pre-configurata",
      "SEO e bot",
      "Architettura modulare"
    ],
    "stack": [
      "Nuxt",
      "Vuetify",
      "TypeScript"
    ],
    "github": "https://github.com/andreacw5/nuxt-template",
    "preview": "https://fileharbor.heyatom.dev/v2/images/0ba29d26-9fd2-4df9-94e6-bb8ff28e225e"
  },
  {
    "slug": "puma-arts",
    "title": "Studio Arte Puma",
    "year": 2023,
    "current": true,
    "kind": "cliente",
    "client": "Studio Arte Puma",
    "description": "Sito web personale per l'artista Emanuele Puma, realizzato con Nuxt.js e Vuetify. Vetrina pulita e performante per opere, progetti e collaborazioni, con galleria immagini ottimizzata e design su misura per l'identità visiva del brand artistico.",
    "features": [],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX"
    ],
    "website": "https://studioartepuma.it/",
    "github": "https://github.com/andreacw5/puma-arts",
    "preview": "https://fileharbor.heyatom.dev/v2/images/2f51a644-d100-477e-bed0-8bdb0b1e7d77"
  },
  {
    "slug": "ziplink",
    "title": "ZipLink",
    "year": 2022,
    "current": false,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Servizio open source per la generazione e gestione di URL brevi, costruito con NestJS e Prisma su PostgreSQL. Supporta codici personalizzati, tracciamento dei click, reindirizzamento fallback e autenticazione API. Dockerizzato con pipeline CI/CD via GitHub Actions e documentazione Swagger.",
    "features": [
      "Creazione URL brevi",
      "Gestione CRUD completa",
      "Reindirizzamento fallback",
      "Tracciamento dei click",
      "Autenticazione API",
      "Dockerizzato con CI/CD",
      "Documentazione API"
    ],
    "stack": [
      "NestJS",
      "Prisma",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Swagger"
    ],
    "github": "https://github.com/andreacw5/ziplink",
    "preview": "https://fileharbor.heyatom.dev/v2/images/cc05c219-257a-4e69-bed7-a88391358019"
  },
  {
    "slug": "alertconnector",
    "title": "AlertConnector",
    "year": 2021,
    "current": false,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Aggregatore open source di alert di emergenza della Protezione Civile Italiana, costruito con NestJS. Il servizio normalizza i feed ufficiali e li ri-espone tramite una REST API standardizzata, facilitando l'integrazione con applicazioni di terze parti.",
    "features": [
      "Aggregazione degli alert",
      "Servizio REST pubblico",
      "Formato standardizzato"
    ],
    "stack": [
      "NestJS",
      "TypeScript"
    ],
    "github": "https://github.com/prociv-sm/management-api",
    "preview": "https://fileharbor.heyatom.dev/v2/images/8c6df23e-88d1-4272-9165-2d3b481f93b7"
  },
  {
    "slug": "element",
    "title": "Element Gaming",
    "year": 2019,
    "current": false,
    "kind": "cliente",
    "client": "Element Gaming ASD",
    "description": "Piattaforma web per il network e-sport Element Gaming, sviluppata con Nuxt.js e Vuetify. Integra le API di Twitch per il monitoraggio in tempo reale degli streamer del network, con dashboard per team, eventi, news e un marketplace interno per gli streamer.",
    "features": [
      "Monitoraggio in tempo reale",
      "Integrazione Twitch API",
      "Dashboard team e streamer",
      "Backend Node.js performante"
    ],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX",
      "Sass"
    ],
    "website": "https://element-gaming.eu",
    "preview": "https://fileharbor.heyatom.dev/v2/images/6cccdde4-29b6-4cae-80be-f943b0105e10"
  },
  {
    "slug": "prociv",
    "title": "Protezione Civile Settimo Milanese",
    "year": 2019,
    "current": false,
    "kind": "cliente",
    "client": "Protezione Civile di Settimo Milanese",
    "description": "Sito web istituzionale per la Protezione Civile di Settimo Milanese, sviluppato con Nuxt.js e Vuetify. Vetrina digitale delle attività, del personale e delle attrezzature dell'associazione, con una sezione aggiornamenti di emergenza in tempo reale tramite integrazione backend NestJS.",
    "features": [
      "Aggiornamenti di emergenza in tempo reale",
      "Attività ed eventi dell'associazione",
      "Integrazione sistemi di allerta",
      "Interfaccia accessibile e mobile-first"
    ],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX"
    ],
    "website": "https://procivsettimomi.it",
    "github": "https://github.com/prociv-sm/website",
    "preview": "https://fileharbor.heyatom.dev/v2/images/3e7de746-fc49-4d59-83e2-12ef0fdedabe"
  },
  {
    "slug": "gymtrack",
    "title": "Gym Track",
    "year": 2018,
    "current": false,
    "kind": "cliente",
    "client": "Personal trainer",
    "description": "Applicazione web per la gestione remota dei clienti di un personal trainer, con backend Node.js e frontend HTML/CSS/JS. Include profili cliente, pianificazione sessioni, piani di esercizi personalizzati, monitoraggio progressi e chat integrata.",
    "features": [
      "Gestione clienti",
      "Pianificazione sessioni",
      "Assegnazione esercizi",
      "Monitoraggio progressi",
      "Chat integrata"
    ],
    "stack": [
      "Node.js",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "preview": "https://fileharbor.heyatom.dev/v2/images/147bbcaa-cdb3-4a21-8996-76eb6fcb004e"
  },
  {
    "slug": "alirdb",
    "title": "ALIRDB",
    "year": 2017,
    "current": false,
    "kind": "cliente",
    "client": "ALIR Community",
    "description": "Portale web per la consultazione in tempo reale dei dati di gioco personali su Arma 3: veicoli posseduti, armi, ruoli, incarichi e saldo bancario in-game. Interfaccia JavaScript che legge i dati esposti dall'API del server dedicato della community ALIR.",
    "features": [
      "Dashboard dati personali",
      "Monitoraggio veicoli",
      "Ruoli e specializzazioni",
      "Conti bancari in-game"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "github": "https://github.com/andreacw5/ALIRDB",
    "preview": "https://fileharbor.heyatom.dev/v2/images/6dc7d8e3-1298-4510-8650-f23dfb36e534"
  },
  {
    "slug": "alircommunity",
    "title": "ALIR Community",
    "year": 2016,
    "current": false,
    "kind": "cliente",
    "client": "ALIR Community",
    "description": "Sito web e forum per la community ALIR di Arma 3, realizzato con HTML, CSS, JavaScript e PHP. Piattaforma di discussione e supporto dedicata al server Altis Life dell'associazione, con gestione degli utenti e dei contenuti.",
    "features": [],
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP"
    ],
    "preview": "https://fileharbor.heyatom.dev/v2/images/b13e0902-19ae-4e51-8166-8247ac89153d"
  }
]
