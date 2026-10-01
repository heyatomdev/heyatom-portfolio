// Fonte: website4/content/projects/*.md (IT). Rigenera da lì se cambiano.
import { worksEn } from "./works.en.ts"
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
  /** Screenshot; every entry in `projects` has one. */
  preview?: string
  /** Screenshot gallery for the detail page. */
  images?: { image: string; title: string }[]
  /**
   * platform: the shared services every client project is built on.
   * tool: developer tooling, listed apart as a compact row.
   * Neither: a project in the main list.
   */
  group?: 'platform' | 'tool'
  /** Platform only: what the service does, in a client's words. */
  role?: string
  /** One-line summary for the platform and tools lists. */
  line?: string
}

export const works: Work[] = [
  {
    "slug": "herald",
    "group": "platform",
    "role": "Email",
    "line": "Le email del tuo sito arrivano: nuovi tentativi automatici, storico delle consegne con reinvio, newsletter settimanali o mensili per lingua.",
    "title": "Herald",
    "year": 2026,
    "current": true,
    "kind": "personale",
    "client": "Progetto personale",
    "description": "Servizio email multi-tenant su Brevo: invii transazionali con retry e classificazione degli errori, chiave di idempotenza contro i doppi invii, log di consegna con reinvio e retention separata dei corpi, newsletter per frequenza e lingua con webhook di disiscrizione firmati. Configurazione per tenant cifrata AES-256-GCM, accesso via JWT di Bastion.",
    "features": [
      "Nuovi tentativi senza doppi invii",
      "Storico e reinvio",
      "Newsletter per lingua"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Brevo"
    ]
  },
  {
    "slug": "bastion",
    "group": "platform",
    "role": "Accessi e utenti",
    "line": "Login con password o social, verifica in due passaggi, ruoli e registro delle attività. Tutti gli altri servizi riconoscono i tuoi utenti passando da qui.",
    "title": "Bastion",
    "year": 2026,
    "current": true,
    "kind": "personale",
    "client": "Progetto personale",
    "description": "Identity provider interno dell'ecosistema HeyAtom: emette JWT RS256 contestuali all'app, così ogni servizio valida l'identità in locale, senza chiamate per ogni richiesta e senza database utenti duplicati. OAuth, 2FA, multi-tenant e audit centralizzato.",
    "features": [
      "Google, Discord e Twitch",
      "Verifica in due passaggi",
      "Ruoli per app e organizzazione",
      "Sessioni e registro attività"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL"
    ]
  },
  {
    "slug": "articuno",
    "group": "platform",
    "role": "Contenuti e commenti",
    "line": "Articoli, categorie e traduzioni, con commenti moderati in automatico: parole vietate, segnalazioni, shadow ban.",
    "title": "Articuno",
    "year": 2026,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Microservizio CMS multi-tenant costruito con NestJS, Prisma e PostgreSQL. Gestisce articoli, commenti e utenti con isolamento completo per tenant, moderazione automatica tramite lista di parole vietate e soglie di segnalazione, consegna asincrona di webhook con pattern outbox e semantica exactly-once.",
    "features": [
      "Articoli multilingua",
      "Moderazione automatica",
      "Webhook firmati"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL"
    ],
    "github": "https://github.com/heyatomdev/articuno",
    "preview": "https://fileharbor.heyatom.dev/v2/images/336db078-c00b-4135-85b0-dc93d6f06adb",
    "images": [
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/336db078-c00b-4135-85b0-dc93d6f06adb",
        "title": "Homepage"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/d2daf068-6309-4a4e-84b2-12cdad857da3",
        "title": "Elenco articoli"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/ca6ac13d-7010-4b7b-9c77-707aa970b594",
        "title": "Dettaglio articolo"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/3f3fa0c5-e3b6-4e13-840b-9082fb67d845",
        "title": "Traduzione di un articolo nell'editor"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/885f8de8-77d6-4d3a-b760-0aba96deffc8",
        "title": "Elenco categorie"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/2c38c3af-61f0-4b07-a8d0-00e154527249",
        "title": "Dettaglio categoria"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/b5dc8945-209d-4288-a8c8-9544bab92e2b",
        "title": "Elenco tag"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/b7f0806f-de8b-4809-804b-da0b594a95da",
        "title": "Parole vietate"
      }
    ]
  },
  {
    "slug": "gatherly",
    "group": "platform",
    "role": "Eventi",
    "line": "Eventi anche ricorrenti e in più lingue, con categorie, tag e partecipanti, pure senza account.",
    "title": "Gatherly",
    "year": 2026,
    "current": false,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Event manager multi-tenant open source costruito con NestJS 10, Prisma ORM e PostgreSQL. Ogni client accede esclusivamente ai propri eventi tramite token, con supporto a eventi ricorrenti secondo lo standard RFC 5545 e pulizia automatica degli eventi passati.",
    "features": [
      "Ricorrenze standard iCal",
      "Eventi multilingua",
      "Partecipanti con o senza account"
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
    "slug": "sgweb",
    "title": "Tai Chi Sesto",
    "year": 2026,
    "current": true,
    "kind": "cliente",
    "client": "Federico Liuzzi",
    "description": "Il sito dei corsi di Tai Chi e Qi Gong di Federico Liuzzi, insegnante nel lignaggio di Lo Spazio del Tao, a Sesto San Giovanni e Cinisello Balsamo. Presenta la pratica, le sedi con orari e indicazioni, gli insegnanti, e si scrive direttamente a Federico via email o WhatsApp.",
    "features": [
      "Italiano e inglese",
      "Sedi, orari e come arrivare",
      "Mappa caricata solo su consenso",
      "Contatto diretto via WhatsApp",
      "SEO e anteprime di condivisione"
    ],
    "stack": [
      "Nuxt",
      "Vuetify",
      "TypeScript"
    ],
    "website": "https://taichisesto.it/",
    "preview": "/shots/sgweb/1.webp",
    "images": [
      {
        "image": "/shots/sgweb/1.webp",
        "title": "Homepage"
      },
      {
        "image": "/shots/sgweb/2.webp",
        "title": "La pratica"
      },
      {
        "image": "/shots/sgweb/3.webp",
        "title": "Sedi"
      },
      {
        "image": "/shots/sgweb/4.webp",
        "title": "Insegnanti"
      },
      {
        "image": "/shots/sgweb/5.webp",
        "title": "Corsi e orari"
      }
    ]
  },
  {
    "slug": "beacon",
    "title": "Beacon",
    "year": 2025,
    "current": true,
    "kind": "personale",
    "client": "Progetto personale",
    "description": "Tiene d'occhio i canali Twitch e avvisa quando qualcuno va in live, cambia gioco o cambiano gli spettatori: le notifiche arrivano su Discord o su qualsiasi altro sistema, con nuovi tentativi automatici se qualcosa non passa. Ogni live resta salvata, così le statistiche si leggono anche nel tempo.",
    "features": [
      "Monitoraggio live",
      "Notifiche multi-piattaforma",
      "Statistiche delle live",
      "API protetta"
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
    "description": "Il sito dello streamer Kaish79, costruito attorno a un costruttore di build per Dead by Daylight. Gli utenti si registrano, creano e condividono le proprie build; Kaish mette in evidenza le migliori dal pannello di amministrazione e vede quante volte vengono aperte. Intorno, una wiki completa del gioco, tutta tradotta.",
    "features": [
      "Costruttore di build completo",
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
    "website": "https://dbd-builds.it",
    "preview": "/shots/kaish-dbd/1.webp",
    "images": [
      {
        "image": "/shots/kaish-dbd/1.webp",
        "title": "Homepage"
      },
      {
        "image": "/shots/kaish-dbd/2.webp",
        "title": "Kaish Top Builds"
      },
      {
        "image": "/shots/kaish-dbd/3.webp",
        "title": "Build della community"
      },
      {
        "image": "/shots/kaish-dbd/4.webp",
        "title": "Generatore di build casuali"
      },
      {
        "image": "/shots/kaish-dbd/5.webp",
        "title": "Killer"
      },
      {
        "image": "/shots/kaish-dbd/6.webp",
        "title": "Sopravvissuti"
      },
      {
        "image": "/shots/kaish-dbd/7.webp",
        "title": "Perk"
      },
      {
        "image": "/shots/kaish-dbd/8.webp",
        "title": "Add-on"
      },
      {
        "image": "/shots/kaish-dbd/9.webp",
        "title": "Mappe"
      },
      {
        "image": "/shots/kaish-dbd/10.webp",
        "title": "Tempi di attesa"
      },
      {
        "image": "/shots/kaish-dbd/11.webp",
        "title": "Articoli"
      },
      {
        "image": "/shots/kaish-dbd/12.webp",
        "title": "Wiki"
      },
      {
        "image": "/shots/kaish-dbd/13.webp",
        "title": "Profilo utente"
      }
    ]
  },
  {
    "slug": "fileharbor",
    "group": "platform",
    "role": "Immagini e video",
    "line": "Carica, ottimizza e serve immagini e video: WebP automatico, ridimensionamento al volo, avatar e album pubblici o privati.",
    "title": "FileHarbor",
    "year": 2023,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Microservizio open source multi-tenant per la gestione degli upload di immagini, costruito con NestJS 10 e Prisma su PostgreSQL. Supporta conversione automatica in WebP con Sharp, ridimensionamento on-demand, album pubblici/privati con accesso token-based, autenticazione JWT + API key, job schedulati per l'ottimizzazione e rimozione EXIF, e documentazione Swagger auto-generata.",
    "features": [
      "WebP e ridimensionamento",
      "Avatar e album",
      "Video con anteprima"
    ],
    "stack": [
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Sharp"
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
    "description": "Una pagina sola con tutti i link di Element Gaming: social, comunicati e risorse, nella grafica del brand. L'idea di Linktree, ma su un dominio di Element.",
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
    "preview": "/shots/emt-links/1.webp",
    "images": [
      {
        "image": "/shots/emt-links/1.webp",
        "title": "Homepage"
      }
    ]
  },
  {
    "slug": "nuxt-vuetify-template",
    "group": "tool",
    "line": "Il punto di partenza dei miei progetti Nuxt: Vuetify, TypeScript, Pinia, i18n e SEO già configurati.",
    "title": "Nuxt Starter Template",
    "year": 2023,
    "current": true,
    "kind": "open-source",
    "client": "Progetto open source",
    "description": "Template open source per avviare rapidamente progetti Nuxt 4 con Vuetify 3. Include TypeScript, Pinia, i18n (it/en), SEO ottimizzato con @nuxtjs/seo, tema chiaro/scuro, app bar responsive e un'architettura modulare pronta alla personalizzazione.",
    "features": [
      "Nuxt 4 e Vuetify 3",
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
    "client": "Emanuele Puma",
    "description": "La vetrina di Emanuele Puma, pittore e scultore. Le opere sono disposte come un percorso: dalla pittura figurativa all'astratto, dalle copie dei maestri in grafite e pastello fino alla terracotta. Pensato per chi arriva dalla bio di Instagram con il telefono: la prima schermata mostra già un quadro e ogni opera ha la sua pagina con tecnica e misure.",
    "features": [
      "Galleria a percorso per categoria",
      "Pagina per ogni opera con tecnica e misure",
      "Immagini ridimensionate al volo",
      "Pagine prerenderizzate",
      "Contatto diretto via email e Instagram"
    ],
    "stack": [
      "Nuxt",
      "GSAP",
      "FileHarbor",
      "Docker"
    ],
    "website": "https://studioartepuma.it/",
    "github": "https://github.com/andreacw5/puma-arts",
    "preview": "/shots/puma-arts/1.webp",
    "images": [
      {
        "image": "/shots/puma-arts/1.webp",
        "title": "Homepage"
      },
      {
        "image": "/shots/puma-arts/2.webp",
        "title": "Su di me"
      },
      {
        "image": "/shots/puma-arts/3.webp",
        "title": "Dettaglio opera"
      }
    ]
  },
  {
    "slug": "ziplink",
    "group": "tool",
    "line": "Accorciatore di URL con codici personalizzati, conteggio dei click e API documentata.",
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
    "group": "tool",
    "line": "Raccoglie gli avvisi di emergenza della Protezione Civile e li espone con un'API REST standard, pronta da integrare.",
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
    "description": "La piattaforma del network e-sport Element Gaming: team, giocatori, eventi e news, più lo stato live degli streamer letto dalle API di Twitch. Gli streamer hanno una loro dashboard e un marketplace interno.",
    "features": [
      "Monitoraggio in tempo reale",
      "Integrazione Twitch API",
      "Dashboard team e streamer",
      "Backend Node.js"
    ],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX",
      "Sass"
    ],
    "website": "https://element-gaming.eu",
    "preview": "/shots/element/1.webp",
    "images": [
      {
        "image": "/shots/element/1.webp",
        "title": "Homepage"
      },
      {
        "image": "/shots/element/2.webp",
        "title": "Elenco giocatori"
      },
      {
        "image": "/shots/element/3.webp",
        "title": "Dettaglio giocatori"
      },
      {
        "image": "/shots/element/4.webp",
        "title": "Elenco streamer"
      },
      {
        "image": "/shots/element/5.webp",
        "title": "Dettaglio streamer"
      },
      {
        "image": "/shots/element/6.webp",
        "title": "Elenco delle sezioni"
      },
      {
        "image": "/shots/element/7.webp",
        "title": "Elenco dei team"
      },
      {
        "image": "/shots/element/8.webp",
        "title": "Dettaglio del team"
      },
      {
        "image": "/shots/element/9.webp",
        "title": "Elenco degli eventi"
      },
      {
        "image": "/shots/element/10.webp",
        "title": "Dettaglio evento"
      },
      {
        "image": "/shots/element/11.webp",
        "title": "Elenco delle news"
      },
      {
        "image": "/shots/element/12.webp",
        "title": "Dettaglio news"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/e0bd7543-362b-4c58-bc8c-5680e7ceb923",
        "title": "Dashboard degli streamer"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/729fbb1f-15e8-4b52-b786-3d6da9c2bcc5",
        "title": "Marketplace degli streamer"
      }
    ]
  },
  {
    "slug": "prociv",
    "title": "Protezione Civile Settimo Milanese",
    "year": 2019,
    "current": false,
    "kind": "cliente",
    "client": "Protezione Civile di Settimo Milanese",
    "description": "Il sito della Protezione Civile di Settimo Milanese: attività, volontari, sede e mezzi del gruppo, più una sezione con gli aggiornamenti di emergenza in tempo reale collegata ai sistemi di allerta.",
    "features": [
      "Aggiornamenti di emergenza in tempo reale",
      "Attività ed eventi dell'associazione",
      "Integrazione sistemi di allerta",
      "Pensato prima per il telefono"
    ],
    "stack": [
      "Nuxt",
      "Node.js",
      "Vuetify",
      "NGINX"
    ],
    "website": "https://procivsettimomi.it",
    "github": "https://github.com/prociv-sm/website",
    "preview": "https://fileharbor.heyatom.dev/v2/images/3e7de746-fc49-4d59-83e2-12ef0fdedabe",
    "images": [
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/3e7de746-fc49-4d59-83e2-12ef0fdedabe",
        "title": "Homepage"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/144010e3-811d-4673-9c95-12ed830b424f",
        "title": "Le attività del gruppo"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/46fbfa7e-49c8-4078-b2bb-b61e94e11a7e",
        "title": "La sede e i contatti"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/36c10583-fce9-447b-9017-4d869d946079",
        "title": "I volontari"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/81f5a5ef-6320-4fe1-a3f1-641a061c7563",
        "title": "I mezzi del gruppo"
      }
    ]
  },
  {
    "slug": "gymtrack",
    "title": "Gym Track",
    "year": 2018,
    "current": false,
    "kind": "cliente",
    "client": "Personal trainer",
    "description": "Web app per un personal trainer che segue i clienti a distanza: profili, calendario delle sessioni, schede di esercizi su misura, progressi e chat.",
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
    "description": "Portale per i giocatori della community ALIR su Arma 3: ognuno consulta in tempo reale i propri veicoli, armi, ruoli, incarichi e il saldo in gioco, letti dall'API del server dedicato.",
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
    "preview": "https://fileharbor.heyatom.dev/v2/images/6dc7d8e3-1298-4510-8650-f23dfb36e534",
    "images": [
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/ba35ea74-37ea-4183-93c3-22fc2fc1e901",
        "title": "Homepage"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/d461d7e8-4620-44ce-8bb6-c84346af8f96",
        "title": "Scheda del giocatore"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/04f8e603-874e-4951-b0ce-0942c9578652",
        "title": "Veicoli del giocatore"
      },
      {
        "image": "https://fileharbor.heyatom.dev/v2/images/46397a26-b684-4e5e-9b2b-ac9899937e03",
        "title": "Giocatori per fazione"
      }
    ]
  },
  {
    "slug": "alircommunity",
    "title": "ALIR Community",
    "year": 2016,
    "current": false,
    "kind": "cliente",
    "client": "ALIR Community",
    "description": "Sito e forum della community ALIR, per il server Altis Life di Arma 3: discussioni, supporto ai giocatori e gestione di utenti e contenuti.",
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

export const projects = works.filter(w => !w.group)
const bySlug = (slug: string) => works.find(w => w.slug === slug)!
// Services a client project plugs into, in reading order on /works…
export const platform = ['fileharbor', 'articuno', 'gatherly', 'herald'].map(bySlug)
// …and the one they all authenticate through.
export const platformBase = bySlug('bastion')
export const tools = works.filter(w => w.group === 'tool')

// English text from works.en.ts over the Italian source; stack, links and images stay shared.
export function localize(w: Work, lang: string): Work {
  const en = lang === 'en' ? worksEn[w.slug] : undefined
  if (!en) return w
  const { images, ...rest } = en
  return { ...w, ...rest, images: w.images?.map((im, i) => ({ ...im, title: images?.[i] ?? im.title })) }
}
