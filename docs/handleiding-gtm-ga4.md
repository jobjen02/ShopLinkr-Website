# Handleiding: GA4 & Google Tag Manager instellen (voor beginners)

Deze handleiding is geschreven voor iemand die GTM en GA4 **niet** kent. Je hoeft
niets te programmeren — alles gebeurt met klikken in twee websites van Google.
Neem er rustig 30–45 minuten voor.

De code op de website is al klaar: bij elke belangrijke klik en formulier-inzending
stuurt de site een "seintje" (een *event*) de lucht in. In deze handleiding zorg je
dat Google die seintjes **opvangt** en **omzet in rapporten**.

---

## 1. Het plaatje: hoe hangt dit samen?

```
Bezoeker klikt op "Demo inplannen"
        │
        ▼
Website stuurt een seintje  ──►  Google Tag Manager (GTM)  ──►  Google Analytics (GA4)
   (dit is al gebouwd)            de "postsorteerder"           de "rapporten"
```

- **Google Tag Manager (GTM)** = een doorgeefluik. Het vangt de seintjes van de site
  op en stuurt ze naar de juiste plek (GA4, en later eventueel Google Ads, een
  Facebook-pixel, enz.). Je stelt dit in zónder code.
- **Google Analytics 4 (GA4)** = waar je de cijfers en rapporten ziet: hoeveel
  bezoekers, uit welke landen, wie op welke knop klikt, enzovoort.

Je website praat dus niet rechtstreeks met GA4 — GTM zit er netjes tussen. Dat is
bewust: zo kun je later van alles toevoegen zonder de site aan te passen.

---

## 2. Woordenlijst (belangrijk, even doorlezen)

**In Google Tag Manager:**

| Woord | Wat het is (in gewone taal) |
|---|---|
| **Tag** | Een opdracht: "stuur dit door naar GA4". |
| **Trigger** | De voorwaarde die de tag afvuurt: "wanneer er een demo-klik binnenkomt". |
| **Variable** (variabele) | Een stukje informatie uit het seintje, bijv. *waar* op de pagina geklikt is. |
| **Container** | Jouw GTM-account voor deze website (heeft een ID als `GTM-M33XL5PD`). |
| **Publish** | Pas als je publiceert, gaat je wijziging live. Daarvóór verandert er niets. |

**In Google Analytics 4:**

| Woord | Wat het is |
|---|---|
| **Event** | Een gebeurtenis, bijv. `demo_booking_click`. Jouw site stuurt deze al. |
| **Key event** (voorheen "conversie") | Een event dat je als bel­angrijk markeert, bijv. een demo-aanvraag. |
| **Custom dimension** | Een extra kolom in je rapporten, bijv. "op welke plek is geklikt". |
| **Measurement ID** | Het nummer van jouw GA4, ziet eruit als `G-XXXXXXXXXX`. |

---

## 3. Voordat je begint

1. **Log in** op beide met je Google-account:
   - Tag Manager: <https://tagmanager.google.com>
   - Analytics: <https://analytics.google.com>
2. Je moet **beheerder** (of "bewerken"-rechten) zijn. Ben je dat niet, vraag het
   aan degene die de accounts beheert.
3. **Zoek je Measurement ID op** (heb je zo nodig):
   GA4 → linksonder op het **tandwiel (Admin)** → onder *Data collection and
   modification* → **Data streams** → klik op je stream → rechtsboven staat
   **Measurement ID** (`G-XXXXXXXXXX`). Schrijf 'm even op.

---

## DEEL A — Google Tag Manager instellen

> Open <https://tagmanager.google.com> en klik je juiste **container** open
> (die met ID `GTM-M33XL5PD`). Je ziet links een menu met o.a. **Tags**,
> **Triggers**, **Variables**.

### A1. Controleer of GA4 al bestaat in GTM

Klik links op **Tags**. Kijk of er al een tag staat van het type **Google tag**
of **GA4 Configuration** (vaak heet die "Google Tag" of "GA4 - Config").

- **Staat die er?** Mooi, ga door naar A2.
- **Staat die er niet?** Maak 'm eerst aan:
  1. **Tags → New → Tag Configuration → Google tag**.
  2. Vul bij **Tag ID** je Measurement ID in (`G-XXXXXXXXXX`).
  3. Onder **Triggering** kies **All Pages**.
  4. Noem 'm `Google Tag - GA4` en klik **Save**.

