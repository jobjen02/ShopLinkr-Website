# GA4 event tracking

Hoe de website meetdata naar GA4 stuurt, welke events er zijn, en wat je nog
éénmalig in Google Tag Manager (GTM) en GA4 moet instellen om er rapporten en
conversies van te maken.

## Architectuur

De site laadt **Google Tag Manager** (container `GTM-M33XL5PD`, in
`src/components/seo/BaseHead.astro`). De website praat **niet** rechtstreeks met
GA4: hij duwt schone, semantische events op `window.dataLayer`, en GTM stuurt die
door naar GA4. Zo blijft alle tag-configuratie in GTM en krijg je geen dubbele
tags.

```
Bezoeker klikt/verzendt  ->  window.dataLayer.push({...})  ->  GTM  ->  GA4
                             (src/lib/analytics.ts)            (jij configureert)
```

Alle event-logica zit in **`src/lib/analytics.ts`**:

- `track(event, params)` — duwt een event op de dataLayer (laat `undefined` weg).
  Voegt automatisch de globale defaults `page_language` en `page_path` toe (uit
  de DOM), zodat geen enkele aanroep die zelf hoeft mee te geven. Wil je een
  extra default op elk event? Zet 'm op één plek in `defaultParams()`.
- `initClickTracking()` — één gedelegeerde klik-listener op `document` die de
  belangrijke knoppen en uitgaande links herkent. Wordt site-breed gestart in
  `src/layouts/BaseLayout.astro`, dus geldt op elke pagina.

> **Privacy:** er wordt nooit persoonlijke data meegestuurd — alleen
> interactie-metadata (welke knop, waar op de pagina, welke taal). De
> formulier-events sturen alleen een `form_id`, nooit de ingevulde naam/e-mail.

> **Consent:** de cookiebanner is (bewust, voor nu) **niet** aan Google Consent
> Mode gekoppeld. Deze events vuren dus ongeacht de bannerkeuze. Wil je dit later
> AVG-proof maken, dan is Google Consent Mode v2 de vervolgstap.

## Event-catalogus

Knop-events worden automatisch afgeleid uit de centrale links in
`src/data/externalLinks.ts` — je hoeft dus geen losse knoppen aan te passen als
er ergens een nieuwe "Demo inplannen"- of "Gratis starten"-knop bijkomt.

| Event                    | Wanneer                                                        | Parameters |
|--------------------------|---------------------------------------------------------------|------------|
| `demo_booking_click`     | Klik op een **Demo inplannen**-knop (`crm.shoplinkr.com`)     | `cta_id`, `cta_text`, `cta_location`, `link_url`, `page_path`, `page_language` |
| `register_click`         | Klik op een **registratie**-knop (`app.shoplinkr.com/auth/register`) | idem |
| `login_click`            | Klik op een **inloggen**-knop (`app.shoplinkr.com`)          | idem |
| `outbound_click`         | Klik op een willekeurige andere externe link                  | `link_url`, `link_domain`, `link_text`, `cta_location`, `page_path`, `page_language` |
| `generate_lead`          | Contactformulier succesvol verzonden                          | `form_id` (`contact`), `page_language` |
| `newsletter_signup`      | Nieuwsbrief-aanmelding succesvol                              | `form_id` (`newsletter`), `source` (`website-footer`), `page_language` |
| `pricing_calculator_use` | Eerste interactie met de prijscalculator (één keer per bezoek)| `page_language` |

### `cta_location` waarden

Vertelt je *waar* op de pagina er geklikt is, zodat je ziet welke plaatsing
converteert:

- `header`, `mobile_menu`, `footer` — automatisch herkend uit de bestaande markup.
- `hero`, `cta_banner`, `pricing` — expliciet gemarkeerd via
  `data-analytics-location` op die secties.
- `page_body` — elke andere plek (het `page_path` vertelt je dan nog steeds op
  welke pagina).

Wil je een extra sectie apart kunnen meten? Zet
`data-analytics-location="mijn_sectie"` op de omhullende `<section>`/`<div>`.

## Landen van gebruikers (geen code nodig)

Land, regio en stad leidt GA4 **automatisch** af uit het IP-adres. Zodra de
GA4-configuratietag in GTM live staat (zie hieronder), vind je dit onder:

**Reports → User → User attributes → Demographic details → Country** (of Region /
City). Je kunt in vrijwel elk rapport ook _Country_ als secundaire dimensie
toevoegen, bijv. om te zien uit welke landen je demo-aanvragen komen.

## Setup in GTM (container `GTM-M33XL5PD`)

De GTM-kant is als kant-en-klaar importbestand aangeleverd; je hoeft de
variabelen/triggers/tags niet met de hand te bouwen. De opzet daar:

- **Variabelen** — Data Layer Variables voor `cta_id`, `cta_text`, `cta_location`,
  `link_url`, `link_domain`, `link_text`, `form_id`, `source`, `page_language`.
- **Trigger** `CE - ShopLinkr events` — één *Custom Event*-trigger met een regex
  op alle eventnamen uit de tabel hierboven.
- **Tag** `GA4 - ShopLinkr events` — één GA4 Event-tag met `{{Event}}` als
  eventnaam, die de variabelen hierboven als event-parameters meestuurt.

`page_path` wordt bewust *niet* als custom parameter doorgegeven: GA4 legt de
pagina al bij elk event vast, en een eigen parameter met dezelfde naam levert
een verwarrende dubbele dimensie op. De dataLayer bevat 'm wel.

> **Volgorde bij uitrollen:** zet eerst deze site-code live, publiceer daarna pas
> de GTM-container. De container leunt op de events uit `analytics.ts`; publiceer
> je GTM eerder, dan is er even niets dat die events verstuurt.

Let op één interactie met de bestaande Meta-opzet in de container: er staat een
trigger die op *elk* custom event vuurt (alles wat niet met `gtm.` begint). Die
pakt deze events dus automatisch mee richting de Facebook-pixel. `generate_lead`
wordt daarbij vertaald naar het Meta-standaardevent `Lead`. De ruisgevoelige
events (`outbound_click`, `login_click`, `pricing_calculator_use`) zijn met een
blokkeertrigger uitgesloten.

## Éénmalige setup in GA4

1. **Markeer conversies (Key events).** Admin → Data display → Events: zet de
   belangrijke events op *Mark as key event*, bijv. `demo_booking_click`,
   `register_click`, `generate_lead`, `newsletter_signup`.
2. **Registreer custom dimensions** (optioneel, om op te kunnen filteren).
   Admin → Custom definitions → Create custom dimension, scope *Event*, bijv.
   dimensie "CTA location" → event parameter `cta_location`. Doe hetzelfde voor
   `page_language`, `cta_text`, `form_id` naar wens.

## Testen

- **GTM Preview / Tag Assistant:** open de site via Preview, klik op knoppen en
  verstuur de formulieren; je ziet de events binnenkomen en de tags vuren.
- **GA4 DebugView:** Admin → DebugView toont de events live (samen met GTM
  Preview of de *Google Analytics Debugger*-extensie).
- **Console:** typ `window.dataLayer` in de browserconsole om de gepushte events
  te zien.

## Onderhoud

- Nieuwe demo-/registratie-/login-knop nodig? Gebruik `externalLinks` — de
  tracking werkt dan automatisch mee.
- Ander soort interactie meten (bijv. video-play, tabwissel)? Importeer
  `track` uit `src/lib/analytics.ts` en roep `track('mijn_event', { ... })` aan,
  en voeg het event toe aan de tabel hierboven én aan GTM.
