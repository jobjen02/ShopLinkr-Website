# ShopLinkr site audit — bevindingen

_Gegenereerd 2026-06-22. File-by-file review van de hele Astro-site (98 review-units, ~400 agents), plus eigen live-server verificatie._

## Samenvatting

| Severity | Aantal |
|---|---|
| critical | 4 |
| high | 64 |
| medium | 145 |
| low | 169 |
| **Totaal** | **382** |

**Verificatie vooraf (mechanisch, schoon):** 0 emdash, 0 placeholders, merknaam-casing correct, volledige NL/EN bestandspariteit, productie-build slaagt (418 pagina's + sitemap).

**Eigen live-server checks:** alle 357 interne nav/component-links 200; alle content-links getest. Enige kapotte interne links = de /koppelingen/-cluster (zie High). 6 vermeende kapotte vvb-links waren vals (Astro stript de haakjes uit de slug) en zijn verwijderd.

### Per gebied

| Gebied | C | H | M | L |
|---|---|---|---|---|
| Blog content | 4 | 33 | 64 | 49 |
| Config/routing/SEO | 0 | 1 | 4 | 6 |
| Data (faq/categories) | 0 | 0 | 0 | 2 |
| Integration content | 0 | 1 | 1 | 5 |
| Other | 0 | 0 | 3 | 0 |
| Page components | 0 | 1 | 5 | 20 |
| Support content | 0 | 20 | 37 | 44 |
| UI components & layout | 0 | 3 | 13 | 15 |
| i18n copy dict | 0 | 5 | 18 | 28 |

---

## 🔴 Critical (4)

### Blog content

**`src/content/blogs-en/how-to-connect-sendy-to-shopify.md`** — line 14 (<p>...Sendy is a self-hosted email marketing platform...</p>); same product framing throughout (lines 11-12, 16-29, 47-48, 134)  
*[factual]* This article describes Sendy as "a self-hosted email marketing platform built on Amazon Simple Email Service (SES)" for sending newsletters/campaigns. That contradicts ShopLinkr's own integration definition: src/content/integrations-en/sendy.json defines Sendy with category "carrier" and about text "Sendy is shipping software that helps businesses send parcels efficiently... connects carriers such as PostNL, DHL and DPD... create shipping labels automatically." The article is about the unrelated open-source email tool, not the ShopLinkr carrier integration, so the entire premise (connecting an email platform to Shopify for email marketing) is fabricated relative to what ShopLinkr supports. The link on line 14 even points to https://shoplinkr.com/koppelingen/sendy (the shipping-carrier integration page) while the surrounding text calls it email-marketing software.  
→ Rewrite the article so Sendy is described as shipping/carrier software (per sendy.json): connecting Sendy to Shopify to generate carrier shipping labels and streamline parcel shipping, not email marketing. Align with the sibling article how-to-connect-sendy-to-bol.md, which correctly describes Sendy as a shipping/fulfilment platform.

**`src/content/blogs-en/how-to-connect-sendy-to-woocommerce.md`** — line 14 (<p>Sendy is an email marketing platform...</p>); same framing throughout (lines 11-12, 16-29, 34-46, 50)  
*[factual]* Same fabricated product identity as the Shopify article: Sendy is described as "an email marketing platform that lets you easily create, send and analyze newsletters" with a "Sendy-WooCommerce plugin" syncing customer data into email lists. This contradicts ShopLinkr's integration definition (src/content/integrations-en/sendy.json: Sendy is a shipping carrier, "shipping software... create shipping labels automatically," connects PostNL/DHL/DPD). The described email-marketing workflow and the "Sendy-WooCommerce plugin" are invented relative to what ShopLinkr offers.  
→ Rewrite to describe Sendy as carrier/shipping software per sendy.json and frame the WooCommerce connection around generating shipping labels and streamlining parcel shipping, consistent with how-to-connect-sendy-to-bol.md.

**`src/content/blogs/hoe-koppel-ik-qls-met-shopify.md`** — line 15-16, body: "QLS, oftewel Quick Label Systems ... gespecialiseerd is in het ontwikkelen van op maat gemaakte oplossingen voor label- en verpakkingsbehoeften ... oprichting in 1982"  
*[factual]* The entire QLS framing here is fabricated and contradicts ShopLinkr's product context. It defines QLS as 'Quick Label Systems', a label/packaging company founded in 1982 that makes 'professionele labels' for products. The project ground truth (src/content/integrations/qls.json) describes QLS as a fast-growing Benelux e-commerce logistics carrier (fulfilment, pakketdienst, my.QLS software), with no 1982 founding and no label-manufacturing business. The acronym expansion, the founding year (1982) and the company description all appear invented.  
→ Rewrite the QLS introduction to match the integration data: QLS is an e-commerce logistics/carrier partner; ShopLinkr lets you request and print QLS shipping labels with automatic tracking back to your webshop. Remove the invented 1982 founding date and the 'Quick Label Systems / op maat gemaakte label- en verpakkingsoplossingen' description.

**`src/content/blogs/hoe-koppel-ik-sendy-met-woocommerce.md`** — frontmatter excerpt (line 3) + body lines 11, 13, 16, 19, 24, 27-28  
*[factual]* Sendy wordt beschreven als 'een platform voor e-mailmarketing' voor nieuwsbrieven, segmentatie, open-/klikpercentages en e-maillijsten. Dit is onjuist: in de ShopLinkr-context is Sendy een vervoerder/verzendsoftware (src/content/integrations/sendy.json, category 'carrier'). Het artikel verwart Sendy met een e-mailtool en is intern tegenstrijdig met hoe-koppel-ik-sendy-met-bol.md, dat Sendy correct als fulfilment-/verzendplatform omschrijft.  
→ Herschrijf het artikel rond Sendy als verzend-/fulfilmentsoftware (vervoerders, verzendlabels, orderverwerking) gekoppeld via ShopLinkr aan WooCommerce. Verwijder alle e-mailmarketing-, nieuwsbrief- en e-maillijst-claims, inclusief de excerpt op regel 3.

## 🟠 High (64)

### Blog content

**`src/content/blogs-en/connect-woocommerce-to-shoplinkr.md`** — line 3 (frontmatter `excerpt`)  
*[copy]* The WooCommerce article's excerpt names the wrong integration: "Discover the power of the integration between ShopLinkr and Shopify." This is a copy-paste leftover from connect-shopify-to-shoplinkr.md (whose excerpt is identical except for the verb). On a WooCommerce article it is factually wrong and will show wrong meta/preview text in listings and search results.  
→ Change "between ShopLinkr and Shopify" to "between ShopLinkr and WooCommerce" so the excerpt reads: "Discover the power of the integration between ShopLinkr and WooCommerce. Simplify your order management, process orders and print shipping labels with ease."

**`src/content/blogs-en/effective-inventory-management-with-excel.md`** — lines 11, 22 (blog links) and line 14 (template link)  
*[cross-language-link]* All in-body cross-links in this EN article point to Dutch pages: blog links go to https://shoplinkr.com/blogs/<dutch-slug> (alles-wat-je-moet-weten-over-voorraadbeheer-in-excel, voorraadbeheer-met-excel-een-complete-gids, het-belang-van-effectief-voorraadbeheer, het-belang-van-goed-voorraadbeheer-voor-jouw-webshop, waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen), and line 14 links to the NL landing /voorraadbeheer-excel-template. The EN route is /en/blog/<en-slug> and an EN landing exists at /en/inventory-excel-template, so an English reader is sent to Dutch content. EN equivalents exist for every target (verified via translationKey).  
→ Repoint to the EN equivalents: /en/blog/everything-you-need-to-know-about-inventory-management-in-excel, /en/blog/inventory-management-with-excel-a-complete-guide, /en/blog/the-importance-of-effective-inventory-management, /en/blog/the-importance-of-good-inventory-management-for-your-webshop, /en/blog/why-is-inventory-management-important-tips-and-benefits, and change the template link to /en/inventory-excel-template.

**`src/content/blogs-en/everything-you-need-to-know-about-inventory-management-in-excel.md`** — lines 11, 13, 20, 34 (blog/landing links) and line 16 (template link)  
*[cross-language-link]* All in-body cross-links point to Dutch pages: /blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop (line 11), /blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen (line 13), /blogs/voorraadmanagement (line 20), the NL landing https://shoplinkr.com/voorraadbeheer-systeem (line 34), and the NL template landing /voorraadbeheer-excel-template (line 16). The EN route is /en/blog/<en-slug>; EN equivalents exist for all targets, so English readers land on Dutch content.  
→ Repoint to /en/blog/the-importance-of-good-inventory-management-for-your-webshop, /en/blog/why-is-inventory-management-important-tips-and-benefits, /en/blog/inventory-management (translationKey voorraadmanagement), the EN inventory-system landing /en/inventory-management-system, and /en/inventory-excel-template for the template link.

**`src/content/blogs-en/excel-inventory-management-everything-you-need-to-know.md`** — lines 11, 13, 16, 19, 20 (blog links) and line 14 (template link)  
*[cross-language-link]* All in-body cross-links point to Dutch pages: /blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel (11), /blogs/voorraadbeheer-met-excel-een-complete-gids (13), /blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop (16), /blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen (19), /blogs/het-belang-van-effectief-voorraadbeheer (20), plus the NL template landing /voorraadbeheer-excel-template (14). The EN route is /en/blog/<en-slug>; EN equivalents exist, so English readers are sent to Dutch content.  
→ Repoint to /en/blog/everything-you-need-to-know-about-inventory-management-in-excel, /en/blog/inventory-management-with-excel-a-complete-guide, /en/blog/the-importance-of-good-inventory-management-for-your-webshop, /en/blog/why-is-inventory-management-important-tips-and-benefits, /en/blog/the-importance-of-effective-inventory-management, and /en/inventory-excel-template for the template link.

**`src/content/blogs-en/free-inventory-management-excel-template-download-now.md`** — lines 11, 32, 49 (blog links) and lines 11, 13, 15, 53, 78 (template links)  
*[cross-language-link]* All in-body cross-links point to Dutch pages: blog links to /blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel (11), /blogs/voorraadbeheer-met-excel-een-complete-gids (32), /blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop (49), and multiple links to the NL template landing /voorraadbeheer-excel-template (lines 11, 13, 15, 53, 78). The EN route is /en/blog/<en-slug> and an EN landing exists at /en/inventory-excel-template, so English readers land on Dutch content. This article's primary CTA (the template download) is especially affected.  
→ Repoint blog links to /en/blog/everything-you-need-to-know-about-inventory-management-in-excel, /en/blog/inventory-management-with-excel-a-complete-guide, /en/blog/the-importance-of-good-inventory-management-for-your-webshop; repoint all template-download links to /en/inventory-excel-template.

**`src/content/blogs-en/free-inventory-management-in-excel-heres-how.md`** — lines 11, 13, 18, 24 (blog links) and lines 16, 19, 30 (template links)  
*[cross-language-link]* All in-body cross-links point to Dutch pages: /blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel (11), /blogs/voorraadbeheer-met-excel-een-complete-gids (13), /blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop (18), /blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen (24), plus the NL template landing /voorraadbeheer-excel-template (lines 16, 19, 30). The EN route is /en/blog/<en-slug>; EN equivalents exist, so English readers are sent to Dutch content.  
→ Repoint to /en/blog/everything-you-need-to-know-about-inventory-management-in-excel, /en/blog/inventory-management-with-excel-a-complete-guide, /en/blog/the-importance-of-good-inventory-management-for-your-webshop, /en/blog/why-is-inventory-management-important-tips-and-benefits, and /en/inventory-excel-template for the template links.

**`src/content/blogs-en/how-to-connect-innosend-to-shopify.md`** — line 30 (h3 "The connection process: a step-by-step guide", <p> with numbered steps)  
*[layout]* The five numbered steps are run together in a single paragraph with no line breaks or spaces: "...go to the settings page.2. Click on \"Integrations\"...3. Click the \"Connect\" button...4. Follow the instructions...5. Once the connection is complete...". Each step number is jammed directly against the previous sentence's period, so it renders as one unreadable block instead of a numbered list. (Inherited from the NL source hoe-koppel-ik-innosend-met-shopify.md line 29, but a real rendering defect.)  
→ Convert to a proper ordered list (<ol><li>...</li></ol>) or at minimum put each step on its own line with a space after each period, e.g. "...settings page. 2. Click on...".

**`src/content/blogs-en/how-to-connect-qls-to-bol.md`** — line 15 (body, paragraph starting '<p> is one of the largest e-commerce platforms')  
*[grammar]* Broken sentence: the paragraph opens with a leading space and a missing subject ('<p> is one of the largest e-commerce platforms in the Netherlands and Belgium...'). The word 'Bol' (the sentence's subject) was dropped, leaving a grammatically incomplete sentence that renders as ' is one of the largest...'. (The same defect exists in the NL source, so it carried over.)  
→ Restore the subject: '<p>Bol is one of the largest e-commerce platforms in the Netherlands and Belgium and offers a wide range of products to consumers...'

**`src/content/blogs-en/how-to-connect-qls-to-shopify.md`** — lines 16-17 (body, heading 'Understanding QLS')  
*[factual]* QLS is fabricated/wrong here. This article defines QLS as 'Quick Label Systems', 'a leading company that specializes in developing custom solutions for label and packaging needs' founded in 1982. In the ShopLinkr context QLS is a carrier / e-commerce logistics platform (Quick Logistic Solutions), as correctly described in the sibling article how-to-connect-qls-to-bol.md ('QLS stands for Quick Logistic Solutions ... connect carriers and sales channels to ShopLinkr') and in the QLS integration data (about: 'one of the fastest growing companies in e-commerce logistics in the Benelux ... fulfilment, parcel service, software'). The 'label/packaging company founded 1982' description is invented and contradicts ShopLinkr being an order, inventory and shipping integration system. The link anchor text 'Quick Label Systems' (line 16) pointing to /koppelingen/qls compounds the wrong name.  
→ Rewrite the QLS definition to match the carrier/logistics reality used elsewhere: QLS = Quick Logistic Solutions, an e-commerce logistics platform that lets you connect carriers and sales channels to ShopLinkr so you can ship orders with a carrier's labels. Remove the fabricated 1982 founding and 'label/packaging needs' framing, and change the anchor text to the correct name.

**`src/content/blogs-en/the-importance-of-good-inventory-management-for-your-webshop.md`** — lines 35-37, section <h3>How bol.com can help you</h3>  
*[factual]* This section claims bol.com sells inventory-management software: 'bol.com offers an extensive software package designed specifically for inventory management ... Get started today with implementing inventory management software, such as bol.com's.' bol.com is an online marketplace, not an inventory-management software vendor. This is a fabricated product claim that also contradicts the article's own positioning of ShopLinkr (mentioned in the two sections above) as the inventory-management software. The Dutch source almost certainly intends ShopLinkr here, not bol.com.  
→ Replace the bol.com references in this heading and paragraph with ShopLinkr (e.g. 'How ShopLinkr can help you' and 'such as ShopLinkr's'), matching the rest of the article. Do not attribute an inventory-software product to bol.com.

**`src/content/blogs-en/using-qls-and-shopify-together.md`** — line 13: "QLS, which stands for Quick Label System"  
*[factual]* Fabricated/incorrect acronym. QLS is a real Benelux e-commerce logistics carrier (confirmed by src/content/integrations-en/qls.json: category "carrier", tagline "Passion for e-commerce", fulfilment/parcel/my.QLS software). "QLS" does not stand for "Quick Label System"; that expansion is invented and violates the no-invented-claims rule. It also contradicts the other QLS articles in this set, which describe QLS as a carrier integrated via ShopLinkr, never as a label system.  
→ Remove the invented expansion. Rewrite to: "QLS is a shipping platform that helps you simplify and automate your shipping processes." Do not assert an acronym expansion that cannot be verified.

**`src/content/blogs-en/using-qls-and-woocommerce-together.md`** — lines 16-17: "add your carriers and sales channels to ShopLinkr, the central dashboard of QLS" / "ShopLinkr offers a clear interface ... QLS makes sure you are always in control"  
*[factual]* Inverts the product relationship. ShopLinkr is the order & inventory product; QLS is a carrier integrated INTO ShopLinkr (per src/content/integrations-en/qls.json, category "carrier"). Describing ShopLinkr as "the central dashboard of QLS" wrongly subordinates ShopLinkr to QLS and is internally contradictory with the rest of the site, which positions QLS as one of ShopLinkr's carrier integrations.  
→ Reword so ShopLinkr is the platform and QLS is a connected carrier, e.g. "With ShopLinkr you connect your carriers (such as QLS) and sales channels in one central dashboard, then process orders from a sales channel using a carrier's labels." Remove the phrase "the central dashboard of QLS."

**`src/content/blogs-en/what-is-the-difference-between-an-ean-and-a-barcode.md`** — lines 12, 15, 32, 35 (href="/functionaliteiten/...") and lines 13, 16 (href="/blogs/wat-is-een-ean-code")  
*[cross-language-link]* This EN article links to Dutch-only URLs, sending English readers to the Dutch site. /functionaliteiten/producten, /functionaliteiten/voorraad and /functionaliteiten/bestellingen are NL routes (their EN equivalents are /en/features/products, /en/features/inventory, /en/features/orders), and /blogs/wat-is-een-ean-code is the NL blog slug (the EN version exists at /en/blog/what-is-an-ean-code). Every other EN article in blogs-en uses no NL-style internal links, so this file is the anomaly.  
→ Repoint all in-text links to their EN equivalents: /functionaliteiten/producten -> /en/features/products, /functionaliteiten/voorraad -> /en/features/inventory, /functionaliteiten/bestellingen -> /en/features/orders, and /blogs/wat-is-een-ean-code -> /en/blog/what-is-an-ean-code.

**`src/content/blogs-en/why-is-inventory-management-important-tips-and-benefits.md`** — line 59 (final <p>), body  
*[bug]* The article body is truncated mid-sentence and mid-word. The last paragraph ends: "...an experienced entrepreneur who is running their busin</p>". The sentence (and the whole article) cuts off at "busin" with no completion. Other articles in this set close with a full concluding thought / call to action; here the content is incomplete and the final word "business" is chopped.  
→ Restore the full final sentence, e.g. complete it to "...or an experienced entrepreneur who is running their business, an inventory management system is a worthwhile investment." Verify against the NL source (translationKey: waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen) so the ending matches the intended copy.

**`src/content/blogs/** + src/content/blogs-en/**`** — 78 links across 64 files (32 NL + 32 EN blogs)  
*[broken-link]* All blog body links using the /koppelingen/ path 404. The route does not exist (integration pages live at /integraties/[slug], EN at /en/integrations/[slug]). Verified live: /koppelingen/woocommerce -> 404, /integraties/woocommerce -> 200. Affects /koppelingen/{woocommerce,shopify,dpd,myparcel,post-nl,qls,sendcloud,sendy,bol-com-verzendlabels,woocommerce-koppelen-aan-bol-com,woocommerce-koppelen-aan-shopify}. The slugs are otherwise valid; only the prefix is wrong.  
→ Find-replace /koppelingen/ -> /integraties/ in NL blogs (and -> /en/integrations/ in EN blogs for correct locale). Note bol-com-verzendlabels is the real bol-vvb slug (/integraties/bol-com-verzendlabels = 200).

**`src/content/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md`** — lines 34-36 (section heading "Hoe bol.com jou kan helpen" and following paragraphs)  
*[factual]* The article attributes inventory-management software to bol.com. Line 35 states "bol.com biedt een uitgebreid softwarepakket aan dat speciaal is ontworpen voor voorraadbeheer" and line 36 recommends "het implementeren van software voor voorraadbeheer, zoals die van bol.com". This is fabricated and internally contradictory: bol.com is a marketplace, not an inventory-software vendor, and the same article earlier (lines 26 and 33) correctly credits ShopLinkr as the inventory/order software. It contradicts ShopLinkr being the order & inventory system for webshops and marketplaces.  
→ Rewrite the section to credit ShopLinkr instead of bol.com. Change the heading to something like "Hoe ShopLinkr jou kan helpen" and replace both bol.com references with ShopLinkr (e.g. "ShopLinkr biedt een uitgebreid softwarepakket... dat eenvoudig te koppelen is met je webshop en bol-account"). Do not assert specific bol.com product features.

**`src/content/blogs/hoe-koppel-ik-qls-met-bol.md`** — line 14, body paragraph  
*[grammar]* The paragraph begins with a missing subject: " is een van de grootste e-commerceplatforms in Nederland en België...". The word 'Bol' (the subject of the sentence) has been dropped, leaving a sentence that starts with a leading space and 'is'. This renders as broken, grammatically incomplete text.  
→ Prefix the sentence with the subject, e.g. "Bol is een van de grootste e-commerceplatforms in Nederland en België...".

**`src/content/blogs/hoe-koppel-ik-qls-met-bol.md`** — line 13, body: "QLS staat voor Quick Logistic Solutions"  
*[factual]* QLS is defined here as 'Quick Logistic Solutions'. This contradicts both sibling articles (the Shopify article calls it 'Quick Label Systems', the WooCommerce article calls it 'Quality Label System') and the project's own integration ground truth (src/content/integrations/qls.json), where QLS is an e-commerce logistics carrier in the Benelux (fulfilment, pakketdienst, my.QLS software), not an acronym expansion of 'Quick Logistic Solutions'. The expansion appears invented.  
→ Remove the fabricated acronym expansion and describe QLS in line with the integration data: an e-commerce logistics/carrier partner whose labels you print from ShopLinkr. Align the definition across all three QLS articles.

**`src/content/blogs/hoe-koppel-ik-qls-met-woocommerce.md`** — line 13, body: "QLS staat voor Quality Label System"  
*[factual]* QLS is defined here as 'Quality Label System', a third, mutually exclusive expansion versus the bol article ('Quick Logistic Solutions') and the shopify article ('Quick Label Systems'). It also conflicts with the project ground truth (qls.json), where QLS is an e-commerce logistics carrier, not a 'Quality Label System'. The expansion appears invented.  
→ Remove the fabricated acronym expansion and describe QLS consistently with the integration data and the other two articles (a carrier whose labels you print from ShopLinkr).

**`src/content/blogs/hoe-koppel-ik-sendcloud-met-woocommerce.md`** — body line 34 (<p>1. Log in ...8. Gefeliciteerd!</p>) en line 36 (<p>Tijdens ... Sendy.</p>)  
*[bug]* De genummerde stappen (regel 34) en de probleem/oplossing-lijst (regel 36) staan in één <p> zonder regeleinden of lijst-markup. Ze renderen als één doorlopende muur tekst, bv. '...navigeer naar de instellingen.2. Klik op "Verzendkanalen"...' (de '.2.' aaneengeschreven is bevestigd). Dit is een gebroken markdown/HTML-structuur.  
→ Zet de genummerde stappen om naar een echte <ol> met <li>-items (zoals in hoe-koppel-ik-sendy-met-bol.md regels 34-50), en de probleem/oplossing-opsomming naar een <ul>/<li>-lijst. Zorg dat elke stap/regel een eigen item is.

**`src/content/blogs/hoe-koppel-ik-sendy-met-shopify.md`** — frontmatter excerpt (line 3) + body lines 11-13, 46-47, 51  
*[factual]* Het hele artikel beschrijft Sendy als een 'zelfgehost e-mailmarketingplatform gebouwd op Amazon Simple Email Service (SES)' voor nieuwsbrieven, A/B-tests en e-mailcampagnes. In de ShopLinkr-context is Sendy echter een vervoerder/verzendsoftware (zie src/content/integrations/sendy.json: category 'carrier', 'verzendsoftware die bedrijven helpt pakketten efficiënt te versturen' via PostNL/DHL/DPD). Het artikel verwart Sendy met een e-mailtool en spreekt zichzelf bovendien tegen met het zusterartikel hoe-koppel-ik-sendy-met-bol.md (dat Sendy correct 'e-commerce fulfilment platform' noemt). Dit is een verzonnen/onjuiste feature-beschrijving.  
→ Herschrijf het artikel zodat Sendy als verzend-/fulfilmentsoftware wordt beschreven (verzendlabels, vervoerders koppelen, orders verwerken vanuit ShopLinkr), in lijn met sendy.json en het bol-artikel. Verwijder alle e-mailmarketing-, Amazon SES-, nieuwsbrief- en A/B-test-claims, inclusief de excerpt.

**`src/content/blogs/myparcel-koppelen-aan-shoplinkr.md`** — line 11 (intro paragraph): "tack &amp; trace codes automatisch worden doorgeven"  
*[typo]* Twee fouten in een prominente, vetgedrukte introzin. 1) Spelfout: "tack &amp; trace" moet "track &amp; trace" zijn (de rest van het artikel gebruikt correct "track & trace", zie regel 14 en 18). 2) Grammaticafout: "worden doorgeven" is geen correct voltooid deelwoord; moet "worden doorgegeven" zijn.  
→ Wijzig naar: "... waarmee je met één klik op de knop verzendlabels kunt genereren, track &amp; trace codes automatisch worden doorgegeven en het verzenden van bestellingen efficiënter kunt maken."

**`src/content/blogs/producten-verkopen-via-bol.md`** — line 37  
*[factual]* Brand casing: 'Bol.com Partnerprogramma' and 'Bol.com Fulfilment service' use capitalised 'Bol.com'. Per project rule the brand is deliberately lowercase 'bol.com'. Everywhere else in this same file it is correctly lowercase ('bol.com'), so these are inconsistencies.  
→ Lowercase to 'bol.com'. Also note the real services are named 'Partnerprogramma' and 'Logistiek via bol (LVB)' / earlier 'Fulfilment by bol'; see separate fulfilment-naming finding.

**`src/content/blogs/producten-verkopen-via-bol.md`** — line 37 ('Bol.com Partnerprogramma, waarbij je commissie kunt verdienen door het promoten van producten van andere verkopers')  
*[factual]* Describes bol's affiliate/partner program (earning commission by promoting OTHER sellers' products) as a seller tool. This is irrelevant and misleading in an article about selling your own products on bol, and conflates affiliate marketing with the seller account. Reads as invented/incorrect feature framing.  
→ Remove this sentence or replace with an accurate seller-relevant service (e.g. bol advertising / sponsored products), without fabricating specifics.

**`src/content/blogs/producten-verkopen-via-bol.md`** — line 65 ('Vertrouw net als de duizenden producten en bestellingen die al via ons systeem zijn verwerkt.')  
*[grammar]* Grammatically broken / nonsensical sentence: 'Vertrouw net als de duizenden producten en bestellingen' has no object and compares the reader to products. The intended meaning ('vertrouw, net als duizenden webshops, op ...') is lost.  
→ Rewrite, e.g. 'Vertrouw, net als veel andere webshops, op ShopLinkr: er zijn al duizenden producten en bestellingen via ons systeem verwerkt.' Avoid stating a number you cannot verify.

**`src/content/blogs/qls-en-bol-samen-gebruiken.md`** — frontmatter excerpt (line 3) and heading 'Wat is Bol?' (line 17), plus 'Bol' at lines 20, 22, 24  
*[factual]* Brand casing: 'Bol' is capitalised in the excerpt ('QLS en Bol'), the H2 'Wat is Bol?', and lines 20/22/24/25. The body itself uses lowercase 'bol' in most places, so this is internally inconsistent and violates the deliberate lowercase 'bol' rule.  
→ Lowercase all standalone brand uses to 'bol' (excerpt 'QLS en bol', heading 'Wat is bol?', 'Om bol te kunnen gebruiken', 'Het gebruik van bol biedt', 'om QLS en bol succesvol te integreren').

**`src/content/blogs/qls-en-bol-samen-gebruiken.md`** — line 12 ('QLS is een verzendplatform ... Het stelt je in staat om vervoerders en verkoopkanalen aan elkaar te koppelen via de ShopLinkr-functionaliteit')  
*[factual]* Inverts the real product relationship. In ShopLinkr, QLS is a carrier (vervoerder/pakketdienst) integration, not the platform that links carriers and sales channels; ShopLinkr is that platform. Here QLS is cast as the platform and ShopLinkr as a mere 'functionaliteit' inside it. This contradicts ShopLinkr being the order & inventory system (see src/content/integrations/qls.json where QLS is category 'carrier').  
→ Reframe: ShopLinkr is the platform that links sales channels and carriers; QLS is one of the carriers you can connect. e.g. 'Met ShopLinkr koppel je je verkoopkanalen aan vervoerders zoals QLS en print je labels.'

**`src/content/blogs/qls-en-shopify-samen-gebruiken.md`** — line 12 ('QLS, wat staat voor Quick Label System')  
*[factual]* Fabricated definition: QLS is a Benelux e-commerce logistics company (fulfilment + pakketdienst + my.QLS software), not an acronym for 'Quick Label System'. See src/content/integrations/qls.json 'about'. This is an invented expansion.  
→ Remove the 'wat staat voor Quick Label System' expansion. Describe QLS as a carrier/logistics partner you connect via ShopLinkr.

**`src/content/blogs/qls-en-shopify-samen-gebruiken.md`** — line 12 ('verzendplatform dat je helpt') and lines 84-101 (integration steps casting QLS as the integrating platform)  
*[factual]* Same product-relationship inversion as the bol article: QLS is presented as the verzendplatform that integrates with Shopify, with ShopLinkr reduced to a connector ('Koppel je vervoerders en verkoopkanalen aan QLS via ShopLinkr', line 96). In reality ShopLinkr is the platform that connects Shopify and the carrier QLS.  
→ Reframe so ShopLinkr is the integrating platform and QLS is the carrier, e.g. 'Koppel Shopify aan ShopLinkr en verstuur je orders met QLS-labels.'

**`src/content/blogs/qls-en-woocommerce-samen-gebruiken.md`** — line 15 ('toevoegen aan ShopLinkr, het centrale dashboard van QLS')  
*[factual]* Describes ShopLinkr as 'het centrale dashboard van QLS', making ShopLinkr a component of QLS. This is the reverse of reality: ShopLinkr is the standalone order & inventory platform; QLS is one carrier you can connect. Directly contradicts the product's positioning.  
→ Reword to 'ShopLinkr, je centrale dashboard voor orders, voorraad en vervoerders zoals QLS' and remove the implication that ShopLinkr belongs to QLS.

**`src/content/blogs/sendy-en-woocommerce-samen-gebruiken.md`** — line 46 (paragraph: "Door Sendy en WooCommerce te integreren...")  
*[factual]* The phrase "je vervoerders en verkoopkanalen kunt koppelen aan ShopLinkr, een functionaliteit van Sendy" describes ShopLinkr as a feature of Sendy. This is factually wrong and inverts the relationship: ShopLinkr is the standalone order & inventory system for webshops + marketplaces; Sendy is a shipping platform that integrates WITH ShopLinkr, not the other way around. The appositive contradicts the rest of the article (and the site) which positions ShopLinkr as the central system.  
→ Remove the appositive "een functionaliteit van Sendy" or rewrite so ShopLinkr is the system and Sendy/vervoerders are what you connect to it, e.g. "...kunt koppelen aan ShopLinkr. Hiermee kun je bestellingen van een verkoopkanaal verwerken met de labels van een vervoerder."

