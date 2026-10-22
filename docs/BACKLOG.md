# heyatom-portfolio — backlog

**Ultimo aggiornamento**: 2026-10-22

Idee senza piano. Quando una parte, diventa `plans/NN-slug.md` e qui resta solo il link.
Vincoli da rispettare in ogni voce: [PRODUCT.md](PRODUCT.md) (una persona, non un'azienda;
solo `mailto:`, niente form né backend; niente testimonianze, prezzi o clienti inventati) e
[DESIGN.md](DESIGN.md). I problemi di qualità già noti (touch target, drift dei token, layout)
non stanno qui: sono nella critique in `.impeccable/critique/`.

Ordine consigliato: **B-1 → B-2 → B-3 → B-5**. Sono le voci che aiutano il cliente non tecnico
a scrivere (l'obiettivo del sito) e costano poco; poi B-4 per misurare se funzionano.

| # | Idea | Per chi | Valore | Costo | Blocchi |
|---|---|---|---|---|---|
| B-1 | Copia indirizzo email accanto al `mailto:` | cliente | alto | ~1h | — |
| B-2 | Mail precompilata per tipo di richiesta | cliente | alto | ~2h | — |
| B-3 | Sezione "come lavoro" (cosa succede dopo la mail) | cliente | alto | ~0,5d | testo da scrivere |
| B-4 | Analytics senza cookie, con evento sui click di contatto | Andrea | medio-alto | ~0,5d | servizio da scegliere, CSP |
| B-5 | Case study per 2-3 progetti cliente | cliente, recruiter | alto | ~1d + testo | testo da scrivere |
| B-6 | Disponibilità con data al posto del booleano | cliente | medio | ~1h | — |
| B-7 | Filtro di `/works` per tipo e stack | recruiter | medio | ~0,5d | — |
| B-8 | Precedente/successivo nella pagina progetto | tutti | medio | ~1h | — |
| B-9 | Pagine dettaglio per i servizi della piattaforma | recruiter | medio | ~0,5d | screenshot Meridian |
| B-10 | Versione web del CV su `/cv` | recruiter | medio | ~0,5d | — |
| B-11 | Dati strutturati per progetti e breadcrumb | SEO | medio | ~2h | — |
| B-12 | Pagina `/now` | tutti | basso-medio | ~2h + testo | — |
| B-13 | vCard scaricabile (biglietto da visita) | cliente | basso-medio | ~1h | — |
| B-14 | Stato live dei servizi su `/works` | recruiter | basso | ~0,5d | API di status.heyatom.dev |
| B-15 | View transition tra lista e progetto | tutti | basso | ~0,5d | — |
| B-16 | Testimonianze | cliente | alto | ~0,5d | **servono testimonianze vere** |

---

## B-1 · Copia indirizzo email

Il `mailto:` è l'unico canale, ma su un desktop senza client mail configurato (comune, chi usa
Gmail da browser) il click non fa niente e il visitatore se ne va. Accanto al bottone della banda
di chiusura e del footer: bottone "copia" con `navigator.clipboard.writeText`, conferma breve
in `aria-live`. Nessuna dipendenza.

## B-2 · Mail precompilata per tipo

Nella chiusura della home, 3 scorciatoie ("un sito", "una web app", "un'integrazione") che
aprono il `mailto:` con oggetto e 2-3 domande nel corpo (cosa vi serve, per quando, avete già
qualcosa online). Toglie al cliente il problema della pagina bianca e porta a mail più utili.
Stesso schema di `work.askSubject` nella pagina progetto. Testi in `it.json` e `en.json`.

## B-3 · Come lavoro

Risponde alla domanda del cliente non tecnico "e dopo che scrivo?": prima chiacchierata, proposta,
sviluppo con anteprime, consegna, manutenzione; chi possiede codice e dominio; cosa serve da
parte sua. Sezione della home tra offerte e percorso o mini-pagina: va deciso (in PRODUCT.md la
pagina "servizi" è ancora "non decisa"). Niente prezzi finché non c'è una decisione. Prima
persona, mai "il nostro processo".

