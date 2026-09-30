---
name: HeyAtom
description: Portfolio e biglietto da visita freelance di Andrea Tombolato. Code meets personality.
colors:
  green: "#00a86b"
  green-dark: "#007a4d"
  green-light: "#33bf89"
  bg: "#0d1412"
  surface: "#121c19"
  surface-2: "#1d2b27"
  surface-3: "#243630"
  ink: "#eaf5f1"
  ink-2: "#c5d8d1"
  ink-3: "#8fa89f"
  on-green: "#04140d"
  hair: "rgba(0, 168, 107, 0.16)"
  hair-strong: "rgba(0, 168, 107, 0.38)"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 5.8vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  display-index:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.3vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.06rem, 1.4vw, 1.2rem)"
    fontWeight: 450
    lineHeight: 1.6
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.93rem"
    fontWeight: 600
    lineHeight: 1
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0"
    fontFeature: "tnum"
rounded:
  sm: "12px"
  md: "14px"
  lg: "18px"
  xl: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(5rem, 11vw, 8.5rem)"
  max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.6rem"
  button-primary-active:
    backgroundColor: "{colors.green-dark}"
    textColor: "{colors.on-green}"
  button-ghost:
    backgroundColor: "rgba(0, 168, 107, 0.05)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.6rem"
  header-pill:
    backgroundColor: "rgba(18, 28, 25, 0.72)"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.45rem 0.45rem 0.9rem"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.9rem"
  nav-link-active:
    backgroundColor: "rgba(0, 168, 107, 0.12)"
    textColor: "{colors.ink}"
  filter:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1rem"
  filter-active:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "0.28rem 0.6rem"
  pick-tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.25rem 1.4rem 1.4rem"
  stack-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.6rem"
  screenshot:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
---

# Design System: HeyAtom

## Overview

**Creative North Star: "Il banco da lavoro di una persona sola"**

Il sito è un banco da lavoro, non una brochure d'agenzia. Fondo verde-nero quasi nero, una sola tinta satura usata come luce, pannelli appena sollevati tenuti insieme da hairline verdi da 1px. La prova sta nelle immagini: screenshot reali 16:9 dei progetti, messi accanto alla persona fin dal primo schermo. Il carattere entra misurato: la mano "Vulcan salute" nell'orb, il motivo esagoni in trasparenza, una striscia di foto di viaggio.

