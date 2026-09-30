---
name: HeyAtom
description: Portfolio e biglietto da visita freelance di Andrea Tombolato. Code meets personality.
colors:
  green: "#00a86b"
  green-dark: "#007a4d"
  green-light: "#33bf89"
  bg: "#1e201e"
  surface: "#252725"
  surface-2: "#2e312f"
  surface-3: "#363936"
  ink: "#eef1ef"
  ink-2: "#d1d5d2"
  ink-3: "#a1a6a2"
  on-green: "#04140d"
  hair: "rgba(0, 168, 107, 0.16)"
  hair-strong: "rgba(0, 168, 107, 0.38)"
  glass: "rgba(18, 28, 25, 0.72)"
  grid: "rgba(0, 168, 107, 0.1)"
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
  headline-sm:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
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
  sm: "10px"
  lg: "14px"
  circle: "50%"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section-near: "clamp(3.5rem, 7vw, 5.5rem)"
  section: "clamp(5rem, 11vw, 8.5rem)"
  section-far: "clamp(6.5rem, 15vw, 11.5rem)"
  max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.6rem"
  button-primary-active:
    backgroundColor: "{colors.green-dark}"
    textColor: "{colors.on-green}"
  button-ghost:
    backgroundColor: "rgba(0, 168, 107, 0.05)"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.6rem"
  header-bar:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.45rem 0.45rem 0.9rem"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.9rem"
  nav-link-active:
    backgroundColor: "rgba(0, 168, 107, 0.12)"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0.28rem 0.6rem"
  pick-tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "2rem clamp(1.4rem, 3.5vw, 3.25rem)"
  stack-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.6rem"
  service-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.4rem 1.3rem 1.3rem"
  core-pill:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.4rem"
  screenshot:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
---

# Design System: HeyAtom

## Overview

**Creative North Star: "Il banco da lavoro di una persona sola"**

Il sito è un banco da lavoro, non una brochure d'agenzia. Fondo antracite neutro, una sola tinta satura usata come luce, pannelli appena sollevati tenuti insieme da hairline verdi da 1px. La prova sta nelle immagini: screenshot reali 16:9 dei progetti, messi accanto alla persona fin dal primo schermo. Il carattere entra misurato: la mano "Vulcan salute" dentro un fumetto (orb e medaglia), il motivo esagoni in trasparenza, una striscia di foto di viaggio, i loghi delle aziende in filigrana nel percorso.