**`src/content/blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen.md`** — line 58 (final <p>)  
*[bug]* The article body is truncated mid-sentence and mid-word. The closing paragraph ends abruptly inside the <p> tag: "...of een ervaren ondernemer die zijn bedrij" with no completion and no closing CTA. The file genuinely ends here (verified at byte level), so the published page cuts off in the middle of a word.  
→ Restore the missing remainder of the sentence and paragraph, e.g. complete it to "...of een ervaren ondernemer die zijn bedrijf wil laten groeien, voorraadbeheer loont altijd." and add the standard closing CTA paragraph used in the other blogs.

**`src/content/blogs/woocommerce-koppelen-aan-shoplinkr.md`** — line 3 (frontmatter: excerpt)  
*[factual]* The excerpt of this WooCommerce article describes the integratie tussen ShopLinkr en Shopify. This is a copy-paste error from a Shopify article: the whole body is about WooCommerce, so the excerpt names the wrong integration and will mislead readers and search engines.  
→ Change Shopify to WooCommerce in the excerpt, e.g. 'Ontdek de kracht van de integratie tussen ShopLinkr en WooCommerce. Vereenvoudig je orderbeheer, verwerk bestellingen en print verzendlabels moeiteloos.'

### Config/routing/SEO

**`src/i18n/routes.ts`** — line 64 (simpleInventory.nl) + filename src/pages/simpel-vooraadbeheer.astro  
*[typo]* Live NL URL is misspelled: 'simpel-vooraadbeheer' is missing an 'r' (should be 'voorraadbeheer'). Verified: /simpel-vooraadbeheer serves 200, the slug itself contains the typo. Public-facing URL + hurts SEO/credibility.  
→ Rename slug to 'simpel-voorraadbeheer' (routes.ts:64 + rename the page file). Add a 301 redirect from the old /simpel-vooraadbeheer in vercel.json so existing links/SEO don't break.

### i18n copy dict

