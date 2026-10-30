# Sito di Alessandro Perini

Sito statico (solo HTML, CSS e JavaScript, nessuna installazione) pronto per GitHub Pages.
Il sito è in inglese, queste istruzioni in italiano. Puoi cancellare questo file quando vuoi.

## Cosa c'è nella cartella

| File | A cosa serve |
|---|---|
| `index.html` | La pagina intera: testi, pubblicazioni, news, ecc. |
| `assets/css/style.css` | Colori, caratteri e layout (tema chiaro e scuro) |
| `assets/js/main.js` | Menu da telefono, tema scuro, email |
| `assets/Alessandro_Perini_CV.pdf` | Il CV scaricabile dal pulsante "Download CV" |
| `assets/img/` | Qui vanno la foto profilo e le foto della galleria |
| `.nojekyll` | Dice a GitHub di pubblicare i file così come sono |

## 1. Completare i dati mancanti

Apri `index.html` con un editor di testo (va bene anche il Blocco note) e cerca queste parti.

**Link ai profili.** Cerca `id="p-scholar"`, `id="p-orcid"`, `id="p-rg"`, `id="p-linkedin"` e aggiungi l'indirizzo con `href`:

```html
<a class="chip" id="p-scholar" href="https://scholar.google.com/citations?user=XXXXXXXX" aria-label="Google Scholar profile">
```

Un link senza `href` appare grigio e non cliccabile. Quando lo aggiungi diventa attivo, anche nella sezione Contact (si copia da solo).

**Email.** Cerca `id="email"` e compila le due parti, prima e dopo la chiocciola (separate per ostacolare i programmi che raccolgono indirizzi):

```html
<span class="email" id="email" data-user="nome.cognome" data-domain="uniroma2.eu">Email address to be added</span>
```

**Foto profilo.** Salva un file `profile.jpg` in `assets/img/` (formato verticale 4:5, circa 800 px di larghezza). Appare da solo al posto delle iniziali "AP".

**Video.** I video dei progetti sono in `assets/video/` (MP4 H.264 e una locandina `.jpg` con lo stesso nome). Compaiono nelle sezioni TEXO, differential gearbox e KNEXO dentro `index.html` (cerca `class="vid"`). Per sostituirne uno, carica un file con lo stesso nome.

Tieni ogni immagine sotto circa 500 KB (JPEG, qualità 80) così la pagina resta veloce.

**Pubblicazioni e news.** Ogni voce è una riga `<article class="row">` (pubblicazioni) o `<div class="row">` (news, premi): copia una riga esistente e cambia i testi.

**Data in fondo.** Cerca `Last updated` e aggiornala quando modifichi il sito.

## 2. Provarlo sul tuo computer

Fai doppio clic su `index.html`: si apre nel browser. Il carattere Source Sans 3 viene scaricato da Google Fonts, quindi serve internet; senza connessione compare un carattere simile.

## 3. Pubblicarlo con GitHub Pages (gratis)

1. Crea un account su [github.com](https://github.com) se non ce l'hai.
2. Crea un nuovo repository pubblico (Public) chiamato **`TUOUSERNAME.github.io`**, con il tuo nome utente GitHub scritto esattamente così.
3. Nel repository scegli "uploading an existing file" e trascina tutto il contenuto di questa cartella (`index.html`, `assets`, `.nojekyll`). Poi premi "Commit changes".
4. Vai in Settings, poi Pages. Alla voce "Build and deployment" scegli "Deploy from a branch", ramo `main`, cartella `/ (root)`, e salva.
5. Dopo uno o due minuti il sito è online su `https://TUOUSERNAME.github.io`.

Per modificare in seguito: apri il file su GitHub, premi la matita, cambia il testo e conferma con "Commit changes". Il sito si aggiorna da solo.

Se preferisci un altro nome per il repository (per esempio `sito`), il sito sarà su `https://TUOUSERNAME.github.io/sito/`. I percorsi sono relativi, quindi funziona ugualmente.

## 4. Un dominio tutto tuo, senza pagare

Tre strade, dalla più alla meno "tua":

1. **Dominio gratuito per un anno con il GitHub Student Developer Pack.** Se sei idoneo come studente (serve la verifica su [education.github.com/pack](https://education.github.com/pack)), il pacchetto include un dominio per un anno, per esempio un `.me` da Namecheap oppure un `.dev`, `.app` o `.live` da Name.com. Dal secondo anno il rinnovo è a pagamento. Le offerte cambiano: controlla le condizioni attuali prima di scegliere.
2. **Sottodominio gratuito per sviluppatori**, come `nome.is-a.dev` (servizio della community, istruzioni su [is-a.dev](https://is-a.dev)).
3. **Indirizzo GitHub**: `TUOUSERNAME.github.io`, già incluso e senza scadenza.

Con un dominio proprio (strada 1) i passaggi sono questi:

1. In GitHub, nel repository, vai in Settings, poi Pages, scrivi il dominio nel campo "Custom domain" (per esempio `tuonome.me`) e salva.
2. Nel pannello DNS di chi ti ha dato il dominio aggiungi:
   - quattro record **A** per il dominio principale (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - facoltativo, quattro record **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - un record **CNAME** per `www` che punta a `TUOUSERNAME.github.io` (il nome utente, non quello del repository)
3. Aspetta che il DNS si aggiorni (da pochi minuti fino a 24 ore). Poi in Settings, Pages, spunta "Enforce HTTPS".

Consigliato: verifica il dominio anche nelle impostazioni del tuo account (Settings, Pages, "Add a domain"), così nessun altro può usarlo su GitHub Pages.

## 5. Facoltativo: caratteri ospitati sul tuo sito

Il carattere viene caricato dai server di Google. Se preferisci evitarlo (privacy), scarica Source Sans 3 da fonts.google.com, metti i file `.woff2` in `assets/fonts/`, dichiara i caratteri in `assets/css/style.css` con `@font-face` e cancella le tre righe `<link>` di Google Fonts in `index.html`.