Deze tag zorgt voor je paginaweergaves én de automatische **landen-data**.

### A2. Zet de ingebouwde variabele "Event" aan

1. Klik links op **Variables**.
2. Bovenaan bij *Built-In Variables* → knop **Configure**.
3. Scroll naar de sectie **Utilities** en vink **Event** aan.
4. Sluit het paneel. (Je gebruikt `{{Event}}` straks als de naam van het event.)

### A3. Maak de variabelen aan (10 stuks)

Deze halen de details uit het seintje. Voor **elk** woord hieronder één variabele:

`cta_id`, `cta_text`, `cta_location`, `link_url`, `link_domain`, `link_text`,
`page_path`, `page_language`, `form_id`, `source`

Per variabele:
1. **Variables** → onderaan bij *User-Defined Variables* → **New**.
2. Klik in het grote vlak → **Data Layer Variable**.
3. Bij **Data Layer Variable Name** typ je het woord *exact*, bijv. `cta_location`.
4. Bovenaan geef je 'm dezelfde naam, bijv. `cta_location` → **Save**.
5. Herhaal tot alle 10 er staan.

> Tip: het exact overtypen luistert nauw — `cta_location`, niet `CTA_Location`.

### A4. Maak één trigger voor alle events

1. Klik links op **Triggers → New**.
2. Klik in het vak → **Trigger Configuration** → kies **Custom Event**.
3. Bij **Event name** plak je precies dit:
   ```
   demo_booking_click|register_click|login_click|outbound_click|generate_lead|newsletter_signup|pricing_calculator_use
   ```
4. Vink aan: **Use regex matching** (staat eronder).
5. Noem de trigger `CE - ShopLinkr events` → **Save**.

> Wat doet dit? Deze ene trigger vuurt bij álle events die de site stuurt, in
> plaats van dat je er zeven los moet maken.

### A5. Maak één GA4-tag die alles doorstuurt

1. **Tags → New**.
2. Klik in het vak → **Tag Configuration** → kies **Google Analytics: GA4 Event**.
3. Bij **Measurement ID / Configuration tag**: kies je *Google Tag* uit A1 (of vul
   je `G-XXXXXXXXXX` in).
4. Bij **Event Name**: typ letterlijk `{{Event}}` (met de dubbele accolades). Zo
   krijgt elk event automatisch zijn eigen naam mee.
5. Klik **Event Parameters** open → **Add Row** en vul deze rijen in
   (linkerkolom = de naam, rechterkolom = de variabele tussen accolades):

   | Parameter Name | Value |
   |---|---|
   | `cta_id` | `{{cta_id}}` |
   | `cta_text` | `{{cta_text}}` |
   | `cta_location` | `{{cta_location}}` |
   | `link_url` | `{{link_url}}` |
   | `link_domain` | `{{link_domain}}` |
   | `link_text` | `{{link_text}}` |
   | `page_path` | `{{page_path}}` |
   | `page_language` | `{{page_language}}` |
   | `form_id` | `{{form_id}}` |
   | `source` | `{{source}}` |

   > Tip: bij het intypen van `{{` toont GTM een lijstje — kies daaruit, dan
   > weet je zeker dat de naam klopt. Lege parameters worden vanzelf overgeslagen.

6. Onder **Triggering** → kies `CE - ShopLinkr events`.
7. Noem de tag `GA4 - ShopLinkr events` → **Save**.

### A6. Testen vóór je live gaat (Preview)

1. Klik rechtsboven op **Preview**.
2. Vul je site-adres in (`https://shoplinkr.com`) → **Connect**. Je site opent in
   een nieuw venster met een klein "Tag Assistant"-balkje.
3. Klik op de site op **Demo inplannen** of **Gratis starten**.
4. Kijk in het Tag Assistant-venster: links verschijnt het event (bijv.
   `demo_booking_click`) en je tag `GA4 - ShopLinkr events` staat bij **Tags Fired**.
5. Klopt het? Sluit Preview.

### A7. Publiceren (nu pas gaat het live!)

1. Klik rechtsboven op **Submit**.
2. Geef een korte omschrijving, bijv. "ShopLinkr events naar GA4".
3. Klik **Publish**. Klaar — GTM stuurt nu de events door naar GA4.

---

## DEEL B — Google Analytics 4 instellen