Densità media e ritmo lungo: sezioni separate da grandi vuoti verticali, contenuti organizzati in righe con hairline più che in griglie di card. Il verde illumina i punti che contano (CTA, anni, stato aperto, alone dell'orb) e non riempie superfici. Il mazzo di screenshot nell'hero resta il momento d'autore; attorno, un movimento ricco ma legato allo scroll e alla struttura (vedi Motion).

Rifiuti confermati: niente kicker/eyebrow sopra i titoli, niente testo in gradiente, niente card in vetro come decorazione.

Il tema è **dark di default** a prescindere dall'OS; un tema chiaro si attiva dal pulsante nell'header (`@nuxtjs/color-mode`, attributo `data-theme` su `<html>`, preferenza in cookie). `theme-color` segue il tema (`#1e201e` / `#f3f5f3`).

**Key Characteristics:**
- Fondo `bg` con griglia verde 56px (`grid`, 10% dark, 7% light), fissa, mascherata in un'ellisse dall'alto.
- Un verde, tre gradi: pieno per l'azione, scuro per il press, chiaro per testo e dati.
- Manrope stretto in negativo per tutti i titoli; JetBrains Mono per anni, stack e dati.
- Angoli stretti che richiamano le celle arrotondate di `hex.svg`: 10px per ciò che si clicca e per le immagini, 14px per i pannelli. Il cerchio è riservato a punti, "+" e bottoni icona.
- Ombre nere a spread negativo per la profondità (scalate da `--shade`), alone verde solo su CTA primaria, pill della base comune e orb/medaglia.

## Colors

Neutri antracite con un solo accento saturo, il verde, che si comporta come luce. Tutti i token vivono in `app/assets/main.css`; ogni token nuovo va definito sia in `:root` (dark) sia in `:root[data-theme='light']`.

### Primary
- **Verde Atom** (`green`): bottone primario, pill "Il tuo progetto" della base comune, cerchio "+" della riga aperta, punto disponibilità e nodi del percorso accesi, marcatore esagonale e tag in hover di `/uses`, bottoni del lightbox in hover, skip link, selezione testo, alone di orb e stage (sempre in rgba del verde).
- **Verde Profondo** (`green-dark`): stato `:active` del primario, scrollbar, inizio del gradiente della barra di avanzamento nell'header.
- **Verde Menta** (`green-light`): link, anni e date in mono, nome del progetto aperto, ruolo delle card della base comune, focus ring, bordo superiore degli anelli di orb e medaglia, hover di titoli e loghi nel percorso.

### Neutral
- **Antracite** (`bg`): fondo di pagina, unico sfondo. Grigio scuro quasi senza croma: i neutri non sono tinti di verde, così il verde resta l'unica tinta.
- **Pannello** (`surface`): pick, pannello stack, card volontariato, card della base comune, banda "next", figure del mazzo, aside e card "simili" del dettaglio, bottoni del lightbox.
- **Pannello Rialzato** (`surface-2`): chip, pillole feature, tag di `/uses`, placeholder immagini.
- **Pannello Alto** (`surface-3`): solo come fine del gradiente dell'orb.
- **Vetro** (`glass`): tinta dell'header (con `backdrop-filter`) e interno del gradiente radiale dell'orb.
- **Inchiostro** (`ink`): titoli e testo primario.
- **Inchiostro Tenue** (`ink-2`): paragrafi, lead, link del nav a riposo, link del footer.
- **Inchiostro Spento** (`ink-3`): metadati, cliente, organizzazione, etichette di gruppo, footer.
- **Su Verde** (`on-green`): testo su qualsiasi fondo `green`.
- **Hairline** (`hair`) e **Hairline Forte** (`hair-strong`): tutti i bordi e i divisori; la forte per hover, screenshot, bottone ghost, fili della base comune.

### Tema chiaro
Stessa struttura, valori invertiti: `bg #f3f5f3`, `surface #ffffff`, `surface-2 #eaeeeb`, `surface-3 #dfe4e0`, `ink #151816`, `ink-2 #3a403c`, `ink-3 #5c635e`, hairline sul verde profondo (`rgba(0,122,77,0.18)` / `0.42`), `glass` bianco al 72%. `green-light` diventa `#007a4d` perché `#33bf89` su fondo chiaro non passa il contrasto. `--shade` scende da 1 a 0.25 e attenua tutte le ombre nere.

### Named Rules
**The Verde come Luce Rule.** Il verde pieno riempie solo il bottone primario, la pill "Il tuo progetto", il "+" aperto e piccoli segni (punti, marcatori, hover di tag e bottoni icona). Altrove compare come testo (`green-light`), come hairline o come alone radiale in rgba; mai come fondo di sezione.

**The Hairline Rule.** Ogni separazione è una linea da 1px nel verde al 16% (38% in hover o per le immagini). Nessun bordo grigio, nessun divisore neutro. Le regole delle offerte e dei gruppi di `/uses` sfumano da `green` a `hair` al 40%.

## Typography

**Display Font:** Manrope (con system-ui, sans-serif), pesi 400–800
**Body Font:** Manrope, peso 450
**Label/Mono Font:** JetBrains Mono (con ui-monospace, SFMono-Regular), pesi 400 e 600

**Character:** Un grotesk geometrico caldo, stretto in negativo nei titoli fino a sembrare compatto e sicuro; il mono entra solo dove c'è un dato, per ricordare che dietro c'è uno sviluppatore.

### Hierarchy
- **Display** (800, `clamp(2.7rem, 5.8vw, 5rem)`, 1.02, -0.04em): h1 dell'hero. Il saluto "Ciao, sono Andrea." sta dentro l'h1 a 0.5em, peso 600, -0.02em, in `green-light`.
- **Display Index** (800, `clamp(3.5rem, 9vw, 6rem)`, 0.9, -0.05em): h1 delle pagine indice (`/works`, `/uses`), una parola. Il dettaglio progetto usa `clamp(3rem, 8vw, 5.5rem)`, 0.95.
- **Headline** (700, `clamp(2rem, 4.2vw, 3.25rem)`, 1.08, -0.03em, max 18ch): h2 di sezione, sempre una frase intera con punto. La banda di chiusura sale a `clamp(2.2rem, 4.8vw, 4rem)`, -0.04em, max 14ch.
- **Headline sm** (700, `clamp(1.6rem, 3vw, 2.25rem)`): h2 secondari (strumenti, sezioni del dettaglio progetto). La banda "next" usa `clamp(1.6rem, 3.2vw, 2.5rem)`.
- **Title** (700, -0.03em): pick `clamp(1.4rem, 2.2vw, 1.9rem)`, offerte `clamp(1.35rem, 2.3vw, 1.9rem)`, nomi nel registro `clamp(1.25rem, 2.3vw, 1.75rem)`, card della base comune 1.4rem.
- **Title sm** (700, 1.1–1.25rem, -0.02em): voci del percorso e volontariato (1.2rem), pannello stack (1.15rem), strumenti (1.15rem), voci di `/uses` (1.1rem), card "simili" (1.25rem).
- **Lead** (450, `clamp(1.06rem, 1.4vw, 1.2rem)`, max 44ch, `ink-2`); testo dei sec-head 1.05rem max 46ch; intro delle pagine indice 1.1rem max 46ch.
- **Body** (450, 1rem, 1.6): paragrafi in `ink-2`, max 52–65ch; `text-wrap: pretty` sui paragrafi, `balance` sui titoli.
- **Label** (600, 0.93rem, line-height 1): nav, bottoni compatti. I bottoni pieni usano 600 1rem. Etichette di gruppo 700 0.85–0.88rem (`ink-3`, o `green-light` per ruolo, tipo e gruppi di `/uses`).
- **Mono** (400, 0.72–0.9rem, letter-spacing 0, cifre tabulari): anni, intervalli ("2016 → oggi"), stack separati da " · ", intestazioni di colonna del registro, luogo e anno dei viaggi, contatori, data di aggiornamento di `/uses`. Sempre in sentence case.

### Named Rules
**The Mono per i Dati Rule.** JetBrains Mono solo per anni, tag di stack, conteggi e dati tabellari. Mai per titoli, kicker, CTA o frasi; mai maiuscolo con tracking. Eccezioni volute: il link "← Tutti i lavori" e l'etichetta "Stack" nel dettaglio progetto, le didascalie del lightbox.

**The Titolo Stretto Rule.** Ogni titolo Manrope va da 700 a 800 con tracking negativo (da -0.02em a -0.05em, più grande più stretto). Nessun titolo leggero, nessun tracking positivo. Unica eccezione: i nomi di gruppo di `/uses`, che sono etichette (0.88rem, tracking 0).

## Layout

Contenitore unico: larghezza massima `max` (1240px) centrata, padding laterale `gutter`. Le sezioni si separano in alto (`padding-top` o `margin-top`), senza fondi alternati, con tre passi scelti per significato: `section-near` tra blocchi dello stesso discorso, `section` di default, `section-far` quando cambia argomento.

- **Home:** hero → lavori scelti `section` → offerte `near` (sempre lavoro) → percorso `far` (si passa alla persona) → viaggi `near` → chiusura `section`. Ogni sezione apre con un sec-head: h2 a sinistra, eventuale frase o link "Vedi tutti" allineati in basso a destra, `flex-wrap`.
- **`/works`:** testata a due colonne (h1 / intro allineati in basso) → registro → base comune `far` → strumenti `near` (sempre il mio codice) → banda "next" `section`.
- **`/works/[slug]`:** link indietro, testata (meta, h1, cliente, bottoni), screenshot 16:9 a tutta larghezza, corpo 1.6fr / 1fr (descrizione + aside stack) `near`, galleria `near`, "simili" `section` con hairline superiore.
- **`/uses`:** testata come `/works`, poi un gruppo per categoria: griglia 0.8fr / 2fr, nome del gruppo sticky a `top: 7rem` a sinistra, voci a destra.

Composizioni ricorrenti:
- **Hero** a due colonne (1.1fr / 0.9fr): copia a sinistra, mazzo a destra, riga dei fatti a tutta larghezza sotto con hairline superiore e tre colonne. Altezza `min(92svh, 60rem)`.
- **Pick**: tre progetti su griglia a 2 colonne. Il primo a tutta riga (screenshot 16:9 al 56%, testo centrato), gli altri due affiancati sotto (screenshot 16:9 sopra, testo sotto). Mai celle che allungano lo screenshot oltre il 16:9.
- **Righe**: offerte (tre colonne 1.1/1/0.7 su baseline), percorso (colonna data 9.5rem + contenuto), registro lavori (5.5rem anno / nome / stack 0.8fr / 2.5rem "+"), strumenti (stessa griglia, riga intera come link a GitHub, una frase al posto del cliente, icona GitHub al posto del "+", senza screenshot né dettaglio), voci di `/uses`. Ogni riga è chiusa da hairline. `/works` ha tre parti, guidate dal campo `group` in `works.ts`: il registro (progetti senza `group`, niente filtri), la **base comune** (`group: 'platform'`: FileHarbor, Articuno, Gatherly, Herald come quattro card appese con fili verticali a una pill verde "Il tuo progetto", e Bastion come banda larga sotto di loro, perché tutti si autenticano lì) e **strumenti e codice aperto** (`group: 'tool'`).
- **Percorso + stack**: 1.7fr / 1fr, il pannello stack è sticky a `top: 6.5rem`. Sotto il percorso, il volontariato sta a parte in una card con la sua etichetta.
- **Striscia viaggi**: scroller orizzontale con snap, colonne `clamp(220px, 22vw, 300px)` (`clamp(260px, 24vw, 360px)` quando è pinnata), foto 4:5, pari sfalsate di 2.5rem.

Responsive:
- **≤900px**: tutto a una colonna. Il mazzo si centra a `min(86%, 520px)`; pick, offerte, percorso e chiusura si impilano; lo stack perde lo sticky; l'orb scende a 180px. Nel registro e negli strumenti spariscono intestazioni di colonna e colonna stack (griglia 3.5rem / nome / 2.5rem), il dettaglio perde il rientro, il peek si spegne (anche con `hover: none`). Base comune a 2 colonne senza fili, Bastion impilato. Dettaglio progetto e `/uses` a una colonna; i "simili" in colonna; le frecce del lightbox scendono in basso.
- **≤760px**: l'header mostra solo "Lavori", il pulsante tema e il CTA; ancore e badge disponibilità spariscono.
- **≤640px**: footer a una colonna.
- **≤560px**: fatti, percorso e volontariato a una colonna, base comune a una colonna, la striscia smette di sfalsare, i bottoni della chiusura vanno a tutta larghezza.
- **≤480px**: nell'header resta solo la mano del marchio, senza la scritta.

**The Righe non Card Rule.** Elenchi di cose omogenee (servizi, esperienze, progetti, strumenti) sono righe separate da hairline, non griglie di card. Le card esistono solo dove c'è un'immagine da mostrare (pick, "simili"), un blocco laterale (stack, aside del dettaglio, volontariato) o un diagramma (base comune).

## Elevation & Depth

Profondità ibrida: pannelli tonali (`surface` su `bg`) con hairline verde, più ombre nere morbide a spread negativo che staccano solo ciò che si solleva davvero (screenshot, peek, header). Il verde entra come luce emessa, mai come ombra grigia. Ogni ombra nera moltiplica la sua opacità per `--shade` (`rgb(0 0 0 / calc(0.75 * var(--shade)))`), così nel tema chiaro resta leggera.

### Shadow Vocabulary
- **Screenshot** (`0 30px 60px -20px` nero 0.75, `0 8px 18px -8px` nero 0.5): figure del mazzo. Varianti: peek (`0 30px 60px -20px` 0.8), immagine del registro (`0 24px 50px -24px` 0.8), screenshot del dettaglio (`0 40px 80px -40px` 0.9), miniatura della galleria in hover (`0 24px 40px -24px` 0.9).
- **Header** (`0 10px 30px -12px` nero 0.6): barra dell'header sticky.
- **Glow primario** (`0 8px 24px -6px rgba(0,168,107,0.55)`, hover `0 14px 34px -8px rgba(0,168,107,0.7)`): solo il bottone primario pieno (nell'header è spento).
- **Glow pill** (`0 10px 30px -8px rgba(0,168,107,0.6)`): pill "Il tuo progetto".
- **Glow pick** (`0 24px 50px -24px rgba(0,168,107,0.45)`): pick in hover, insieme al lift di 4px.
- **Orb** (`inset 0 2px 30px rgba(0,168,107,0.14), 0 40px 80px -20px` nero 0.6`, 0 0 80px rgba(0,168,107,0.16)`); **medaglia** (`0 18px 40px -12px` nero 0.7`, inset 0 2px 24px rgba(0,168,107,0.18)`). In entrambi la mano ha un drop-shadow verde al 55%.
- **Punti luminosi**: punto disponibilità e nodi dei fili (`0 0 10px green`), linea del percorso (`0 0 12px` verde al 60%), nodo acceso (anello di 5px al 15%).

### Named Rules
**The Ombra Nera, Alone Verde Rule.** Le ombre strutturali sono nere e a spread negativo; l'alone verde appartiene solo al CTA primario, alla pill "Il tuo progetto", alla pick in hover, all'orb/medaglia e ai piccoli punti luminosi.

**The Un Solo Vetro Rule.** Il `backdrop-filter` (blur 18px, saturate 1.3) esiste solo sull'header sticky, perché scorre sopra il contenuto. Nessun'altra superficie è in vetro; l'unica altra sfocatura è il `::backdrop` del lightbox (blur 6px su nero al 94%), che non è una superficie.

## Shapes

Angoli stretti, in eco con il piccolo arrotondamento delle celle di `hex.svg`. Due raggi:
- **`--r-sm` (10px):** tutto ciò che si clicca (bottoni, link del nav, pulsante tema, skip link, header, righe di registro, strumenti e `/uses` in hover, lingua nel footer), chip, pillole feature, tag, badge disponibilità, pill "Il tuo progetto", e le immagini (screenshot del mazzo, registro, peek, galleria, foto di viaggio, lightbox).
- **`--r-lg` (14px):** i pannelli (pick, stack, volontariato, card della base comune, banda "next", aside del dettaglio, card "simili"), lo stage del mazzo e lo screenshot grande del dettaglio.

I cerchi sono riservati a punti (disponibilità, nodi del percorso e dei fili), al "+" del registro, all'icona GitHub degli strumenti e ai bottoni del lightbox. Il marchio vive in un **fumetto**: cerchio con un angolo a 10% (orb `50% 50% 10% 50%`, medaglia `50% 50% 50% 10%`), con anelli hairline che ne seguono la forma e un solo arco in `green-light` (l'orb ha un secondo anello tratteggiato con l'arco in basso). L'esagono compare come texture (`/assets/hex.svg`) tramite la utility `.hexed` di `main.css` (opacità 7–18%, maschera radiale regolata con le variabili `--hex-*`) in testate, base comune, banda "next" e footer; nella chiusura della home al 12%, sfumato da destra. Una singola cella esagonale piena `green` marca i gruppi di `/uses`.

## Components

### Buttons
Rettangoli pieni e sicuri a 10px, con una freccia che scivola.
- **Shape:** `--r-sm`, `inline-flex`, gap 0.6rem, bordo 1px trasparente.
- **Primary:** fondo `green`, testo `on-green`, 600 1rem/1, padding 0.95rem 1.6rem, glow primario.
- **Hover / Focus:** lift -2px e glow più ampio (0.35s `ease-out`), l'icona trasla di 4px a destra; `:active` torna a 0 e scende a `green-dark`. Focus globale: outline 2px `green-light`, offset 3px, radius 6px.
- **Ghost:** testo `ink`, bordo `hair-strong`, fondo verde al 5%; in hover bordo `green` e fondo al 10%.
- **Compatto:** nell'header e nei link di registro e dettaglio padding 0.7–0.75rem × 1.2rem, 0.93rem; nell'header senza glow.
- **Link freccia** ("Vedi tutti i lavori", "Tutti i lavori"): testo 600 `green-light` senza sottolineatura, freccia che trasla di 4px.

### Chips
- **Stack chip:** mono 0.78rem, `ink` su `surface-2`, hairline, `--r-sm`, padding 0.28rem 0.6rem. Raggruppati sotto un'etichetta 700 0.85rem `ink-3`. In hover bordo `green`, testo `green-light`, lift 2px.
- **Feature pill:** stessa forma in Manrope 0.85rem (0.8rem nelle card della base comune), padding 0.3rem 0.7rem.
- **Tag di `/uses`:** 0.75rem 500 `ink-2` su `surface-2`; in hover della riga ruota di -6° e diventa `green` pieno.

### Cards / Containers
- **Pick:** `surface`, hairline, `--r-lg`, immagine 16:9 (la principale al 56% della larghezza), corpo con titolo + freccia `arrow-up-right` in `green-light`, descrizione `ink-2`, meta mono `ink-3` "anno · stack". Hover: bordo forte, lift -4px, glow pick, immagine scale 1.035, freccia in diagonale.
- **Pannello stack:** `surface`, hairline, `--r-lg`, padding 1.6rem, sticky; chiude con il bottone **primario** "Scarica il CV" a tutta larghezza, icona download.
- **Card volontariato:** `surface`, hairline, `--r-lg`, padding 1.4rem, stessa griglia data/contenuto del percorso, icona scudo come filigrana.
- **Banda next** (`/works`): `surface` con alone radiale verde dall'angolo in alto a sinistra, esagoni al 18% a destra, `--r-lg`, titolo a sinistra e CTA primario a destra.

### Navigation
- **Header:** sticky, centrato a `max`, fondo `glass` con il vetro, hairline, `--r-sm`, ombra header. A sinistra il marchio (favicon 36px + "HeyAtom" 800 1.3rem `ink`; la mano ruota di -12° in hover), poi link (600 0.93rem, `ink-2`; hover e pagina corrente con fondo verde al 12% e `ink`), badge "Disponibile" con punto che pulsa tre volte (fuori dalla home, solo se `freelanceAvailable`), pulsante tema (quadrato 2.5rem, icona sole/luna 18px), CTA primario compatto "Scrivimi". Sul bordo inferiore, una hairline di 2px in gradiente `green-dark` → `green-light` segna l'avanzamento della pagina.
- **Skip link:** `green`, `--r-sm`, entra da sopra al focus.
- **Footer:** hairline superiore, esagoni a destra, griglia a due colonne: marchio 22px (ruota in hover) + frase in `ink-2`; selettore lingua IT/EN (600, `ink-3`, la corrente in `ink` con bordo `hair`); link GitHub, LinkedIn, Uses, Status e mail in `ink-2` → `green-light`; tagline "Code meets personality · anno" in `ink-3` 0.85rem.

### Mazzo + medaglia (hero)
Tre screenshot reali 16:9 in figure `surface` con hairline forte e `--r-sm`, didascalia con titolo 600 0.82rem e anno mono `green-light`. Sono disposti ruotati (-7°, 5°, -3°) su uno stage con alone radiale verde sfocato; la medaglia a fumetto con la mano siede in alto a destra con anello ad arco. Lo stage è un unico link a `/works`. Sopra l'h1, se `freelanceAvailable`, un badge `--r-sm` con bordo forte, fondo verde all'8% e punto luminoso.

### Offerte, percorso, striscia
- **Offerta:** riga a tre colonne su baseline: titolo, descrizione `ink-2`, esempi linkati con etichetta 600 0.82rem `ink-3`. Chiusa da una regola in gradiente `green` → `hair`.
- **Percorso:** traccia verticale 2px `hair` a sinistra con la linea di avanzamento verde; ogni tappa ha un nodo circolare che si accende. Colonna data: intervallo mono 0.85rem `green-light` e durata ("9 anni") in Manrope 600 1rem `ink-2` (entrambi `ink-3` finché la tappa non è accesa). Contenuto: title sm, organizzazione linkata 600 `ink-3` con freccia, paragrafo `ink-2` max 60ch, logo dell'azienda in filigrana a destra (7rem, 5%; in hover 14% `green-light`, scala 1.08 e -4°).
- **Striscia viaggi:** foto 4:5 `--r-sm` a saturazione 0.85 (1.05 in hover), didascalia mono 0.76rem "luogo · anno" in `ink-3`.

### Banda di chiusura con orb
Hairline superiore, alone radiale verde a sinistra, esagoni a destra al 12%. Orb a fumetto (max 340px) con gradiente `glass` → `surface` → `surface-3`, due anelli, mano con drop-shadow verde che saluta in hover. Accanto: headline di chiusura, paragrafo 1.1rem, nota per i recruiter in `ink-3` 0.95rem, l'indirizzo mail come testo gigante `green-light` (`clamp(1.5rem, 3.4vw, 2.6rem)`, 700) con sottolineatura `hair-strong` da 2px, poi primario "Scrivimi una mail" e ghost LinkedIn e GitHub.

### Registro lavori (`/works`)
Lista di `details` nativi. Il `summary` è la riga: anno mono `green-light`, nome Title (trasla di 6px in hover, `green-light` quando aperto) con cliente `ink-3` e "in corso" in `green-light`, stack mono `ink-3`, cerchio "+" hairline che da aperto ruota di 45° e diventa pieno `green`. Hover e riga aperta accendono un fondo verde al 7% `--r-sm` che sborda di 1rem. Il dettaglio si apre in due colonne rientrate sotto il nome: screenshot 16:9 e info (tipo 700 `green-light`, descrizione, feature pill, stack completo mono, primario "Scheda e schermate" verso `/works/<slug>`, ghost sito e codice, o nota "privato").

### Peek
Solo desktop con hover: uno screenshot di 320px, `--r-sm`, hairline forte, segue il puntatore sopra le righe e si inclina con la velocità orizzontale (±12°); entra da scale 0.9 e -3° a 1 e 0°. Nascosto sulla riga già aperta.

### Base comune (`/works#piattaforma`)
Pill `green` "Il tuo progetto" (700, `--r-sm`, glow pill) al centro; da lì uno stelo e un bus orizzontale in `hair-strong` portano un filo verticale a ciascuna delle quattro card, con un nodo verde luminoso all'attacco. Card: `surface`, hairline (forte in hover), `--r-lg`, ruolo 700 0.88rem `green-light`, title 1.4rem, frase `ink-2` 0.95rem, feature pill, stack mono, link "Codice" o "Codice privato" in `ink-3`. Bastion è una banda a tutta larghezza sotto (quattro colonne: nome, frase, feature, link) con bordo forte e gradiente verde al 12% da sinistra.

### Strumenti (`/works`)
Riga intera come link a GitHub con la griglia del registro: anno mono, nome title sm + frase `ink-2`, stack mono, cerchio con icona GitHub che in hover diventa `green-light`. Hover: fondo verde al 7%.

### Dettaglio progetto (`/works/[slug]`)
- **Testata:** link mono "← Tutti i lavori" in `ink-3`, meta mono `green-light` "anno · tipo · in corso", h1, cliente `ink-2` 1.1rem, bottoni compatti (primario "Visita il sito", ghost "Codice", o nota "privato"), esagoni in trasparenza.
- **Screenshot:** 16:9 a tutta larghezza, `--r-lg`, hairline forte.
- **Corpo:** descrizione 1.08rem max 65ch con feature pill; aside `surface` `--r-lg` con etichetta mono "Stack" e chip.
- **Galleria:** griglia `auto-fill` da 260px, miniature 16:10 allineate in alto, `--r-sm`, titolo sotto in `ink-3`; in hover salgono di 4px. Il click apre un `<dialog>` a tutto schermo con l'immagine, didascalia mono e contatore, bottoni circolari (chiudi, precedente, successivo; frecce da tastiera).
- **Simili:** tre card `surface` `--r-lg` con screenshot 16:9, anno mono, titolo, stack; lift di 4px in hover.

### Uses (`/uses`)
Testata come `/works` con la data di aggiornamento in mono `ink-3`. Ogni gruppo si apre con una regola in gradiente `green` → `hair`; a sinistra, sticky, cella esagonale + nome del gruppo `green-light` (link che copia l'URL con l'ancora; "#" in hover, conferma "link copiato" in mono) e contatore mono a due cifre. A destra le voci: nome title sm (trasla di 6px e diventa `green-light` in hover, freccia `arrow-up-right` se linkato; tutta la riga è l'area cliccabile), eventuale tag, nota `ink-2` max 62ch.

### Icone
`Icon.vue`: tracciati Lucide a stroke 2 (`arrow-right`, `arrow-up-right`, `mail`, `plus`, `shield`, `download`) e loghi Simple Icons in fill (`github`, `linkedin`), sempre a `currentColor`, 18px di default. Il pulsante tema ha le sue due icone inline. Loghi aziendali in `/public/assets/logos/*.svg`, usati come maschera.

## Motion

GSAP 3 (ScrollTrigger, SplitText) via `app/utils/motion.ts`: `useMotion(root, setup)` apre una `gsap.matchMedia` sulla pagina e la revoca all'unmount; `revealLines` (righe da maschera, yPercent 115, stagger 0.09, top 88%) e `magnetic` sono gli helper condivisi. Il plugin `motion.client.ts` rifà `ScrollTrigger.refresh()` a fine transizione di pagina. Curva base `expo.out` (equivalente di `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`); `ease` CSS 0.2s per colore e bordo. Deciso dall'utente il 30/09/2026: più movimento di quanto chiedesse PRODUCT.md.

Eccezioni alla curva unica, volute: `back.out` per la medaglia (1.7), i chip (2) e i tag di `/uses` (3); `elastic.out(1, 0.45)` per il rilascio magnetico e `elastic.out(1, 0.55)` per le lettere di "Uses"; `expo.inOut` per le rivelazioni con `clip-path`, i fili della base comune e le regole di offerte e `/uses`; `power1.in` per lo scatter; `power2.out` per il salto delle lettere e il contatore; `power3` per i `quickTo`. Le maschere di riga SplitText (`.ln-mask`) hanno 0.14em di margine per non tagliare le discendenti.

- **Intro hero** (timeline; seconda visita nella sessione a velocità ×2.2): badge, lead con blur, azioni, mazzo distribuito con `--in` 1→0 (stagger 0.15), medaglia `back.out` da scala 0 e -120°, fatti. L'h1 parola per parola parte appena i font sono pronti, da una maschera di riga (yPercent 118, stagger 0.05). Gli elementi `[data-intro]` sono nascosti prima del paint solo se `html.js` (script inline in `app.vue`); fallback CSS li mostra dopo 3s.
- **Scatter:** uscendo dall'hero `--scatter` 0→1 (scrub 0.4, `power1.in`, transizioni CSS spente durante lo scrub) sparpaglia e solleva le carte (offset e rotazione ×4.5, lift da -260px a 140px per carta), la medaglia sale di 160px, il copy sale del 14% e sfuma al 25%.
- **Fan / tilt:** col mouse lo stage ruota verso il puntatore (14° Y, 10° X, medaglia ±18px); in hover/focus il mazzo si apre (offset ×1.55, rotazione ×1.6) e la mano della medaglia saluta.
- **Titoli di sezione:** `revealLines`; il paragrafo del sec-head segue con 0.15s.
- **Pick:** screenshot scoperto dal basso con `clip-path` (1.3s `expo.inOut`) mentre l'immagine scende da scala 1.35; poi il testo.
- **Offerte:** la regola si disegna da sinistra, poi titolo e testo.
- **Percorso:** linea verde in scrub lungo la timeline; ogni tappa si accende (`.on`) a 65% viewport; volontariato a seguire. Chip dello stack a pop in ordine casuale.
- **Viaggi (desktop ≥901px):** sezione pinnata per il 60% della distanza di scorrimento, la striscia scorre in orizzontale in scrub 0.6; niente tab stop mentre è pinnata.
- **Chiusura:** l'orb entra da scala 0.7 e -30°, poi mail e bottoni. Orb (0.18) e tutti i CTA primari (0.25) sono magnetici.
- **Header:** si nasconde scendendo oltre 240px, torna salendo o quando riceve il focus da tastiera; barra di avanzamento in `quickSetter`.
- **`/works`:** "Lavori" lettera per lettera (yPercent 120, rotazione 12°), intro con blur, righe in cascata; apertura riga con clip-path orizzontale sullo screenshot e info da destra; peek con `quickTo`. Base comune: la pill appare, i fili scendono in sequenza, le quattro card salgono, poi la banda di Bastion si allarga sotto.
- **`/works/[slug]`:** testata in cascata, screenshot rivelato con clip-path orizzontale, `revealLines` sugli h2, miniature e "simili" in cascata.
- **`/uses`:** "Uses" lettera per lettera con rotazioni casuali ed elastico; in hover le lettere saltano di nuovo. Ogni gruppo: regola, nome da sinistra, contatore da 00, voci in cascata, tag a pop.
- **Pagine:** transizione `page` out-in (opacity e 14px, senza blur; uscita 0.2s).
- **Reduced motion:** nessuna animazione GSAP, niente `html.js`, contenuto statico, peek senza inseguimento; CSS azzera durata e delay.

## Do's and Don'ts

### Do:
- **Do** usare solo le custom properties di `main.css` per colori, font, curva, raggi e spaziature, e definire ogni token nuovo in entrambi i temi.
- **Do** controllare ogni modifica in dark e in light.
- **Do** mostrare lavoro con screenshot reali 16:9, bordo `hair-strong`, `--r-sm` (`--r-lg` solo per lo screenshot grande del dettaglio).
- **Do** mettere anni, intervalli e stack in JetBrains Mono con cifre tabulari, in sentence case, separati da " · ".
- **Do** separare elenchi con hairline da 1px `hair` e tenere il verde pieno per l'unica azione principale di ogni blocco.
- **Do** usare la curva `--ease-out` per ogni movimento e lasciare che `prefers-reduced-motion` azzeri durata e delay.
- **Do** usare le icone di `Icon.vue` (tracciati Lucide a stroke 2, loghi Simple Icons in fill), a `currentColor`.
- **Do** usare il marchio con la mano così com'è (favicon, orb, medaglia, footer) e l'esagono solo come texture a bassa opacità tramite `.hexed`.
- **Do** moltiplicare ogni ombra nera per `--shade`.

### Don't:
- **Don't** mettere kicker o eyebrow in mono maiuscolo sopra i titoli.
- **Don't** usare testo in gradiente.
- **Don't** usare il vetro (`backdrop-filter`) su card o pannelli: resta solo sull'header.
- **Don't** far girare loop decorativi fuori schermo né animare senza passare da `useMotion` (serve la revoca e il ramo reduced motion).
- **Don't** introdurre nuove tinte o colori semantici, né colori hardcoded fuori da `main.css`.
- **Don't** usare pill da 999px o raggi diversi da 10/14px (i cerchi solo per punti e bottoni icona).
- **Don't** usare ombre grigie piatte o bordi neutri al posto delle hairline verdi.
- **Don't** costruire griglie di card per servizi o esperienze: sono righe.
