# Turbiini Startup Studio & Hakuseula

Avoimet, selaimessa toimivat oppimistyökalut **Turbiini Arabia** -yrityshautomoon (Metropolia AMK, kurssi KM00FJ37-3006).

Ei asennuksia, ei palvelinta, ei tietokantaa, ei käyttäjätilejä. Jokainen työkalu on **yksi HTML-tiedosto**, joka toimii sellaisenaan selaimessa, Moodlessa SCORM-pakettina ja puhelimessa sovelluksena.

---

## Työkalut

### Startup Studio (`docs/studio.html`)
14 maanantaitapaamisen matka ideasta liiketoimintamalliin (7.9.–14.12.2026, syysloma vk 42).

- Vaiheittainen kurssirunko: SWOT → ideointi → Business Model Canvas → asiakasymmärrys → hinnoittelu → talous → prototypointi → pitch → myynti → jatkopolku
- **Kolme elävää graafia:** liikeidea, osaaminen ja rahoitusvalmius
- **Portfolio neljässä osassa:** Minä yrittäjänä, Yritysidea, Rahoitusmallit, Soveltuva yritystoiminta
- **Vaikuttavuus tapaamisittain:** näyttää miten kukin tapaaminen on suhteessa muihin ja missä työ kannattaa
- Tekoälyvalmentaja "Turbo" (valinnainen, oma API-avain)
- Liitetiedostot (PDF, Word, PowerPoint, Excel, kuvat) joka vaiheeseen
- Kielet: suomi ja englanti

### Hakuseula (`docs/hakuseula.html`)
Läpinäkyvä itsearviointi hakuvaiheeseen.

- Hakija kirjoittaa omin sanoin, mittari näyttää yhteensopivuuden reaaliajassa
- **Täysin läpinäkyvä:** työkalu kertoo mitä se lukee ja mikä nostaa tai laskee mittaria
- Koko näytön tila ja asennus puhelimeen (PWA)
- Kielet: suomi, englanti, ruotsi, espanja
- Tulos jää hakijalle — mitään ei lähetetä automaattisesti

---

## Julkaisu GitHub Pagesiin

1. Luo uusi repositorio GitHubissa ja lataa tämän kansion sisältö sinne.
2. Mene **Settings → Pages**.
3. Kohdassa *Build and deployment*: **Source = Deploy from a branch**.
4. Valitse **Branch = `main`** ja **Folder = `/docs`**. Tallenna.
5. Muutaman minuutin kuluttua sivusto on osoitteessa:

```
https://KÄYTTÄJÄNIMI.github.io/REPON-NIMI/
```

Työkalut löytyvät osoitteista `.../studio.html` ja `.../hakuseula.html`.

---

## Käyttöönotto Moodlessa

### Tapa A — SCORM-paketti (suositus)
Tallentaa opiskelijan edistymisen Moodleen.

1. Kurssilla: **Muokkaustila päälle → Lisää aktiviteetti tai aineisto → SCORM-paketti**
2. Vedä tiedosto `scorm/turbiini_studio_SCORM.zip` (tai `turbiini_hakuseula_SCORM.zip`)
3. **Ulkoasu → Näyttötapa: "Uudessa ikkunassa"** (näin koko näytön tila toimii varmasti)
4. Tallenna

### Tapa B — Suora linkki
Jaa GitHub Pages -osoite. Tämä on ainoa tapa, jolla **puhelinasennus (PWA)** toimii kunnolla.

### Tapa C — Upotus sivulle

```html
<iframe src="https://KÄYTTÄJÄNIMI.github.io/REPON-NIMI/hakuseula.html"
  style="width:100%;height:90vh;border:0;border-radius:12px"
  allow="fullscreen" allowfullscreen></iframe>
```

> **Koko näyttö Moodlessa:** Moodle ei aina lisää iframeen `allowfullscreen`-attribuuttia. Jos aito koko näyttö on estetty, työkalu siirtyy automaattisesti leveään tilaan — käyttäjä ei jää jumiin.

---

## Tekoälyvalmentaja (valinnainen)

Studion Turbo-valmentaja on **lisäominaisuus**. Mittarit, vaiheet, portfolio ja pelillisyys toimivat aina ilman sitä; ilman avainta työkalu näyttää paikalliset varavinkit.

| Palvelu | Toimii selaimesta | Huomio |
|---|---|---|
| Anthropic Claude | Kyllä | Oma API-avain |
| Google Gemini | Kyllä | Oma API-avain |
| OpenAI GPT | Ei | Vaatii välipalvelimen (CORS) |

Avain syötetään työkalun **"🤖 AI"** -valikosta ja se tallentuu **vain käyttäjän omaan selaimeen**.

> ⚠️ **Älä koskaan lisää API-avainta tähän repositorioon.** Julkisessa repossa avain on kaikkien luettavissa ja se voidaan käyttää sinun laskuusi. Jos haluat, ettei opiskelijoiden tarvitse hankkia omaa avainta, tarvitaan erillinen välipalvelin, johon avain jää piiloon.

---

## Rakenne

```
.
├── docs/                       # GitHub Pages julkaisee VAIN tämän kansion
│   ├── index.html              # etusivu
│   ├── studio.html             # Startup Studio (julkaistava kopio)
│   ├── hakuseula.html          # Hakuseula (julkaistava kopio)
│   ├── scorm/                  # ladattavat paketit sivustolta
│   ├── .nojekyll               # estää Jekyll-käsittelyn
│   ├── Turbiini_Moodle_asennusohje.docx
│   └── Turbiini_analyysi_ja_parannukset.docx
├── src/                        # LÄHDETIEDOSTOT — muokkaa näitä
│   ├── studio.html
│   └── hakuseula.html
├── scorm/                      # rakennetut SCORM 1.2 -paketit
├── tools/                      # rakennus- ja tarkistusskriptit
│   ├── build_scorm.sh
│   ├── check_scorm.py
│   └── extract_js.py
├── .github/workflows/build.yml # automaattinen rakennus pushin yhteydessä
└── README.md
```

### Työnkulku muokkaamiseen

1. Muokkaa tiedostoa kansiossa **`src/`** (esim. `src/studio.html`).
2. Committaa ja pushaa.
3. GitHub Actions tarkistaa JavaScriptin, kopioi tiedostot `docs/`-kansioon ja rakentaa SCORM-paketit uudelleen automaattisesti.

Voit myös rakentaa paikallisesti:

```bash
bash tools/build_scorm.sh
```

---

## Tietosuoja

- Opiskelijan työ tallentuu **hänen omaan selaimeensa**, Moodleen (SCORM) tai hänen itse lataamaansa JSON-varmuuskopioon.
- Mitään ei lähetetä ulkopuolelle ilman käyttäjän omaa toimintoa.
- API-avaimet tallentuvat vain käyttäjän selaimeen.
- Työkalussa on tietosuojaportti ja mahdollisuus viedä tai poistaa omat tiedot.

---

## Lisenssi ja käyttö

Tehty Metropolia Ammattikorkeakoulun Turbiini Arabia -yrityshautomoa varten. Lisää lisenssitiedosto (esim. MIT tai CC BY-SA) ennen laajempaa jakelua, jos haluat sallia vapaan uudelleenkäytön.

**Huom:** Työkalut ovat oppimisen ja itsearvioinnin välineitä. Mittarit eivät ole virallisia arvosanoja eivätkä rahoituslupauksia — lopullisen arvioinnin tekevät kurssin ohjaajat.