**`src/i18n/locales/en.ts`** — pages.cookies.preferencesBody (line 771) — rendered by src/components/pages/CookiesPage.astro line 131 via set:html  
*[dark-mode]* Same defect as the NL string: the inline mailto <a> uses text-charcoal with no dark: variant, so on the dark:bg-charcoal cookie page the contact@shoplinkr.com link is near-invisible (#191919 text on #191919 surface).  
→ Mirror the NL fix: add dark:text-paper (and a dark hover such as dark:hover:text-sunstone) to the inline anchor class so the link is legible in dark mode.

**`src/i18n/locales/en.ts`** — pages.integrationsIndex.combos[1] (line 655)  
*[copy]* Brand-name rule violation: visible combo-card body text capitalizes the brand: 'WordPress plus Bol, connected without separate plugins per channel.' The NL equivalent (nl.ts pages.integrationsIndex.combos[1]) correctly uses lowercase 'bol'. This text is rendered as the WooCommerce-to-bol combination card body on the integrations index page.  
→ Change 'Bol' to 'bol': 'WordPress plus bol, connected without separate plugins per channel.'

**`src/i18n/locales/nl.ts`** — pages.cookies.preferencesBody (line 773) — rendered by src/components/pages/CookiesPage.astro line 131 via set:html  
*[dark-mode]* The inline email link inside preferencesBody uses class="text-charcoal font-semibold hover:text-sunstone-deep transition-colors" with NO dark: variant. The Cookies page section it sits in is bg-paper dark:bg-charcoal, and text-charcoal resolves to #191919 (near-black). In dark mode the link renders near-black text on a #191919 charcoal surface, so the contact@shoplinkr.com link is effectively invisible. This violates the dark-mode contract (light surface/text token with no matching dark: variant).  
→ Add a dark variant to the inline anchor class, e.g. class="text-charcoal dark:text-paper font-semibold hover:text-sunstone-deep dark:hover:text-sunstone transition-colors". (FaqList solves the same problem by styling links via container [&_a] utilities with a dark: hover rule; mirror that here.)

**`src/i18n/locales/nl.ts`** — line 491 — pages.comboWooBol.setupSteps[0].body  
*[typo]* Spelfout: 'kopiëer een API-sleutel'. Het Nederlandse werkwoord 'kopiëren' krijgt in de gebiedende wijs/tegenwoordige tijd geen trema op de e: het is 'kopieer'. 'kopiëer' is geen correcte spelling.  
→ Vervang 'kopiëer een API-sleutel' door 'kopieer een API-sleutel'.

**`src/i18n/locales/nl.ts`** — line 423 — pages.comboShopifyBol.rows[3].body (also lines 487 comboWooBol.rows[3].body and 519 comboWooShopify.rows[3].body)  
*[grammar]* Verkeerde vervoeging: 'Je picked, verpakt en verstuurt'. 'picked' is de Engelse verleden tijd; de twee andere werkwoorden in de opsomming ('verpakt', 'verstuurt') staan in de tegenwoordige tijd (je-vorm). De juiste Nederlandse vorm is 'Je pickt'. Bovendien intern inconsistent: regel 438 gebruikt wél correct 'Je pickt vanuit één picklijst'. Komt 3x voor (423, 487, 519). De EN-tegenhangers ('You pick, pack and ship') zijn correct.  
→ Vervang in alle drie de regels 'Je picked, verpakt en verstuurt' door 'Je pickt, verpakt en verstuurt'.

### Integration content

**`src/content/integrations/bol-vvb.json`** — about field, sentence: "...en bol staat klant voor je als er iets fout gaat met de bezorging."  
*[grammar]* "bol staat klant voor je" is grammatically broken Dutch. The intended meaning (per the EN counterpart "Bol handles customer contact for you") is that bol acts as customer service / stands ready for you, but "staat klant voor je" is not a valid Dutch phrase.  
→ Rewrite to valid Dutch, e.g. "en bol staat als klantenservice voor je klaar als er iets fout gaat met de bezorging" or "en bol staat voor je klaar als er iets fout gaat met de bezorging".

### Page components

**`src/components/pages/SupportCategoryPage.astro`** — lines 50-53 (<SupportHero ... /> invocation); root cause src/components/support/SupportHero.astro lines 41-50  
*[translation]* SupportCategoryPage renders <SupportHero> WITHOUT showCtas={false}, so showCtas defaults to true and the hero CTA buttons are shown. SupportHero hardcodes the Dutch strings 'Gratis starten' (SupportHero line 42) and 'Demo inplannen' (SupportHero line 49) instead of using t.common.register / t.common.demo. As a result, the English category page at /en/support/categories/<slug> shows Dutch CTA buttons. (SupportArticlePage is unaffected because it passes showCtas={false}.) For comparison, SimpleInventoryPage correctly uses {t.common.register} (line 48) and {t.common.demo} (line 57).  
→ Fix SupportHero.astro to use the i18n dict: import useTranslations, derive locale from Astro.currentLocale, and render {t.common.register} and {t.common.demo} for the two CTA labels (mirroring SimpleInventoryPage). This corrects the EN category page automatically. Alternatively pass showCtas={false} on SupportCategoryPage, but fixing SupportHero is the correct fix.

### Support content

**`src/content/support-en/account/billing-and-pricing/the-pay-as-you-go-model.md`** — line 14, <a href="/prijzen">  
*[cross-language-link]* Internal link in an EN article points to the Dutch pricing route /prijzen. An English reader who clicks it is taken to the Dutch-language pricing page, leaving the EN section and breaking language consistency. The EN pricing page exists at /en/pricing (src/pages/en/pricing.astro).  
→ Change href="/prijzen" to href="/en/pricing".

**`src/content/support-en/account/users-and-roles/inviting-users.md`** — line 26, <a href="/support/rollen-en-rechten-beheren">  
*[cross-language-link]* Internal link uses the Dutch slug /support/rollen-en-rechten-beheren. The EN article slug is the filename, so the correct EN target is /en/support/manage-roles-and-permissions. As written it sends English readers to the Dutch article and leaves the /en/ section. The English file exists at src/content/support-en/account/users-and-roles/manage-roles-and-permissions.md.  
→ Change href="/support/rollen-en-rechten-beheren" to href="/en/support/manage-roles-and-permissions".

**`src/content/support-en/getting-started/preparation/getting-started-with-shoplinkr.md`** — line 16, <a href="/support/categorieen/integraties/webshops-en-marketplaces">  
*[cross-language-link]* Internal link in an English article points to the Dutch category route and Dutch slug (/support/categorieen/integraties/webshops-en-marketplaces). EN pages are served under /en/support/categories/... so this drops an English reader onto the Dutch site/category index.  
→ Change href to the English category path: /en/support/categories/integrations/webshops-and-marketplaces

**`src/content/support-en/getting-started/preparation/getting-started-with-shoplinkr.md`** — line 18, <a href="/support/categorieen/integraties/vervoerders">  
*[cross-language-link]* Internal link in an English article points to the Dutch carriers category route/slug (/support/categorieen/integraties/vervoerders), sending the English reader to the Dutch site.  
→ Change href to the English category path: /en/support/categories/integrations/carriers

**`src/content/support-en/getting-started/preparation/managing-tags.md`** — line 48, <a href="/support/wat-zijn-regels">rules</a>  
*[cross-language-link]* English article links to the Dutch article slug /support/wat-zijn-regels instead of the existing English equivalent, sending the reader into the Dutch version.  
→ Change href to /en/support/what-are-rules (the EN translation of this article exists at support-en/order-processing/rules/what-are-rules.md).

**`src/content/support-en/integrations/api/api-overview.md`** — line 19, <a href="/support/api-token-aanmaken">API token</a>  
*[cross-language-link]* English article links to the Dutch article slug /support/api-token-aanmaken instead of the existing English equivalent, sending the reader into the Dutch version.  
→ Change href to /en/support/create-api-token (EN translation exists at support-en/integrations/api/create-api-token.md).

**`src/content/support-en/integrations/api/create-api-token.md`** — line 61, <a href="/support/api-overzicht">API overview</a>  
*[cross-language-link]* English 'Related' link points to the Dutch article slug /support/api-overzicht instead of the existing English equivalent.  
→ Change href to /en/support/api-overview (EN translation exists at support-en/integrations/api/api-overview.md).

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 27, link href="/support/tags-beheren"  
*[cross-language-link]* EN article links to the Dutch page /support/tags-beheren instead of the English equivalent.  
→ Change href to /en/support/managing-tags.

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 43, link href="/support/leveranciers-beheren"  
*[cross-language-link]* EN article links to the Dutch page /support/leveranciers-beheren instead of the English equivalent.  
→ Change href to /en/support/managing-suppliers.

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 52, link href="/support/notities-toevoegen"  
*[cross-language-link]* EN 'Notes' list item links to the Dutch page /support/notities-toevoegen instead of the English equivalent.  
→ Change href to /en/support/adding-notes.

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 55, link href="/support/producten-archiveren"  
*[cross-language-link]* EN 'Archived' list item links to the Dutch page /support/producten-archiveren instead of the English equivalent.  
→ Change href to /en/support/archiving-products.

**`src/content/support-en/inventory-management/products/stock-sources.md`** — line 119, link href="/support/wat-zijn-picklijsten"  
*[cross-language-link]* EN article links to the Dutch picking page /support/wat-zijn-picklijsten instead of the English equivalent.  
→ Change href to /en/support/working-with-pick-lists.

**`src/content/support-en/inventory-management/products/variant-groups.md`** — Body links: line 48 (/support/een-bundel-aanmaken), line 174 (/support/producten-archiveren), line 177 (/support/een-bundel-aanmaken, /support/voorraadbronnen)  
*[cross-language-link]* This English article links to the Dutch versions via /support/<dutch-slug>, routing English readers into Dutch content even though English equivalents exist (een-bundel-aanmaken -> create-a-bundle, producten-archiveren -> archiving-products, voorraadbronnen -> stock-sources).  
→ Point the links at /en/support/create-a-bundle, /en/support/archiving-products and /en/support/stock-sources.

**`src/content/support-en/inventory-management/purchasing/creating-a-delivery.md`** — Body links: line 13 (/support/leveranciers-beheren, /support/inkoopadvies), line 87 (/support/levering-ontvangen-en-verwerken)  
*[cross-language-link]* This English article links to the Dutch versions via /support/<dutch-slug>, routing English readers into Dutch content even though English equivalents exist (leveranciers-beheren -> managing-suppliers, inkoopadvies -> purchase-advice, levering-ontvangen-en-verwerken -> receiving-and-processing-a-delivery).  
→ Point the links at /en/support/managing-suppliers, /en/support/purchase-advice and /en/support/receiving-and-processing-a-delivery.

**`src/content/support-en/inventory-management/purchasing/managing-suppliers.md`** — Body links: line 13 (/support/een-levering-aanmaken), line 48 (/support/producten-overzicht), line 50 (/support/een-levering-aanmaken), line 52 (/support/inkoopadvies)  
*[cross-language-link]* This English article links to the Dutch versions via /support/<dutch-slug>, routing English readers into Dutch content even though English equivalents exist (een-levering-aanmaken -> creating-a-delivery, producten-overzicht -> products-overview, inkoopadvies -> purchase-advice).  
→ Point the links at /en/support/creating-a-delivery, /en/support/products-overview and /en/support/purchase-advice.

**`src/content/support-en/inventory-management/stock/stock-counts.md`** — line 86, <a href="/support/een-bundel-aanmaken"> (Bundles)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/een-bundel-aanmaken instead of the EN equivalent at /en/support/create-a-bundle.  
→ Change href to /en/support/create-a-bundle

**`src/content/support-en/inventory-management/stock/stock-counts.md`** — line 86, <a href="/support/onbeperkte-voorraad"> (unlimited stock)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/onbeperkte-voorraad instead of the EN equivalent at /en/support/unlimited-stock.  
→ Change href to /en/support/unlimited-stock

**`src/content/support-en/order-processing/orders/postpone-an-order.md`** — title (line 2) + body lines 13, 15, 30, 39, 44, 47, 50, 53  
*[inconsistency]* This article translates the NL feature 'bestelling uitstellen' as 'Postpone' / 'Postponed' (including the UI button label 'Postpone order' on line 30), but every other EN order article calls the same feature/status 'Deferred' / 'Defer'. In orders-overview.md the status tab labelled 'Deferred' and the action 'Defer an order' both link directly to THIS article, so an EN user clicking the 'Deferred' tab lands on a page that never uses the word 'Deferred'. Same conflict in mark-order-as-high-priority.md and merging-orders.md ('status Deferred'). The English term for this status is not consistent.  
→ Pick one canonical EN term for the NL 'uitstellen' status and use it everywhere. Given 'Deferred' is the status-tab name shown in the UI and is used by 4+ sibling articles, change this article to 'Defer an order' / 'deferred' (title 'Defer an order', button 'Defer order', etc.), or conversely standardise the others on 'Postpone' if that is the real in-app label. Verify against the actual UI string before changing.

**`src/content/support/account/facturatie-en-prijzen/een-abonnement-starten.md`** — line 16 (body, under heading "Ik heb al een account")  
*[copy]* Contradictory copy: under the heading "Ik heb al een account" (the reader already HAS an account) the sentence reads "Super, je hebt nu alles wat je nodig hebt om een account aan te maken!" Telling a user who already has an account that they now have everything needed to create one is logically wrong. It looks like leftover/duplicated text from a different section.  
→ Reword to fit the section, e.g. "Super, dan heb je alles wat je nodig hebt om aan de slag te gaan!" (drop "een account aan te maken").

**`src/content/support/orderverwerking/picklijsten/bakken-voor-picken.md`** — line 45: "Het barcodelabel opent, deze kunt je printen en op de bak plakken."  
*[grammar]* Two errors in one sentence. (1) "barcodelabel" is a het-woord, so the demonstrative must be "dit", not "deze". (2) "kunt je" has incorrect word order; in second person it must be "kun je". The first half of the same sentence already correctly uses "dat je kunt printen", so this is internally inconsistent too.  
→ Rewrite to: "Het barcodelabel opent, dit kun je printen en op de bak plakken."

### UI components & layout

**`src/components/sections/Testimonials.astro`** — line 74, div class "h-10 w-10 rounded-lg bg-paper dark:bg-charcoal ..."  
*[dark-mode]* The testimonial logo-backing tile inverts to dark:bg-charcoal in dark mode. Two of the four customer logos are pure black artwork: Cryptoken.svg has no fill attribute so it renders black, and CozyDesign.jpg is a black logo on white. On a near-black charcoal tile these logos become essentially invisible / unreadable in dark mode. The dark-mode contract explicitly states logo-backing tiles should stay deliberately light.  
→ Keep the logo tile light in dark mode so dark logos stay legible, e.g. change bg-paper dark:bg-charcoal to bg-paper dark:bg-paper (or drop the dark: override entirely) on this inner tile. The outer card on line 68 can keep dark:bg-charcoal.

**`src/components/support/SupportHero.astro`** — lines 41 and 49 (CTA <a> button labels "Gratis starten" / "Demo inplannen")  
*[translation]* The two CTA buttons render hardcoded Dutch text ("Gratis starten", "Demo inplannen") instead of pulling from the i18n dict. SupportHero is rendered on the EN support pages (src/pages/en/support/index.astro, .../categories/[category]/index.astro, .../[subcategory]/index.astro) where showCtas defaults to true, so English visitors see Dutch button labels. The component never receives or reads a locale, so it cannot localise the copy.  
→ Resolve locale via `const locale = (Astro.currentLocale ?? 'nl') as Locale; const t = useTranslations(locale);` (same pattern as BlogCard.astro) and use `{t.common.register}` and `{t.common.demo}`. These keys already exist: en.ts common.register = 'Start for free', common.demo = 'Book a demo'; nl.ts common.register = 'Gratis starten', common.demo = 'Demo inplannen'.

**`src/components/support/SupportHero.astro`** — lines 33-52 (showCtas block); rendered by SupportIndexPage.astro line 63-66 and SupportSubcategoryPage.astro line 48-51 with no showCtas override  
*[translation]* The hero CTA labels are hardcoded Dutch string literals: "Gratis starten" (line 41) and "Demo inplannen" (line 49). SupportIndexPage and SupportSubcategoryPage both render <SupportHero> WITHOUT showCtas={false} (the default showCtas=true applies), so these CTAs appear. On the EN support pages (/en/support and /en/support/categories/...) the buttons therefore render in Dutch instead of English. The i18n dict already provides the correct strings: common.register = 'Gratis starten'/'Start for free' and common.demo = 'Demo inplannen'/'Book a demo' (nl.ts lines 11-12, en.ts lines 9-10). SupportArticlePage.astro line 57 already passes showCtas={false}, confirming the hub pages are intended to show these CTAs, so suppressing them is not the fix.  
→ In SupportHero.astro replace the hardcoded literals with the i18n values: import useTranslations, derive locale from Astro.currentLocale, and render {t.common.register} for the primary button and {t.common.demo} for the secondary link. This fixes the Dutch-on-EN leak and removes the duplicated copy.

## 🟡 Medium (145)

### Blog content

**`src/content/blogs-en/bol-lvb-stock-switch.md`** — line 39, body link 'Stock synchronisation'  
*[cross-language-link]* This EN article links to the Dutch-language page https://shoplinkr.com/blogs/bol-com-voorraad-synchronisatie, which sends an English reader to Dutch content. An English equivalent already exists in the collection (bol-stock-synchronization.md, served at /en/blog/bol-stock-synchronization), so the link bypasses the existing translation.  
→ Point the link to the EN article: https://shoplinkr.com/en/blog/bol-stock-synchronization

**`src/content/blogs-en/easy-inventory-management-in-excel-tips-and-tricks.md`** — body links: line 14 & line 73 (href="/voorraadbeheer-excel-template" and href="https://shoplinkr.com/voorraadbeheer-excel-template"); lines 18, 40, 41, 72 (href="https://shoplinkr.com/blogs/..." Dutch slugs)  
*[cross-language-link]* This EN article links to Dutch-language destinations even though English equivalents exist. The template link points to the NL page /voorraadbeheer-excel-template (EN page is /en/inventory-excel-template), and the blog links point to https://shoplinkr.com/blogs/<dutch-slug> which are NL articles. EN equivalents exist for all of them (e.g. /en/blog/the-importance-of-good-inventory-management-for-your-webshop, /en/blog/everything-you-need-to-know-about-inventory-management-in-excel). English readers are sent to Dutch content. (Note: this same cross-language link pattern recurs across most EN blog files, so a global fix is warranted.)  
→ Point internal links at the EN routes: /voorraadbeheer-excel-template -> /en/inventory-excel-template; .../blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop -> /en/blog/the-importance-of-good-inventory-management-for-your-webshop; .../blogs/het-belang-van-effectief-voorraadbeheer -> /en/blog/the-importance-of-effective-inventory-management; .../blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel -> /en/blog/everything-you-need-to-know-about-inventory-management-in-excel; .../blogs/voorraadbeheer-met-excel-een-complete-gids -> /en/blog/inventory-management-with-excel-a-complete-guide.

**`src/content/blogs-en/effective-inventory-management-in-excel-tips-and-tricks.md`** — body links: lines 11, 13, 15, 17, 21 (href="https://shoplinkr.com/blogs/..." Dutch slugs and href="https://shoplinkr.com/voorraadbeheer-excel-template")  
*[cross-language-link]* Same cross-language link defect as the sibling article: this EN page links to NL-slug blog URLs and the NL Excel template page, despite EN equivalents existing. English readers click through to Dutch-language content.  
→ Replace the NL targets with their EN routes: .../voorraadbeheer-excel-template -> /en/inventory-excel-template; .../blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel -> /en/blog/everything-you-need-to-know-about-inventory-management-in-excel; .../blogs/voorraadbeheer-met-excel-een-complete-gids -> /en/blog/inventory-management-with-excel-a-complete-guide; .../blogs/het-belang-van-effectief-voorraadbeheer -> /en/blog/the-importance-of-effective-inventory-management; .../blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop -> /en/blog/the-importance-of-good-inventory-management-for-your-webshop.

**`src/content/blogs-en/effective-inventory-management-with-excel.md`** — line 13 (duplicated verbatim at line 16)  
*[copy]* The intro paragraph under the h2 'Understanding inventory management' (line 13) is repeated word-for-word as the body of the h3 'What is inventory management?' (line 16). Both paragraphs are byte-identical, a copy-paste artifact that makes the article read as padded/broken.  
→ Rewrite line 16 so the 'What is inventory management?' section gives a distinct answer (e.g. a concise definition) instead of repeating line 13 verbatim, or remove the redundant duplication.

**`src/content/blogs-en/effective-inventory-management-with-excel.md`** — line 24 (duplicated verbatim at line 26)  
*[copy]* The paragraph under the h3 'Why use Excel for inventory management?' (line 24) is repeated word-for-word as the body of the h3 'The benefits of Excel in inventory management' (line 26). Both are byte-identical, a copy-paste artifact.  
→ Give the 'benefits' section (line 26) its own distinct content instead of repeating line 24 verbatim.

**`src/content/blogs-en/how-to-connect-dpd-to-bol.md`** — line 19 link href="https://shoplinkr.com/blogs/dpd-koppelen-aan-shoplinkr" and line 20 href="https://shoplinkr.com/blogs/hoe-koppel-je-bol-com-met-jouw-webshop"  
*[cross-language-link]* EN article links English readers to Dutch-language blog pages (NL slugs on bare shoplinkr.com/blogs/...), even though published English equivalents exist: dpd-koppelen-aan-shoplinkr -> /en/blog/connecting-dpd-to-shoplinkr; hoe-koppel-je-bol-com-met-jouw-webshop -> /en/blog/how-to-connect-bol-com-to-your-webshop. Sends English visitors to NL content (localization defect; same pattern in how-to-connect-dpd-to-shopify line 12/16, how-to-connect-innosend-to-bol lines 12/14, how-to-connect-bol-com-to-your-webshop is unaffected).  
→ Point in-article blog links to the EN routes, e.g. https://shoplinkr.com/en/blog/connecting-dpd-to-shoplinkr and /en/blog/how-to-connect-bol-com-to-your-webshop, so EN readers stay in English.

**`src/content/blogs-en/how-to-connect-innosend-to-shopify.md`** — line 12 (intro <p>, first <a>)  
*[cross-language-link]* The anchor text reads "connect Innosend to Shopify" but the href is https://shoplinkr.com/blogs/shopify-koppelen-aan-shoplinkr, which is a Dutch article about connecting Shopify to ShopLinkr, with nothing to do with Innosend. The link label and target do not match, and an EN article points to a NL-language destination.  
→ Point this anchor at the relevant Innosend/Shopify resource (or remove the link), and use the EN destination once available (e.g. /en/... ) rather than the Dutch slug.

**`src/content/blogs-en/how-to-connect-qls-to-woocommerce.md`** — lines 14 and 17 (body, 'What are QLS and WooCommerce?' / 'Definition of QLS')  
*[inconsistency]* QLS is expanded as 'Quality Label System' here, but the QLS-to-Bol article expands it as 'Quick Logistic Solutions' and the QLS-to-Shopify article uses 'Quick Label Systems'. Three different expansions of the same acronym across three sibling articles. The canonical name (per the QLS integration data and the Bol article) is Quick Logistic Solutions; 'Quality Label System' is incorrect.  
→ Use the single correct expansion 'Quick Logistic Solutions' across all QLS articles. Replace 'Quality Label System' on line 14 accordingly.

**`src/content/blogs-en/how-to-connect-sendcloud-to-woocommerce.md`** — line 35 (<p>1. Log in...2. Click...3. Follow...</p>)  
*[cross-language-link]* A numbered step-by-step list is jammed into a single <p> with no line breaks and no spaces between the steps, so step numbers run directly against the previous sentence (e.g. "...navigate to the settings.2. Click \"Shipping channels\"...", "...as your sales channel.3. Follow...", "...click \"Save\".5. Go to..."). It renders as one unreadable paragraph instead of a list. Sibling articles in this set (e.g. how-to-connect-sendy-to-bol.md) use proper <ol>/<li> markup.  
→ Convert the eight steps into a proper <ol> with one <li> per step (matching the <ol>/<li> pattern used in how-to-connect-sendy-to-bol.md), or at minimum separate each numbered step into its own <p> with a space after each period.

**`src/content/blogs-en/how-to-connect-sendcloud-to-woocommerce.md`** — line 37 (<p>...common problems and their solutions:- Problem: API keys do not work.  Solution:...</p>)  
*[cross-language-link]* A bulleted Problem/Solution list is collapsed into a single <p> with no line breaks: the first bullet runs straight against the lead-in ("...their solutions:- Problem: API keys do not work."), and subsequent "- Problem:" / "Solution:" pairs are mashed together with double spaces in the middle of the paragraph. It renders as one run-on block instead of a list.  
→ Convert the three Problem/Solution pairs into a proper <ul> with <li> elements (or separate <p> blocks with a line break before each "Problem:"), so the troubleshooting list renders as a readable list rather than a single paragraph.

**`src/content/blogs-en/how-to-connect-sendy-to-bol.md`** — line 11: <h1>How Do I Connect Sendy To Bol?</h1>  
*[a11y]* The body opens with an <h1> that duplicates the page's real <h1>. The layout (src/layouts/ArticleLayout.astro line 61) already renders the frontmatter title as the single page <h1>, so this produces two H1s and breaks heading hierarchy (body content should start at <h2>). The Sendcloud and Excel articles in this set correctly start their body at <h2>, confirming this is an error. The in-body heading is also Title Case ("How Do I Connect Sendy To Bol?") versus the sentence-case rendered title ("How do I connect Sendy to Bol?").  
→ Remove the in-body <h1> line entirely (the title is already rendered by the layout), so the body begins at the existing <h2>What are Sendy and Bol?</h2>.

**`src/content/blogs-en/how-to-connect-sendy-to-shopify.md`** — line 11: <h1>How Do I Connect Sendy To Shopify?</h1>  
*[a11y]* Duplicate <h1>: the layout already renders the frontmatter title as the page <h1> (src/layouts/ArticleLayout.astro line 61), so this in-body <h1> creates a second top-level heading and breaks heading hierarchy. Body should start at <h2>. Also Title Case here vs sentence case in the rendered title.  
→ Remove the in-body <h1> line so the body starts at the existing <h2>What is Sendy and how does it work?</h2>.

**`src/content/blogs-en/how-to-connect-sendy-to-woocommerce.md`** — line 11: <h1>How Do I Connect Sendy To WooCommerce?</h1>  
*[a11y]* Duplicate <h1>: the frontmatter title is already rendered as the page <h1> by ArticleLayout.astro (line 61), so this in-body <h1> is a second top-level heading and breaks heading hierarchy. Body should begin at <h2>. Also Title Case here vs sentence case in the rendered title.  
→ Remove the in-body <h1> line so the body starts at the existing <h2>What are Sendy and WooCommerce?</h2>.

**`src/content/blogs-en/product-tags.md`** — lines 19-21 (<h2><br></h2> before "Create your tags in ShopLinkr")  
*[a11y]* Empty heading element: an <h2> contains only a <br> and no text. This is a migration artifact used as vertical spacing. An empty heading is invalid/malformed markup and is flagged by accessibility checks (screen readers announce an empty heading, and it pollutes the document outline).  
→ Remove the empty heading entirely (delete lines 19-21). If vertical spacing is desired, handle it via CSS/prose styling rather than an empty <h2>.

**`src/content/blogs-en/selling-on-bol-without-inventory.md`** — line 16 (<a href="https://shoplinkr.com/blogs/voorraadmanagement">) and line 57 (<a href="https://shoplinkr.com/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop">)  
*[cross-language-link]* Both in-body links in this EN article point to the NL-language blog (path /blogs/<dutch-slug>), so an English reader is sent to Dutch articles even though EN equivalents exist. EN blogs are served at /en/blog/<en-slug>: voorraadmanagement -> /en/blog/inventory-management, and het-belang-van-goed-voorraadbeheer-voor-jouw-webshop -> /en/blog/the-importance-of-good-inventory-management-for-your-webshop (confirmed via translationKey in blogs-en/inventory-management.md and blogs-en/the-importance-of-good-inventory-management-for-your-webshop.md). Both links return HTTP 200 but target the wrong language.  
→ Repoint to the EN equivalents: line 16 -> https://shoplinkr.com/en/blog/inventory-management ; line 57 -> https://shoplinkr.com/en/blog/the-importance-of-good-inventory-management-for-your-webshop

**`src/content/blogs-en/using-myparcel-and-woocommerce-together.md`** — line 11 (body), heading <h1>Using MyParcel and WooCommerce together</h1>  
*[seo]* The article body opens with an <h1> that duplicates the frontmatter `title`. The blog layout (BlogArticlePage.astro -> ArticleLayout.astro line 61) already renders `blog.data.title` as the page's H1, so this file produces TWO H1 elements with the same text on the rendered page. All five sibling articles in this slice start directly with a <p> and contain no body <h1> (heading pattern h2/h3 only). This is an SEO/a11y defect and an inconsistency within the EN blog set.  
→ Remove the body `<h1>Using MyParcel and WooCommerce together</h1>` on line 11 so the page has a single H1 (the layout-rendered title), matching the other articles.

**`src/content/blogs-en/using-sendy-and-woocommerce-together.md`** — line 73: <p>Conclusion:</p>  
*[inconsistency]* The conclusion section is rendered as a bare paragraph 'Conclusion:' instead of a heading. Every other article in this set uses a proper '<h2>Conclusion: ...</h2>' heading (e.g. using-sendy-and-shopify-together.md line 37 '<h2>Conclusion: the power of using Sendy and Shopify together</h2>'). This breaks heading-hierarchy consistency and means the conclusion is not picked up as a section heading / in the TOC.  
→ Change '<p>Conclusion:</p>' to a heading consistent with the siblings, e.g. '<h2>Conclusion: using Sendy and WooCommerce together</h2>', and remove the now-redundant 'Conclusion:' label from the following paragraph.

**`src/content/blogs-en/using-sendy-and-woocommerce-together.md`** — line 26 ('go to the Sendy website and follow the instructions to install it on your server') and line 60 ('install and activate the Sendy WooCommerce Plugin ... configure ... the Sendy API key')  
*[factual]* These claims describe Sendy as self-hosted software you install on your own server and connect to WooCommerce via a dedicated 'Sendy WooCommerce Plugin' with an API key. This contradicts how Sendy is actually integrated in this product: Sendy is a hosted shipping carrier connected through ShopLinkr (the same article and integrations-en/sendy.json present Sendy as a SaaS carrier connected via ShopLinkr, not a self-hosted app), so 'install it on your server' and a separate WooCommerce plugin look fabricated/contradictory. (Note: the NL source has the same wording, so this is pre-existing content, not a translation artifact.)  
→ Reword to match the actual integration model, e.g. describe creating a Sendy account and connecting Sendy (as a carrier) and your WooCommerce sales channel through ShopLinkr, rather than installing Sendy on a server or a standalone WooCommerce plugin. Confirm wording with product/support before publishing.

**`src/content/blogs/** + src/content/blogs-en/**`** — 6 files: hoe-koppel-ik-sendcloud-met-bol/-woocommerce, hoe-koppel-ik-innosend-met-shopify (+EN sendcloud-to-bol/-woocommerce, innosend-to-shopify)  
*[bug]* Numbered step lists are jammed into a single <p> with no separators, so they render as a run-on wall: verified in rendered HTML '...van Sendcloud.2. Ga naar het dashboard...'. Step numbers concatenate against the previous sentence.  
→ Convert each step block to a real <ol><li> (and problem/solution blocks to <ul><li>), as the other connect-* articles already do.

**`src/content/blogs/de-ultieme-gids-voor-magazijnsoftware.md`** — frontmatter line 3 (excerpt), body line 10, heading line 28  
*[copy]* Formal address 'uw bedrijf' is used in the excerpt, the intro paragraph and the h3 heading 'Hoe magazijnsoftware uw bedrijf kan helpen', while the rest of the same article consistently uses informal 'je/jouw' (e.g. 'jouw bedrijf' two sentences later on line 10). This violates the informal-Dutch (je/jij/jouw) rule and is internally inconsistent within the file.  
→ Replace 'uw bedrijf' with 'jouw bedrijf' (and 'u' with 'je') in lines 3, 10 and 28 so the whole article uses informal address.

**`src/content/blogs/dpd-en-bol-samen-gebruiken.md`** — frontmatter, line 2: title: "Dpd en bol samen gebruiken"  
*[inconsistency]* Proper-noun casing error in the title. 'Dpd' is wrong casing for the carrier brand DPD (the article body consistently writes 'DPD' and even spells out 'Dynamic Parcel Distribution'). The title is rendered as the page H1, so the wrong casing is visible. ('bol' lowercase is intentional and correct.)  
→ Change the title to "DPD en bol samen gebruiken".

**`src/content/blogs/dpd-en-shopify-samen-gebruiken.md`** — frontmatter, line 2: title: "Dpd en shopify samen gebruiken"  
*[inconsistency]* Two proper-noun casing errors in the title: 'Dpd' should be 'DPD' and 'shopify' should be 'Shopify'. The body uses the correct casing (DPD, Shopify) throughout, so the rendered H1 is inconsistent with its own content.  
→ Change the title to "DPD en Shopify samen gebruiken".

**`src/content/blogs/dpd-en-woocommerce-samen-gebruiken.md`** — frontmatter, line 2: title: "Dpd en woocommerce samen gebruiken"  
*[inconsistency]* Two proper-noun casing errors in the title: 'Dpd' should be 'DPD' and 'woocommerce' should be 'WooCommerce'. The body consistently uses 'DPD' and 'WooCommerce', so the rendered H1 contradicts its own content.  
→ Change the title to "DPD en WooCommerce samen gebruiken".

**`src/content/blogs/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md`** — frontmatter, line 2: title: "Eenvoudig voorraadbeheer in excel: tips en tricks"  
*[inconsistency]* Proper-noun casing error in the title: 'excel' should be 'Excel' (Microsoft Excel). The body consistently capitalises 'Excel', so the rendered H1 is inconsistent with the article body.  
→ Change the title to "Eenvoudig voorraadbeheer in Excel: tips en tricks".

**`src/content/blogs/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md`** — line 40, body <p> wrapping a link: <a href="https://shoplinkr.com/blogs/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel">Excel als hulpmiddel voor voorraadbeheer</a>  
*[inconsistency]* Malformed heading/structure. 'Excel als hulpmiddel voor voorraadbeheer' is clearly meant to be a section heading (it directly precedes the H3s 'Waarom Excel gebruiken...' and 'Basisfuncties van Excel...'), but it is rendered as a body paragraph that is also wrapped entirely in an external link. As a result there is an orphaned/missing H2 in the heading hierarchy and the whole intended heading is a clickable link to another article. Compare with the sibling article effectief-voorraadbeheer-in-excel-tips-en-tricks.md line 19, where the equivalent section is correctly an <h2>.  
→ Convert this line to a proper section heading, e.g. <h2>Excel als hulpmiddel voor voorraadbeheer</h2>, and remove the wrapping <a>. If the link to alles-wat-je-moet-weten-over-voorraadbeheer-in-excel should be kept, move it into surrounding body text rather than turning the heading itself into a link.

**`src/content/blogs/hoe-koppel-ik-dpd-met-bol.md`** — line 10: <h1>Hoe Koppel Ik DPD Met Bol?</h1>  
*[seo]* Dubbele H1. De layout rendert de frontmatter-title al als de pagina-<h1> (src/layouts/ArticleLayout.astro regel 61-62 via heading={blog.data.title}). De body opent met een tweede <h1>, waardoor de pagina twee H1's krijgt. Dit geldt voor alle koppel-artikelen in deze set.  
→ Verwijder de <h1> uit de body of verlaag hem naar <h2>, zodat de pagina maar een H1 heeft (de title uit de frontmatter).

**`src/content/blogs/hoe-koppel-ik-dpd-met-bol.md`** — line 15: "DPD werd opgericht in 1977"  
*[factual]* Foutief en intern-tegenstrijdig oprichtingsjaar van DPD. Dit artikel zegt 1977, maar de twee zusterartikelen in dezelfde set zeggen 1976 (hoe-koppel-ik-dpd-met-shopify.md regel 16 en hoe-koppel-ik-dpd-met-woocommerce.md regel 17). DPD is daadwerkelijk in 1976 opgericht, dus 1977 is de afwijkende, onjuiste waarde.  
→ Wijzig "DPD werd opgericht in 1977" naar "DPD werd opgericht in 1976" zodat het overeenkomt met de andere DPD-artikelen en de werkelijkheid.

**`src/content/blogs/hoe-koppel-ik-dpd-met-shopify.md`** — line 10: <h1>Hoe Koppel Ik DPD met Shopify?</h1>  
*[seo]* Dubbele H1. De layout rendert de frontmatter-title al als pagina-<h1> (ArticleLayout.astro regel 61-62), en de body opent met een tweede <h1>.  
→ Verwijder de body-<h1> of verlaag hem naar <h2>.

**`src/content/blogs/hoe-koppel-ik-dpd-met-woocommerce.md`** — line 10: <h1>Hoe Koppel Ik DPD Met WooCommerce?</h1>  
*[seo]* Dubbele H1. De layout rendert de frontmatter-title al als pagina-<h1> (ArticleLayout.astro regel 61-62), en de body opent met een tweede <h1>.  
→ Verwijder de body-<h1> of verlaag hem naar <h2>.

**`src/content/blogs/hoe-koppel-ik-innosend-met-bol.md`** — line 10: <h1>Hoe Koppel Ik Innosend Met Bol?</h1>  
*[seo]* Dubbele H1. De layout rendert de frontmatter-title al als pagina-<h1> (ArticleLayout.astro regel 61-62), en de body opent met een tweede <h1>.  
→ Verwijder de body-<h1> of verlaag hem naar <h2>.

**`src/content/blogs/hoe-koppel-ik-innosend-met-shopify.md`** — line 10: <h1>Hoe Koppel Ik Innosend Met Shopify?</h1>  
*[seo]* Dubbele H1. De layout rendert de frontmatter-title al als pagina-<h1> (ArticleLayout.astro regel 61-62), en de body opent met een tweede <h1>.  
→ Verwijder de body-<h1> of verlaag hem naar <h2>.

**`src/content/blogs/hoe-koppel-ik-innosend-met-shopify.md`** — line 29: <p>1. Log in ... instellingenpagina.2. Klik op "Integraties" ...3. ...4. ...5. ...</p>  
*[cross-language-link]* Malformed markdown/HTML: de vijf koppelstappen staan samengeperst in een enkele <p> zonder spaties na de punten ("instellingenpagina.2. Klik..."). Het rendert als een onleesbare doorlopende regel in plaats van een genummerde lijst. Alle andere koppelingsproces-secties in deze set gebruiken een correcte <ol> met <li>-items, dus dit is ook inconsistent.  
→ Zet de stappen om naar een echte geordende lijst, bijvoorbeeld <ol><li><p>Log in op je Innosend-account en ga naar de instellingenpagina.</p></li><li><p>Klik op "Integraties" en zoek naar de Shopify-integratie.</p></li> ... </ol>, conform de andere artikelen.

**`src/content/blogs/hoe-koppel-ik-innosend-met-woocommerce.md`** — lines 41-55 ("Het koppelingsproces" section)  
*[factual]* The step-by-step instructions describe doing the coupling entirely inside Innosend: log into the Innosend account, go to "Instellingen" > "Verkoopkanalen", select WooCommerce and enter the WooCommerce API key in Innosend. This contradicts the ShopLinkr model described elsewhere (and in the three sibling MyParcel articles, which correctly say you couple both the webshop and the carrier to ShopLinkr and ship from ShopLinkr). The article's own conclusion (line 76) then pivots to ShopLinkr, so the body and CTA describe two different, conflicting coupling flows.  
→ Align the how-to with the ShopLinkr flow used in the sibling articles (couple WooCommerce + Innosend accounts to ShopLinkr, then ship via ShopLinkr), or clearly frame the Innosend-native steps as a separate alternative so the article does not contradict itself.

**`src/content/blogs/hoe-koppel-ik-myparcel-met-bol.md`** — line 28 ("Stapsgewijze handleiding voor het koppelen van Myparcel aan Bol" section)  
*[typo]* Misspelling of the carrier name MyParcel: "verzenden met MyParacel labels" (letters transposed -> MyParacel).  
→ Change "MyParacel" to "MyParcel".

**`src/content/blogs/hoe-koppel-ik-myparcel-met-shopify.md`** — line 30 ("De stappen om MyParcel te koppelen met Shopify" section)  
*[typo]* Misspelling of the carrier name MyParcel: "verzenden met MyParacel labels" (letters transposed -> MyParacel).  
→ Change "MyParacel" to "MyParcel".

**`src/content/blogs/hoe-koppel-ik-myparcel-met-woocommerce.md`** — line 25 ("De stappen om MyParcel te koppelen aan WooCommerce" section)  
*[typo]* Misspelling of the carrier name MyParcel: "verzenden met MyParacel labels" (letters transposed -> MyParacel).  
→ Change "MyParacel" to "MyParcel".

**`src/content/blogs/hoe-koppel-ik-sendcloud-met-bol.md`** — line 29, body: "...op de website van Sendcloud.2. Ga naar het dashboard..."  
*[cross-language-link]* An ordered/numbered list is jammed into a single <p> paragraph with no separators: numbers run directly against the end of the previous sentence (e.g. 'Sendcloud.2. Ga naar', 'verkoopkanalen.4. Je wordt'). This renders as one run-on paragraph instead of a step list, making the steps hard to read.  
→ Convert these numbered steps into a proper <ol><li> list (as is done in the QLS-bol and QLS-woocommerce articles), or at minimum add line breaks/spaces so each step starts on its own line.

**`src/content/blogs/hoe-koppel-ik-sendcloud-met-bol.md`** — line 31, body: "...verzendlabels aanpassen." and line 34 (Probleemoplossing) numbered runs  
*[cross-language-link]* Same malformed-list issue repeats in 'Het koppelingsproces' (line 31: 'Verkoopkanalen\".2. Klik op', 'autoriseren.4. Zodra') and in 'Probleemoplossing na koppeling' (line 34: 'koppelingsproces.2. Zorg', 'bestellingen.3. Raadpleeg', 'foutmeldingen.4. Neem'). The step numbers are concatenated into one paragraph with no list markup or breaks.  
→ Wrap each of these step sequences in a proper <ol><li> structure for correct rendering and readability.

**`src/content/blogs/hoe-koppel-ik-sendy-met-bol.md`** — body line 10 (<h1>Hoe Koppel Ik Sendy Met Bol?</h1>)  
*[a11y]* Het artikel bevat een in-body <h1>, terwijl ArticleLayout.astro (regel 61) de titel uit frontmatter al als pagina-<h1> rendert. Hierdoor staan er twee <h1>'s op de pagina en klopt de koppenhiërarchie niet. De zusterartikelen zonder in-body H1 (sendcloud, bol-webshop, excel) doen dit wél goed.  
→ Verwijder de in-body <h1> op regel 10 (of degradeer naar <h2> als er een sectiekop nodig is). De frontmatter-title fungeert al als H1.

**`src/content/blogs/hoe-koppel-ik-sendy-met-shopify.md`** — body line 10 (<h1>Hoe Koppel Ik Sendy Met Shopify?</h1>)  
*[a11y]* In-body <h1> dupliceert de pagina-<h1> die ArticleLayout.astro (regel 61) al uit de frontmatter-title rendert, wat een dubbele H1 en gebroken koppenhiërarchie oplevert.  
→ Verwijder de in-body <h1> op regel 10; de frontmatter-title is al de H1.

**`src/content/blogs/hoe-koppel-ik-sendy-met-woocommerce.md`** — body line 10 (<h1>Hoe Koppel Ik Sendy Met WooCommerce?</h1>)  
*[a11y]* In-body <h1> dupliceert de pagina-<h1> die ArticleLayout.astro (regel 61) al uit de frontmatter-title rendert, wat een dubbele H1 en gebroken koppenhiërarchie oplevert.  
→ Verwijder de in-body <h1> op regel 10; de frontmatter-title is al de H1.

**`src/content/blogs/innosend-en-bol-samen-gebruiken.md`** — line 24 (and lines 25, 26, 75, 79, 81)  
*[inconsistency]* Brand 'bol' is capitalised as 'Bol' mid-sentence and in headings, against the project rule that the brand is deliberately lowercase. Worse, the same sentences mix both casings: line 24 'voor verkopers op bol ... voor verkopers op Bol', line 25 'tussen Innosend en Bol ... integratie van Bol ... bestellingen van bol', line 28 'vanuit het Bol-platform'. Headings line 26 'Hoe de samenwerking Innosend en Bol verandert'. Closing line 81 'Innosend en Bol!'.  
→ Replace every 'Bol' with 'bol' throughout the article (including the h3 heading on line 26 and the closing paragraph on line 81) so the brand is consistently lowercase.

**`src/content/blogs/innosend-en-bol-samen-gebruiken.md`** — line 22 (paragraph 'De samenwerking tussen Innosend en bol')  
*[factual]* Claims 'bol ... heeft Innosend geïntegreerd in zijn verzendproces' and frames a direct partnership/integration between Innosend and bol. This appears fabricated: ShopLinkr is the connector that sits between bol and a shipping platform, and there is no documented direct bol-Innosend integration. The framing contradicts how ShopLinkr actually works (it is the order/inventory and integration layer).  
→ Reword to describe that ShopLinkr connects your bol account and Innosend, rather than asserting bol itself integrated Innosend into its shipping process. Do not assert a partnership that does not exist.

**`src/content/blogs/locatiebeheer.md`** — line 29 ('wat de waarde is van jou voorraad')  
*[grammar]* 'jou voorraad' is grammatically wrong; the possessive form is required.  
→ Change 'jou voorraad' to 'jouw voorraad'.

**`src/content/blogs/myparcel-en-bol-samen-gebruiken.md`** — lines 11, 13, 16, 20, 21, 22, 45, 56, 57  
*[inconsistency]* Brand 'bol' is repeatedly capitalised as 'Bol' (all headings on lines 11/13/16/20/22/45, and body lines 21, 56, 57) while other occurrences correctly use lowercase 'bol'. The same sentence on line 21 mixes both: 'tussen MyParcel en bol ... om MyParcel en Bol te integreren'. Line 57 'integratie tussen MyParcel en Bol ... met MyParcel en Bol samen!'.  
→ Lowercase every 'Bol' to 'bol' across all headings and body text for consistent brand casing.

**`src/content/blogs/myparcel-en-shopify-samen-gebruiken.md`** — frontmatter line 2: title "Myparcel en shopify samen gebruiken"  
*[typo]* Merknaam-/titelcasing fout. "Myparcel" moet "MyParcel" zijn en "shopify" moet "Shopify" zijn; beide worden in de bodytekst correct geschreven (MyParcel, Shopify).  
→ Wijzig title naar "MyParcel en Shopify samen gebruiken".

**`src/content/blogs/myparcel-en-woocommerce-samen-gebruiken.md`** — frontmatter line 2: title "Myparcel en woocommerce samen gebruiken"  
*[typo]* Merknaam-/titelcasing fout in de title (frontmatter). "Myparcel" moet "MyParcel" zijn en "woocommerce" moet "WooCommerce" zijn. Opvallend: de in-body H1 op regel 10 is wel correct ("MyParcel en WooCommerce samen gebruiken"), dus title en H1 zijn inconsistent met elkaar.  
→ Wijzig title naar "MyParcel en WooCommerce samen gebruiken" zodat deze overeenkomt met de H1.

**`src/content/blogs/postnl-en-bol-samen-gebruiken.md`** — frontmatter line 2: title "Postnl en bol samen gebruiken"  
*[typo]* Merknaam-/titelcasing fout. "Postnl" is verkeerd gespeld; de correcte merknaam is "PostNL" (zo geschreven in de hele bodytekst). De zustertitel myparcel-koppelen-aan-shoplinkr.md gebruikt wel correcte casing ("MyParcel koppelen aan ShopLinkr"), dus dit is een inconsistentie.  
→ Wijzig title naar "PostNL en bol samen gebruiken".

**`src/content/blogs/postnl-en-bol-samen-gebruiken.md`** — lines 3, 19, 21, 33, 37, 43, 44 ("Bol" met hoofdletter)  
*[inconsistency]* Inconsistente merknaamspelling van bol. Het merk wordt bewust met kleine letter geschreven ("bol"), en het artikel doet dat ook op de meeste plekken (regels 10, 11, 12, 14, 16, 21 eerste keer, 25, 35, 44 laatste keer). Maar op meerdere plaatsen staat "Bol" met hoofdletter, wat binnen hetzelfde artikel inconsistent is. Voorkomens met hoofdletter: regel 3 (excerpt "besteld bij Bol"), regel 19 ("PostNL en Bol"), regel 21 ("distributiecentrum van Bol"), regel 33 ("PostNL en Bol"), regel 37 ("PostNL en Bol"), regel 43 ("willen PostNL en Bol"), regel 44 (3x "Bol").  
→ Vervang alle "Bol" door "bol" voor consistentie met de bewuste kleine-letterbranding (let op: aan begin van een zin alsnog "bol" houden zoals elders in de tekst gedaan, of de zin herschrijven zodat het merk niet zinsbeginnend staat).

**`src/content/blogs/postnl-en-shopify-samen-gebruiken.md`** — frontmatter line 2: title "Postnl en shopify samen gebruiken"  
*[typo]* Merknaam-/titelcasing fout. "Postnl" moet "PostNL" zijn en "shopify" moet "Shopify" zijn; beide merknamen worden in de bodytekst correct met hoofdletters geschreven (PostNL, Shopify).  
→ Wijzig title naar "PostNL en Shopify samen gebruiken".

**`src/content/blogs/postnl-en-woocommerce-samen-gebruiken.md`** — frontmatter line 2: title "Postnl en woocommerce samen gebruiken"  
*[typo]* Merknaam-/titelcasing fout. "Postnl" moet "PostNL" zijn en "woocommerce" moet "WooCommerce" zijn; beide worden in de bodytekst correct geschreven (PostNL, WooCommerce).  
→ Wijzig title naar "PostNL en WooCommerce samen gebruiken".

**`src/content/blogs/product-tags.md`** — lines 18-20 (<h2><br></h2>)  
*[bug]* Empty H2 heading containing only a <br>. This is leftover layout markup from the CMS export: it renders an empty heading in the document outline and breaks the heading hierarchy / accessibility (empty heading element).  
→ Remove the entire empty heading block (lines 18-20). If vertical spacing is wanted, handle it with CSS, not an empty <h2>.

**`src/content/blogs/producten-verkopen-via-bol.md`** — line 36 ('Bol.com is een van de grootste...') and line 61 ('Bol.com heeft specifieke tarieven...')  
*[inconsistency]* Sentence-initial 'Bol.com' is capitalised. Although it starts a sentence, the project deliberately keeps the brand lowercase ('bol.com'); the file uses lowercase 'bol.com' mid-sentence everywhere, so the capitalised sentence-start forms are inconsistent with the house style.  
→ Reword so the brand is not sentence-initial (e.g. 'Met miljoenen klanten is bol.com een van de grootste...') to keep the lowercase 'bol.com' casing.

**`src/content/blogs/qls-en-shopify-samen-gebruiken.md`** — lines 92-93 ('Integreer QLS met je Shopify-winkel door de QLS-app te installeren via de Shopify App Store')  
*[factual]* Claims you connect Shopify and QLS by installing a 'QLS-app' from the Shopify App Store. In ShopLinkr's model the connection runs through ShopLinkr, not a direct QLS Shopify app; this step is likely inaccurate/invented and contradicts the ShopLinkr-centric flow described elsewhere on the site.  
→ Replace with the real flow: connect Shopify and QLS inside ShopLinkr (per the koppelingen/qls support article), rather than referencing a Shopify App Store QLS app.

**`src/content/blogs/qls-en-woocommerce-samen-gebruiken.md`** — lines 42-43 ('Installeer de QLS plugin op je WooCommerce webwinkel')  
*[factual]* Step instructs installing a 'QLS plugin' on WooCommerce to connect the two. The actual ShopLinkr flow connects WooCommerce and the carrier through ShopLinkr (see the linked woocommerce-koppelen-aan-shoplinkr article), not via a direct QLS WooCommerce plugin. Likely inaccurate/invented step.  
→ Replace with the real flow: connect WooCommerce to ShopLinkr and add QLS as a carrier in ShopLinkr, rather than a standalone QLS WooCommerce plugin.

**`src/content/blogs/sendcloud-en-woocommerce-samen-gebruiken.md`** — line 51, list item under "Stappen om Sendcloud en WooCommerce te integreren"  
*[typo]* Spelfout: "Bestelingen" is verkeerd gespeld (één l te weinig).  
→ Vervang "Bestelingen" door "Bestellingen".

**`src/content/blogs/sendy-en-shopify-samen-gebruiken.md`** — line 2 (frontmatter title)  
*[typo]* Brand name 'Shopify' is mis-cased as 'shopify' in the title: "Sendy en shopify samen gebruiken". Shopify is a proper-noun brand name and is capitalised correctly everywhere in the body and in the excerpt; only the title is wrong.  
→ Change the title to "Sendy en Shopify samen gebruiken".

**`src/content/blogs/sendy-en-woocommerce-samen-gebruiken.md`** — line 2 (frontmatter title)  
*[typo]* Brand name 'WooCommerce' is mis-cased as 'woocommerce' in the title: "Sendy en woocommerce samen gebruiken". The body text consistently uses the correct 'WooCommerce'; only the title is wrong.  
→ Change the title to "Sendy en WooCommerce samen gebruiken".

**`src/content/blogs/verkopen-via-bol-com.md`** — line 3 (frontmatter excerpt)  
*[copy]* The excerpt is truncated mid-sentence: "Wil je je producten online verkopen en ben je geïnteresseerd in het verkopen via bol." It cuts off at "bol." (the brand is 'bol.com'), leaving an incomplete question. The body's opening sentence (line 10) shows the intended full text ending in "verkopen via bol.com?". As a meta description/excerpt this reads as broken.  
→ Complete the excerpt, e.g. "Wil je je producten online verkopen en ben je geïnteresseerd in verkopen via bol.com? In dit artikel lees je alles wat je moet weten om aan de slag te gaan."

**`src/content/blogs/voorraadmanagement.md`** — first body heading, line 11 (<h3>Wat is Voorraadmanagement?)  
*[a11y]* Body headings start at <h3> and skip the <h2> level entirely (all section headings in this article are <h3>). The template renders the title as <h1>, so the document jumps from h1 to h3, breaking heading hierarchy.  
→ Promote the top-level section headings (lines 11, 13, 25, 41, 47) from <h3> to <h2> so the outline is h1 -> h2 with no skipped level.

**`src/content/blogs/voorraadsystemen.md`** — first body heading, line 10 (<h3>Een Diepe Duik...)  
*[a11y]* Body headings start at <h3> and skip the <h2> level (every section heading is <h3>). Combined with the template-rendered <h1> title, the outline jumps h1 -> h3. Note also line 10 repeats the title text as the first heading, duplicating the H1.  
→ Promote section headings (lines 12, 14, 30, 46, 59) from <h3> to <h2>, and remove or demote the duplicated title heading on line 10.

**`src/content/blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen.md`** — body (lines 11-58)  
*[seo]* The body contains no <h2>/<h3> subheadings at all (only an intro <strong> paragraph followed by a single <ol>). With the H1 supplied by the template title, the article has no heading structure, which is inconsistent with every sibling article in this set and weakens both accessibility and SEO outline.  
→ Wrap each of the four numbered themes (Kostenbesparing, Overzicht en efficiëntie, Schaalbaarheid en groei, Tijdbesparing en automatisering) in an <h2> heading instead of a bare list label, matching the heading pattern used in the other voorraad articles.

**`src/content/blogs/wat-is-een-ean-code.md`** — line 19 ('Productcode' list item)  
*[grammar]* Subject-verb agreement error: 'deze cijfers wijst de fabrikant zelf toe'. The subject 'deze cijfers' is plural, so the verb must be plural ('wijzen'), not singular ('wijst').  
→ Replace 'deze cijfers wijst de fabrikant zelf toe' with 'deze cijfers wijst de fabrikant zelf toe' -> 'deze cijfers wijzen de fabrikant zelf toe aan elk individueel product' is still odd; cleanest fix: 'deze cijfers wijst de fabrikant' -> 'deze cijfers wijst' becomes 'deze cijfers wijzen': use 'deze cijfers wijzen de fabrikant zelf toe aan elk individueel product' or rephrase to 'deze cijfers wijst de fabrikant zelf toe' -> 'de fabrikant wijst deze cijfers zelf toe aan elk individueel product'.

**`src/content/blogs/wat-is-het-verschil-tussen-een-ean-en-een-barcode.md`** — line 14 ('EAN: Een Specifiek Type Barcode' section, first sentence)  
*[grammar]* Broken sentence construction (anacoluthon): 'EAN, wat staat voor European Article Number (ook bekend als International Article Number), en is een specifiek type barcode...'. The opening relative clause is followed by 'en is', leaving the main clause without a proper subject-verb start. The 'en' is incorrect here.  
→ Remove the stray 'en' so it reads as one clean main clause: 'EAN staat voor European Article Number (ook bekend als International Article Number) en is een specifiek type barcode dat wereldwijd wordt gebruikt...'.

### Config/routing/SEO

**`public/llms.txt`** — lines 44-45  
*[broken-link]* llms.txt lists https://shoplinkr.com/privacy and https://shoplinkr.com/voorwaarden; both 404 (verified). Privacy/terms are served as external PDFs (footer uses externalLinks.privacyPdf/termsPdf). AI agents following llms.txt hit dead pages.  
→ Point both entries to the real PDF URLs (the DigitalOcean Spaces documents used in the footer) or remove the two lines. Also check llms-full.txt for the same.

**`src/middleware.ts`** — lines 88-98 (HTML edge-cache branch, the `if (context.request.method === 'GET' && type.includes('text/html') ...)` block)  
*[bug]* The edge-cache Cache-Control (public, s-maxage=3600, stale-while-revalidate=86400) is applied to EVERY text/html GET response with no check on response.status. A transient SSR error (500) or an SSR 404 will be cached at the Vercel CDN for up to an hour (and served stale for a day), so a one-off failure or a wrong page can be pinned at the edge for all visitors.  
→ Guard the cache branch on a successful status, e.g. add `response.status === 200` (or `response.ok`) to the condition so only good HTML pages get the long s-maxage. Optionally set a short/no-store Cache-Control for non-200 responses.

**`src/middleware.ts`** — line 9-10 comment ("Pages must be server-rendered (prerender: false) so this runs") vs src/pages/blogs/[slug].astro:113, src/pages/support/[slug].astro:153, src/pages/integraties/[slug].astro:84, and their /en/ twins  
*[bug]* The markdown-for-agents middleware only converts a page when next() returns server-rendered text/html. But the dynamic content routes (blog, support article, integration combo pages and their EN twins) export `prerender = true` (they use getStaticPaths), so they are served as static files. On those exact content URLs an `Accept: text/markdown` request will NOT receive markdown, which is the content agents most want to fetch as markdown. The config (output:'server' + per-route prerender:true) contradicts the feature's stated requirement.  
→ Decide and align: either drop `export const prerender = true` on the slug/category content pages so SSR + the markdown middleware applies to them, or document that markdown negotiation only covers SSR pages and provide a static .md alternative (e.g. llms-full.txt already exists) for the prerendered content.

**`vercel.json`** — top-level object (no "headers" entry applying security headers to all routes)  
*[a11y]* No security response headers are configured anywhere (neither vercel.json nor middleware.ts set them). There is no Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, X-Frame-Options/CSP frame-ancestors, or Permissions-Policy. The only headers defined are the llms.txt Link and the api-catalog Content-Type.  
→ Add a global header block in vercel.json with `source: "/(.*)"` setting at minimum Strict-Transport-Security (max-age=31536000; includeSubDomains; preload), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, and a frame-ancestors policy (X-Frame-Options: SAMEORIGIN or CSP frame-ancestors).

### i18n copy dict

**`src/i18n/locales/en.ts`** — pages.about.para1 (line 693)  
*[inconsistency]* The EN About page intro uses the brand name with a capital B ("...sold across multiple channels, including Bol and Amazon."). Per the project brand rule the bol brand is deliberately lowercase, and the matching NL copy (pages.about.para1, nl.ts line 695) correctly writes "waaronder bol en Amazon.". The rest of the EN dictionary predominantly uses lowercase "bol" (e.g. the integration combo namespaces), so this is an internal casing inconsistency that surfaces directly on the rendered About page (AboutPage.astro lines 49-51 render p.para1).  
→ Change "including Bol and Amazon" to "including bol and Amazon" so the brand casing matches the NL copy and the rest of the site.

**`src/i18n/locales/en.ts`** — featurePurchasing.subFeatures[1].heading (line 1610) and featurePurchasing.signalsHeadingLine2 (line 1626)  
*[grammar]* "One advice, neatly split per supplier." and "one concrete advice." use "advice" as a countable noun. In English "advice" is uncountable, so "one advice" / "an advice" is grammatically incorrect. The NL source ("Eén advies", "één concreet advies") is correct because Dutch "advies" is countable, but the literal EN rendering is not. This is rendered as a visible heading on the EN purchase-advice page.  
→ Reword to use a count noun or drop the article, e.g. heading -> "All your advice, neatly split per supplier." or "One overview, neatly split per supplier."; signalsHeadingLine2 -> "one clear recommendation." (and ideally align signalsHeadingLine1 "Five signals,").

**`src/i18n/locales/en.ts`** — pages.integrationsIndex.description (line 629)  
*[copy]* Brand-name rule violation in the EN meta description: 'ShopLinkr works with Bol, Shopify, ...' uses capitalized 'Bol' while the NL description (nl.ts line 631) uses lowercase 'bol'. Affects the rendered <meta name="description"> and Open Graph for the integrations index page.  
→ Change 'Bol' to 'bol' in the description.

**`src/i18n/locales/en.ts`** — pages.integrationsIndex.subheading (line 632)  
*[copy]* Brand-name rule violation: 'bol' must always be lowercase (bol's own branding, and the NL counterpart uses lowercase 'bol'), but the EN subheading capitalizes it: 'From Shopify and Bol to PostNL and Sendcloud, all in one place.' This string is rendered visibly in the IntegrationsIndexPage hero.  
→ Change 'Bol' to 'bol': 'From Shopify and bol to PostNL and Sendcloud, all in one place.'

**`src/i18n/locales/en.ts`** — features.stock.body (line 55)  
*[inconsistency]* Brand casing: 'Sold on Bol?' capitalizes the brand. Rule says lowercase 'bol'.  
→ Change 'Sold on Bol?' to 'Sold on bol?'.

**`src/i18n/locales/en.ts`** — features.bolSellers.title (line 67)  
*[inconsistency]* NL/EN mismatch in brand casing for the SAME key: NL features.bolSellers.title is 'Gemaakt door bol-verkopers.' (lowercase 'bol', correct per rule), but EN is 'Built by Bol sellers.' (capitalized). EN both violates the lowercase-bol rule and diverges from its NL counterpart.  
→ Change EN to 'Built by bol sellers.' to match NL casing and the brand rule.

**`src/i18n/locales/en.ts`** — line 629 — pages.integrationsIndex.description (also line 632 subheading, line 634 jsonLdDescription, line 655 combos[1], line 693 about.para1)  
*[inconsistency]* Brand-casing schending: de merknaam wordt bewust met kleine letter geschreven (bol), maar de EN-tekst kapitaliseert 'Bol' op deze plekken. De corresponderende NL-keys (nl.ts regels 631, 634, 636, 657, 695) gebruiken consequent kleine letter 'bol'. Binnen deze keys hoort EN dat ook te doen.  
→ Wijzig 'Bol' naar 'bol' in: integrationsIndex.description ('works with bol, Shopify...'), subheading ('From Shopify and bol to PostNL...'), jsonLdDescription ('works with bol, Shopify...'), combos[1] ('WordPress plus bol, connected...') en about.para1 ('including bol and Amazon').

**`src/i18n/locales/en.ts`** — pages.featurePicklists (heroCardEyebrow L1393, mockupPicklistLabel L1396, subFeatures[3].body "your picking list" L1425, pickMethods[1].title L1438, pickMethods[2].title L1442)  
*[inconsistency]* Within the same EN feature page, the product is called both "pick list" (page title L1386, description L1387, eyebrow L1388, breadcrumb L1392, subFeatures[1].body L1410) and "picking list" (heroCardEyebrow "Smart picking list", mockup label "Picking list PL-2418", "your picking list", "Picking list without bins", "Picking list with bins"). The rest of the EN site uses "pick list" consistently, and the NL source uses "picklijst" uniformly. The "picking list" spelling is an internal terminology inconsistency.  
→ Standardise on "pick list" everywhere in featurePicklists: change "Smart picking list" -> "Smart pick list", "Picking list PL-2418" -> "Pick list PL-2418", "your picking list" -> "your pick list", "Picking list without bins"/"Picking list with bins" -> "Pick list without bins"/"Pick list with bins".

**`src/i18n/locales/nl.ts`** — pages.bolInventory.rows[3] (line 2000, VVB/LVB row)  
*[inconsistency]* Brand-name casing is mixed inside one and the same card. The heading says 'Werkt met Verzenden via Bol én Logistiek via Bol.' (capital 'Bol' twice) while the body of that exact same row uses lowercase 'bol' four times: 'verzendlabels van bol (VVB)', 'laat je bol je orders ... afhandelen', 'wat bij bol ligt' and 'bol-fulfillment'. A reader sees 'Bol' in the title and 'bol' in the paragraph directly beneath it. Per the project rule the brand is deliberately lowercase 'bol'.  
→ Lowercase the two occurrences in the heading: 'Werkt met Verzenden via bol én Logistiek via bol.' so the whole card matches the lowercase 'bol' used in its body (and in this page's eyebrows).

**`src/i18n/locales/nl.ts`** — pages.returnFormTemplate.eyebrow (line 2104) + description (line 2102) vs requestButton/requestNote (lines 2108-2109); same in en.ts lines 2102/2100 vs 2106-2107; rendered in src/components/pages/ReturnFormTemplatePage.astro line 44-50  
*[copy]* The page promises an instant download (eyebrow 'Gratis download' / 'Free download', meta description 'Download ons gratis retourformulier template' / 'Download our free return form template', heading 'klaar voor gebruik' / 'ready to use') but there is no download link or file anywhere on the page or in externalLinks. The actual flow is request-by-email: the primary button is a mailto link (requestMailto) labelled 'Template aanvragen' / 'Request template' and requestNote says 'Stuur ons een mailtje en we sturen je het Word-document direct toe' / 'Send us a quick email and we will send you the Word document'. 'Download' as the dominant promise mismatches the request-by-email reality, which can read as a broken/missing download to visitors.  
→ Either add a real direct-download link to the Word/PDF file, or change the eyebrow and meta wording from 'download' to 'request'/'aanvragen' so the promise matches the mailto flow (the button copy is already honest).

**`src/i18n/locales/nl.ts`** — pages.pricing.orderBody (line 873) + pages.pricing.howIntro/copy; calculator data in src/components/pricing/PricingCalculator.vue ORDER_TIERS (lines 146-197)  
*[inconsistency]* The pricing copy claims the per-order rate keeps dropping with volume (NL line 873 'in de hogere staffels naar enkele centen per order zakt ... Hoe meer orders je per maand verwerkt, hoe lager het gemiddelde per order'; EN en.ts line 871 'dropping to just a few cents per order in the higher tiers ... The more orders you process per month, the lower the average per order'). The actual ORDER_TIERS in the calculator are NOT monotonically decreasing, so the live calculator contradicts the copy. Verified: at 250 orders the average is 0.16/order vs 0.10/order at 100 orders (goes UP), and at 6,000 orders the average is 0.0583/order vs 0.0562/order at 4,000 orders (goes UP again). Tier 4000-6000 (0.0625) is more expensive per order than tier 2500-4000 (0.0333), and tier 1000-1500 (0.08) is higher than tier 500-1000 (0.07). A visitor dragging the slider can see the average per order rise as they add orders, directly contradicting the stated promise.  
→ Either correct the ORDER_TIERS so marginal (and therefore average) per-order rates decrease monotonically, or soften the copy to not promise a strictly falling average (e.g. 'over time large volumes settle to just a few cents per order' without 'the more orders, the lower the average'). I cannot assert the correct prices; align copy and tier data so they agree.

**`src/i18n/locales/nl.ts`** — heroOrder.viaBol (line 35)  
*[inconsistency]* Brand casing: value is 'via Bol' with a capital B. Project rule states the brand is deliberately lowercase 'bol'. The same dictionary uses lowercase 'bol' elsewhere (e.g. features.bolSellers.title 'bol-verkopers' on line 69, and all pages.comboShopifyBol.* prose), so this is both a brand-rule violation and internally inconsistent.  
→ Change to 'via bol'.

**`src/i18n/locales/nl.ts`** — features.stock.body (line 57)  
*[inconsistency]* Brand casing: 'Verkocht op Bol?' capitalizes the brand. Rule says lowercase 'bol'; the rest of the file (e.g. line 69, comboShopifyBol prose) uses lowercase 'bol'.  
→ Change 'Verkocht op Bol?' to 'Verkocht op bol?'.

**`src/i18n/locales/nl.ts`** — customerStories.storySolution (line 813)  
*[typo]* Spatiefout in het Nederlandse compound: 'het pick- en pack proces'. In het Nederlands wordt het Engelse leenwoord-compound met een koppelteken aan 'proces' verbonden; 'pack proces' los geschreven is fout. De Engelse bron (en.ts line 811) schrijft correct 'the pick-and-pack process'.  
→ Wijzig naar 'het pick- en pack-proces' (koppelteken tussen 'pack' en 'proces').

**`src/i18n/locales/nl.ts`** — pages.bolInventory.title (line 1988), pages.bolInventory.eyebrow (line 1990), pages.bolInventory.heading (line 1991)  
*[inconsistency]* The brand is written as capital 'Bol' in the title/eyebrow/heading ('Bol voorraadbeheer'), while the description and body copy on the same page use lowercase 'bol' ('bol-verkopers' line 1989, 'bol-account' lines 1989/1991/2001, 'bol' throughout the rows). The project rule states 'bol' is deliberately lowercase, and the NL convention keeps it lowercase even sentence-initially (cf. nl.ts line 493 title 'bol erbij klikken'). The capitalised 'Bol' here is internally inconsistent with the surrounding NL copy.  
→ Lowercase to 'bol voorraadbeheer' in the title, eyebrow and heading to match the lowercase 'bol' used in the rest of the NL page and the project brand-casing rule. (If the marketing H1 must capitalise for visual reasons, do it everywhere on the page, but the current mix is the problem.)

**`src/i18n/locales/nl.ts`** — pages.inventoryExcel.description (line 2023) and pages.inventoryExcel.jsonLdDescription (line 2028)  
*[typo]* Casing error: 'Download ons gratis inkoop excel template' uses lowercase 'excel'. 'Excel' is a proper noun and is capitalized 15 other times in the same block; the EN equivalents (description/jsonLdDescription) correctly use 'purchasing Excel template'.  
→ Capitalize to 'inkoop Excel template' in both the description and jsonLdDescription.

**`src/i18n/locales/nl.ts`** — pages.simpleInventory.rows[1].heading (line 2168)  
*[grammar]* Awkward/incomplete NL heading: 'Automatisch werkt voor je.' uses the adverb/adjective 'Automatisch' as the sentence subject, which reads as missing a noun. The EN equivalent has a clear subject: 'Automation that works for you.'  
→ Use a noun, e.g. 'Automatisering werkt voor je.' or rephrase to 'Het werkt automatisch voor je.'

**`src/i18n/locales/nl.ts`** — pages.wooInventorySync.rows[4].body (line 2211)  
*[inconsistency]* Brand casing: 'Wil je vanuit WooCommerce uitbreiden naar Bol, Shopify of Kaufland?' uses capitalized 'Bol' mid-sentence, against the NL lowercase-'bol' convention.  
→ Change 'naar Bol, Shopify of Kaufland' to 'naar bol, Shopify of Kaufland'.

### Integration content

**`src/content/integrations/bol-com.json`** — summary (line 7): "...orders met Bol. Automatische..."  
*[inconsistency]* The brand is written with a capital "Bol" mid-sentence in the summary, while every other prose instance in this same NL file uses the deliberate lowercase "bol" (tagline: "je bol winkels"; about: "bol is de grootste..."; FAQ answer: "in je bol omgeving"). Per project convention bol is intentionally lowercase, so the capital here is an internal casing inconsistency within the file.  
→ Change "orders met Bol." to "orders met bol." to match the lowercase brand casing used in the tagline, about and FAQ of the same file.

### Other

**`public/llms-full.txt`** — line 42 vs line 347 (Integraties > Verkoopkanalen vs FAQ 'Welke verkoopkanalen en vervoerders worden ondersteund?')  
*[inconsistency]* The two sales-channel lists in the same file contradict each other. Line 42 states the sales channels are 'Bol, Shopify, WooCommerce, Kaufland'. The FAQ on line 347 lists 'Bol, Shopify, WooCommerce, Lightspeed, Kaufland'. Lightspeed is a real, defined integration (src/content/integrations/lightspeed-c-series.json, name 'Lightspeed C-Series', category 'webshop'), so line 42 is the stale/incomplete one. (llms.txt line 19-23 has the same omission, but llms-full.txt is internally self-contradictory.)  
→ Make the channel lists consistent: add Lightspeed to the Verkoopkanalen line (line 42), e.g. 'Bol, Shopify, WooCommerce, Lightspeed, Kaufland', so it matches the FAQ on line 347 and the actual integrations content. Do not remove it from the FAQ unless the integration is actually dropped.

**`public/llms.txt`** — line 44 (Juridisch > Privacybeleid: https://shoplinkr.com/privacy)  
*[broken-link]* The URL https://shoplinkr.com/privacy does not resolve. There is no src/pages/privacy.astro (or /en equivalent), no catch-all route matches it, and there is no redirect in astro.config.mjs or vercel.json. The live site serves the privacy document as a PDF: the footer links to externalLinks.privacyPdf (https://shoplinkr.ams3.digitaloceanspaces.com/documents/Privacyverklaring%202026.pdf). So this llms.txt entry points at a 404.  
→ Point the Privacybeleid entry at the actual PDF used in the footer (externalLinks.privacyPdf: https://shoplinkr.ams3.digitaloceanspaces.com/documents/Privacyverklaring%202026.pdf), or remove the line, or add a /privacy page/redirect so the URL exists. Whichever you pick, llms.txt must match a resolvable URL.

**`public/llms.txt`** — line 45 (Juridisch > Voorwaarden: https://shoplinkr.com/voorwaarden)  
*[broken-link]* The URL https://shoplinkr.com/voorwaarden does not resolve. There is no src/pages/voorwaarden.astro, no catch-all match, and no redirect in astro.config.mjs or vercel.json. The footer links Terms to externalLinks.termsPdf (https://shoplinkr.ams3.digitaloceanspaces.com/documents/Algemene%20voorwaarden%202026.pdf), i.e. a PDF, not an on-site /voorwaarden page. This llms.txt entry is a dead link. Note: /cookies on line 46 is correct (src/pages/cookies.astro exists), so only privacy and voorwaarden are wrong.  
→ Point the Voorwaarden entry at the actual PDF (externalLinks.termsPdf: https://shoplinkr.ams3.digitaloceanspaces.com/documents/Algemene%20voorwaarden%202026.pdf), or remove the line, or add a /voorwaarden page/redirect. The URL must resolve.

### Page components

**`src/components/pages/ComboWooShopifyPage.astro`** — line 50 — jsonLd BreadcrumbList itemListElement[0].item  
*[seo]* The BreadcrumbList 'Home' crumb is hardcoded to item: 'https://shoplinkr.com'. This component is rendered for BOTH the NL route (integraties/woocommerce-koppelen-aan-shopify) and the EN route (en/integrations/connect-woocommerce-to-shopify). On the EN page the breadcrumb Home therefore points to the NL homepage instead of https://shoplinkr.com/en, while positions 2 and 3 (integrationsUrl, pageUrl) are correctly localized via localizedPath. Cross-locale breadcrumb URL.  
→ Derive the home URL from the locale, e.g. const homeUrl = `https://shoplinkr.com${localizedPath('home', locale)}` and use that for the position-1 item (consistent with how integrationsUrl/pageUrl are built).

**`src/components/pages/FeatureCarriersPage.astro`** — line 236 (carrier logo tile: `h-12 w-12 rounded-lg bg-paper dark:bg-paper ring-1 ring-chalk-dark dark:ring-flint`)  
*[dark-mode]* The carrier logo-backing tile stays white (`bg-paper`, kept deliberately for legibility), but it gets `dark:ring-flint`. That puts a dark flint-coloured ring around a permanently-light/white tile in dark mode, which reads as a dark border on a light surface. The canonical logo tile in IntegrationCard.astro (line ~57) is `bg-paper ring-1 ring-chalk-dark` with NO dark: variants, so the ring stays light to match the light tile. The added `dark:bg-paper` here is also a redundant no-op (bg is already paper).  
→ Match the canonical pattern: drop both dark variants so the tile is `h-12 w-12 rounded-lg bg-paper ring-1 ring-chalk-dark ...` (no `dark:bg-paper`, no `dark:ring-flint`), keeping the light ring on the light tile in dark mode.

**`src/components/pages/FeatureOrdersPage.astro`** — line 158 (subFeatures.map article, class attribute)  
*[dark-mode]* The four sub-feature bento cards use `bg-paper dark:bg-charcoal`, but they sit inside the mockup section whose background is also `dark:bg-charcoal` (line 89). In dark mode the cards become charcoal-on-charcoal, so they lose their elevation/contrast against the section (only the thin dark:ring-flint distinguishes them). Every sibling feature page elevates these same cards to graphite: FeatureInventoryPage.astro line 165 and FeatureLocationsPage.astro line 167 both use `bg-paper dark:bg-graphite`, as do FeatureProductsPage.astro (line 173) and FeatureDeliveriesPage.astro (line 174). The contract is card surface = graphite when placed on a charcoal section. Orders is the lone outlier.  
→ Change `dark:bg-charcoal` to `dark:bg-graphite` on the article at line 158 so it reads `bg-paper dark:bg-graphite rounded-2xl ring-1 ring-chalk-dark dark:ring-flint ...`, matching the sibling feature pages.

**`src/components/pages/IntegrationDetailPage.astro`** — line 244 (Get started guide card <a> class)  
*[dark-mode]* Dark-mode hover violates the 'hover brightens one step' contract. The card is bg-charcoal dark:bg-graphite (graphite #252525 in dark mode), but the only hover declared is hover:bg-charcoal/95 with no dark: variant. In dark mode that hover applies charcoal (#191919) over the graphite base, i.e. it darkens the card on hover instead of brightening it one step.  
→ Add a dark hover that brightens one step, e.g. add 'dark:hover:bg-flint' (or scope the existing hover to light only). Resulting class: '... hover:bg-charcoal/95 dark:hover:bg-flint ...'.

**`src/components/pages/SimpleInventoryPage.astro`** — line 36 routeKey="simpleInventory" -> resolves via src/i18n/routes.ts line 64 to NL slug 'simpel-vooraadbeheer'  
*[typo]* The NL URL slug for this page is misspelled: 'simpel-vooraadbeheer' is missing the second 'r' in 'voorraadbeheer'. Every sibling inventory route in routes.ts (lines 57-62, e.g. 'voorraadbeheer', 'voorraadbeheer-systeem', 'bol-voorraadbeheer') spells it correctly with double-r. The page file src/pages/simpel-vooraadbeheer.astro is named to match this typo'd slug, so the typo is in the live, indexable, user-facing URL, and the routeKey/canonical/hreflang all inherit it.  
→ Rename the slug to 'simpel-voorraadbeheer' in src/i18n/routes.ts line 64 and rename the route file src/pages/simpel-vooraadbeheer.astro to simpel-voorraadbeheer.astro. Add a redirect from the old slug if it has already been indexed/linked. (Out-of-component but directly drives this page's canonical URL.)

### Support content

**`src/content/support-en/account/subscription/view-invoices.md`** — line 33, <a href="/support/het-pay-as-you-go-model">  
*[cross-language-link]* Internal link uses the Dutch slug /support/het-pay-as-you-go-model. The EN article slug is the filename (per src/pages/en/support/[slug].astro), so the EN target is /en/support/the-pay-as-you-go-model. As written, the link sends English readers to the Dutch article and points outside the /en/ section. The English file exists at src/content/support-en/account/billing-and-pricing/the-pay-as-you-go-model.md.  
→ Change href="/support/het-pay-as-you-go-model" to href="/en/support/the-pay-as-you-go-model".

**`src/content/support-en/getting-started/preparation/managing-tags.md`** — line 52, <a href="/support/rapporten-overzicht">reports</a>  
*[cross-language-link]* English article links to the Dutch article slug /support/rapporten-overzicht instead of the existing English equivalent.  
→ Change href to /en/support/reports-overview (EN translation exists at support-en/reports-and-insights/reports/reports-overview.md).

**`src/content/support-en/inventory-management/locations/location-management.md`** — line 72 (href="/support/bedrijfsinstellingen" and href="/support/backorders"), line 80 (href="/support/voorraadtellingen"), line 91 (href="/support/wat-zijn-picklijsten")  
*[cross-language-link]* All in-body support links point to the Dutch routes /support/<nl-slug> instead of the English routes. EN articles render at /en/support/<en-slug> (see src/pages/en/support/[slug].astro) and there is no in-body link rewriting, so an English reader is sent to the Dutch-language version of each linked article. The linked EN targets all exist: bedrijfsinstellingen -> getting-started/preparation/company-settings (company-settings), backorders -> order-processing/orders/backorders (backorders), voorraadtellingen -> inventory-management/stock/stock-counts (stock-counts), wat-zijn-picklijsten -> order-processing/pick-lists/working-with-pick-lists (working-with-pick-lists).  
→ Point body links at the EN routes: line 72 /support/bedrijfsinstellingen -> /en/support/company-settings and /support/backorders -> /en/support/backorders; line 80 /support/voorraadtellingen -> /en/support/stock-counts; line 91 /support/wat-zijn-picklijsten -> /en/support/working-with-pick-lists.

**`src/content/support-en/inventory-management/locations/location-number-tips.md`** — line 13 (href="/support/locatiebeheer" and href="/support/wat-zijn-picklijsten"), line 88 (href="/support/locatiebeheer")  
*[cross-language-link]* In-body support links target the Dutch routes /support/<nl-slug> instead of the English /en/support/<en-slug> routes, sending EN readers to the Dutch articles. EN targets exist: locatiebeheer -> location-management, wat-zijn-picklijsten -> working-with-pick-lists.  
→ Line 13: /support/locatiebeheer -> /en/support/location-management and /support/wat-zijn-picklijsten -> /en/support/working-with-pick-lists. Line 88: /support/locatiebeheer -> /en/support/location-management.

**`src/content/support-en/inventory-management/locations/optimizing-warehouse-layout.md`** — line 13 (href="/support/locatiebeheer"), line 15 (href="/support/inpakstations-instellen"), line 16 (href="/support/abc-analyse"), line 68 (href="/support/locatiebeheer"), line 69 (href="/support/backorders"), line 84 (href="/support/tips-voor-locatienummers"), line 86 (href="/support/abc-analyse")  
*[cross-language-link]* All seven in-body support links target the Dutch routes /support/<nl-slug> instead of /en/support/<en-slug>, sending EN readers to Dutch articles. EN targets exist: locatiebeheer -> location-management, inpakstations-instellen -> setting-up-packing-stations, abc-analyse -> abc-analysis, backorders -> backorders, tips-voor-locatienummers -> location-number-tips.  
→ Rewrite each href to its EN route: /support/locatiebeheer -> /en/support/location-management; /support/inpakstations-instellen -> /en/support/setting-up-packing-stations; /support/abc-analyse -> /en/support/abc-analysis; /support/backorders -> /en/support/backorders; /support/tips-voor-locatienummers -> /en/support/location-number-tips.

**`src/content/support-en/inventory-management/products/abc-analysis.md`** — line 15 (href="/support/wat-zijn-picklijsten"), line 72 (href="/support/locatiebeheer" and href="/support/inpakstations-instellen")  
*[cross-language-link]* In-body support links target the Dutch routes /support/<nl-slug> instead of /en/support/<en-slug>, sending EN readers to Dutch articles. EN targets exist: wat-zijn-picklijsten -> working-with-pick-lists, locatiebeheer -> location-management, inpakstations-instellen -> setting-up-packing-stations.  
→ Line 15: /support/wat-zijn-picklijsten -> /en/support/working-with-pick-lists. Line 72: /support/locatiebeheer -> /en/support/location-management and /support/inpakstations-instellen -> /en/support/setting-up-packing-stations.

**`src/content/support-en/inventory-management/products/create-a-bundle.md`** — line 165 (href="/support/voorraadtellingen"), line 168 (href="/support/producten-archiveren")  
*[cross-language-link]* In-body support links target the Dutch routes /support/<nl-slug> instead of /en/support/<en-slug>, sending EN readers to Dutch articles. EN targets exist: voorraadtellingen -> stock-counts, producten-archiveren -> archiving-products.  
→ Line 165: /support/voorraadtellingen -> /en/support/stock-counts. Line 168: /support/producten-archiveren -> /en/support/archiving-products.

**`src/content/support-en/inventory-management/products/fictitious-stock.md`** — line 134, link href="/support/bedrijfsinstellingen"  
*[cross-language-link]* English article body links to the Dutch support page /support/bedrijfsinstellingen. The <Content /> renderer outputs the body HTML verbatim with no locale rewriting, so an English reader is sent to the NL site. The EN equivalent exists.  
→ Change href to /en/support/company-settings (the EN article whose translationKey is bedrijfsinstellingen).

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 49, link href="/support/een-bundel-aanmaken"  
*[cross-language-link]* EN 'Product options' list item links to the Dutch bundle page /support/een-bundel-aanmaken instead of the English equivalent.  
→ Change href to /en/support/create-a-bundle.

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 49, link href="/support/onbeperkte-voorraad"  
*[cross-language-link]* EN 'Product options' list item links to the Dutch unlimited-stock page /support/onbeperkte-voorraad instead of the English equivalent.  
→ Change href to /en/support/unlimited-stock.

**`src/content/support-en/inventory-management/products/products-overview.md`** — line 49, link href="/support/voorraadbronnen"  
*[cross-language-link]* EN 'Product options' list item links to the Dutch stock-sources page /support/voorraadbronnen instead of the English equivalent.  
→ Change href to /en/support/stock-sources.

**`src/content/support-en/inventory-management/purchasing/purchase-advice.md`** — h3 heading line 14 ("Generating an advice"), line 32 ("Earlier advices stay visible"), line 131 ("included in an advice"), line 151 ("needs an advice period"), line 210 ("if you still want an advice"), line 213 ("An advice is generated")  
*[grammar]* "advice" is treated as a countable noun throughout, which is a literal calque of the Dutch "een advies / adviezen". In English "advice" is uncountable: "an advice" and "advices" are ungrammatical. This recurs across the whole article (heading, intro, body, Good to know).  
→ Make "advice" uncountable. E.g. heading "Generating an advice" -> "Generating advice"; "Earlier advices stay visible" -> "Earlier results stay visible" or "Earlier advice runs stay visible"; "An advice is generated in the background" -> "Advice is generated in the background"; "if you still want an advice" -> "if you still want a result". Keep "purchase advice" (the feature name) intact, but drop the article/plural where it is used as a count noun.

**`src/content/support-en/inventory-management/purchasing/purchase-advice.md`** — Body links: line 13 (/support/leveranciers-beheren, /support/een-levering-aanmaken), line 200 (/support/een-levering-aanmaken)  
*[cross-language-link]* This English article (served at /en/support/purchase-advice) links to the Dutch articles via /support/<dutch-slug>, sending English readers into Dutch content. Each linked target has a published English equivalent (leveranciers-beheren -> /en/support/managing-suppliers, een-levering-aanmaken -> /en/support/creating-a-delivery). No EN support article currently links to /en/support/, so this is a site-wide cross-language linking defect, but it directly degrades this article.  
→ Point the links at the English equivalents: /en/support/managing-suppliers and /en/support/creating-a-delivery. (Site-wide fix: rewrite all in-body /support/<nl-slug> links in support-en/ to their /en/support/<en-slug> counterparts, resolvable via each EN file's translationKey.)

**`src/content/support-en/inventory-management/purchasing/receiving-and-processing-a-delivery.md`** — Body links: line 13 (/support/leveranciers-beheren, /support/locatiebeheer), line 54 (/support/voorraadmutaties), line 57 (/support/backorders)  
*[cross-language-link]* This English article links to the Dutch versions via /support/<dutch-slug>, routing English readers into Dutch content even though English equivalents exist (leveranciers-beheren -> managing-suppliers, locatiebeheer -> location-management, voorraadmutaties -> stock-movements, backorders -> backorders).  
→ Point the links at /en/support/managing-suppliers, /en/support/location-management, /en/support/stock-movements and /en/support/backorders.

**`src/content/support-en/inventory-management/stock/move-stock-between-locations.md`** — line 38: "You can see the movement back in the product's stock mutations."  
*[inconsistency]* Two problems on this line. (1) Terminology: "stock mutations" is inconsistent with the canonical EN term "stock movements" used everywhere else (the linked article's title is literally "Stock movements", and receiving-and-processing-a-delivery.md line 54 says "stock movement"). (2) "see the movement back in" is a Dutch calque of "terugzien"; it reads awkwardly in English.  
→ Rewrite to: "The stock is moved immediately. You can see the movement in the product's <a href=\"/en/support/stock-movements\">stock movements</a>."

**`src/content/support-en/inventory-management/stock/stock-counts.md`** — line 14, <a href="/support/locatiebeheer">  
*[cross-language-link]* This EN article links to the Dutch support page (/support/locatiebeheer). EN support articles are served at /en/support/<english-slug>, and an EN equivalent exists at /en/support/location-management. The current link sends English readers to a Dutch-language article.  
→ Change href to /en/support/location-management

**`src/content/support-en/inventory-management/stock/stock-counts.md`** — line 80, <a href="/support/voorraadmutaties">  
*[cross-language-link]* Cross-language link: this EN article links to the Dutch slug /support/voorraadmutaties instead of its EN equivalent at /en/support/stock-movements.  
→ Change href to /en/support/stock-movements

**`src/content/support-en/inventory-management/stock/stock-movements.md`** — line 32, <a href="/support/locatiebeheer"> (Location)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/locatiebeheer instead of the EN equivalent at /en/support/location-management.  
→ Change href to /en/support/location-management

**`src/content/support-en/inventory-management/stock/stock-movements.md`** — line 54, <a href="/support/een-retour-verwerken"> (return)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/een-retour-verwerken instead of the EN equivalent at /en/support/processing-a-return.  
→ Change href to /en/support/processing-a-return

**`src/content/support-en/inventory-management/stock/stock-movements.md`** — line 57, <a href="/support/levering-ontvangen-en-verwerken"> (delivery)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/levering-ontvangen-en-verwerken instead of the EN equivalent at /en/support/receiving-and-processing-a-delivery.  
→ Change href to /en/support/receiving-and-processing-a-delivery

**`src/content/support-en/inventory-management/stock/stock-movements.md`** — line 63, <a href="/support/voorraad-verplaatsen-tussen-locaties"> (moved)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/voorraad-verplaatsen-tussen-locaties instead of the EN equivalent at /en/support/move-stock-between-locations.  
→ Change href to /en/support/move-stock-between-locations

**`src/content/support-en/inventory-management/stock/stock-movements.md`** — line 69, <a href="/support/voorraadtellingen"> (Stock count)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/voorraadtellingen instead of the EN equivalent at /en/support/stock-counts.  
→ Change href to /en/support/stock-counts

**`src/content/support-en/order-processing/orders/backorders.md`** — line 31, <a href="/support/levering-ontvangen-en-verwerken"> (receiving a delivery)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/levering-ontvangen-en-verwerken instead of the EN equivalent at /en/support/receiving-and-processing-a-delivery.  
→ Change href to /en/support/receiving-and-processing-a-delivery

**`src/content/support-en/order-processing/orders/backorders.md`** — line 33, <a href="/support/locatiebeheer"> (pick locations)  
*[cross-language-link]* Cross-language link: links to Dutch slug /support/locatiebeheer instead of the EN equivalent at /en/support/location-management.  
→ Change href to /en/support/location-management

**`src/content/support-en/order-processing/orders/orders-overview.md`** — line 37 ('Deferred' tab) and line 73 ('Defer an order')  
*[inconsistency]* Uses 'Deferred' (status tab) and 'Defer an order' (action), both linking to /support/bestelling-uitstellen, whose dedicated article (postpone-an-order.md) is titled 'Postpone an order' and uses 'Postpone'/'Postponed' throughout. The status name shown here does not match the wording of the article it links to, which is confusing for EN readers.  
→ Align the verb with the dedicated article (and the real in-app label): use either 'Deferred'/'Defer' or 'Postpone'/'Postponed' consistently across both files.

**`src/content/support-en/order-processing/orders/orders-overview.md`** — lines 30, 37, 42, 73, 76, 79, 82 (all in-body href attributes, e.g. href="/support/tags-beheren", "/support/bestelling-uitstellen", "/support/backorders", "/support/bestelling-annuleren", "/support/nazendingen-aanmaken", "/support/handmatige-zendingen", "/support/bestelling-markeren-als-hoge-prioriteit")  
*[cross-language-link]* This EN article links to Dutch support URLs (/support/<dutch-slug>). EN articles are served at /en/support/<en-slug> and there is no link rewriting in the renderer (SupportArticlePage renders <Content/> as-is). The targets resolve (the NL pages exist), but an EN reader is dropped into Dutch content. EN equivalents exist at /en/support/<en-slug>. (Note: this is a site-wide pattern, all 46 EN support articles do this; reported here for the slice files.)  
→ Point in-body links to the EN routes, e.g. /en/support/tags-management, /en/support/postpone-an-order (or defer-an-order), /en/support/backorders, /en/support/cancel-an-order, /en/support/create-reshipments, /en/support/manual-shipments, /en/support/mark-order-as-high-priority. Ideally rewrite link slugs centrally (via translationKey) rather than per file.

**`src/content/support-en/order-processing/returns/working-with-returns.md`** — line 46: status "Completed" (vs processing-a-return.md line 45 status "Handled")  
*[inconsistency]* The final return status is translated inconsistently across two cross-linked articles. working-with-returns.md calls it "Completed" while processing-a-return.md (line 45) calls the same final status "Handled". The NL source uses one consistent term "Afgehandeld" in both files (werken-met-retouren.md line 45 and een-retour-verwerken.md line 44). Since both articles describe the same return status and link to each other, the two different English labels will confuse users about what the actual status in the app is called.  
→ Use one consistent English term for the final status in both articles. Align working-with-returns.md line 46 to match processing-a-return.md, e.g. change "Completed" to "Handled" (or update both to whatever the actual app UI label is, which should be a single agreed translation of "Afgehandeld").

**`src/content/support/aan-de-slag/introductie/zoeken-in-shoplinkr.md`** — line 36  
*[bug]* Malformed inline HTML/quotes: `Klik op het "<strong>zoeken"</strong>`. The opening quote sits outside the <strong> while the closing quote sits inside it, so the bold text renders as `zoeken"` (a stray quote gets bolded) and the leading quote is unstyled. The sentence is also grammatically off: "Klik op het zoeken" lacks a noun (e.g. zoekveld / de zoekbalk).  
→ Rewrite so the quotes balance and the bolded label is clean, e.g. `Klik op <strong>Zoeken</strong> linksboven in je navigatie, of druk op Ctrl/Cmd+K.` (move both quotes outside <strong> or drop them, and bold only the word zoeken).

**`src/content/support/integraties/api/api-overzicht.md`** — line 30 ("Dit limiet geldt voor alle tokens binnen je account.")  
*[grammar]* Onjuist aanwijzend voornaamwoord: "limiet" is in het Nederlands een de-woord (de limiet), dus "Dit limiet" is fout congruentie.  
→ Vervang "Dit limiet geldt" door "Deze limiet geldt".

**`src/content/support/integraties/webshops-en-marketplaces/bol-com-koppelen.md`** — line 45  
*[typo]* "Alle informatie wordt geimporteerd" mist het trema op de i. Correct Nederlands is "geïmporteerd". Alle vergelijkbare artikelen in dezelfde subcategorie schrijven het wel correct (kaufland-koppelen.md regel 57, shopify-koppelen.md regel 50, woocommerce-koppelen.md regel 59), dus dit is een inconsistente spelfout.  
→ Vervang "geimporteerd" door "geïmporteerd".

**`src/content/support/orderverwerking/bestellingen/bestelling-annuleren.md`** — line 33, section "Wat gebeurt er met de voorraad?"  
*[grammar]* Stray article: "Stel dat je bijvoorbeeld als reden hebt aangegeven dat de er geen voorraad meer is" contains a leftover "de" before "er", making the clause ungrammatical.  
→ Remove the stray "de": "... als reden hebt aangegeven dat er geen voorraad meer is, dan wordt de voorraad van dat product direct op 0 gezet."

**`src/content/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md`** — line 12: "Met de samenvoeg functie kun je..."  
*[grammar]* "samenvoeg functie" is incorrectly split into two words. In Dutch this is a single compound noun and the space is a spelling error.  
→ Write as one word: "samenvoegfunctie" -> "Met de samenvoegfunctie kun je meerdere open bestellingen combineren..."

**`src/content/support/orderverwerking/bestellingen/bestellingen-verwerken.md`** — line 61: "Je wilt het pickproces zo efficient mogelijk inrichten..."  
*[typo]* "efficient" is missing the diaeresis. Correct Dutch spelling is "efficiënt".  
→ Change "zo efficient mogelijk" to "zo efficiënt mogelijk".

**`src/content/support/orderverwerking/bestellingen/handmatige-zendingen.md`** — line 34: "Er wordt automatisch een verzendlabel gegenereerd welke direct wordt geopend..."  
*[grammar]* Wrong relative pronoun. "verzendlabel" is a het-woord, so the relative pronoun must be "dat", not "welke". "welke" is both grammatically incorrect here and stilted for informal copy.  
→ Rewrite to: "Er wordt automatisch een verzendlabel gegenereerd dat direct wordt geopend zodat je het kunt printen."

**`src/content/support/orderverwerking/picklijsten/single-bestellingen.md`** — line 3 (frontmatter: summary)  
*[typo]* In de summary staat "Verwerk bestellingen met maar een type product extra snel." Hier hoort het telwoord "één" met accenten te staan, niet het lidwoord "een". De body van hetzelfde artikel (regel 12) gebruikt wel correct "slechts één type product", dus dit is ook intern inconsistent.  
→ Wijzig naar: "Verwerk bestellingen met maar één type product extra snel."

**`src/content/support/orderverwerking/picklijsten/wat-zijn-picklijsten.md`** — line 12 (body, eerste paragraaf)  
*[typo]* "snel en efficient inpakken" mist het trema op "efficiënt". Verderop in hetzelfde artikel (regel 42) staat het wel correct als "efficiënt picken", dus dit is ook een interne inconsistentie.  
→ Wijzig "efficient" naar "efficiënt".

**`src/content/support/voorraadbeheer/producten/abc-analyse.md`** — line 15: "...verdeeld in drie categorieeën volgens het Pareto-principe"  
*[typo]* Spelfout: "categorieeën" heeft een extra 'e' (drie e's op rij). De correcte Nederlandse spelling is "categorieën" (met trema op de laatste e). Dit is bovendien de enige plek in de support-content waar deze driedubbele-e variant voorkomt; elders staat o.a. al de correcte vorm "categorieën".  
→ Vervang "categorieeën" door "categorieën".

### UI components & layout

**`src/components/islands/ContactForm.vue`** — line 297, div class="rounded-lg bg-paper dark:bg-charcoal ring-1 ring-red-200 px-4 py-3 text-sm text-red-700"  
*[dark-mode]* The error alert box switches its surface to dark (dark:bg-charcoal) but keeps light-mode-tuned red status styling: ring-red-200 (very pale) becomes nearly invisible as a border, and text-red-700 (dark red) on a dark charcoal surface is low contrast / hard to read. Per the dark-mode contract red status colours should not invert, but the shade here needs a lighter dark-mode value for legibility on the dark surface.  
→ Brighten the red for dark mode while keeping the status hue, e.g. add dark:ring-red-500/40 and dark:text-red-400 (so: ring-1 ring-red-200 dark:ring-red-500/40 ... text-red-700 dark:text-red-400).

**`src/components/islands/CookieBanner.vue`** — lines 207-231 (analytics) and 233-257 (marketing) — <input type="checkbox" class="sr-only"> + visual toggle <span>  
*[a11y]* The toggle switches hide the real checkbox with `sr-only` and render a custom visual toggle <span>, but the visual toggle has no focus styling tied to the input. There is no `peer-focus`/`peer-focus-visible` (or a `focus-within` ring on the wrapping <label>). Keyboard users who tab to the Analytics / Marketing toggles get no visible focus indicator, so they cannot tell which control is focused.  
→ Add a `peer` class to the <input> and a focus ring to the visual toggle, e.g. on the <span class="... rounded-full transition-colors"> add `peer-focus-visible:ring-2 peer-focus-visible:ring-sunstone-deep peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-charcoal`, or add `focus-within:ring-2 focus-within:ring-sunstone-deep` to the wrapping <label>. (Keep the same pattern for both toggles.)

**`src/components/islands/NewsletterSignup.vue`** — line 100, div class="inline-flex ... bg-sunstone-mist text-sunstone-deep ring-1 ring-sunstone-soft/40"  
*[dark-mode]* The success-state icon tile has NO dark-mode variants. The light surface bg-sunstone-mist and the warm ring ring-sunstone-soft/40 have no dark: counterparts, so in dark mode this renders a pale cream tile on the dark:bg-charcoal card. The established codebase pattern for this exact tile always pairs them (see Showcase.astro:27, Features.astro:89/99/109 and the sibling ContactForm.vue:139 which already has dark:bg-sunstone/10).  
→ Add the warm-tint dark variants to match the canonical pattern: class="... bg-sunstone-mist dark:bg-sunstone/10 text-sunstone-deep ring-1 ring-sunstone-soft/40 dark:ring-sunstone/30 ..." (text-sunstone-deep accent stays, do not invert it).

**`src/components/layout/Header.astro`** — line 160 (dropdown <button> aria-expanded); also propagates to LanguageSwitcher.astro line 76 and ThemeToggle.astro line 49  
*[a11y]* The desktop "Over" dropdown trigger button has a hardcoded aria-expanded="false" plus aria-haspopup="true", but the menu is opened purely via CSS group-hover/group-focus-within and no script ever updates aria-expanded. When a keyboard or screen-reader user focuses the button the menu actually opens (via group-focus-within), yet the button keeps announcing "collapsed". The same stale aria-expanded="false" exists on the LanguageSwitcher trigger button (LanguageSwitcher.astro line 76) and the ThemeToggle trigger button (ThemeToggle.astro line 49), which never get updated either.  
→ Either drive aria-expanded from JS on focus/blur and hover (toggle to "true" when the menu is visible), or remove the aria-haspopup/aria-expanded attributes from these CSS-only hover/focus disclosure triggers so the markup no longer claims a state it does not maintain.

**`src/components/pricing/PricingCalculator.vue`** — lines 617-623 (.pricing-range:focus-visible::-webkit-slider-thumb / ::-moz-range-thumb)  
*[a11y]* The keyboard focus indicator is a `box-shadow: 0 0 0 4px var(--color-sunstone-mist)` ring. --color-sunstone-mist is #faedd5 (very pale cream) and the slider sits on the bg-paper (#ffffff) light-mode card, so in light mode the focus ring is barely distinguishable from the white card background. The default outline is removed at line 559, so this pale ring is the only focus affordance for keyboard users.  
→ Use a higher-contrast focus ring on the light card (e.g. var(--color-sunstone) or var(--color-charcoal)/sunstone-deep), and/or add a dark-mode variant. The thumb itself can stay; just darken the ring colour so the focus state is clearly visible on white.

**`src/components/pricing/PricingCalculator.vue`** — lines 146-197 (ORDER_TIERS), specifically the pricePerOrder values  
*[inconsistency]* The per-order rates in ORDER_TIERS are non-monotonic and internally contradictory for what is presented as a volume-discount/pay-as-you-go model. The marginal price per order runs 0.10 -> 0.20 -> 0.14 -> 0.07 -> 0.08 -> 0.025 -> 0.0333 -> 0.0625 -> 0.0375 -> 0.02. So the 100-250 tier (0.20) is DOUBLE the first 0-100 tier (0.10), and the 4000-6000 tier (0.0625) spikes well above both its neighbours (0.025/0.0333 before it, 0.0375 after it). A buyer reading this as a tiered volume discount would expect rates to fall (or at least not jump back up) as volume grows; here the marginal rate repeatedly rises again. This looks like data-entry errors in the tier table rather than an intentional curve. (Per project rules I am flagging the internal contradiction, not asserting the correct prices.)  
→ Verify the pricePerOrder values against the real pricing source. If a descending volume discount is intended, correct the out-of-sequence entries (most suspicious: min:100 max:250 at 0.20, and min:4000 max:6000 at 0.0625) so the marginal rate is monotonically non-increasing. If the non-monotonic shape is genuinely intentional, add a code comment documenting why so it is not read as a bug.

**`src/components/product/DashboardPreview.astro`** — lines 247-265 (marginsTitle chart legend vs <svg>)  
*[inconsistency]* The "Marges, Retouren & Annuleringen" chart shows a 3-item legend: Winstmarge (green), Retouren (red-light) and Annuleringen (sunstone). But the SVG body (lines 262-265) only draws a single series (margesPath in green #22c55e). The Returns (red-light) and Cancellations (sunstone) legend swatches have no corresponding line in the chart, so two of the three legend entries are orphaned. This reads as a half-finished chart.  
→ Either draw the two missing series (add red-light and sunstone line/area paths driven by their own data arrays, mirroring the financial chart which renders 3 lines), or reduce the legend to only the single Winstmarge series that is actually plotted.

**`src/components/product/PicklistPickPreview.vue`** — lines 168, 211, 227 (button class `bg-flint dark:bg-graphite ... hover:bg-charcoal`)  
*[dark-mode]* These buttons use `dark:bg-graphite` (#252525) but the hover state `hover:bg-charcoal` (#191919) has no dark-mode override, so in dark mode the button surface DARKENS on hover (graphite -> charcoal) instead of brightening one step. This violates the dark-mode contract (hover/focus must brighten one step) and is effectively invisible against the dark card, giving no hover feedback.  
→ Add a dark hover that brightens one step, e.g. `hover:bg-charcoal dark:hover:bg-flint` on each of the three buttons (minus button, plus button, and the "Opnieuw beginnen" button).

**`src/components/sections/Features.astro`** — line 189 (article.md:col-span-4 pricing card)  
*[dark-mode]* The pricing card uses bg-charcoal in light mode (a deliberately dark, high-contrast card on the white page) but bg-graphite in dark mode with NO ring/border. On the dark body (graphite-soft #1f1f1f) the card surface (graphite #252525) is only ~6 points lighter, so the card edge nearly disappears, and the hover state dark:hover:bg-graphite/95 makes it blend in even further. Every other card in this grid carries dark:ring-flint; this one has no border in either mode.  
→ Add a dark-mode border to delineate the card edge, e.g. add `dark:ring-1 dark:ring-flint` (and optionally `dark:hover:ring-steel`) to the article class. Per the dark-mode contract, borders must use flint (never graphite/charcoal).

**`src/components/seo/BaseHead.astro`** — line 17 (default image='/og-default.svg'), rendered at lines 62 & 70 (og:image / twitter:image)  
*[seo]* The default Open Graph / Twitter share image is an SVG (/og-default.svg). Facebook, LinkedIn, X/Twitter, WhatsApp and Slack do not render SVG og:image/twitter:image; they require a raster format (PNG or JPEG). Combined with twitter:card='summary_large_image' (line 67), shares of any page using the default image will show a card with no preview image, which undermines link-sharing CTR. The SVG asset is already authored at the correct 1200x630 OG dimensions, so it just needs to be rasterised.  
→ Generate a PNG (or JPEG) version of the OG image at 1200x630 (e.g. /og-default.png) and change the default to image = '/og-default.png'. Keep the SVG as the design source. Optionally add <meta property="og:image:type" content="image/png">, og:image:width=1200 and og:image:height=630 for faster/correct rendering, and an og:image:alt for accessibility.

**`src/components/support/SupportSearch.vue`** — line 245 — `role="combobox"` on the wrapping <div> (with aria-expanded/aria-haspopup/aria-owns), while the <input> on lines 255-273 carries aria-autocomplete/aria-controls/aria-activedescendant  
*[a11y]* The combobox ARIA is split incorrectly. Per the ARIA 1.2 combobox pattern, `role="combobox"` together with `aria-expanded`, `aria-controls` and `aria-activedescendant` belongs on the focusable <input> itself, not on a wrapping <div>. Here the role/aria-expanded/aria-owns live on the outer <div> while aria-controls/aria-activedescendant/aria-autocomplete live on the input, so the input is not exposed as a combobox and the state (expanded, active option) is not associated with the focused element screen readers land on.  
→ Move `role="combobox"`, `aria-expanded="showDropdown"` and `aria-haspopup="listbox"` onto the <input> (line 255), and remove `role`/`aria-expanded`/`aria-haspopup`/`aria-owns` from the wrapping <div> (it can stay a plain <div>). The input already has aria-controls/aria-activedescendant/aria-autocomplete, which is correct.

**`src/components/template/IntegrationCard.astro`** — line 56, div.h-12.w-12.rounded-lg (logo backing tile): class="... bg-paper ring-1 ring-chalk-dark ..."  
*[dark-mode]* The logo backing tile is intentionally light (bg-paper, allowed by the contract), but its ring uses the light token `ring-chalk-dark` with no dark variant. The card around it becomes dark:bg-charcoal, so a light-grey chalk ring sits on a dark surface, which violates the border/ring contract (rings must be dark:ring-flint on dark surfaces). The identical tile in src/components/pages/FeatureCarriersPage.astro:236 proves the intended pattern: `bg-paper dark:bg-paper ring-1 ring-chalk-dark dark:ring-flint`.  
→ Add `dark:ring-flint` to the logo tile ring so it matches the FeatureCarriersPage sibling: `... bg-paper ring-1 ring-chalk-dark dark:ring-flint ...`.

**`src/layouts/ArticleLayout.astro`** — .prose-shoplinkr (style block, lines 91-269) — missing base table/th/td rules; dark overrides at lines 260-268  
*[bug]* ArticleLayout's prose CSS defines dark-mode th/td overrides (`.dark .prose-shoplinkr th` line 260 and `.dark .prose-shoplinkr td` line 266 set background/border-color) but there are NO base (light-mode) `table`, `th`, `td` rules at all. ArticleLayout is consumed by BlogArticlePage which renders arbitrary markdown via <Content />, so a blog post containing a markdown table would render with browser defaults: no border-collapse, no padding, no header background, no cell borders. Even in dark mode the override only sets border-color/background but never declares the border itself, so cells stay borderless. SupportArticlePage.astro (lines 319-337) has the complete set (table width/border-collapse/margin, th+td border-bottom+padding+text-align, th background+color+font-weight); ArticleLayout is missing exactly those base rules.  
→ Copy the base table styles from SupportArticlePage.astro lines 319-337 into ArticleLayout's <style is:global> block: `.prose-shoplinkr table { width:100%; border-collapse:collapse; margin:1.75em 0; font-size:0.95em; }` plus `.prose-shoplinkr th, .prose-shoplinkr td { border-bottom:1px solid var(--color-chalk-dark); padding:0.65em 0.85em; text-align:left; }` and `.prose-shoplinkr th { background-color:var(--color-chalk-light); color:var(--color-charcoal); font-weight:600; }`. Then update the existing dark th/td override (lines 260-268) to set `border-bottom-color` (not generic `border-color`) to match the base rule.

## ⚪ Low (169)

### Blog content

**`src/content/blogs-en/bol-lvb-stock-switch.md`** — line 22 (href /functionaliteiten/voorraad) and line 31 (href /voorraadbeheer-webshop)  
*[cross-language-link]* Two in-body links in this EN article point to Dutch-slug landing pages (https://shoplinkr.com/functionaliteiten/voorraad and https://shoplinkr.com/voorraadbeheer-webshop), so an English reader lands on Dutch pages.  
→ Repoint to the English landing-page equivalents if they exist (e.g. an /en/ feature/stock page); if no EN equivalent exists, leave as-is but be aware these are NL destinations.

**`src/content/blogs-en/bol-stock-synchronization.md`** — lines 2-3, 11-14, 17, 20, 23, 26, 29-31 (uses 'synchronization', 'recognize', 'optimizing')  
*[inconsistency]* This article uses American English spelling (synchronization, recognize, optimizing) while the other EN articles in the same slice consistently use British spelling (synchronisation, optimise, minimise, centres in bol-lvb-stock-switch.md; optimise/minimises in the connect-* articles). The EN collection mixes spelling variants.  
→ Pick one English variant for the EN collection (British appears to be the majority here: synchronise/optimise/minimise/centre) and apply it consistently, including the title and excerpt of this file.

**`src/content/blogs-en/connect-sendy-to-shoplinkr.md`** — line 3 (excerpt: "optimizes") and line 15 (body: "minimizes")  
*[inconsistency]* American -ize spelling is used here ("optimizes", "minimizes"), but every other EN article in this set and the EN inventory articles consistently use British -ise spelling (optimise/minimise/synchronise/organise/analyse). connect-woocommerce-to-shoplinkr.md even uses "synchronised". The Sendy article is the lone outlier in spelling convention.  
→ Change "optimizes" to "optimises" (line 3) and "minimizes" to "minimises" (line 15) to match the British-English convention used across the rest of the EN content.

**`src/content/blogs-en/how-to-connect-bol-com-to-your-webshop.md`** — line 33 ("connect your Bol store"), line 44 ("according to Bol"), line 53 ("connect your Bol store")  
*[inconsistency]* Inconsistent brand casing within this file: the title and most references use lowercase "bol.com" (correct per brand rule that bol is deliberately lowercase), but three body spots capitalize "Bol". The NL source uses lowercase "bol" throughout. The mix is internally inconsistent.  
→ Lowercase these to match: "connect your bol store" / "according to bol" (or "bol.com"), consistent with the rest of the article and the lowercase-bol brand convention.

**`src/content/blogs-en/how-to-connect-dpd-to-woocommerce.md`** — lines 14 and 16 ("A short introduction to DPD" / "A short introduction to WooCommerce")  
*[inconsistency]* These two sub-section labels are plain <p> paragraphs, while in every sibling EN article the identical "A short introduction to X" labels are <h3> headings (how-to-connect-dpd-to-shopify lines 15/18, how-to-connect-dpd-to-bol lines 15/17, how-to-connect-innosend-to-bol lines 15/17). Result: the heading sequence here is <h1><h2><h2>... with two consecutive <h2> and the intros demoted out of the heading hierarchy, breaking outline consistency with the rest of the slice.  
→ Wrap both intro labels in <h3> tags: <h3>A short introduction to DPD</h3> and <h3>A short introduction to WooCommerce</h3>, matching the sibling articles' heading structure.

**`src/content/blogs-en/how-to-connect-innosend-to-shopify.md`** — line 20 (h2 "The importance of connecting Innosend to Shopify", <a>)  
*[cross-language-link]* The anchor text "shipping solutions and streamlining the shipping process" links to https://shoplinkr.com/blogs/hoe-koppel-je-bol-com-met-jouw-webshop, a Dutch article about connecting bol.com to a webshop. The destination is unrelated to the anchor text and is NL-language content inside an EN article.  
→ Replace with a relevant English resource on shipping/integrations, or remove the hyperlink so the phrase is plain text.

**`src/content/blogs-en/inventory-management-with-excel-a-complete-guide.md`** — line 16 href="/voorraadbeheer-excel-template" (also lines 11, 15, 18, 30 link to https://shoplinkr.com/blogs/<dutch-slug>)  
*[cross-language-link]* The free-template download link uses the Dutch route /voorraadbeheer-excel-template, sending English readers to the Dutch download page even though an English equivalent route exists at src/pages/en/inventory-excel-template.astro. (The other in-text links also point to Dutch /blogs/ articles.) Note: this is the consistent pattern across the entire blogs-en collection, so it appears to be a systemic content-migration decision rather than a one-off; flagging once for awareness, not per occurrence.  
→ For EN articles, point the template download to the English route (/en/inventory-excel-template) and prefer EN blog targets where they exist. If the cross-language linking is intentional for now, no per-file change is needed.

**`src/content/blogs-en/inventory-management.md`** — lines 35-39 and 43-47 (stray <br> sequences inside the last list item and the "Future of Inventory Management" paragraph)  
*[styling]* Stray empty <br> filler (two consecutive line breaks with a blank line between) left over from CMS migration. It adds no content and produces inconsistent trailing whitespace compared to other paragraphs/list items in the same article that have no such filler.  
→ Remove the empty <br> tags so the paragraph/list item closes cleanly, matching the other items.

**`src/content/blogs-en/inventory-systems.md`** — line 37 (Perpetual Systems list item: "...ideal for larger businesses")  
*[grammar]* Missing terminal period. Every other item in this and the surrounding <ol> lists ends with a full stop; this sentence ("They are often supported by advanced software and are ideal for larger businesses") does not, making it inconsistent with its siblings.  
→ Add a period: "...and are ideal for larger businesses."

**`src/content/blogs-en/selling-on-bol.md`** — frontmatter line 3 (excerpt)  
*[copy]* The excerpt is truncated mid-sentence: "Do you want to sell your products online and are you interested in selling on bol." It cuts off at "bol." (intended to be "bol.com?"), producing an incomplete sentence and an ambiguous "bol." in the preview/meta text. Mirrors an existing auto-truncation defect in the NL source (verkopen-via-bol-com.md), but is still a broken user-facing excerpt.  
→ Write a complete excerpt, e.g. "Do you want to sell your products online and are you interested in selling on bol.com? Here is everything you need to get started."

**`src/content/blogs-en/selling-products-on-bol.md`** — frontmatter line 3 (excerpt)  
*[copy]* The excerpt is truncated mid-sentence: "Do you want to sell products online and benefit from the large customer base of Bol." It ends abruptly at "Bol." leaving an incomplete sentence in the preview/meta text. Mirrors the NL source truncation but remains a broken user-facing excerpt.  
→ Write a complete excerpt, e.g. "Do you want to sell products online and benefit from bol.com's large customer base? This guide walks you through it step by step."

**`src/content/blogs-en/shoplinkr-at-the-webwinkel-vakdagen-2026.md`** — line 12 and line 31, <a href="https://crm.shoplinkr.com/qr/qqV4BlAVkSUM" target="_blank">  
*[a11y]* Both external links use target="_blank" without rel="noopener" (or rel="noopener noreferrer"), which is a reverse-tabnabbing security/best-practice gap for new-tab links.  
→ Add rel="noopener noreferrer" to both anchor tags, e.g. <a href="https://crm.shoplinkr.com/qr/qqV4BlAVkSUM" target="_blank" rel="noopener noreferrer">.

**`src/content/blogs-en/using-myparcel-and-bol-together.md`** — line 17, <h4>How MyParcel and Bol work together</h4>  
*[inconsistency]* This section uses an <h4> nested under the <h3> 'Benefits of MyParcel and Bol integration', the only <h4> in the entire slice. Heading flow is h2 > h3 > h4 then jumps back to h2, whereas every sibling article (and the rest of this file) uses only h2/h3. The h4 is content that logically belongs at the h3 level as a sibling section, not a sub-section of 'Benefits'.  
→ Change the <h4> to <h3> so 'How MyParcel and Bol work together' is a top-level section consistent with the rest of the article and the slice.

**`src/content/blogs-en/using-myparcel-and-bol-together.md`** — line 18 vs. lines 25-39 (the 'Steps to integrate' ordered list)  
*[inconsistency]* The article states the MyParcel-Bol link is made 'through ShopLinkr' (line 18: 'link your MyParcel account to your Bol seller account through ShopLinkr ... ShopLinkr is a tool that helps you integrate different carriers and sales channels'), but the numbered how-to that follows describes doing the linking entirely inside MyParcel ('Log in to your MyParcel account and go to the settings', "Click 'Link a sales channel' and select Bol"), with no ShopLinkr step. The two descriptions of the same workflow contradict each other.  
→ Align the two passages: either describe the linking via ShopLinkr in the numbered steps, or drop the 'through ShopLinkr' framing on line 18, so the integration path is described consistently.

**`src/content/blogs-en/using-qls-and-woocommerce-together.md`** — line 2 (frontmatter title: "Using QLS and WooCommerce Together")  
*[inconsistency]* Title capitalisation is inconsistent with the five sibling articles in the set. This title uses Title Case for the final word ("Together"), while using-postnl-and-shopify-together, using-postnl-and-woocommerce-together, using-qls-and-bol-together, using-qls-and-shopify-together and using-sendcloud-and-bol-together all use sentence case ("together").  
→ Change the title to "Using QLS and WooCommerce together" to match the sentence-case convention of the other articles.

**`src/content/blogs/bol-com-koppelen-aan-shoplinkr.md`** — line 24 ('... naadloos te laten meedraaien in je magazijn proces?')  
*[typo]* Dutch compound noun written as two words: 'magazijn proces' should be one word.  
→ Change 'magazijn proces' to 'magazijnproces'.

**`src/content/blogs/bol-com-voorraad-synchronisatie.md`** — lines 13, 16, 19, 22, 25, 28 (strong-tag section titles)  
*[typo]* English-style Title Case capitalization in Dutch text: 'Waarom is bol.com Voorraad Synchronisatie Zo Belangrijk?', 'Voorkomen van Te Veel Verkopen', 'Besparen van Tijd en Geld', 'Flexibiliteit in Je Verkoopstrategieen', 'Real-time Inzicht', 'De Toekomst van E-commerce en bol Voorraad Synchronisatie'. Dutch uses sentence case, not capitalised content words.  
→ Lowercase the non-initial content words, e.g. 'Waarom is bol voorraad synchronisatie zo belangrijk?', 'Voorkomen van te veel verkopen', 'Besparen van tijd en geld', 'Flexibiliteit in je verkoopstrategieen', 'Real-time inzicht', 'De toekomst van e-commerce en bol voorraad synchronisatie'.

**`src/content/blogs/bol-com-voorraad-synchronisatie.md`** — line 29 ('Met de verwachte groei van de e-commerce markt ...')  
*[typo]* Dutch compound noun written as two words: 'e-commerce markt' should be closed up.  
→ Change 'e-commerce markt' to 'e-commercemarkt'.

**`src/content/blogs/bol-com-voorraad-synchronisatie.md`** — lines 11, 13, 16, 19, 22, 25, 28 (section titles wrapped in <p><strong>...</strong></p>)  
*[inconsistency]* Section titles are marked up as bold paragraphs (<p><strong>...</strong></p>) instead of real headings. Every sibling article in this slice (back-ordering, voorraadbeheer-in-excel, bol-com-koppelen, bol-lvb-voorraad-switch, magazijnsoftware) uses <h2>/<h3>. This article therefore has no heading structure, hurting hierarchy/accessibility and SEO and breaking visual consistency.  
→ Convert the bold-paragraph titles to <h2> (and the numbered benefit items could stay as list text), matching the heading pattern used by the other articles.

**`src/content/blogs/bol-lvb-voorraad-switch.md`** — throughout body (e.g. 'Bol.com' line 12/14/30/38/39/40/47, 'Bol LVB' 32 occurrences); title line 2 'Bol Lvb Voorraad Switch'; excerpt line 3  
*[inconsistency]* The marketplace brand is capitalised as 'Bol.com', 'Bol LVB' and (in the title) 'Bol Lvb'. Per the project brand rule bol/bol.com is deliberately lowercase, and the sibling bol articles (bol-com-koppelen, bol-com-voorraad-synchronisatie) use lowercase 'bol'/'bol.com'. The title 'Bol Lvb' also mis-cases the acronym LVB.  
→ Use lowercase 'bol' / 'bol.com' consistently and write the acronym as 'LVB', e.g. title 'bol LVB voorraad switch' and body 'bol.com-voorraad'. Align with the lowercase convention used in the other bol articles.

**`src/content/blogs/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md`** — line 70, heading <h3>Het opzetten van uw voorraadbeheersysteem in Excel</h3>  
*[grammar]* Inconsistent register: this heading uses the formal 'uw', while the entire rest of the article (and all sibling articles) consistently uses the informal NL register ('je'/'jouw'). NL copy is required to be informal.  
→ Change to informal: "Het opzetten van je voorraadbeheersysteem in Excel".

**`src/content/blogs/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md`** — line 72, body <p>: <a href="https://shoplinkr.com/voorraadbeheer-excel-template">gebruik van formules voor voorraadbeheer</a>  
*[inconsistency]* Same structural issue as the section above: 'Het gebruik van formules voor voorraadbeheer' reads as an intended sub-heading but is rendered as a body paragraph wrapped entirely in a link. It sits between the H3 'Het opzetten van uw voorraadbeheersysteem...' and the following body paragraphs, breaking the heading hierarchy. The link text/target also mismatch: anchor text is about 'formules', but it points to the Excel template download page.  
→ Make it a proper <h3>Het gebruik van formules voor voorraadbeheer</h3> heading and either drop the link or move it into body copy with anchor text that matches the template-download destination.

**`src/content/blogs/effectief-voorraadbeheer-in-excel-tips-en-tricks.md`** — frontmatter, line 2: title: "Effectief voorraadbeheer in excel: tips en tricks"  
*[inconsistency]* Proper-noun casing error in the title: 'excel' should be 'Excel'. The body consistently capitalises 'Excel', so the rendered H1 is inconsistent with the article body.  
→ Change the title to "Effectief voorraadbeheer in Excel: tips en tricks".

**`src/content/blogs/excel-voorraadbeheer-alles-wat-je-moet-weten.md`** — line 71 ("Het belang van data nauwkeurigheid" section, word "Excel-voorrraadbeheersysteem")  
*[typo]* Spelling error: "Excel-voorrraadbeheersysteem" contains a triple 'r' (voorrr).  
→ Correct to "Excel-voorraadbeheersysteem".

**`src/content/blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md`** — line 12: <h3>Wat Zijn Voorraadsystemen?</h3> (eerste body-heading)  
*[seo]* Heading-hierarchie slaat een niveau over. De pagina-<h1> komt uit de frontmatter-title (via de layout), maar de body begint meteen op <h3> en gebruikt uitsluitend <h3>'s; er is geen <h2>. Hierdoor springt de hierarchie van H1 naar H3.  
→ Verlaag de body-sectiekoppen van <h3> naar <h2> (Wat Zijn Voorraadsystemen?, De Rol van Technologie..., Voordelen van..., Toekomstige Trends..., Tips voor het Kiezen...), zodat de hierarchie H1 -> H2 wordt zoals in de andere artikelen.

**`src/content/blogs/hoe-koppel-ik-dpd-met-shopify.md`** — line 16: "68.000 medewerkers en een vloot van 32.000 voertuigen" vs hoe-koppel-ik-dpd-met-woocommerce.md line 17: "46.000 medewerkers en 42.000 voertuigen"  
*[factual]* Tegenstrijdige DPD-bedrijfscijfers tussen twee artikelen in dezelfde set. Het Shopify-artikel claimt 68.000 medewerkers en 32.000 voertuigen, het WooCommerce-artikel claimt 46.000 medewerkers en 42.000 voertuigen. Beide kunnen niet kloppen; minstens een van de twee is onjuist of verzonnen.  
→ Kies een geverifieerd, consistent cijfer (of verwijder de exacte aantallen als ze niet betrouwbaar te onderbouwen zijn) en gebruik dezelfde waarden in beide DPD-artikelen.

**`src/content/blogs/hoe-koppel-ik-innosend-met-woocommerce.md`** — line 15 ("Een korte introductie van Innosend")  
*[grammar]* A spaced hyphen is used as a sentence dash: "... om je verzendingen te beheren - alles kan worden gedaan binnen Innosend." The project writing rule forbids dashes (emdash) and asks for a comma, period or rewrite; a bare hyphen used this way is the same disfavoured construction.  
→ Replace " - " with a comma or split into two sentences, e.g. "... om je verzendingen te beheren. Alles kan worden gedaan binnen Innosend."

**`src/content/blogs/hoe-koppel-ik-myparcel-met-bol.md`** — throughout body (e.g. lines 11, 13, 14, 16, 21, 23, 25; title line 10) - "Myparcel" used 36x  
*[inconsistency]* Carrier name is consistently cased as "Myparcel" (lowercase p) in this article, while the three sibling MyParcel articles (myparcel-met-shopify, myparcel-met-woocommerce) and the carrier's own branding use "MyParcel". The single occurrence at line 28 even switches to the correct "MyParcel" (then misspells it), making the casing internally inconsistent.  
→ Standardise to "MyParcel" throughout this article to match the carrier branding and the sibling articles.

**`src/content/blogs/hoe-koppel-ik-postnl-met-bol.md`** — lines 34-35 ("Het koppelingsproces starten" section)  
*[factual]* The instructions tell the reader to couple Bol.com to PostNL from the PostNL dashboard ("Ga naar het dashboard van PostNL en zoek naar de optie om je PostNL-account te koppelen aan Bol.com"). PostNL has no native Bol.com order-coupling; this contradicts the ShopLinkr model (couple PostNL + Bol to ShopLinkr) that the CTA at line 51 promotes, and looks like an invented step flow.  
→ Rework the steps to describe coupling PostNL and Bol via ShopLinkr (consistent with the MyParcel-met-bol article and the closing CTA), rather than a non-existent PostNL-to-Bol dashboard option.

**`src/content/blogs/hoe-koppel-ik-qls-met-woocommerce.md`** — line 53, body: "Over het algemeen duurt het koppelingsproces enkele uren tot enkele dagen."  
*[factual]* This article claims the QLS-WooCommerce coupling takes 'enkele uren tot enkele dagen', which contradicts the sibling QLS-bol article (line 88) stating the same type of coupling takes 'slechts enkele minuten tot een uur'. ShopLinkr integrations are API-based connections that activate quickly; 'enkele dagen' looks inaccurate and inconsistent.  
→ Align the stated coupling time with the other articles (minutes, not days), e.g. 'enkele minuten tot een uur', unless a longer time is genuinely accurate.

**`src/content/blogs/hoe-koppel-ik-sendcloud-met-woocommerce.md`** — frontmatter title (line 2) en H2-structuur (eerste kop op line 11)  
*[inconsistency]* Titel 'Hoe koppel ik sendcloud met woocommerce?' gebruikt kleine letters voor de eigennamen Sendcloud en WooCommerce, terwijl de body-tekst overal correct 'Sendcloud' en 'WooCommerce' schrijft. Inconsistente merk-/productcasing in de titel (geldt ook voor de zusterartikelen sendy/woocommerce/shopify/bol-titels).  
→ Corrigeer de casing in de title naar 'Hoe koppel ik Sendcloud met WooCommerce?' en pas dezelfde correctie toe op de titels van hoe-koppel-ik-sendy-met-bol.md, -shopify.md en -woocommerce.md (Sendy, Bol, Shopify, WooCommerce).

**`src/content/blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md`** — body line 46 ('wordt het synchronisatie process gestart')  
*[typo]* Engelse spelling 'process' gebruikt in Nederlandse tekst; moet 'proces' zijn.  
→ Wijzig 'synchronisatie process' in 'synchronisatieproces' (of 'synchronisatie-proces').

**`src/content/blogs/innosend-en-shopify-samen-gebruiken.md`** — frontmatter line 2 (title: "Innosend en shopify samen gebruiken")  
*[inconsistency]* Title spells the brand 'shopify' lowercase, but the body consistently uses the official casing 'Shopify'. Title proper-noun casing is wrong and inconsistent with the body.  
→ Change the title to 'Innosend en Shopify samen gebruiken'.

**`src/content/blogs/innosend-en-woocommerce-samen-gebruiken.md`** — frontmatter line 2 (title: "Innosend en woocommerce samen gebruiken")  
*[inconsistency]* Title spells the brand 'woocommerce' lowercase, but the body consistently uses the official casing 'WooCommerce'. Title proper-noun casing is wrong and inconsistent with the body.  
→ Change the title to 'Innosend en WooCommerce samen gebruiken'.

**`src/content/blogs/myparcel-en-bol-samen-gebruiken.md`** — frontmatter line 2 (title: "Myparcel en bol samen gebruiken")  
*[inconsistency]* Title spells the brand 'Myparcel', but the body consistently uses the correct casing 'MyParcel'. The title proper-noun casing is wrong and inconsistent with the article body.  
→ Change the title to 'MyParcel en bol samen gebruiken'.

**`src/content/blogs/myparcel-en-bol-samen-gebruiken.md`** — line 16 (<h4>Hoe MyParcel en Bol samenwerken</h4>)  
*[inconsistency]* This section uses an h4 while every other subsection in the document is an h3 sitting under the h2 sections. It is the only h4 in the article and sits among sibling h3 sections, making the heading hierarchy inconsistent.  
→ Change the h4 to h3 to match the surrounding subsection level.

**`src/content/blogs/myparcel-en-woocommerce-samen-gebruiken.md`** — line 10: <h1>MyParcel en WooCommerce samen gebruiken</h1>  
*[layout]* Headinghiërarchie-inconsistentie. Dit is het enige artikel in de slice met een in-body <h1>; de andere vijf artikelen starten meteen met <h2> en laten de paginatitel door de template/frontmatter renderen. Een tweede H1 in de body (naast de gerenderde paginatitel) levert dubbele H1's op en is slecht voor SEO/toegankelijkheid.  
→ Verwijder de <h1> op regel 10 (de title in de frontmatter dekt de paginatitel al), in lijn met de andere artikelen, of verlaag hem naar consistente body-structuur.

**`src/content/blogs/producten-verkopen-via-bol.md`** — line 37 ('Fulfilment service') vs qls-en-bol-samen-gebruiken.md line 22/66 ('Fulfillment by Bol' / 'Fulfillment by bol (FBB)')  
*[factual]* Inconsistent and partly outdated naming of bol's logistics service: 'Bol.com Fulfilment service' (one l, EN spelling) vs 'Fulfillment by Bol (FBB)' (two l's). bol's service is now branded 'Logistiek via bol (LVB)'. Spelling 'Fulfilment'/'Fulfillment' is also inconsistent across the two files.  
→ Standardise to bol's current name 'Logistiek via bol (LVB)', or at minimum pick one consistent spelling and lowercase 'bol'. Do not invent the acronym.

**`src/content/blogs/sendcloud-en-bol-samen-gebruiken.md`** — line 3 (excerpt) en body lines 10, 42-74, 95-123 ("Bol", "Wat is Bol?", "verkopen op Bol", "Bol-account", enz.)  
*[inconsistency]* De marktplaats wordt door de hele tekst geschreven als "Bol" met hoofdletter. Volgens de merkconventie hanteert bol een bewust kleine-letter branding ("bol" / "bol.com"); andere artikelen in deze set (qls-koppelen, sendcloud-koppelen) gebruiken correct "bol.com" met kleine letter. Inconsistent met bol's eigen branding.  
→ Schrijf de naam consequent als bol (of bol.com), bijv. "Wat is bol?", "verkopen op bol", "bol-account". Pas dit ook toe in de excerpt.

**`src/content/blogs/sendcloud-en-shopify-samen-gebruiken.md`** — line 2, frontmatter title  
*[typo]* "shopify" in de titel is met kleine letter geschreven, terwijl Shopify een eigennaam is en in de hele body consequent als "Shopify" wordt geschreven. Inconsistente merknaam-casing.  
→ Wijzig de titel naar "Sendcloud en Shopify samen gebruiken".

**`src/content/blogs/sendcloud-en-shopify-samen-gebruiken.md`** — line 12, paragraph "Wat is Sendcloud?"  
*[copy]* De ankertekst van de interne link is verkeerd afgebakend: alleen "verzendplatform dat het hele proces" is gelinkt, terwijl de zin doorloopt met "van het verzenden van pakketten vereenvoudigt". De link breekt midden in de zin af, wat een onnatuurlijke/onlogische ankertekst oplevert.  
→ Herzie de link zodat een logische, afgebakende ankertekst gelinkt is (bijv. alleen "Sendcloud" of "verzendplatform"), in plaats van een halve zin.

**`src/content/blogs/sendcloud-en-woocommerce-samen-gebruiken.md`** — line 2, frontmatter title  
*[typo]* "woocommerce" in de titel is met kleine letter geschreven, terwijl WooCommerce een eigennaam is en in de hele body consequent als "WooCommerce" wordt geschreven. Inconsistente merknaam-casing.  
→ Wijzig de titel naar "Sendcloud en WooCommerce samen gebruiken".

**`src/content/blogs/sendy-en-woocommerce-samen-gebruiken.md`** — line 67 (numbered tip 1)  
*[grammar]* Awkward/ungrammatical Dutch: "om het proces van bestellingen verwerken te automatiseren". The noun phrase "het proces van bestellingen verwerken" is malformed (an infinitive 'verwerken' directly after 'van ... bestellingen').  
→ Rewrite to "om het verwerken van bestellingen te automatiseren" (or "om het proces voor het verwerken van bestellingen te automatiseren").

**`src/content/blogs/voorraadmanagement.md`** — lines 34-38 and 42-46 (inside <li> and <p>)  
*[bug]* Leftover CMS-export markup: stray empty <br> tags surrounding blank lines inside a list item (lines 35-37) and inside a paragraph (lines 43-45). These produce empty vertical gaps and are malformed/meaningless HTML in the content body.  
→ Remove the empty <br> sequences and the blank lines between them; close the <li>/<p> cleanly after the sentence text.

**`src/content/blogs/voorraadsystemen.md`** — line 36 (list item: "...ideaal voor grotere bedrijven")  
*[grammar]* The list item ends without a period ("...zijn ideaal voor grotere bedrijven"), inconsistent with the other list items in the same <ol> which all end with a full stop.  
→ Add a closing period: "...en zijn ideaal voor grotere bedrijven."

**`src/content/blogs/voorraadsystemen.md`** — lines 24-26 and 40-42 (inside <li>)  
*[bug]* Leftover CMS-export markup: stray empty <br> tags around blank lines inside two list items, producing empty gaps and malformed body HTML.  
→ Remove the empty <br> sequences and blank lines; close each <li> cleanly after its sentence.

**`src/content/blogs/wat-is-het-verschil-tussen-een-ean-en-een-barcode.md`** — line 34 (Conclusie paragraph)  
*[typo]* Spelling inconsistency within the same sentence: 'het efficient verwerken van orders' is missing the diaeresis, while 'efficiënt beheren' earlier in the very same sentence is spelled correctly. Dutch spelling is 'efficiënt'.  
→ Change 'het efficient verwerken' to 'het efficiënt verwerken'.

**`src/content/blogs/wat-is-het-verschil-tussen-een-ean-en-een-barcode.md`** — lines 10, 13, 30 (h2 headings)  
*[inconsistency]* Headings use English-style Title Case ('Barcode: De Universele Taal van Producten', 'EAN: Een Specifiek Type Barcode', 'Belangrijkste Verschillen'), which is inconsistent with Dutch sentence case used in the other EAN/blog articles (e.g. 'Wat is een EAN-code?', 'De opbouw van een EAN-code'). Dutch convention is sentence case.  
→ Rewrite headings in Dutch sentence case, e.g. 'Barcode: de universele taal van producten', 'EAN: een specifiek type barcode', 'Belangrijkste verschillen'.

**`src/content/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md`** — line 5 (frontmatter: image)  
*[inconsistency]* The hero image path points to a different article's folder (/images/blog/bol-com-voorraad-synchronisatie/...) instead of a folder matching this article (vvb / verzenden-via-bol). The file exists so the image renders, but the cross-referenced path is fragile: if the bol-com-voorraad-synchronisatie article or its assets are moved/deleted, this article's image breaks.  
→ Move the image into a folder for this article (e.g. /images/blog/verzenden-via-bol-vvb/) and update the image frontmatter, or confirm the shared asset is intentional.

### Config/routing/SEO

**`src/middleware.ts`** — markdown response branch, lines 76-84 (no Cache-Control set on the returned markdown Response)  
*[bug]* The markdown variant is returned with Vary: Accept but no Cache-Control, while the HTML variant of the same URL is given s-maxage=3600. Because Vary:Accept makes the CDN key on Accept, the markdown variant is effectively uncacheable and regenerated (re-parsing HTML to markdown on every agent request), losing the edge-cache benefit the HTML path gets.  
→ Set a Cache-Control on the markdown Response too (e.g. public, max-age=0, s-maxage=3600, stale-while-revalidate=86400) so the edge can cache the markdown variant alongside the HTML variant.

**`src/middleware.ts`** — line 62 (request.headers.get(accept)) on prerendered routes  
*[bug]* Build emits 418 warnings: `Astro.request.headers` used while prerendering 12 static routes (404, blogs/[slug], support + integrations dynamic routes). The markdown-for-agents middleware reads the Accept header, which is unavailable during prerender, so agent content-negotiation silently does nothing on those static pages and the build log is very noisy.  
→ Guard the Accept-header read so it is skipped during prerender (e.g. only run the negotiation branch when the route is server-rendered), or set those routes prerender=false if agent-markdown negotiation is wanted there.

**`src/pages/en/integrations/[slug].astro`** — lines 34-37 (const alternates = { nl: ..., en: ... })  
*[broken-link]* The EN integration detail page sets alternates UNCONDITIONALLY, assuming every EN integration slug has an identically-slugged NL twin. Its NL counterpart (src/pages/integraties/[slug].astro lines 78-82) correctly guards with enSlugs.has(...) and returns undefined when no twin exists. This asymmetry means the moment an EN-only integration (a slug present in integrations-en but not integrations) is added, the EN page will emit hreflang=nl to a 404. Currently latent: the two slug sets are identical today, so no live break.  
→ Mirror the NL guard: load the NL integrations collection, build a Set of NL slugs, and only include the nl alternate when nlSlugs.has(integration.data.slug); otherwise emit only the en alternate (or undefined).

**`src/pages/en/integrations/[slug].astro`** — line 105 (immediately after the self-closing <IntegrationDetailPage ... /> on line 104)  
*[bug]* Same stray, unmatched </content> closing tag as the NL counterpart. <IntegrationDetailPage ... /> is self-closed on line 104, and the trailing </content> on line 105 has no opening tag.  
→ Delete the stray </content> line so the shell ends with the self-closed <IntegrationDetailPage ... /> tag.

**`src/pages/integraties/[slug].astro`** — line 99 (immediately after the self-closing <IntegrationDetailPage ... /> on line 98)  
*[bug]* Stray, unmatched </content> closing tag in the template body. The IntegrationDetailPage component is already self-closed on line 98, so the trailing </content> on line 99 has no opening tag and is not valid markup. It is not an output artifact; it is literally in the file.  
→ Delete the stray </content> line so the shell ends with the self-closed <IntegrationDetailPage ... /> tag.

**`vercel.json`** — headers[0] source "/" (Link header referencing llms.txt and api-catalog)  
*[seo]* The describedby/api-catalog Link header is only emitted on the NL homepage source "/". The EN homepage (/en) and all other pages do not advertise llms.txt or the api-catalog, so agents landing on /en or any inner page get no discovery hint.  
→ Broaden the source (e.g. add an "/en" entry, or apply the Link header to "/(.*)" / the key landing pages) so the llms.txt and api-catalog discovery links are not limited to the NL root only.

### Data (faq/categories)

**`src/data/faqs.ts`** — faqsByPage.picklijsten -> question "Welke hardware heb ik nodig om te kunnen picken?" (line 86, answer)  
*[grammar]* Comma splice: two independent clauses are joined by a comma. "Deze kunnen wij leveren uit voorraad en direct op de juiste manier instellen voor je, neem hiervoor contact op met onze support." The second clause (an imperative) is grammatically a separate sentence.  
→ Split into two sentences: "...en direct op de juiste manier instellen voor je. Neem hiervoor contact op met onze support."

**`src/data/faqs.ts`** — faqsByPage.picklijsten -> question "Werkt AutoPrint met elke printer?" (line 78, answer)  
*[typo]* "ZPL modus" is written without a hyphen. In Dutch an abbreviation + noun compound takes a hyphen (compare "EAN-code" used correctly elsewhere in this same file, and "Zebra-printers" in this very sentence).  
→ Write "ZPL-modus" ("...raden we de ZPL-modus aan."). The English equivalent "ZPL mode" is correct as-is.

### i18n copy dict

**`src/i18n/locales/en.ts`** — pages.comboShopifyBol.stockEyebrow (line 394: 'Stock synchronisation', recognised line 410) vs pages.comboWooBol.syncEyebrow (line 473: 'Stock synchronization', recognizes line 483)  
*[translation]* Two sibling EN integration pages that describe the identical stock-sync feature use opposite English spelling conventions. comboShopifyBol uses British spelling ('synchronisation', 'recognised'), comboWooBol uses American spelling ('synchronization', 'synchronizes', 'recognizes'). A visitor comparing /integrations/connect-shopify-to-bol-com and /integrations/connect-woocommerce-to-bol-com sees inconsistent spelling of the same word.  
→ Pick one EN spelling convention and apply it across both combo pages (and ideally the whole en.ts, which currently mixes both). e.g. standardise on American '-ization'/'recognize' or British '-isation'/'recognise' consistently.

**`src/i18n/locales/en.ts`** — pages.efficientWebshop.rows[0].body (line 2012)  
*[inconsistency]* Brand name written as capitalized "Bol" ("No more switching between Bol, Shopify, WooCommerce..."). Per the project rule bol is deliberately lowercase, and the EN CustomerStories storyIntro already uses lowercase "bol" ("Through bol, Kaufland..."), making this EfficientWebshop row inconsistent with the page set it ships alongside.  
→ Change "Bol" to "bol": "No more switching between bol, Shopify, WooCommerce and your carrier portal."

**`src/i18n/locales/en.ts`** — featurePicklists.faqIntro (line 1449) & featureProducts.faqBody (line 1575) vs featurePurchasing.faqIntro (line 1653)  
*[copy]* The EN FAQ closing line is phrased inconsistently across the three pages: picklists and products say "...happy to think along about your situation" while purchasing says "...happy to think along with your situation". "think along about" is a non-idiomatic calque of the Dutch "meedenken over"; the idiomatic EN collocation is "think along WITH (someone)".  
→ Standardise on the idiomatic form across all three, e.g. "We are happy to think along with you about your situation." (or simply "...happy to help with your situation.").

**`src/i18n/locales/en.ts`** — pages.integrationsIndex.jsonLdDescription (line 634)  
*[copy]* Brand-name rule violation in the JSON-LD description for the integrations index page: 'ShopLinkr works with Bol, ...' uses capitalized 'Bol' (NL counterpart on nl.ts line 636 uses lowercase 'bol').  
→ Change 'Bol' to 'bol' in the jsonLdDescription.

**`src/i18n/locales/en.ts`** — pages.multipleBolAccounts (lines 2061-2096): title, eyebrow, heading, subheading, whyIntro and all row bodies  
*[inconsistency]* Within this one feature page the NL and EN copy disagree on brand casing for bol. The NL pages.multipleBolAccounts block (nl.ts lines 2063-2099) writes the channel exclusively lowercase as 'bol' / 'bol-accounts' / 'bol.com-activiteiten' (0 capitalized 'Bol'), while the EN block writes it exclusively capitalized as 'Bol' / 'Bol accounts' / 'Bol activities' (9 capitalized 'Bol', 0 lowercase). The two locales of the same page thus present the brand differently. (Capitalized 'Bol' is used elsewhere in the codebase too, so this is an intra-page NL/EN parity issue, not a hard brand-rule violation.)  
→ Pick one casing for this page and apply it to both locales. Since the NL copy deliberately keeps bol lowercase (bol's own branding), lowercase the EN occurrences to match: 'multiple bol accounts', 'Bol activities' -> 'bol activities', etc. Alternatively, if capitalized Bol is the intended house style for prose, capitalize the NL side to match instead, but keep the two locales consistent with each other.

**`src/i18n/locales/en.ts`** — heroOrder.viaBol (line 33)  
*[inconsistency]* Brand casing: value is 'via Bol' with a capital B, but the brand should be lowercase 'bol' per project rule (and EN prose under pages.comboShopifyBol.* uses lowercase 'bol').  
→ Change to 'via bol'.

**`src/i18n/locales/en.ts`** — heroOrder.ttToBol (line 42)  
*[inconsistency]* Brand casing: 'Track & trace to Bol' capitalizes the brand. Rule says lowercase 'bol'.  
→ Change to 'Track & trace to bol'.

**`src/i18n/locales/en.ts`** — line 473 — pages.comboWooBol.syncEyebrow (and line 510 comboWooShopify.syncEyebrow, line 464/467/469 comboWooBol description/subheading/jsonLdDescription 'synchronizes', line 483 comboWooBol.rows[1].body 'recognizes', line 491 comboWooBol.setupSteps[2].body 'authorize')  
*[inconsistency]* Spellingsconventie-inconsistentie in EN. De zuster-pagina comboShopifyBol gebruikt Brits Engels: 'Stock synchronisation' (line 394) en 'Products are recognised automatically' (line 410). De WooCommerce-combopagina's switchen naar Amerikaans Engels: 'Stock synchronization' (473, 510), 'synchronizes' (464, 467, 469), 'recognizes' (483), 'authorize' (491). Dezelfde feature/term wordt zo verschillend gespeld tussen vergelijkbare pagina's.  
→ Kies één conventie en pas die overal toe. Aansluitend bij comboShopifyBol (Brits): maak er 'synchronisation', 'synchronises', 'recognises', 'authorise' van in comboWooBol en comboWooShopify.

**`src/i18n/locales/en.ts`** — featureCarriers.subFeatures[2].body (line 1016)  
*[inconsistency]* Binnen de carriers-sectie wordt 'track and trace' overal voluit geschreven (description, subheading, jsonLdDescription, mockupSummary, subFeatures[2].eyebrow), maar in subFeatures[2].body staat het als ampersand-vorm 'track & trace'. Dezelfde wisseling staat in nl.ts (line 1018 'track & trace' tegenover 'track en trace' elders in de sectie).  
→ Maak het consistent binnen de sectie: gebruik 'track and trace' (en NL 'track en trace') ook in subFeatures[2].body, of standaardiseer juist op de ampersand overal.

**`src/i18n/locales/en.ts`** — pages.featureOrders.faqIntro (L1382) and pages.featureProducts.faqBody (L1575)  
*[inconsistency]* The FAQ CTA phrase for the identical NL source "Plan een gesprek" is rendered inconsistently in EN. featureLocations (L1311), featurePicklists (L1449) and featureStock faqBody (L1242) use "Book a call", and the site's global/pricing CTAs (L267-273) also use "Book a call", but featureOrders (L1382) and featureProducts (L1575) use "Schedule a call".  
→ Use "Book a call" in featureOrders.faqIntro and featureProducts.faqBody to match the established EN wording for "Plan een gesprek".

**`src/i18n/locales/en.ts`** — pages.featureStock.faqBody (L1242) / featureLocations.faqIntro (L1311) vs featureOrders.faqIntro (L1382), featurePicklists.faqIntro (L1449), featureProducts.faqBody (L1575)  
*[inconsistency]* The closing line of the FAQ CTA (NL uniformly "We denken graag mee over jouw situatie") is translated two different ways in EN within this range: "think along with your situation" (L1242) / "think along with you" (L1311) vs "think along about your situation" (L1382, L1449, L1575). The preposition usage is inconsistent and "think along about/with your situation" is non-idiomatic English.  
→ Pick one idiomatic phrasing and apply it across all FAQ CTAs, e.g. "We're happy to think along with you." Avoid "think along about your situation".

**`src/i18n/locales/en.ts`** — pages.wooInventorySync.title/eyebrow/heading/whyHeading/whyIntro (lines 2196, 2198, 2199, 2202, 2203)  
*[inconsistency]* Spelling inconsistency: the wooInventorySync page uses American 'synchronization', but the rest of the EN dictionary uses British spelling ('synchronised' in inventoryExcel line 2057, 'customisable' x4, 'Centralise', 'favour', 'colour', 'Fulfilment'). The body prose ('automatic synchronization', 'proper inventory synchronization') is the clearest mismatch.  
→ Switch to British 'synchronisation' to match the rest of the file. If the title/eyebrow/heading are kept as 'synchronization' for SEO keyword targeting, at least align whyHeading and whyIntro body copy to 'synchronisation'.

**`src/i18n/locales/nl.ts`** — features.stock.body (line 57: "...Verkocht op Bol?...") vs features.bolSellers.title (line 69: "Gemaakt door bol-verkopers.")  
*[inconsistency]* Within the same Features section, the NL copy capitalizes the brand as "Bol" in the stock body but lowercases it as "bol" in the bolSellers title. bol's own branding is lowercase, so the two strings are internally inconsistent. The EN side uses "Bol" in both places (en.ts lines 55 and 67), so it is at least self-consistent.  
→ Pick one casing for the NL copy and apply it consistently. Per project convention bol's branding is lowercase, so consider "Verkocht op bol?" to match "bol-verkopers". (Do not change real names; this is the brand reference only.)

**`src/i18n/locales/nl.ts`** — pages.bolInventory (title line 1988, eyebrow 1990, heading 1991, row[1] line 1998)  
*[inconsistency]* Within the bolInventory page the brand is capitalised in the SEO/hero copy ('Bol voorraadbeheer', heading 'Bol voorraadbeheer dat je nooit...', row[1] 'Bol weegt mee...') but lowercased in the same page's eyebrows ('Voor bol verkopers') and in the rest of the site, where lowercase 'bol' is the dominant convention (86 vs 20 in nl.ts). The combo pages reviewed alongside this one (comboShopifyBol, comboWooBol) use lowercase 'bol' throughout. The project rule states 'bol' is deliberately lowercase.  
→ Lowercase 'Bol' -> 'bol' across the bolInventory title, eyebrow, heading and row bodies (NL and EN) so this page matches the site-wide lowercase brand convention, unless capital 'Bol' in the meta <title> is an intentional title-case exception.

**`src/i18n/locales/nl.ts`** — pages.efficientWebshop.rows[0].body (line 2014)  
*[inconsistency]* Brand name written as capitalized "Bol" ("Geen schakelen tussen Bol, Shopify, WooCommerce..."). The project rule is that bol's name is deliberately lowercase ("bol"). The lowercase form is the dominant convention in nl.ts (86 lowercase vs 20 capitalized) and the reviewed CustomerStories namespace itself uses it correctly in pages.customerStories.storyIntro ("Via bol, Kaufland..."), so this row is internally inconsistent.  
→ Change "Bol" to "bol": "Geen schakelen tussen bol, Shopify, WooCommerce en je vervoerdersportaal."

**`src/i18n/locales/nl.ts`** — pages.pricing.channelBody (line 870); same in en.ts line 868  
*[copy]* channelBody states the same fact twice in two consecutive sentences. NL: 'Elk kanaal dat je koppelt, kost hetzelfde. Welk kanaal je ook koppelt, het tarief blijft hetzelfde per maand.' EN mirrors the duplication: 'Every channel you connect costs the same. Whichever channel you connect, the monthly rate stays the same.' Both sentences say 'every channel costs the same per month'; the second adds no new information.  
→ Drop or repurpose one sentence, e.g. keep 'Elk kanaal dat je koppelt, kost hetzelfde vaste bedrag per maand.' and replace the second sentence with something additive (no per-seat / no per-channel surprises), in both NL and EN.

**`src/i18n/locales/nl.ts`** — pages.wooInventorySync.rows[1].body (line 2208, two occurrences) and pages.wooInventorySync.rows[4].body (line 2211)  
*[inconsistency]* The NL copy writes the marketplace name with a capital B ('op Bol, Shopify', 'een bestelling op Bol', 'uitbreiden naar Bol'). The project rule states the brand is deliberately lowercase 'bol', and the rest of nl.ts overwhelmingly uses lowercase 'bol' mid-sentence (e.g. the webwinkelVakdagen page in this same batch: 'een verkoop op bol' at nl.ts line 2192). These three capitalised instances are an internal inconsistency in the NL WooCommerce sync page. (The EN equivalent intentionally keeps capital 'Bol'; this finding is NL-only.)  
→ Lowercase to 'bol' in all three spots: 'op bol, Shopify en je andere kanalen', 'een bestelling op bol trekt', and 'uitbreiden naar bol, Shopify of Kaufland'.

**`src/i18n/locales/nl.ts`** — dashboardPreview.charts.channelsBol (line 246)  
*[inconsistency]* Channel legend label is 'Bol' (capital B), inconsistent with the deliberately-lowercase brand used elsewhere. Mirrored identically in en.ts line 244. Lower severity because it is a short chart/channel legend where title-casing is a defensible UI convention, but it is still inconsistent with the brand rule.  
→ Consider changing 'Bol' to 'bol' in both nl.ts (line 246) and en.ts (line 244) to match the lowercase brand convention used in the surrounding copy.

**`src/i18n/locales/nl.ts`** — line 559 — pages.integrationDetail.benefitCarrier2Body (and line 567 benefitDefault3Body)  
*[inconsistency]* Terminologie-inconsistentie in NL: 'track and trace' (Engelse voegwoord 'and') op regels 559 en 567, terwijl de rest van de NL-copy consequent 'track en trace' gebruikt (o.a. regel 442 in deze sectie, en in totaal 13x 'track en trace' tegenover slechts deze 2x 'track and trace').  
→ Vervang op regels 559 en 567 'track and trace' door 'track en trace' om consistent te blijven met de rest van de Nederlandse teksten.

**`src/i18n/locales/nl.ts`** — pricing.channelBody (line 870)  
*[copy]* Redundante herhaling: 'Elk kanaal dat je koppelt, kost hetzelfde. Welk kanaal je ook koppelt, het tarief blijft hetzelfde per maand.' Beide zinnen zeggen vrijwel exact hetzelfde. Dezelfde dubbeling staat in en.ts (line 868): 'Every channel you connect costs the same. Whichever channel you connect, the monthly rate stays the same.'  
→ Voeg de twee zinnen samen of herschrijf de tweede zodat hij iets toevoegt, bv. 'Elk kanaal dat je koppelt kost hetzelfde vaste maandtarief, ongeacht welk kanaal.' Pas en.ts spiegelend aan.

**`src/i18n/locales/nl.ts`** — pages.featureReports.workflowIntro (line 1709) vs pages.featureReports.mockupReportLabel (1669), subFeatures[0].eyebrow (1686), workflowSteps[0].body (1713)  
*[inconsistency]* The same report feature is spelled two different ways in Dutch: 'productprestaties' as one (correct) compound noun in workflowIntro (line 1709), but 'Product prestaties' as two separate words at lines 1669, 1686 and 1713. In Dutch this is a compound noun and writing it as two words is the 'Engelse ziekte' (incorrect space). The EN file uses 'Product performance' consistently, so only NL drifts.  
→ Pick one spelling for NL and apply it everywhere. Use the closed compound 'Productprestaties' / 'productprestaties' in all four locations for correct Dutch and internal consistency.

**`src/i18n/locales/nl.ts`** — pages.inventoryManagement.rows[1].body (line 2259)  
*[grammar]* Subject-verb agreement inconsistency: 'hoeveel er gereserveerd staan' uses a plural verb while the two parallel clauses are singular ('hoeveel je fysiek hebt liggen' and 'hoeveel je daadwerkelijk nog kunt verkopen'). EN uses singular throughout ('how much is reserved').  
→ Make it consistent, e.g. 'hoeveel er gereserveerd staat' or 'hoeveel er gereserveerd is'.

**`src/i18n/locales/nl.ts`** — pages.inventoryWebshop.rows[4].body (line 2245)  
*[grammar]* Non-idiomatic NL: 'Geen kraken op rapportages' is awkward. The Dutch idiom is 'cijfers/data kraken'; 'kraken op rapportages' does not read naturally. The EN equivalent is 'No wrestling with reports'.  
→ Rephrase, e.g. 'Geen cijfers kraken in rapportages' or 'Geen geploeter met rapportages'.

**`src/i18n/locales/nl.ts`** — pages.inventorySystem.rows[0].heading (line 2224)  
*[grammar]* Non-idiomatic NL: 'Excel raakt z'n grenzen sneller dan je denkt.' The natural Dutch idiom is 'bereikt z'n grenzen' or 'loopt tegen z'n grenzen aan'; 'raakt z'n grenzen' (transitive) is unusual. EN: 'Excel hits its limits faster than you expect.'  
→ Change to 'Excel bereikt z'n grenzen sneller dan je denkt.' or 'Excel loopt sneller tegen z'n grenzen aan dan je denkt.'

**`src/i18n/locales/nl.ts`** — pages.inventorySystem.rows[2].body (line 2226)  
*[inconsistency]* Brand casing: 'Verkoop je iets op Bol, dan past ShopLinkr...' uses capitalized 'Bol' mid-sentence, against the NL lowercase-'bol' convention.  
→ Change 'op Bol, dan' to 'op bol, dan'.

**`src/i18n/locales/nl.ts`** — pages.inventoryManagement.rows[1].body (line 2259)  
*[inconsistency]* Brand casing: 'Verkoop je een product op Bol, dan trekt ShopLinkr...' uses capitalized 'Bol' mid-sentence, against the NL lowercase-'bol' convention.  
→ Change 'op Bol, dan' to 'op bol, dan'.

**`src/i18n/locales/nl.ts`** — pages.inventorySoftware.rows[0].body (line 2281)  
*[inconsistency]* Brand casing: 'Verkoop je iets op Bol, dan ziet Shopify dat ook' uses capitalized 'Bol' mid-sentence, against the NL lowercase-'bol' convention.  
→ Change 'op Bol, dan' to 'op bol, dan'.

**`src/i18n/routes.ts`** — line 64 (simpleInventory.nl)  
*[typo]* The NL slug for the simpleInventory route is 'simpel-vooraadbeheer' which misspells the target keyword 'voorraadbeheer' (missing an r: 'vooraadbeheer'). The page file src/pages/simpel-vooraadbeheer.astro carries the same typo so routing works, but this is a keyword-targeting SEO landing page whose primary keyword is misspelled in the live URL.  
→ If the URL has not yet been indexed/shared, rename both the route slug and the page file to 'simpel-voorraadbeheer'. If it is already live, leave the slug as-is to avoid breaking the URL and instead add a redirect, but note the keyword is misspelled.

### Integration content

**`src/content/integrations-en/bol-com.json`** — tagline, summary, about, faqs[0].q/a (every prose occurrence of the brand, e.g. "Manage all your Bol stores", "Sync stock and orders with Bol", "Bol is the largest online marketplace")  
*[inconsistency]* The EN file capitalizes "Bol" in every prose occurrence, whereas the equivalent NL file (and the project brand convention) writes the brand in deliberate lowercase "bol". This is a cross-language brand-casing divergence between the NL source and its EN counterpart.  
→ Align EN with the NL lowercase brand convention ("bol") in prose, or confirm a deliberate decision to capitalize "Bol" in EN and apply it consistently across both languages. Note the start-of-sentence "Bol is the largest..." would still need a capital if lowercased mid-sentence elsewhere.

**`src/content/integrations-en/bol-com.json`** — summary (line 8) and about (line 12): "Sync stock and orders with Bol..." / "Bol is the largest online marketplace..."  
*[inconsistency]* EN body text capitalizes the brand as "Bol", while the NL body text uses lowercase "bol" in line with bol's own branding (the project treats lowercase bol as the deliberate, correct styling). The EN and NL therefore present the brand name inconsistently.  
→ Consider matching bol's own lowercase branding in EN body text ("bol") as the NL files do, for cross-language consistency. Sentence-start capitalization may still require care.

**`src/content/integrations-en/bol-vvb.json`** — tagline, summary, about, faqs[0].a (e.g. "Worry-free shipping through Bol", "Ship with Bol's competitive rates", "Shipping through Bol (VVB)")  
*[inconsistency]* Same as the EN bol-com file: the brand is capitalized "Bol" throughout the EN prose, diverging from the deliberate lowercase "bol" used in the matching NL file (bol-vvb.json: "via bol", "dienst van bol", "bij bol ligt").  
→ Make the EN brand casing consistent with the NL lowercase "bol" convention (or apply a single, documented capitalization choice across both languages).

**`src/content/integrations-en/zineps.json`** — translationKey field placement (line 16, after the faqs array)  
*[inconsistency]* Field ordering of translationKey is inconsistent across the EN integration files. In zineps.json it appears last (after faqs); in bol-vvb/myparcel/parcelpro/sendy/shopify it sits between about and faqs; in bol-com/deliverymatch/dpd/etc. it sits right after slug (line 4). Inconsistent key ordering, though valid JSON, makes the dataset harder to maintain.  
→ Standardize translationKey position across all EN files (e.g. always directly after slug, matching bol-com.json and the carrier files).

**`src/content/integrations/lightspeed-c-series.json`** — tagline: "Verwerk eenvoudig je Lightspeed bestellingen met je favoriete vervoerder vanuit ShopLinkr."  
*[inconsistency]* This tagline uses the same "Verwerk eenvoudig je <X> bestellingen met je favoriete vervoerder vanuit ShopLinkr" template as kaufland.json and woocommerce.json, but it ends with a period while the other two do not. The terminal punctuation is inconsistent across these sibling taglines (and the same split is mirrored in the EN files).  
→ Pick one convention for these template taglines: either add a period to kaufland.json and woocommerce.json (NL and EN), or remove the trailing period from lightspeed-c-series.json (NL and EN).

### Page components

**`src/components/pages/ContactPage.astro`** — lines 42-43 — breadcrumbs([['Home', ...], ['Contact', ...]]) JSON-LD  
*[inconsistency]* The breadcrumb JSON-LD labels are hardcoded English strings ('Home', 'Contact') for both locales, whereas the sibling pattern (e.g. FaqPage.astro lines 24-25) localizes them via dict keys (p.breadcrumbHome / p.breadcrumbLeaf). The contact dict has no breadcrumbHome/breadcrumbLeaf keys. Functional/SEO impact is negligible here only because 'Home' and 'Contact' happen to be identical in NL and EN, but it deviates from the established localized-breadcrumb convention.  
→ For consistency, add breadcrumbHome/breadcrumbLeaf keys to pages.contact in nl.ts and en.ts and reference them in the breadcrumbs() call, matching FaqPage. (Low priority since the rendered labels are currently correct in both languages.)

**`src/components/pages/CookiesPage.astro`** — lines 106-108 — <th> elements in the cookie tables  
*[a11y]* The three cookie data tables have column headers (<th>) without scope="col". For data tables, header cells should declare their scope so assistive technology can associate each column header with its cells.  
→ Add scope="col" to each <th>, e.g. <th scope="col" class="px-4 py-3 text-left font-semibold">{p.tableName}</th> (and likewise for tablePurpose and tableDuration).

**`src/components/pages/CookiesPage.astro`** — lines 102-121 — the three category tables inside categories.map  
*[a11y]* Three visually-identical tables (same Name/Purpose/Duration header row) are rendered, one per cookie category, but none has an accessible name or programmatic link to its category heading (the <h2> at line 95 precedes the table but is not associated with it). A screen-reader user navigating by table cannot tell which category (Necessary / Analytics / Marketing) a given table belongs to.  
→ Give each table an accessible name tied to its category, e.g. add id={`cat-${category.title}`} to the <h2> and aria-labelledby to the matching <table>, or add a visually-hidden <caption>{category.title}</caption> inside each <table>.

**`src/components/pages/FaqPage.astro`** — line 40 (export const prerender = false;)  
*[other]* FaqPage.astro is a component imported by the route wrappers (src/pages/veelgestelde-vragen.astro and src/pages/en/faq.astro), which already declare `export const prerender = false`. Astro only honors `prerender` exports on route files, not on imported components, so this export is dead/no-op here. The sibling reviewed components (CustomerStoriesPage.astro, EfficientWebshopPage.astro) correctly omit it, so this is an inconsistency and a misleading leftover.  
→ Remove `export const prerender = false;` (line 40) from FaqPage.astro; rendering mode is already governed by the route wrapper files.

**`src/components/pages/FeatureCarriersPage.astro`** — line 102 (inner mockup card surface `bg-paper dark:bg-graphite`)  
*[inconsistency]* The inner mockup card on the Carriers page uses `dark:bg-graphite`, while the equivalent inner mockup cards on the two sibling pages use `dark:bg-charcoal` (FeatureCustomersPage.astro line 99 and FeatureDeliveriesPage.astro line 101). All three sit inside the same outer gradient article that ends in `dark:...to-charcoal`, so the dark-mode surface of these matching mockups is inconsistent across the three feature pages (graphite-on-charcoal vs charcoal-on-charcoal).  
→ Pick one surface for the three mockup cards and apply it consistently. To keep a clean stepped hierarchy (gradient charcoal -> card -> nested flint), align customers/deliveries to `dark:bg-graphite`, or align carriers to `dark:bg-charcoal` to match the other two.

**`src/components/pages/FeatureOrdersPage.astro`** — line 117 (Shopify badge `bg-[#95BF47]`) and line 125 (WooCommerce badge `bg-[#7F54B3]`)  
*[inconsistency]* The integration brand-badge hex values on this page differ from the established site convention. Shopify uses `#95BF47` and WooCommerce uses `#7F54B3` here, but FeatureInventoryPage.astro (lines 145-146) and FeatureProductsPage.astro (lines 396, 401) both use the darker variants `#5A8A1F` (Shopify) and `#674399` (WooCommerce). The Bol (`#0000A4`) and Kaufland (`#E10915`) hexes match across all pages; only Shopify and WooCommerce diverge, and only on the Orders page (2 pages use the dark variants vs 1 using the bright ones), so Orders is the outlier. Brand badge colours should be consistent site-wide.  
→ Change `bg-[#95BF47]` to `bg-[#5A8A1F]` (line 117) and `bg-[#7F54B3]` to `bg-[#674399]` (line 125) to match the Inventory and Products pages. Alternatively, standardise all pages on one palette, but the darker variants are currently the majority convention.

**`src/components/pages/FeatureProductsPage.astro`** — Stock sources mockup, lines 318 & 326 & 332 & 338 (class "grid grid-cols-4")  
*[layout]* The source example table uses a fixed `grid-cols-4` with no responsive breakpoint. On a 390px viewport this card is full width and the first column carries long strings (NL "Na verkoop 1× 500 gram" / EN "After selling 1× 500 grams"), giving roughly 75px per column. The text wraps to several lines and the columns become very cramped, hurting readability of the mockup on mobile.  
→ Either shorten the situation labels for the table, or give the column grid more room (e.g. a wider first column via `grid-cols-[1.4fr_1fr_1fr_1fr]`) so the situation text has more horizontal space on small screens.

**`src/components/pages/FeatureProductsPage.astro`** — line 151 (kibble stock "85 kg") and line 161 (license stock "∞")  
*[inconsistency]* In the overview mockup list, three of the five stock values are pulled from i18n keys (mockupBottleStock, mockupTshirtStock, mockupGiftsetStock), but the kibble row hardcodes the user-facing string "85 kg" and the license row hardcodes "∞" directly in the markup. "85 kg" in particular is a unit-bearing user-facing string that bypasses the i18n dictionary, breaking the pattern used by its sibling rows.  
→ Add mockupKibbleStock and mockupLicenseStock keys to pages.featureProducts in both nl.ts and en.ts (e.g. NL "85 kg" / EN "85 kg", and "∞") and render them like the other rows, so all five stock values come from the dictionary.

**`src/components/pages/FeatureProductsPage.astro`** — line 59: export const prerender = false;  
*[bug]* `export const prerender = false;` is declared in a component under src/components/pages/, where Astro ignores it (the prerender export only takes effect in route files under src/pages/). The actual route files (src/pages/functionaliteiten/producten.astro and src/pages/en/features/products.astro) already correctly set prerender = false. So this line is dead code, and it is also inconsistent with the sibling components FeaturePicklistsPage.astro and FeaturePurchasingPage.astro, which do not have it.  
→ Remove the `export const prerender = false;` line from the component; rely on the route files (which already declare it).

**`src/components/pages/FeatureReportsPage.astro`** — lines 36-38 (WebPage JSON-LD: name={p.title}, description={p.description})  
*[seo]* Inconsistent JSON-LD wiring vs FeatureRulesPage. FeatureRulesPage uses dedicated p.jsonLdName / p.jsonLdDescription for its WebPage JSON-LD (so the structured-data name can differ from the meta <title>), while FeatureReportsPage and FeatureReturnsPage reuse the meta p.title / p.description. Not a bug (the values exist), but the three pages don't follow one pattern; the Reports/Returns WebPage 'name' is identical to the meta title rather than an SEO-tuned variant.  
→ Pick one convention for the feature pages. Either add jsonLdName/jsonLdDescription keys to featureReports (and featureReturns) in nl.ts/en.ts and reference them here, or drop them from featureRules and use title/description everywhere. Lowest-risk: leave as-is if the identical name is acceptable, but align the three pages.

**`src/components/pages/FeatureReportsPage.astro`** — line 183 (sub-feature <article> class) vs line 99 (inner mockup card class)  
*[dark-mode]* Reports is internally inconsistent in dark mode within the same bento grid. The four sub-feature cards use dark:bg-charcoal (line 183) while the featured card's inner widget uses dark:bg-graphite (line 99). The sibling pages FeatureReturnsPage and FeatureRulesPage use the opposite (and dominant) pairing: sub-feature cards dark:bg-graphite + inner mockup card dark:bg-charcoal. Across all feature pages the bento sub-feature card is dark:bg-graphite 11 times vs dark:bg-charcoal only 2 (Reports being one outlier). Because the mockup section itself is dark:bg-charcoal (line 87), the dark:bg-charcoal sub-feature cards blend into the section while the graphite inner widget pops lighter, so the bento grid reads with mismatched surface tiers.  
→ Make Reports follow the Returns/Rules convention: change the sub-feature <article> on line 183 from dark:bg-charcoal to dark:bg-graphite, and change the inner mockup card on line 99 from dark:bg-graphite to dark:bg-charcoal. (Alternatively, adopt the Carriers scheme and make both graphite, but matching Returns/Rules keeps the three reviewed pages consistent.)

**`src/components/pages/FeaturesIndexPage.astro`** — line 186, span class "... rounded-lg bg-chalk-light dark:bg-graphite text-gravel ..."  
*[dark-mode]* The feature-link icon chip uses dark:bg-graphite (#252525) sitting on a dark:bg-charcoal (#191919) card. Graphite is only a +12 lightness step over charcoal, so the chip is barely distinguishable in dark mode. It also breaks the established neutral-chip convention: the same icon-chip pattern uses dark:bg-flint everywhere else (12 occurrences across feature pages, including FeatureUsersPage lines 134 and 153 in this same review set, where neutral role chips are bg-chalk-light dark:bg-flint). This is the only chip in the codebase using dark:bg-graphite.  
→ Change the chip resting surface to dark:bg-flint to match the canonical chip token and the rest of the feature pages: bg-chalk-light dark:bg-flint.

**`src/components/pages/InventoryManagementPage.astro`** — jsonLd object, lines 23-27 (after `description: p.description,`)  
*[seo]* The WebPage jsonLd does not set `inLanguage` for the EN locale, while the sibling SEO landing page InventorySystemPage.astro (line 26) does add `inLanguage: 'en-US'` for EN. The same convention is applied across the other SEO landing pages (InventoryExcelPage, SimpleInventoryPage, MultipleBolAccountsPage, ReturnFormTemplatePage, WebwinkelVakdagenPage, ShoplinkerOrShoplinkrPage). This page diverges from that convention even though it has a fully translated EN twin (route inventoryManagement, /en/inventory-management). Inconsistent structured-data language signalling between near-identical sibling pages.  
→ Add the same conditional language key to the jsonLd object so EN gets `inLanguage`, e.g. add `...(locale === 'nl' ? {} : { inLanguage: 'en-US' }),` after the `description: p.description,` line, matching InventorySystemPage.astro line 26.

**`src/components/pages/InventorySoftwarePage.astro`** — jsonLd object, lines 22-26 (after `description: p.description,`)  
*[seo]* The WebPage jsonLd does not set `inLanguage` for the EN locale, while the sibling SEO landing page InventorySystemPage.astro (line 26) does add `inLanguage: 'en-US'` for EN, and the broader set of SEO landing pages follows the same convention. This page has a fully translated EN twin (route inventorySoftware, /en/inventory-management-software) yet omits the language signal, making structured-data handling inconsistent across the three inventory landing pages.  
→ Add `...(locale === 'nl' ? {} : { inLanguage: 'en-US' }),` after the `description: p.description,` line in the jsonLd object, matching InventorySystemPage.astro line 26.

**`src/components/pages/InventoryWebshopPage.astro`** — lines 22-26 (const jsonLd = { ... })  
*[seo]* The WebPage JSON-LD here omits the `inLanguage` field, but its structurally identical sibling MultipleBolAccountsPage.astro (line 26) and several other SEO landing pages (InventoryExcelPage, SimpleInventoryPage, InventorySystemPage, ShoplinkerOrShoplinkrPage, ReturnFormTemplatePage, WebwinkelVakdagenPage) all add `...(locale !== 'nl' ? { inLanguage: 'en-US' } : {})`. The EN variant of this page therefore ships a WebPage schema with no language declaration, inconsistent with its twins. (Note: the convention is genuinely mixed across the codebase, so this is a consistency nit rather than a definite defect.)  
→ Add the same conditional language line used on MultipleBolAccountsPage: inside the jsonLd object after `description: p.description,` add `...(locale !== 'nl' ? { inLanguage: 'en-US' } : {}),` so the EN page declares en-US like its siblings.

**`src/components/pages/ShoplinkerOrShoplinkrPage.astro`** — frontmatter lines 1-18 (no `export const prerender = false;`)  
*[inconsistency]* This page component omits `export const prerender = false;`, while the two sibling page components (PricingPage.astro line 71, ReturnFormTemplatePage.astro line 29) both declare it. Functionally harmless because the route shell src/pages/shoplinker-of-shoplinkr.astro line 4 sets prerender=false, but the three components are inconsistent: either all three should redundantly declare it or none should (the route shell is the authoritative place).  
→ For consistency, remove the redundant `export const prerender = false;` from PricingPage.astro and ReturnFormTemplatePage.astro (the route shells already set it), or add it to ShoplinkerOrShoplinkrPage.astro. Prefer removing it from the components since the shells own that flag.

**`src/components/pages/SupportArticlePage.astro`** — line 77 (final breadcrumb <li> with article.data.title)  
*[a11y]* The breadcrumb's final/current item is not marked as the current page, so assistive tech cannot distinguish the current location from the linked ancestor crumbs.  
→ Add aria-current="page" to the final breadcrumb <li> at line 77.

**`src/components/pages/SupportCategoryPage.astro`** — line 67 (final breadcrumb <li> with categoryInfo.label)  
*[a11y]* The breadcrumb's current/last item (the category label) is not marked as the current page.  
→ Add aria-current="page" to the final breadcrumb <li> at line 67.

**`src/components/pages/SupportSubcategoryPage.astro`** — line 73-75 (breadcrumb current-page <li>)  
*[a11y]* The breadcrumb trail (<nav aria-label="Breadcrumb">) marks the parent links as anchors but the current/leaf item is a plain <li class="text-charcoal dark:text-paper"> with no aria-current. Assistive tech cannot identify which crumb is the current page.  
→ Add aria-current="page" to the leaf <li> on line 73 (e.g. <li class="text-charcoal dark:text-paper" aria-current="page">).

**`src/components/pages/WooInventorySyncPage.astro`** — lines 22-26 (const jsonLd) — compare WebwinkelVakdagenPage.astro line 31  
*[seo]* The WebPage jsonLd object omits the inLanguage annotation. Every sibling WebPage page sets it conditionally for non-NL locales (WebwinkelVakdagenPage line 31, plus InventorySystemPage, MultipleBolAccountsPage, InventoryExcelPage, ReturnFormTemplatePage, SimpleInventoryPage, ShoplinkerOrShoplinkrPage). The page-level jsonLd is emitted as its own <script type=ld+json> block in BaseLayout line 100, separate from the WebSite/Organization graph, so nothing else supplies inLanguage. As a result the /en/ version of this page ships a WebPage entity with no language declaration, unlike all its peers.  
→ Add the same conditional used by the siblings: change the jsonLd literal to include `...(locale !== 'nl' ? { inLanguage: 'en-US' } : {})` after the description field (locale is already in scope at line 8).

### Support content

**`src/content/support-en/account/billing-and-pricing/starting-a-subscription.md`** — line 17 (body, under heading "I already have an account")  
*[inconsistency]* The text under the heading "I already have an account" reads "Great, you now have everything you need to create an account!" This contradicts the heading: this section addresses users who already have an account, yet the sentence talks about creating one. (This mirrors the NL source line 16, so it is a pre-existing source inconsistency carried into EN, not a translation-only defect.)  
→ Reword to match the heading's intent, e.g. "Great, you already have everything you need to get started!" so it no longer references creating an account. Note the NL source (een-abonnement-starten.md line 16) has the same issue and should be corrected too for consistency.

**`src/content/support-en/getting-started/introduction/global-search.md`** — line 37, <p>Click "<strong>Search"</strong>  
*[typo]* Malformed inline markup: the closing quotation mark is placed inside the <strong> tag ("<strong>Search"</strong>), so the closing quote renders bold while the opening quote does not, producing asymmetric quoting around the button label.  
→ Move the closing quote outside the strong tag so the quotes wrap the label symmetrically: Click "<strong>Search</strong>" at the top left...

**`src/content/support-en/getting-started/introduction/how-does-the-order-flow-work.md`** — lines 120-122 (<h3><br></h3>)  
*[a11y]* Empty heading used purely as vertical spacing after the status table. An <h3> containing only a <br> creates a heading with no text content, which is a semantic/accessibility defect (screen readers announce an empty heading, and it breaks the heading outline). This mirrors the NL source (which has the same artifact), so it is a content-editor export artifact rather than an EN-specific error.  
→ Remove the empty heading block entirely (lines 120-122) and rely on the standard section spacing, or replace it with a real <h3> heading text if a section break was intended.

**`src/content/support-en/integrations/carriers/connect-myparcel.md`** — line 2 (frontmatter title)  
*[inconsistency]* The EN title uses the imperative form "Connect MyParcel", but every other carrier article in this folder uses the gerund form ("Connecting DPD", "Connecting Innosend", "Connecting ParcelPro", "Connecting QLS", "Connecting Sendy"). The NL source titles are all uniform ("X koppelen"), so this is an EN-introduced inconsistency. The dominant EN form (5 of 7 carriers) is "Connecting X".  
→ Change the title to "Connecting MyParcel" to match the convention used by the sibling carrier articles. (Note: connect-sendcloud.md has the same issue and should likely be aligned too, though it is outside this slice.)

**`src/content/support-en/integrations/carriers/connect-sendy.md`** — frontmatter line 2 (title)  
*[inconsistency]* Title-pattern inconsistency across this article set. Within this slice of 6 connection articles, three use the imperative "Connect X" (Connect Sendcloud, Connect Bol, Connect Shopify) while three use the gerund "Connecting X" (Connecting Sendy, Connecting Kaufland, Connecting WooCommerce). The NL counterparts are uniform (all "X koppelen"), so the EN titles should also follow one consistent pattern.  
→ Standardise on one form across all connection articles. Recommended: imperative "Connect Sendy" (to match Connect Sendcloud / Connect Bol / Connect Shopify). Likewise align connect-kaufland.md ("Connect Kaufland") and connect-woocommerce.md ("Connect WooCommerce").

**`src/content/support-en/inventory-management/products/abc-analysis.md`** — frontmatter line 3 (summary: "...optimise your warehouse layout.") and body line 69 (h4: "Optimise your warehouse layout")  
*[inconsistency]* Mixed British/American spelling within the EN corpus. This file uses British 'optimise', while the directly related sibling article optimizing-warehouse-layout.md uses American 'Optimizing' (title) and 'organized' (line 13), and archiving-products.md uses American 'recognizes'. location-management.md (line 44 'organise') and location-number-tips.md (line 41 'recognisable') are British. The same warehouse-layout concept is spelled both ways across articles that link to each other.  
→ Pick one spelling standard (US -ize is most common for SaaS) and apply consistently: change 'optimise' -> 'optimize' here, or conversely standardise the -ize files to -ise. Align organise/organize and recognise/recognize across the support-en collection too.

**`src/content/support-en/inventory-management/products/stock-sources.md`** — line 27 (and lines 13, 22, 105: 'metre'/'metres')  
*[inconsistency]* British spelling 'metre'/'metres' is used while the rest of the EN content uses US spelling (e.g. 'recognizes', 'license' in sibling files) and the EN article route declares inLanguage 'en-US'. Mixed within an en-US site this is an inconsistency, though 'metre' is itself valid English.  
→ For consistency with the en-US declaration and sibling articles, use 'meter'/'meters' (e.g. 'per 50 cm, 1 meter or 3 meters', 'lengths of 2, 5 and 10 meters').

**`src/content/support-en/inventory-management/purchasing/creating-a-delivery.md`** — line 13: link <a href="/support/inkoopadvies">purchasing advice</a>  
*[inconsistency]* The link label "purchasing advice" does not match the feature's canonical name "Purchase advice" (the target article's title and every other reference in managing-suppliers.md and purchase-advice.md use "purchase advice").  
→ Change the link text from "purchasing advice" to "purchase advice" for consistent feature naming.

**`src/content/support-en/order-processing/orders/cancel-an-order.md`** — line 38, "Cancelling is currently only available for orders from Bol."  
*[inconsistency]* The marketplace brand is capitalised as "Bol". Per project brand rules, bol's own branding is deliberately lowercase ("bol" / "bol.com"). The sibling NL article and bol's own branding use lowercase.  
→ Change "Bol" to "bol" (or "bol.com"): "...only available for orders from bol."

**`src/content/support-en/order-processing/orders/manual-shipments.md`** — line 26  
*[styling]* Trailing space is inside the <strong> tag: '<strong>shipping option </strong>you want to ship with'. The space that separates 'option' and 'you' is bolded and sits inside the strong element. Spacing renders fine, but the markup is sloppy (the whitespace should be outside the inline emphasis).  
→ Move the space outside the tag: '<strong>shipping option</strong> you want to ship with.'

**`src/content/support-en/order-processing/orders/order-batches.md`** — lines 13 and 41 ('pick & pack list')  
*[styling]* Raw '&' used in HTML text content where the sibling article merging-orders.md uses the '&amp;' entity. Browsers tolerate a bare '&' here, so it renders correctly, but it is not strictly well-formed and is inconsistent with the entity usage elsewhere.  
→ Encode as '&amp;' for well-formed markup and consistency, or standardise on raw '&' everywhere.

**`src/content/support-en/order-processing/pick-lists/working-with-pick-lists.md`** — line 34: <p>Package type</p>  
*[inconsistency]* The pick-list filter is named "Package type" here, but the exact same filter (NL source: "pakkettype") is called "parcel type" in two sibling articles in the same subcategory: save-filters-on-pick-lists.md line 20 ("...tags, parcel type, and so on") and single-item-orders.md line 29 ("...location, sales channel or parcel type"). Same UI control, two different EN names across cross-linked articles.  
→ Pick one EN term for the NL "pakkettype" filter and use it everywhere. Either change line 34 to "Parcel type" to match the two siblings, or change "parcel type" in save-filters-on-pick-lists.md and single-item-orders.md to "package type". Recommend standardizing on "Parcel type" since two of three files already use it.

**`src/content/support-en/order-processing/pick-lists/working-with-pick-lists.md`** — line 25: <a href="/support/single-bestellingen">single orders</a>  
*[inconsistency]* The link label "single orders" does not match the EN title of the article it points to, which is "Single-item orders" (single-item-orders.md line 2). The term "single-item order(s)" is used consistently elsewhere in EN (the linked article's title and body, and processing-orders.md). "single orders" is a leftover near-literal rendering of the NL "single bestellingen".  
→ Change the link text from "single orders" to "single-item orders" so it matches the target article's EN title and the term used across the rest of the EN content.

**`src/content/support-en/order-processing/returns/processing-a-return.md`** — line 49: "Returns are currently only supported for Bol."  
*[copy]* Brand name written as capitalized "Bol". Per the project brand rule, "bol" / "bol.com" is deliberately lowercase (bol's own branding). The NL source (een-retour-verwerken.md line 48) correctly uses lowercase "bol".  
→ Change "Bol" to lowercase "bol": "Returns are currently only supported for bol."

**`src/content/support-en/order-processing/returns/working-with-returns.md`** — line 51: "Returns are currently only supported for Bol."  
*[copy]* Brand name written as capitalized "Bol". Per the project brand rule, "bol" / "bol.com" is deliberately lowercase. The NL source (werken-met-retouren.md line 50) correctly uses lowercase "bol".  
→ Change "Bol" to lowercase "bol": "Returns are currently only supported for bol."

**`src/content/support/aan-de-slag/introductie/hoe-werkt-de-orderflow.md`** — lines 119-121 (`<h3>\n<br>\n</h3>`)  
*[a11y]* Empty heading used purely as a vertical spacer: an <h3> containing only a <br> and no text. This injects an empty entry into the document heading outline (bad for accessibility/screen readers and SEO) and is invalid use of a heading element. It sits between the status table and the "Speciale situaties" h3.  
→ Remove the empty `<h3><br></h3>` block entirely; if extra spacing is wanted, handle it with the layout/prose spacing rather than an empty heading.

**`src/content/support/aan-de-slag/voorbereiding/tags-beheren.md`** — line 49: "zowel op de producten- als de bestellingen pagina"  
*[grammar]* Inconsistente samenstelling: 'producten-' staat als koppelteken-samenstelling, maar 'bestellingen pagina' is los geschreven. In het Nederlands is dit een samenstelling die aaneen of met streepje hoort.  
→ Schrijf consistent, bijv. 'zowel op de producten- als de bestellingenpagina' (of 'op de producten- als bestellingen-pagina').

**`src/content/support/account/abonnement/facturen-bekijken.md`** — line 14: <strong>Facturen,</strong>  
*[styling]* De komma staat binnen de <strong>-tags, waardoor de komma vetgedrukt wordt weergegeven. De komma hoort bij de omringende zin, niet bij de bold kop-tekst.  
→ Zet de komma buiten de tag: <strong>Facturen</strong>, met een overzicht van al je facturen.

**`src/content/support/account/facturatie-en-prijzen/alles-wat-je-moet-weten-over-het-abonnement.md`** — line 13: "pay as you go" model  
*[inconsistency]* De productterm wordt hier volledig in kleine letters geschreven ('pay as you go'), terwijl het bronartikel het-pay-as-you-go-model.md (titel en body) consequent 'Pay as you Go' gebruikt. Inconsistente schrijfwijze van dezelfde term tussen artikelen.  
→ Hanteer de canonieke schrijfwijze uit het bronartikel: "Pay as you Go".

**`src/content/support/account/facturatie-en-prijzen/een-abonnement-starten.md`** — line 14: <a href="https://app.shoplinkr.com/auth/register" target="_blank">  
*[a11y]* External link opens in a new tab (target="_blank") without rel="noopener" (and no noreferrer), which is a security/best-practice gap. Note this is the only article in the slice that uses target="_blank"; other internal links open in the same tab, so this is also inconsistent behaviour for the reader.  
→ Add rel="noopener noreferrer" to the anchor (or drop target="_blank" to match the other links in the support content).

**`src/content/support/account/facturatie-en-prijzen/het-pay-as-you-go-model.md`** — line 13 (body): "Dit is waar ShopLinkr komt kijken."  
*[grammar]* Awkward/incorrect Dutch idiom. "Dit is waar ShopLinkr komt kijken" is a calque of English "this is where ShopLinkr comes in". In Dutch "komt kijken" alone reads as "is involved/required" and does not convey the intended "this is where ShopLinkr helps".  
→ Use a natural Dutch phrasing, e.g. "Hier komt ShopLinkr om de hoek kijken." or "Hier komt ShopLinkr in beeld."

**`src/content/support/integraties/autoprint/auto-print-instellen.md`** — line 31, <a href="https://www.printnode.com">printnode.com</a>  
*[inconsistency]* Externe link naar printnode.com mist target="_blank", terwijl de andere externe links in dit slice (api.shoplinkr.com in api-overzicht.md regels 14 en 21) wel target="_blank" gebruiken. Inconsistent open-gedrag voor externe links.  
→ Voeg target="_blank" toe aan de printnode.com-link voor consistentie met de overige externe links: <a href="https://www.printnode.com" target="_blank">.

**`src/content/support/integraties/autoprint/veelvoorkomende-fouten.md`** — line 37: "Controleer of slechts een gebruiker is ingelogd..."  
*[grammar]* "een" is used where the numeral "one" is meant ("only one user logged in"). In Dutch the numeral is disambiguated with accents as "één". Sibling support content uses "één" in the same numeral-emphasis context (e.g. single-bestellingen.md "uit slechts één type product", producten-overzicht.md "op één plek"), so this is inconsistent with house usage.  
→ Change to "Controleer of slechts één gebruiker is ingelogd en PrintNode actief heeft."

**`src/content/support/integraties/vervoerders/myparcel-koppelen.md`** — line 24 ("Kopieer de API key") vs line 39 ("Vul de \"Public key\" in die je in stap 3 hebt gekopieerd")  
*[inconsistency]* The copy step calls the value "API key" (line 24) but the paste step refers to the same value as "Public key" (line 39). For a reader following the steps this is confusing: it is not clear that the MyParcel "API key" and the ShopLinkr "Public key" field are the same thing. Note: the EN counterpart (support-en/.../connect-myparcel.md, lines 25 and 40) has the identical mismatch, which suggests "Public key" may be the literal ShopLinkr field label, so this may be intentional.  
→ If "Public key" is the actual ShopLinkr field name, add a clarifying note in the copy step, e.g. "Kopieer de API key (dit is de Public key die je straks in ShopLinkr invult)." If not, align the wording so both steps use the same term. Do not change the UI field label without confirming it.

**`src/content/support/integraties/webshops-en-marketplaces/kaufland-koppelen.md`** — line 42 versus line 24  
*[inconsistency]* Binnen hetzelfde artikel worden de sleutels inconsistent benoemd: in stap 3 (regel 24) heten ze "Client key" en "Secret key", maar in stap 5 (regel 42) worden ze als "client_key" en "secret_key" (snake_case) aangehaald. Dit kan een lezer in verwarring brengen over welk veld bedoeld wordt.  
→ Maak de benaming consistent: gebruik op beide plekken dezelfde schrijfwijze (bijvoorbeeld "Client key" en "Secret key"), tenzij "client_key"/"secret_key" exact de labels in de ShopLinkr-UI zijn (verifieer in dat geval tegen de UI).

**`src/content/support/integraties/webshops-en-marketplaces/shopify-koppelen.md`** — line 14 (<h3>Stappen</h3>)  
*[a11y]* De eerste body-heading is een <h3> ("Stappen"), terwijl de artikeltitel als <h1> wordt gerenderd en er geen <h2> tussen zit. De koppenhiërarchie springt van h1 direct naar h3 (h2 overgeslagen). Zusterartikel woocommerce-koppelen.md gebruikt op de equivalente plek wel <h2> (regels 13 en 28).  
→ Maak van <h3>Stappen</h3> een <h2>Stappen</h2> zodat de koppenhiërarchie aansluit (h1 titel -> h2 sectie), consistent met woocommerce-koppelen.md.

**`src/content/support/integraties/webshops-en-marketplaces/woocommerce-koppelen.md`** — line 18 en line 52  
*[typo]* De merknaam WordPress is geschreven als "Wordpress" (kleine p). De officiële schrijfwijze is "WordPress" met hoofdletter P. Komt twee keer voor: regel 18 ("Ga in de Wordpress omgeving") en regel 52 ("je admin account van je Wordpress omgeving").  
→ Vervang beide voorkomens van "Wordpress" door "WordPress".

**`src/content/support/orderverwerking/bestellingen/handmatige-zendingen.md`** — line 25: "<strong>verzendoptie </strong>waarmee je wilt verzenden"  
*[styling]* Trailing space is inside the <strong> element ("verzendoptie "), so the bold span includes the space and the next word abuts it. Renders inconsistently versus the other bold labels in the same list and can collapse to "verzendoptiewaarmee".  
→ Move the space outside the tag: "<strong>verzendoptie</strong> waarmee je wilt verzenden".

**`src/content/support/orderverwerking/picklijsten/inpakstations-instellen.md`** — line 25 (body, stap 4 van 'Een inpakstation aanmaken')  
*[grammar]* "verzendlabel printer" is een onjuist gesplitste samenstelling (Engelse ziekte). In het Nederlands hoort dit een aaneengeschreven samenstelling te zijn.  
→ Schrijf aaneen als "verzendlabelprinter" (of eventueel "verzendlabel-printer" voor de leesbaarheid).

**`src/content/support/orderverwerking/retouren/een-retour-verwerken.md`** — line 14 (body, stap 1 'Retour openen')  
*[grammar]* "de T&T code van de retour" is een onjuist gesplitste samenstelling: een samenstelling met een afkorting krijgt in het Nederlands een koppelteken.  
→ Schrijf als "de T&T-code van de retour". (Let op: in het naburige artikel werken-met-retouren.md staat eveneens 'T&T nummer' zonder koppelteken; voor consistentie zou dat ook 'T&T-nummer' moeten worden, maar dat bestand valt buiten deze slice.)

**`src/content/support/rapportages-en-inzicht/rapporten/nooit-verkochte-producten.md`** — line 12 (intro paragraph)  
*[grammar]* "dood voorraad" has the wrong adjective inflection. "Voorraad" is a de-woord, so the attributive adjective must take an -e ending: "dode voorraad".  
→ Change "om dood voorraad te identificeren" to "om dode voorraad te identificeren".

**`src/content/support/rapportages-en-inzicht/rapporten/nooit-verkochte-producten.md`** — line 121 ("Hoe gebruik je dit rapport?" list, first bullet bold lead-in)  
*[grammar]* "Dood voorraad opsporen" uses an uninflected adjective before the de-woord "voorraad"; should be "Dode voorraad".  
→ Change the bold lead-in "Dood voorraad opsporen" to "Dode voorraad opsporen".

**`src/content/support/rapportages-en-inzicht/rapporten/product-prestaties.md`** — line 116  
*[typo]* "financiele" is missing the trema; the correct Dutch spelling is "financiële".  
→ Change "Alle financiele bedragen zijn exclusief BTW." to "Alle financiële bedragen zijn exclusief BTW."

**`src/content/support/rapportages-en-inzicht/rapporten/rapporten-overzicht.md`** — line 17 ("Nooit verkochte producten" section paragraph)  
*[grammar]* "dood voorraad" should be "dode voorraad" (de-woord adjective inflection). This mirrors the same error in nooit-verkochte-producten.md.  
→ Change "Handig om dood voorraad te identificeren" to "Handig om dode voorraad te identificeren".

**`src/content/support/rapportages-en-inzicht/rapporten/voorraadwaarde-rapport.md`** — line 107 ("Financieel inzicht" bullet)  
*[typo]* "financiele planning" is missing the trema; correct spelling is "financiële planning". Note the same file/article elsewhere uses correctly accented Dutch (e.g. "geëxporteerd" in rapporten-overzicht.md), so this is an inconsistency too.  
→ Change "Handig voor je boekhouding en financiele planning." to "Handig voor je boekhouding en financiële planning."

**`src/content/support/voorraadbeheer/locaties/locatiebeheer.md`** — line 12 (intro paragraph)  
*[typo]* Spelfout: "efficienter" mist het trema. Correct Nederlands is "efficiënter" (met diaeresis). De rest van de support-corpus gebruikt op andere plekken al "efficiënter", dus dit is inconsistent.  
→ Vervang "efficienter" door "efficiënter".

**`src/content/support/voorraadbeheer/locaties/locatiebeheer.md`** — line 42 (h3 heading) en line 43 (body, 2x)  
*[typo]* Spelfout: "Hierarchische" / "hierarchie" missen het trema. Correct Nederlands is "hiërarchische" en "hiërarchie" (met diaeresis op de e na de i). Komt 3x voor: in de h3 op regel 42 en tweemaal in de tekst op regel 43.  
→ Vervang "Hierarchische locaties" door "Hiërarchische locaties" (kop) en "hierarchie" door "hiërarchie" (2x in de tekst).

**`src/content/support/voorraadbeheer/locaties/locatiebeheer.md`** — line 90 ("Waar zie je de locaties terug?" sectie)  
*[inconsistency]* "product overzicht" is los geschreven; in het Nederlands is dit een samenstelling die aaneen geschreven hoort. De rest van de corpus gebruikt consequent "productoverzicht" (11x), inclusief regel 47 en 76 van dit zelfde bestand.  
→ Vervang "Op het product overzicht" door "Op het productoverzicht".

**`src/content/support/voorraadbeheer/locaties/magazijnindeling-optimaliseren.md`** — line 12 (intro paragraph)  
*[typo]* Spelfout: "efficienter" mist het trema. Correct Nederlands is "efficiënter" (met diaeresis).  
→ Vervang "efficienter" door "efficiënter".

**`src/content/support/voorraadbeheer/locaties/tips-voor-locatienummers.md`** — line 87 (lijst 'Veelgemaakte fouten', item <strong>Geen hierarchie</strong>): "Geen hierarchie ... Gebruik de hierarchische locaties in ShopLinkr."  
*[typo]* Spelfout: de officiële Nederlandse spelling is "hiërarchie" en "hiërarchische" (met trema op de i). Beide woorden missen het trema. (Let op: dezelfde vorm zonder trema komt ook voor in andere support-artikelen buiten deze slice, dus dit is een bredere consistentiekwestie.)  
→ Vervang "hierarchie" door "hiërarchie" en "hierarchische" door "hiërarchische".

**`src/content/support/voorraadbeheer/producten/producten-importeren-en-exporteren.md`** — lines 36 and 38 (vs lines 14 and 21)  
*[inconsistency]* Inconsistente spelling van het samengestelde woord 'CSV-bestand'. Lijnen 14 en 21 schrijven 'CSV-bestand' (met koppelteken), maar lijnen 36 en 38 schrijven 'CSV bestand' (zonder koppelteken). De gekoppelde vorm is correct Nederlands.  
→ Maak consistent: verander 'je CSV bestand' (regel 36) en 'een CSV bestand' (regel 38) naar 'je CSV-bestand' respectievelijk 'een CSV-bestand'.

**`src/content/support/voorraadbeheer/producten/producten-importeren-en-exporteren.md`** — line 14 (vs line 12 / summary line 3)  
*[inconsistency]* De introductie (regel 12) en de summary (regel 3) zeggen dat je met de importfunctie producten in bulk kunt 'toevoegen', maar de sectie 'Producten importeren' (regel 14) zegt dat je producten in bulk kunt 'bijwerken'. Dit is innerlijk tegenstrijdig: dezelfde functie wordt eerst als toevoegen en daarna als bijwerken omschreven.  
→ Maak de scope consistent, bijvoorbeeld regel 14: 'Met de importfunctie kun je producten in bulk toevoegen of bijwerken via een CSV-bestand.'

**`src/content/support/voorraadbeheer/producten/variantgroepen.md`** — line 12  
*[typo]* 'etc)' is geschreven zonder afsluitende punt bij de afkorting. In het Nederlands hoort 'etc.' een punt te krijgen ('enzovoort').  
→ Verander '(2 stuks, 4 stuks, 6 stuks, etc)' naar '(2 stuks, 4 stuks, 6 stuks, etc.)' of liever voluit '(2 stuks, 4 stuks, 6 stuks, enzovoort)'.

**`src/content/support/voorraadbeheer/voorraad/voorraad-notificaties.md`** — frontmatter title (line 2) en prose op regels 14, 16, 31, 39; ook 'notificatie frequentie' op regels 15, 34, 39  
*[grammar]* Samengestelde zelfstandige naamwoorden worden los geschreven: 'voorraad notificaties' en 'notificatie frequentie'. In het Nederlands moeten samenstellingen aaneen worden geschreven: 'voorraadnotificaties' en 'notificatiefrequentie'.  
→ Schrijf 'voorraadnotificaties' en 'notificatiefrequentie' aaneen in de prozateksten. Let op: 'Voorraad notificaties' op regel 31 lijkt een letterlijk UI-label (menupad Instellingen > Mijn bedrijf); pas dat alleen aan als het UI-label zelf ook wordt gecorrigeerd, anders houden de prozavormen wel aan.

### UI components & layout

**`src/components/islands/ContactForm.vue`** — line 139, div class="inline-flex ... bg-sunstone-mist dark:bg-sunstone/10 text-sunstone-deep ring-1 ring-sunstone-soft/40 mb-5"  
*[dark-mode]* The success-tile surface has a dark variant (dark:bg-sunstone/10) but the warm ring ring-sunstone-soft/40 is missing its dark counterpart dark:ring-sunstone/30. Everywhere else this tile pattern appears the warm bg and warm ring are paired (Showcase.astro:27, Features.astro:89/99/109), so in dark mode the ring here renders too cool/pale relative to siblings.  
→ Pair the ring with the surface: ring-1 ring-sunstone-soft/40 dark:ring-sunstone/30.

**`src/components/islands/ContactForm.vue`** — lines 196-205, 212-222, 232-241, 249-256, 269-278 (all inputs/textarea); compare NewsletterSignup.vue lines 149 & 164  
*[inconsistency]* During submission ContactForm does not disable its inputs, whereas NewsletterSignup binds :disabled="status === 'submitting'" on its fields. The two sibling form islands behave inconsistently; in ContactForm a user can keep editing fields while the request is in flight.  
→ For consistency add :disabled="status === 'submitting'" to the ContactForm inputs and textarea (the submit button is already disabled, so this is a polish/consistency fix rather than a correctness bug).

**`src/components/LanguageSwitcher.astro`** — line 50 (inline variant: <div class="flex items-center gap-2" aria-label={navLabel}>); same pattern in ThemeToggle.astro line 30 (<div ... aria-label={th.label}>)  
*[a11y]* aria-label is placed on a plain non-interactive, non-landmark <div>. By default aria-label has no effect on a generic div (it is not an interactive element, a landmark, or a widget with a role), so the intended accessible group name ("Taal kiezen" / "Thema") is dropped by assistive tech. The dropdown variants correctly put the label on the <button>, but the inline variants lose it.  
→ Add role="group" (or use a nav/role="radiogroup" as appropriate) to the wrapping div so aria-label is exposed, e.g. <div role="group" aria-label={navLabel} ...>. For ThemeToggle's inline button set, role="radiogroup" with the buttons as radios would be most accurate, but at minimum role="group" makes the existing aria-label effective.

**`src/components/layout/Footer.astro`** — line 112 (social anchor class "group h-9 w-9 ...")  
*[a11y]* The social media links (LinkedIn, Trustpilot, Instagram) have a fixed hit area of h-9 w-9 (36px x 36px), which is below the 44px minimum mobile tap-target standard. The legal links in this same footer (lines 157/165/171) are deliberately expanded to ~44px with `-my-1.5 py-3`, so the 36px social icons are inconsistent with the tap-target convention applied elsewhere in the file.  
→ Enlarge the touch target to at least 44px, e.g. change `h-9 w-9` to `h-11 w-11` (44px) on the social anchors, keeping the inner SVG at h-4 w-4. The visual ring can stay smaller if desired by padding instead, but the clickable element should reach 44px on mobile.

**`src/components/pricing/PricingCalculator.vue`** — ORDER_TICKS, lines 97, 100, 103, 106 (the `label` properties)  
*[bug]* The `label` field on every ORDER_TICKS entry ('500', '2,5k', '10k', '50k') is dead code. Order tick labels are rendered from i18n via `{{ t.tickOrders[i] }}` (line 441), and only `tick.value` is consumed (line 116). The hardcoded `label` values are never displayed, and they also duplicate (and can drift out of sync with) t.tickOrders.  
→ Remove the unused `label` properties from ORDER_TICKS, leaving only `{ value }` entries (or a plain number array), since positioning uses `.value` and display uses `t.tickOrders[i]`.

**`src/components/pricing/PricingCalculator.vue`** — line 393 ({{ tick.label }}) vs line 441 ({{ t.tickOrders[i] }})  
*[inconsistency]* Tick labels are handled two different ways: order ticks come from the i18n dict (t.tickOrders), but channel ticks are rendered from hardcoded CHANNEL_TICKS[].label ('5','10','25','50') in the component. They are bare integers so there is no visible localisation bug today, but the inconsistent approach is fragile and contradicts the dict-driven pattern used for order ticks.  
→ Pick one approach. Either render channel ticks from an i18n key (e.g. t.tickChannels) the same way as order ticks, or derive both label sets from their numeric values via the existing Intl.NumberFormat(t.value.numberLocale) instead of hardcoding strings.

**`src/components/product/HeroOrder.vue`** — line 232 (`text-[#15803d]` on the "Voorraad bijgewerkt" chip)  
*[styling]* The "stock updated" chip uses an arbitrary green hex `text-[#15803d]` for its text, while the project defines a `green` token (#22c55e, used as bg-green here on lines 235/272/322). Using an arbitrary hex where a token exists is the kind of drift the styling contract flags. (#15803d is a darker green than the token, likely chosen for contrast against the light/dark green-mist background, so this may be intentional.)  
→ If the darker shade is intentional for contrast, leave it but consider promoting it to a named token (e.g. --color-green-deep) for consistency; otherwise replace with `text-green`. Either way verify contrast holds in dark mode on `dark:bg-green/15`.

**`src/components/product/PicklistPickPreview.vue`** — whole file (component not imported anywhere)  
*[other]* PicklistPickPreview.vue is not imported or rendered by any page or section (grep for PicklistPickPreview / PicklistPick / PickPreview across src returns no usages; the picklist showcase is handled by Showcase.astro, which does not import it). It appears to be dead code, which is why its hardcoded-Dutch strings have not surfaced.  
→ Either wire the component into the showcase/feature section where it is intended to be shown (and then it must use i18n + the dark-hover fixes above), or remove the unused file to avoid confusion and bit-rot.

**`src/components/sections/Features.astro`** — line 48 (h3 in stock card) vs lines 93, 103, 113, 123, 154, 164, 174, 184 (card titles as <p>)  
*[a11y]* Heading-level inconsistency between sibling feature cards. The large stock card renders its title as an <h3> (line 48), but every other equally-prominent feature card renders its title as a <p class="...font-semibold"> instead of a heading. Either all card titles are content headings or none are; mixing them gives the section an uneven heading outline for screen-reader/document-outline navigation.  
→ Make the card titles consistent: either promote the other card titles (users/bolSellers/rules/locations/pickRoute/profit/scanner/autoprint) to <h3> as well, or demote the stock card title to a styled <p> to match. Headings must form a consistent outline.

**`src/components/sections/Hero.astro`** — line 13 (decorative radial-gradient div)  
*[styling]* The decorative hero glow uses raw hex/rgba color stops where palette tokens exist: light mode #faedd5 (identical to --color-sunstone-mist) and dark mode rgba(244,164,46,0.08) (#f4a42e, a more saturated orange than the sunstone token #e8b679). The dark glow is therefore not the brand sunstone hue, and neither stop is tied to the token, so brand-color changes will not propagate.  
→ Drive both gradient stops from the sunstone token (e.g. var(--color-sunstone-mist) for light and an alpha of var(--color-sunstone) for dark) instead of hardcoded #faedd5 / rgba(244,164,46,...), so the glow stays on-brand and token-managed.

**`src/components/sections/TrustBar.astro`** — lines 50-65 ([...integrations, ...integrations].map)  
*[a11y]* The marquee duplicates the full integration list ([...integrations, ...integrations]) so the CSS loop animation can run seamlessly. Each copy is rendered as a real <a> link with an aria-label, so screen reader and keyboard users encounter every integration link twice (and the duplicates are also focusable in the tab order). The visual duplicate set carries no extra information.  
→ Render the second copy as decorative: split into two .map() passes where the duplicate set wraps its links in a container with aria-hidden="true" and the links get tabindex="-1" (e.g. add a boolean param to skip a11y on the duplicate), so assistive tech and keyboard navigation only see each integration once.

**`src/components/support/SupportSearch.vue`** — line 248 — aria-owns="support-search-results" on the wrapping <div>; the referenced element (line 287-292) is rendered with v-if="showDropdown"  
*[a11y]* `aria-owns` (and the input's `aria-controls` on line 262) point to id `support-search-results`, but that element is conditionally rendered (`v-if="showDropdown"`). When the dropdown is closed the referenced id does not exist in the DOM, leaving a dangling IDREF.  
→ Resolve this together with moving the combobox role onto the input: keep only `aria-controls="support-search-results"` on the input. Optionally render the listbox container always (with `v-show` instead of `v-if`, or an empty container) so the IDREF target exists, or accept that aria-controls may reference a not-yet-present popup (allowed for comboboxes), but drop the redundant `aria-owns` on the outer div.

**`src/components/template/IntegrationCard.astro`** — line 56 (logo backing tile div: 'bg-paper ring-1 ring-chalk-dark')  
*[dark-mode]* The logo-backing tile ring has no dark variant (ring-chalk-dark only), so in dark mode it renders a light grey #e8e8e8 ring around the white tile. The equivalent logo tiles on the same pages use dark:ring-flint (IntegrationsIndexPage combos tile line 208, IntegrationDetailPage sidebar tile line 275). This card is rendered by both reviewed pages (IntegrationsIndexPage and IntegrationDetailPage related grid), so the inconsistency is visible there.  
→ Add dark:ring-flint to match the sibling logo tiles: 'bg-paper ring-1 ring-chalk-dark dark:ring-flint'.

**`src/components/ThemeToggle.astro`** — line 3 (header comment: "persisted in localStorage key `theme` (default auto)") vs line 82 (currentMode returns localStorage.getItem('theme') || 'light')  
*[inconsistency]* The component's documentation comment states the default theme is "auto", but the actual runtime default is "light": currentMode() falls back to 'light' (line 82), and BaseLayout.astro's no-flash script also defaults to 'light' (line 83, with its own comment correctly saying "default is LIGHT"). The stale comment contradicts the real behavior and the sibling file.  
→ Update the line 3 comment from "(default auto)" to "(default light)" so it matches the code and BaseLayout.astro.

**`src/layouts/PageLayout.astro`** — line 43 — `bg-[radial-gradient(ellipse_at_top,#faedd5,transparent_65%)]`  
*[styling]* The decorative hero gradient hardcodes the hex `#faedd5`, which is exactly the value of the existing token `--color-sunstone-mist` (defined in src/styles/global.css line 12). The same arbitrary-value gradient is duplicated verbatim in SupportHero.astro line 19 and IntegrationDetailPage.astro line 157. Worse, the dark halves diverge: PageLayout and SupportHero use `rgba(250,237,213,0.05)` (sunstone-mist) while IntegrationDetailPage uses `rgba(247,148,29,0.05)` (a different orange), so the three heroes are not visually consistent in dark mode. Not a dark-mode-contract violation (it is a decorative warm tint and PageLayout's own light/dark pair is internally consistent), only a token/maintainability and cross-component-consistency nit.  
→ Extract this gradient into a single reusable class (e.g. a `.hero-glow` utility in global.css referencing `var(--color-sunstone-mist)` for light and a single agreed dark rgba) and apply it in all three heroes so the dark tint is identical, instead of repeating the raw hex/rgba in each file.