## B-4 · Analytics

Oggi non c'è modo di sapere se il sito porta mail, quali progetti vengono aperti, quanti arrivano
in EN. Umami o Plausible self-hosted (niente banner cookie), evento custom sui click `mailto:` e
sul PDF del CV. Va aggiornata la CSP e citato nel footer. Da fare prima di giudicare B-2/B-3.

## B-5 · Case study

Le pagine progetto dicono cosa è stato fatto, non perché. Per 2-3 progetti cliente (es. sgweb,
puma-arts, prociv) un campo opzionale `story` in `works.ts` / `works.en.ts`: problema, scelte,
risultato concreto. È la "prova, non promessa" del principio 2. Il costo vero è il testo.

## B-6 · Disponibilità con data

`NUXT_PUBLIC_FREELANCE_AVAILABLE` è on/off. Un valore tipo `2027-01` permetterebbe "libero da
gennaio" invece di nascondere il badge: chi scrive sa già quando si può partire.

## B-7 · Filtro di `/works`

21 progetti in una lista sola. Filtri a chip per tipo (cliente / open source / personale) e per
stack principale, con stato nell'URL (`?kind=cliente`) così il link è condivisibile. Il recruiter
cerca "ha usato NestJS?", il cliente "ha fatto siti per gente come me?".

## B-8 · Precedente/successivo

La pagina progetto ha "simili" per stack, ma niente navigazione sequenziale: chi vuole scorrere
tutti i progetti torna ogni volta alla lista. Due link in fondo, prima della banda di contatto.

## B-9 · Pagine dei servizi della piattaforma

Bastion, Herald, Articuno, FileHarbor, Gatherly sono in `works.ts` con `description` e `stack`
completi, ma `[slug].vue` cerca solo in `projects`: non hanno pagina. Per un recruiter sono il
lavoro più interessante. Estendere la ricerca a `works`, adattare la pagina se manca `preview`
(screenshot da Meridian o diagramma), sitemap e og di conseguenza.

## B-10 · CV web

`cv/cv.html` esiste già come fonte. Servirlo su `/cv` (stile del sito, link al PDF) dà ai recruiter
una pagina linkabile e indicizzabile. Attenzione al vincolo in CLAUDE.md: il CV lo legge anche il
datore di lavoro attuale, quindi stesso testo del PDF, niente in più.

## B-11 · Dati strutturati

Oggi c'è solo `Person` in `app.vue`. Aggiungere `CreativeWork`/`SoftwareApplication` nelle pagine
progetto (autore = Person, `dateCreated`, `url`, `codeRepository`) e `BreadcrumbList`.

## B-12 · `/now`

Cosa sto facendo questo mese (progetti in corso, cosa studio, dove sono). Un file in `app/data/`
con data, IT/EN inline come `uses.ts`. Carattere misurato, utile come segnale "il sito è vivo".

## B-13 · vCard

Un `.vcf` statico in `public/` (nome, alias, email, sito, LinkedIn, GitHub) con link nel footer o
nella chiusura: "salva il contatto". Coerente con il sito come biglietto da visita, utile da
telefono.

## B-14 · Stato live dei servizi

`status.heyatom.dev` esiste già (link nel footer). Un pallino "operativo" sulle card della
piattaforma mostra che i servizi girano davvero in produzione. Richiede una chiamata server
(SSR con cache) o client: va visto cosa espone la status page.

## B-15 · View transition

Il motion può essere ricco (decisione 30/09/2026): la preview della lista che si trasforma
nell'immagine hero del progetto con la View Transitions API (Nuxt `experimental.viewTransition`).
Va verificata la convivenza con la page transition attuale e con GSAP; statico con reduced motion.

## B-16 · Testimonianze

Il segnale di fiducia più forte per un piccolo cliente, ma oggi non esistono e non vanno
inventate (PRODUCT.md, "Assenti"). Prima chiederle a 2-3 clienti dei progetti in `works.ts`;
solo quando ci sono il testo, un campo `quote` sul progetto.