Densità media e ritmo lungo: sezioni separate da grandi vuoti verticali, contenuti organizzati in righe con hairline più che in griglie di card. Il verde illumina i punti che contano (CTA, anni, stato aperto, alone dell'orb) e non riempie superfici. Il mazzo di screenshot nell'hero resta il momento d'autore; attorno, un movimento ricco ma legato allo scroll e alla struttura (vedi Motion).

Rifiuti confermati: niente kicker/eyebrow sopra i titoli, niente testo in gradiente, niente card in vetro come decorazione. Il sito è solo dark (`color-scheme: dark`).

**Key Characteristics:**
- Fondo `bg` con griglia verde 56px al 4.5%, mascherata in un'ellisse dall'alto.
- Un verde, tre gradi: pieno per l'azione, scuro per il press, chiaro per testo e dati.
- Manrope stretto in negativo per tutti i titoli; JetBrains Mono solo per anni, stack e dati.
- Pill ovunque ci sia interazione (header, bottoni, filtri, chip); raggi 14–22px per i pannelli.
- Ombre nere a spread negativo per la profondità, alone verde solo su CTA primaria e orb.

## Colors

Una palette monocroma verde-nera con un solo accento saturo che si comporta come luce.

### Primary
- **Verde Atom** (`green`): bottone primario, filtro attivo, cerchio "+" della riga aperta, punto disponibilità, selezione testo, alone di orb e stage (sempre in rgba del verde).
- **Verde Profondo** (`green-dark`): stato `:active` del primario, gradiente della scrollbar.
- **Verde Menta** (`green-light`): link, anni e date in mono, nome del progetto aperto, "atom" nel wordmark, focus ring, bordo superiore degli anelli dell'orb.

### Neutral
- **Notte Verde** (`bg`): fondo di pagina, unico sfondo.
- **Pannello** (`surface`): pick, pannello stack, figure del mazzo, banda "next", tinta dell'header pill al 72%.
- **Pannello Rialzato** (`surface-2`): chip, pillole feature, placeholder immagini.
- **Pannello Alto** (`surface-3`): solo come fine del gradiente dell'orb.
- **Inchiostro** (`ink`): titoli e testo primario.
- **Inchiostro Tenue** (`ink-2`): paragrafi, lead, link del nav a riposo.
- **Inchiostro Spento** (`ink-3`): metadati, cliente, etichette di gruppo, footer, testo dei filtri conteggio.
- **Su Verde** (`on-green`): testo su qualsiasi fondo `green`.
- **Hairline** (`hair`) e **Hairline Forte** (`hair-strong`): tutti i bordi e i divisori; la forte per hover, screenshot e bottone ghost.

### Named Rules
**The Verde come Luce Rule.** Il verde pieno riempie solo il bottone primario, il filtro attivo e il "+" aperto. Altrove compare come testo (`green-light`), come hairline o come alone radiale in rgba; mai come fondo di sezione.

**The Hairline Rule.** Ogni separazione è una linea da 1px nel verde al 16% (38% in hover o per le immagini). Nessun bordo grigio, nessun divisore neutro.

## Typography

**Display Font:** Manrope (con system-ui, sans-serif), pesi 400–800
**Body Font:** Manrope, peso 450
**Label/Mono Font:** JetBrains Mono (con ui-monospace, SFMono-Regular), pesi 400 e 600

**Character:** Un grotesk geometrico caldo, stretto in negativo nei titoli fino a sembrare compatto e sicuro; il mono entra solo dove c'è un dato, per ricordare che dietro c'è uno sviluppatore.

### Hierarchy
- **Display** (800, `clamp(2.7rem, 5.8vw, 5rem)`, 1.02, -0.04em): h1 dell'hero. Il saluto "Ciao, sono Andrea." sta dentro l'h1 a 0.5em, peso 600, in `green-light`.
- **Display Index** (800, `clamp(3.5rem, 9vw, 6rem)`, 0.9, -0.05em): h1 delle pagine indice (`/works`), una parola.
- **Headline** (700, `clamp(2rem, 4.2vw, 3.25rem)`, 1.08, -0.03em, max 18ch): h2 di sezione, sempre una frase intera con punto. La banda di chiusura sale a `clamp(2.2rem, 4.8vw, 4rem)`, -0.04em, max 14ch.
- **Title** (700, `clamp(1.25rem, 2.3vw, 1.9rem)`, -0.03em): offerte, nomi progetto nel registro, pick. **Title sm** (700, 1.2rem, -0.02em): voci del percorso, pannello stack.
- **Lead** (450, `clamp(1.06rem, 1.4vw, 1.2rem)`, max 44ch, `ink-2`) e testo dei sec-head (1.05rem, max 46ch).
- **Body** (450, 1rem, 1.6): paragrafi in `ink-2`, max 52–62ch; `text-wrap: pretty` sui paragrafi, `balance` sui titoli.
- **Label** (600, 0.93rem, line-height 1): nav, filtri, bottoni compatti. I bottoni pieni usano 600 1rem.
- **Mono** (400, 0.76–0.9rem, letter-spacing 0, cifre tabulari): anni, intervalli ("2016 → oggi"), stack separati da " · ", conteggi dei filtri, intestazioni di colonna del registro, luogo e anno dei viaggi. Sempre in sentence case.

### Named Rules
**The Mono per i Dati Rule.** JetBrains Mono solo per anni, tag di stack, conteggi e dati tabellari. Mai per titoli, kicker, CTA o frasi; mai maiuscolo con tracking.

**The Titolo Stretto Rule.** Ogni titolo Manrope va da 700 a 800 con tracking negativo (da -0.02em a -0.05em, più grande più stretto). Nessun titolo leggero, nessun tracking positivo.

## Layout

Contenitore unico: larghezza massima `max` (1240px) centrata, padding laterale `gutter`. Le sezioni si separano con `section` in alto (`padding-top`), senza fondi alternati. Ogni sezione apre con un sec-head: h2 a sinistra, eventuale frase o link "Vedi tutti" allineati in basso a destra, `flex-wrap`.

Composizioni ricorrenti:
- **Hero** a due colonne (1.1fr / 0.9fr): copia a sinistra, mazzo a destra, riga dei fatti a tutta larghezza sotto con hairline superiore e tre colonne. Altezza `min(92svh, 60rem)`.
- **Pick**: tre progetti su griglia a 2 colonne. Il primo a tutta riga (screenshot 16:9 al 56%, testo centrato), gli altri due affiancati sotto come card quasi quadrate (screenshot 16:9 sopra, testo sotto). Mai celle che allungano lo screenshot oltre il 16:9.
- **Righe**: offerte (tre colonne 1.1/1/0.7 su baseline), percorso (colonna data 9.5rem + contenuto), registro lavori (5.5rem anno / nome / stack 0.8fr / 2.5rem "+"). Ogni riga è chiusa da hairline.
- **Percorso + stack**: 1.7fr / 1fr, il pannello stack è sticky a `top: 6.5rem`.
- **Striscia viaggi**: scroller orizzontale con snap, colonne `clamp(220px, 22vw, 300px)`, foto 4:5, pari sfalsate di 2.5rem.

Responsive:
- **≤900px**: tutto a una colonna. Il mazzo si centra a `min(86%, 520px)`; pick, offerte, percorso e chiusura si impilano; lo stack perde lo sticky; l'orb scende a 180px. Nel registro spariscono intestazioni di colonna e colonna stack (griglia 3.5rem / nome / 2.5rem), il dettaglio perde il rientro, il peek si spegne (anche con `hover: none`).
- **≤760px**: l'header mostra solo "Lavori" e il CTA; ancore e badge disponibilità spariscono.
- **≤560px**: fatti e percorso a una colonna, la striscia smette di sfalsare, i bottoni della chiusura vanno a tutta larghezza.

**The Righe non Card Rule.** Elenchi di cose omogenee (servizi, esperienze, progetti) sono righe separate da hairline, non griglie di card. Le card esistono solo dove c'è un'immagine da mostrare (pick) o un blocco laterale (stack).

## Elevation & Depth

Profondità ibrida: pannelli tonali (`surface` su `bg`) con hairline verde, più ombre nere morbide a spread negativo che staccano solo ciò che si solleva davvero (screenshot, peek, header). Il verde entra come luce emessa, mai come ombra grigia.

### Shadow Vocabulary
- **Screenshot** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,0.75), 0 8px 18px -8px rgba(0,0,0,0.5)`): figure del mazzo; varianti più semplici su peek (`0 30px 60px -20px rgba(0,0,0,0.8)`) e immagine del dettaglio (`0 24px 50px -24px rgba(0,0,0,0.8)`).
- **Header** (`box-shadow: 0 10px 30px -12px rgba(0,0,0,0.6)`): pill dell'header sticky.
- **Glow primario** (`box-shadow: 0 8px 24px -6px rgba(0,168,107,0.55)`, hover `0 14px 34px -8px rgba(0,168,107,0.7)`): solo il bottone primario pieno (nell'header è spento).
- **Glow pick** (`box-shadow: 0 24px 50px -24px rgba(0,168,107,0.45)`): pick in hover, insieme al lift di 4px.
- **Orb** (`box-shadow: inset 0 2px 30px rgba(0,168,107,0.14), 0 40px 80px -20px rgba(0,0,0,0.6), 0 0 80px rgba(0,168,107,0.16)`): orb e medaglia, con il drop-shadow verde sulla mano.

### Named Rules
**The Ombra Nera, Alone Verde Rule.** Le ombre strutturali sono nere e a spread negativo; l'alone verde appartiene solo al CTA primario, alla pick in hover e all'orb/medaglia.

**The Un Solo Vetro Rule.** Il `backdrop-filter` (blur 18px, saturate 1.3) esiste solo sull'header pill sticky, perché scorre sopra il contenuto. Nessun'altra superficie è in vetro.

## Shapes

Due famiglie di forma. Tutto ciò che si clicca per navigare o filtrare è una pill (999px): header, link del nav, bottoni, filtri, chip, pillole feature, badge disponibilità. I contenitori hanno angoli morbidi: 12px il peek, 14px screenshot, foto di viaggio, immagine di dettaglio e alone di riga, 18px pick e pannello stack, 22px la banda "next". I cerchi sono riservati al marchio (orb, medaglia, anelli) e al "+" del registro. Gli anelli dell'orb sono hairline circolari con un solo arco in `green-light` (e un secondo anello tratteggiato). Il motivo esagoni (`/assets/hex.svg`) compare solo nella banda di chiusura, al 12%, sfumato da destra.

## Components

### Buttons
Pill piene e sicure, con una freccia che scivola.
- **Shape:** pill (999px), `inline-flex`, gap 0.6rem, bordo 1px trasparente.
- **Primary:** fondo `green`, testo `on-green`, 600 1rem/1, padding 0.95rem 1.6rem, glow primario.
- **Hover / Focus:** lift -2px e glow più ampio (0.35s `ease-out`), l'icona trasla di 4px a destra; `:active` torna a 0 e scende a `green-dark`. Focus globale: outline 2px `green-light`, offset 3px.
- **Ghost:** testo `ink`, bordo `hair-strong`, fondo verde al 5%; in hover bordo `green` e fondo al 10%.
- **Compatto:** nell'header e nei link del dettaglio padding 0.7–0.75rem × 1.2rem, 0.93rem; nell'header senza glow.
- **Link freccia** ("Vedi tutti i lavori"): testo 600 `green-light` senza sottolineatura, freccia che trasla di 4px.

### Chips
- **Stack chip:** mono 0.78rem, `ink` su `surface-2`, hairline, pill, padding 0.28rem 0.6rem. Raggruppati sotto un'etichetta 700 0.85rem `ink-3`.
- **Feature pill:** stessa forma in Manrope 0.85rem, padding 0.3rem 0.7rem, nel dettaglio del registro.
- **Filtri:** pill trasparenti con hairline, label `ink-2` e conteggio mono `ink-3`; hover bordo forte e `ink`; attivo (`aria-pressed`) pieno `green` con testo e conteggio `on-green`.

### Cards / Containers
- **Pick:** `surface`, hairline, radius 18px, immagine 16:9 sopra (la principale riempie l'altezza), corpo con titolo + freccia `arrow-up-right` in `green-light`, descrizione `ink-2`, meta mono `ink-3` "anno · stack". Hover: bordo forte, lift -4px, glow pick, immagine scale 1.035, freccia in diagonale.
- **Pannello stack:** `surface`, hairline, radius 18px, padding 1.6rem, sticky; chiude con il bottone ghost "CV" a tutta larghezza.
- **Banda next** (`/works`): `surface` con alone radiale verde dall'angolo in alto a sinistra, radius 22px, titolo a sinistra e CTA primario a destra.

### Navigation
- **Header pill:** sticky, centrata a `max`, tinta `surface` al 72% con il vetro, hairline, ombra header. A sinistra il wordmark (favicon 30px + "hey**atom**", "atom" 800 in `green-light`; la mano ruota di -12° in hover), poi link pill (600 0.93rem, `ink-2`; hover e pagina corrente con fondo verde al 12% e `ink`), badge "Disponibile" con punto pulsante (fuori dalla home), CTA primario compatto "Scrivimi".
- **Skip link:** pill `green` che entra da sopra al focus.
- **Footer:** hairline superiore, riga unica che va a capo: marchio 22px + frase in `ink-2`, link `ink-2` → `green-light`, tagline "Code meets personality · anno" in `ink-3`.

### Mazzo + medaglia (hero)
Tre screenshot reali 16:9 in figure `surface` con hairline forte e radius 14px, didascalia con titolo 600 e anno mono `green-light`. Sono disposti ruotati (-7°, 5°, -1.5°) su uno stage con alone radiale verde sfocato; la medaglia circolare con la mano siede in alto a destra con anello ad arco. Lo stage è un unico link.

### Offerte, percorso, striscia
- **Offerta:** riga a tre colonne su baseline: titolo, descrizione `ink-2`, esempio con etichetta 600 0.82rem `ink-3`.
- **Percorso:** data mono `green-light` 0.85rem a sinistra, titolo sm con organizzazione in `ink-3`, paragrafo `ink-2` max 60ch.
- **Striscia viaggi:** foto 4:5 radius 14px a saturazione 0.85 (1.05 in hover), didascalia mono "luogo · anno" in `ink-3`.

### Banda di chiusura con orb
Hairline superiore, alone radiale verde a sinistra, esagoni a destra. Orb circolare (max 340px) con gradiente `surface` → `surface-3`, anelli, mano con drop-shadow verde che saluta in hover. Accanto: headline di chiusura, paragrafo, l'indirizzo mail come testo gigante `green-light` (`clamp(1.5rem, 3.4vw, 2.6rem)`, 700) con sottolineatura `hair-strong` da 2px, poi i bottoni.

### Registro lavori (`/works`)
Lista di `details` nativi. Il `summary` è la riga: anno mono `green-light`, nome Title (trasla di 6px in hover, `green-light` quando aperto) con cliente `ink-3` e "in corso" in `green-light`, stack mono `ink-3`, cerchio "+" hairline che da aperto ruota di 45° e diventa pieno `green`. Hover e riga aperta accendono un alone verde al 7% radius 14px che sborda di 1rem. Il dettaglio si apre in due colonne rientrate sotto il nome: screenshot 16:9 e info (tipo 700 `green-light`, descrizione, feature pill, stack completo mono, bottoni primario/ghost o nota "privato").

### Peek
Solo desktop con hover: uno screenshot di 320px, radius 12px, hairline forte, segue il puntatore sopra le righe; entra da scale 0.9 e -3° a 1 e 0°.

### Motion
GSAP 3 (ScrollTrigger, SplitText, Flip) via `app/utils/motion.ts`: `useMotion(root, setup)` apre una `gsap.matchMedia` sulla pagina e la revoca all'unmount; `revealLines` e `magnetic` sono i due helper condivisi. Curva base `expo.out` (equivalente di `cubic-bezier(0.16, 1, 0.3, 1)`); `ease` CSS 0.2s per colore e bordo. Deciso dall'utente il 30/09/2026: più movimento di quanto chiedesse PRODUCT.md.
Eccezioni alla curva unica, volute: `back.out` per la medaglia (1.7) e i chip (2), `elastic.out(1, 0.45)` per il rilascio magnetico, `expo.inOut` per le rivelazioni con `clip-path`, il Flip e la regola delle offerte, `power2.in` per le righe che escono dal filtro, `power1.in` per lo scatter. Le maschere di riga SplitText (`.ln-mask`) hanno 0.14em di margine per non tagliare le discendenti.
- **Intro hero** (timeline; seconda visita nella sessione a velocità ×2.2): mazzo, badge, lead e azioni partono subito; l'h1 parola per parola parte appena i font sono pronti, da una maschera di riga (yPercent 118, stagger 0.05), lead con blur, azioni, mazzo distribuito con `--in` 1→0 (stagger 0.15), medaglia `back.out` da scala 0 e -120°, fatti. Gli elementi `[data-intro]` sono nascosti prima del paint solo se `html.js` (script inline in `app.vue`); fallback CSS li mostra dopo 3s.
- **Scatter:** uscendo dall'hero `--scatter` 0→1 (scrub 0.4, `power1.in`, transizioni CSS spente durante lo scrub) sparpaglia e solleva le carte (offset ×4.5, rotazione ×4.5, lift fino a -260px), la medaglia sale di 160px, il copy sale del 14% e sfuma.
- **Fan / tilt:** col mouse lo stage ruota verso il puntatore (14° Y, 10° X); in hover/focus il mazzo si apre (offset ×1.55, rotazione ×1.6).
- **Titoli di sezione:** righe da maschera all'ingresso (`revealLines`, top 88%); il paragrafo segue con 0.15s.
- **Pick:** screenshot scoperto dal basso con `clip-path` (1.3s expo.inOut) mentre l'immagine scende da scala 1.35; poi il testo.
- **Offerte:** la regola verde si disegna da sinistra, poi titolo e testo.
- **Percorso:** linea verde in scrub lungo la timeline; ogni tappa si accende (`.on`) a 65% viewport. Chip dello stack a pop in ordine casuale.
- **Viaggi (desktop ≥901px):** sezione pinnata per il 60% della distanza di scorrimento, la striscia scorre in orizzontale in scrub 0.6; niente tab stop mentre è pinnata.
- **Chiusura:** anelli dell'orb ruotano solo mentre la sezione è visibile; orb e CTA primari magnetici.
- **Header:** si nasconde scendendo oltre 240px, torna salendo o quando riceve il focus da tastiera; hairline verde di avanzamento pagina.
- **Lavori:** "Lavori" lettera per lettera, righe in cascata; filtro con Flip (altezza lista tenuta, uscenti a sinistra, entranti dal basso); apertura riga con clip-path orizzontale sullo screenshot; peek con `quickTo` e inclinazione dalla velocità.
- **Pagine:** transizione `page` out-in (opacity e 14px, senza blur).
- **Reduced motion:** nessuna animazione GSAP, niente `html.js`, contenuto statico; CSS azzera durata e delay.

## Do's and Don'ts

### Do:
- **Do** usare solo le custom properties di `:root` in `main.css` per colori, font, curva e spaziature.
- **Do** mostrare lavoro con screenshot reali 16:9, bordo `hair-strong`, radius 14px.
- **Do** mettere anni, intervalli e stack in JetBrains Mono con cifre tabulari, in sentence case, separati da " · ".
- **Do** separare elenchi con hairline da 1px `hair` e tenere il verde pieno per l'unica azione principale di ogni blocco.
- **Do** usare la curva `cubic-bezier(0.16, 1, 0.3, 1)` per ogni movimento e lasciare che `prefers-reduced-motion` azzeri durata e delay.
- **Do** usare le icone di `Icon.vue` (tracciati Lucide a stroke 2, loghi Simple Icons in fill), a `currentColor`.
- **Do** usare il marchio con la mano così com'è (favicon, orb, medaglia) e l'esagono solo come texture a bassa opacità.

### Don't:
- **Don't** mettere kicker o eyebrow in mono maiuscolo sopra i titoli.
- **Don't** usare testo in gradiente.
- **Don't** usare il vetro (`backdrop-filter`) su card o pannelli: resta solo sull'header.
- **Don't** far girare loop decorativi fuori schermo né animare senza passare da `useMotion` (serve la revoca e il ramo reduced motion).
- **Don't** introdurre nuove tinte, colori semantici o un tema chiaro.
- **Don't** usare ombre grigie piatte o bordi neutri al posto delle hairline verdi.
- **Don't** costruire griglie di card per servizi o esperienze: sono righe.