> Open <https://analytics.google.com>. Zorg dat je de juiste **property** hebt
> geselecteerd (bovenaan). Instellingen zitten linksonder onder het **tandwiel
> (Admin)**.

### B1. Controleer dat de events binnenkomen

1. Links in het menu: **Reports → Realtime** (of Admin → **DebugView** als je
   Preview uit A6 nog aan hebt).
2. Klik ondertussen op je eigen site op een knop.
3. Binnen ~30 seconden zie je het event verschijnen. Zo weet je dat de koppeling werkt.

> Nieuwe events kunnen tot 24 uur duren voordat ze in de gewone lijsten staan.
> Realtime/DebugView is direct.

### B2. Markeer je conversies (Key events)

1. **Admin** (tandwiel) → onder *Data display* → **Events**.
2. Je ziet een lijst met eventnamen. Zet het schuifje **Mark as key event** aan bij:
   - `demo_booking_click`
   - `register_click`
   - `generate_lead`
   - `newsletter_signup`

> Staan ze er nog niet? Dan zijn ze nog niet binnengekomen — klik eerst even op je
> site (B1) en wacht. Je kunt een key event ook alvast op naam aanmaken via de knop
> bovenin.

### B3. Maak custom dimensions (zodat je kunt filteren)

Zonder deze stap verzamelt GA4 de details wél, maar kun je er niet goed op filteren
in de rapporten. Doe dit voor de belangrijkste:

1. **Admin** → onder *Data display* → **Custom definitions**.
2. Knop **Create custom dimension**. Maak deze drie (Scope = **Event**):

   | Dimension name | Event parameter |
   |---|---|
   | `CTA locatie` | `cta_location` |
   | `Taal` | `page_language` |
   | `CTA tekst` | `cta_text` |

3. **Save** per stuk. (Data verschijnt vanaf nu; met terugwerkende kracht kan het niet.)

### B4. Zet data-retentie op 14 maanden

Standaard bewaart GA4 details maar 2 maanden voor de verkennende rapporten. Zet 'm hoger:

1. **Admin** → onder *Data collection and modification* → **Data retention**.
2. Zet **Event data retention** op **14 months** → **Save**.

### B5. Waar zie je de landen van je bezoekers?

Automatisch, geen instelling nodig:
**Reports → User → User attributes → Demographic details** → bovenin wisselen naar
**Country** (of Region/City).

Tip: in bijna elk rapport kun je rechtsboven een **secundaire dimensie** toevoegen
(blauw plusje) → kies *Country*, zodat je bijv. je demo-aanvragen per land ziet.

---

## DEEL C — Een eerste eigen rapport maken (optioneel)

Wil je zien welke knop-plek het beste werkt?

1. Links: **Explore** → **Blank** (nieuwe verkenning).
2. Bij **Dimensions** (plusje) → voeg toe: *Event name* en je custom dimension
   *CTA locatie*.
3. Bij **Metrics** (plusje) → voeg toe: *Event count*.
4. Sleep *Event name* en *CTA locatie* naar **Rows**, en *Event count* naar **Values**.
5. Je ziet nu per event én per plek (hero, header, prijzen…) hoe vaak er geklikt is.

---

## Problemen oplossen

- **Ik zie geen events in GTM Preview.** Draait de Preview-modus nog? Heb je op de
  júiste knop geklikt (demo/registratie/inloggen)? Ververs de sitepagina in het
  Preview-venster.
- **Events komen in GTM binnen, maar niet in GA4.** Check dat je in A5 de juiste
  Measurement ID/Google Tag koos, en dat je in A7 hebt **gepubliceerd**.
- **Ik zie de details (cta_location e.d.) niet in mijn rapporten.** Heb je B3
  gedaan? Custom dimensions werken pas ná het aanmaken en alleen vooruit.
- **Mijn cijfers lijken laag.** GA4 kan bij lage aantallen rijen verbergen
  (drempelwaarden). Dat is normaal en trekt bij met meer verkeer.

---

## Samengevat

1. GTM: GA4-tag checken → variabelen (A3) → één trigger (A4) → één GA4-tag (A5) →
   testen (A6) → **publiceren (A7)**.
2. GA4: events checken (B1) → conversies markeren (B2) → custom dimensions (B3) →
   retentie 14 maanden (B4).

Daarna meet je alles: knopkliks per plek, demo vs. registratie, formulieren,
prijscalculator-gebruik, én de landen van je bezoekers.
