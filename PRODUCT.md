# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Piccoli clienti diretti** (primario): associazioni, professionisti, piccole realtà locali che cercano una persona affidabile per un sito, una web app o un'integrazione. Arrivano da passaparola, LinkedIn o da un progetto visto in giro. Job: capire in pochi secondi cosa fa Andrea, se è la persona giusta, e scrivergli una mail.
- **Recruiter e tech lead** (secondario): valutano il profilo per collaborazioni o assunzioni. Job: leggere esperienza, stack, progetti reali; proseguire su LinkedIn/GitHub.
- Colleghi dev, community gaming e non-profit: pubblico terziario, non guida decisioni.

## Product Purpose

heyatom.dev è il sito personale di Andrea Tombolato: portfolio + biglietto da visita freelance. Deve far conoscere la persona e il suo lavoro e, senza forzare, portare 1-2 clienti l'anno a scrivere. Successo: un piccolo cliente scrive a `hey@heyatom.dev`; un recruiter esce con un'idea chiara di stack, esperienza e serietà.

## Positioning

Una persona sola, non uno studio. "HeyAtom"/"atom" è il nome d'arte (mix nome+cognome) usato online al posto del nome reale; **non è un'azienda, non ha partita IVA, non deve mai sembrare una software house**. Ciò che nessun "studio" può copiare: dieci anni di full-stack in ambito sanitario (Medas Solutions, Java + Node.js, sistemi dove continuità e affidabilità contano), un catalogo di progetti personali reali e mantenuti (Bastion, Herald, Articuno, FileHarbor, Beacon, Gatherly…), consiglio direttivo Element Gaming, comunicazione pubblica per la Protezione Civile. Craft + carattere: "Code meets personality".

## Operating Context

- Il visitatore cliente spesso non è tecnico: legge da telefono, confronta con 2-3 nomi ricevuti per passaparola, decide in base a fiducia percepita e chiarezza.
- Il recruiter legge da desktop, scorre veloce, cerca stack, anni, contesto lavorativo.
- Canale di conversione unico: `mailto:hey@heyatom.dev` (CTA in header e banda di chiusura della home). Nessun form, nessun booking, nessun preventivo online, nessun listino.
- Bilingue IT (default) / EN.
- Flag `NUXT_PUBLIC_FREELANCE_AVAILABLE` governa il badge disponibilità freelance.

## Capabilities and Constraints

- Nuxt 4 + CSS puro con token + GSAP + `@nuxtjs/i18n`; niente Vuetify, niente CMS. Dark default (a prescindere dall'OS), light via toggle in header. Deploy SSR Node in Docker.
- Contenuti in `app/data/`: `works.ts` (progetti IT, fonte) + `works.en.ts` (override EN), `uses.ts`. Percorso, volontariato, stack e viaggi della home sono in `app/pages/index.vue` + `i18n/locales/*.json`.
- Pagine: home (hero, offerte, percorso, stack, viaggi, chiusura), `/works` + `/works/[slug]`, `/uses`. Viaggi e volontariato vivono come sezioni della home, non come pagine.
- Vincoli visivi pinnati dall'utente: sfondo antracite scuro `#1e201e` (scelto il 30/09/2026 al posto del precedente verde-nero, giudicato troppo spento), verde brand `#00a86b` (+ `#007a4d`, `#33bf89`), Manrope + JetBrains Mono. Il restyle non deve allontanarsi da sfondo e colori; sfondo e testi restano neutri, non tinti di verde.
- Non decisi: eventuale pagina "servizi"; se e come mostrare fascia di prezzo (oggi nessuna).

## Brand Commitments

- Nome: **Andrea Tombolato**, alias **HeyAtom** / "atom". Il nome reale è presente (about, footer, SEO) ma il sito è firmato HeyAtom.
- **Voce: prima persona singolare** ("Costruisco…"). Mai "noi", mai "studio", mai "team". Tono caldo, diretto, un po' spiritoso; "tu" al cliente.
- Marchio: mano "Vulcan salute" nel fumetto (`public/favicon.svg`, usato anche in header, footer e hero). Non ridisegnare.
- Motivo esagoni (`public/assets/hex.svg`) decorativo.
- Tagline: "Code meets personality".
- **Restyle 2026-09 = raffinamento del mondo visivo esistente** (dark, verde, header pill, hero con orb, card in vetro), non sostituzione. Deciso dall'utente il 22/09/2026 dopo un round di direzione: "non cerco un remake brutale, cerco un raffinamento di questo che dica wao".

## Evidence on Hand

- Progetti reali con descrizione, stack, feature, link e screenshot: `app/data/works.ts` (screenshot su FileHarbor o in `public/shots/`).
- Percorso dal 2016 (Medas Solutions, Element Gaming) con loghi in `public/assets/logos/`: `path` in `app/pages/index.vue`, copy in `i18n/locales/*.json` → `home.path`.
- Volontariato Protezione Civile dal 2015: stesso blocco, `home.path.prociv*`.
- Foto viaggi personali su FileHarbor (`travels` in `app/pages/index.vue`) usabili come materiale "persona".
- CV PDF: `public/assets/cv-tombolato.pdf`.
- Social: GitHub `andreacw5`, LinkedIn `atombolato`.
- **Assenti, non inventare:** testimonianze, loghi/nomi di clienti freelance, numeri di clienti, prezzi, certificazioni.

## Product Principles

1. **Una persona, non un'azienda.** Ogni scelta di copy e layout deve reggere la domanda "sembra una software house?" con un no.
2. **Prova, non promessa.** Progetti, esperienza e volontariato sono le uniche prove; il sito le mostra, non le sostituisce con claim.
3. **Il cliente non tecnico capisce in 5 secondi** cosa fa Andrea e come scrivergli; il recruiter trova stack ed esperienza senza scavare.
4. **Brand costante, stile libero.** Verde, sfondo scuro e font sono fissi; tutto il resto può cambiare.
5. **Carattere misurato.** Personalità sì (viaggi, gaming, volontariato), ma mai sopra il lavoro. Eccezione decisa dall'utente il 30/09/2026: il movimento può essere ricco (GSAP, scroll, pin), purché il contenuto resti leggibile e con reduced motion statico.
