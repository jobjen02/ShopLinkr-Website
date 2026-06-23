export const meta = {
  name: 'shoplinkr-content-fix',
  description: 'Apply verified safe content fixes per file (typos, grammar, brand-acronym casing, headings, alt, rel) - NEVER bol-casing or facts',
  phases: [{ title: 'Fix', detail: 'one agent per content file applies its verified findings' }],
};

const TASKS = {
 "src/content/blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md": [
  {
   "line": "line 40",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Missing space/typo: 'praktijk ervaring' is written as two words but reads as a compound that is normally closed in Dutch ('praktijkervaring'). Same for the surrounding style.",
   "ev": "deze hebben we vanuit onze eigen praktijk ervaring gebouwd",
   "fix": "Use the closed compound: 'vanuit onze eigen praktijkervaring gebouwd'."
  }
 ],
 "src/content/blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md": [
  {
   "line": "lines 5-6",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Reuses the bol-com-koppelen hero image (shared with bol-com-koppelen-aan-shoplinkr.md) and has no imageAlt at all, so the image renders without alt text (accessibility/SEO).",
   "ev": "image: \"/images/blog/bol-com-koppelen-aan-shoplinkr/SPWjKLABTo27bWBrwDEkutQi2JQ.png\"  (no imageAlt frontmatter key)",
   "fix": "Add a descriptive imageAlt key (e.g. 'bol integratie met je webshop')."
  }
 ],
 "src/content/blogs/het-belang-van-goed-voorraadbeheer-voor-jouw-webshop.md": [
  {
   "line": "line 13",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Grammatically incomplete phrase: 'loop je het risico misgelopen verkoop' is missing words/agreement; it should be 'loop je het risico op misgelopen verkoop' or 'loop je het risico verkoop mis te lopen'.",
   "ev": "als je te weinig voorraad hebt, loop je het risico misgelopen verkoop",
   "fix": "Rewrite as 'loop je het risico op misgelopen verkoop'."
  }
 ],
 "src/content/blogs/producten-beheren-op-een-plek.md": [
  {
   "line": "lines 10, 12",
   "category": "a11y",
   "severity": "low",
   "locale": "nl",
   "d": "Heading hierarchy starts at h3 with no preceding h2 in the body. The article jumps from the page h1 (title) straight to h3, skipping the h2 level, unlike the other blogs which use h2 as the top body heading.",
   "ev": "<h3>Komen er nog meer nieuwe functies aan?</h3> ... <h3>Mis je iets tijdens het werken met je producten?</h3> (no <h2> anywhere in body)",
   "fix": "Promote the body subheadings to h2 (or introduce a leading h2) so the heading levels are not skipped."
  }
 ],
 "src/content/blogs/inkomende-leveringen-registreren.md": [
  {
   "line": "lines 17, 19",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Inconsistent compounding: 'magazijn werk' and 'binnen komt' are written open where the closed compound is standard Dutch ('magazijnwerk', 'binnenkomt'). Note line 17 already uses the open form 'wat er binnen komt' while elsewhere closed forms are used.",
   "ev": "Maak je magazijn werk een stuk eenvoudiger. (line 19); Je houdt grip op wat er binnen komt (line 17)",
   "fix": "Use closed compounds: 'magazijnwerk' and 'wat er binnenkomt'."
  }
 ],
 "src/content/blogs/locatiebeheer.md": [
  {
   "line": "line 27",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Stray space before closing strong tag leaves a trailing space inside the bold label, and 'Voorraad waarde' should be a closed compound 'Voorraadwaarde'.",
   "ev": "<strong>Voorraad waarde inzichtelijk: </strong>",
   "fix": "Write '<strong>Voorraadwaarde inzichtelijk:</strong>' without the trailing space."
  }
 ],
 "src/content/blogs/sendy-koppelen-aan-shoplinkr.md": [
  {
   "line": "9",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Spatiefout: 'verzend workflow' is incorrectly split. The Dutch compound should be one word.",
   "ev": "Ontdek hoe je je verzend workflow kunt stroomlijnen",
   "fix": "Change 'verzend workflow' to 'verzendworkflow' (or rewrite to 'verzendproces')."
  }
 ],
 "src/content/blogs/voorraadmanagement.md": [
  {
   "line": "8",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Spatiefout: 'voorraadbeheer systeem' is incorrectly split. The Dutch compound should be one word.",
   "ev": "Hierin kan een voorraadbeheer systeem als ShopLinkr een grote rol spelen.",
   "fix": "Change 'voorraadbeheer systeem' to 'voorraadbeheersysteem'."
  },
  {
   "line": "9, 11, 23, 35, 37",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Headings wrap their text in redundant <strong> inside <h2> (e.g. <h2><strong>...</strong></h2>). Headings are already bold by default, so this double-bolds and is inconsistent with the other articles whose <h2> have no <strong>.",
   "ev": "<h2><strong>Wat is Voorraadmanagement?</strong></h2> (and every other h2 in this file)",
   "fix": "Remove the <strong> wrappers inside the <h2> tags to match the markup of the other blog articles."
  }
 ],
 "src/content/blogs/waarom-is-voorraadbeheer-belangrijk-tips-en-voordelen.md": [
  {
   "line": "9, 26, 37, 40, 48, 56",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Recurring spatiefout: 'voorraadbeheer systeem' is split into two words five times in this article. The Dutch compound should be one word (voorraadbeheersysteem).",
   "ev": "het implementeren van een voorraadbeheer systeem biedt talloze voordelen (line 9); also lines 26, 37, 40, 48, 56",
   "fix": "Replace every 'voorraadbeheer systeem' with 'voorraadbeheersysteem' throughout the file."
  }
 ],
 "src/content/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md": [
  {
   "line": "51",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Two spatiefouten in one sentence: 'voorraad beheer' and 'verkoop kanalen' are incorrectly split Dutch compounds.",
   "ev": "Wij kunnen je helpen om je order &amp; voorraad beheer op orde te brengen ... van al je verkoop kanalen.",
   "fix": "Change 'voorraad beheer' to 'voorraadbeheer' and 'verkoop kanalen' to 'verkoopkanalen'."
  }
 ],
 "src/content/blogs/voorraadsystemen.md": [
  {
   "line": "9, 11, 23, 35, 48",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Same redundant <strong> inside every <h2> heading as voorraadmanagement.md; headings are already bold.",
   "ev": "<h2><strong>Wat Zijn Voorraadsystemen?</strong></h2> (and every other h2 in this file)",
   "fix": "Remove the <strong> wrappers inside the <h2> tags for consistency with the rest of the blog."
  }
 ],
 "src/content/seo/hoe-koppel-ik-dpd-met-bol.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "medium",
   "locale": "nl",
   "d": "Title lowercases the brand acronym 'dpd'. DPD is an initialism and is written 'DPD' everywhere in the body of this article and in the titles of the sibling articles (dpd-en-shopify-samen-gebruiken.md 'DPD en Shopify...', dpd-en-woocommerce-samen-gebruiken.md 'DPD en WooCommerce...'). The lowercase 'dpd' here is an inconsistency.",
   "ev": "title: \"Hoe koppel ik dpd met bol?\"",
   "fix": "Capitalize the acronym: title: \"Hoe koppel ik DPD met bol?\""
  }
 ],
 "src/content/seo/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Title lowercases 'excel'. Excel is a Microsoft product name (proper noun) and is capitalized 'Excel' 22 times in this article's body (only 3 stray lowercase). Sibling titles capitalize it correctly (excel-voorraadbeheer-alles-wat-je-moet-weten.md 'Excel voorraadbeheer...', eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md '...in Excel: tips en tricks').",
   "ev": "title: \"Alles wat je moet weten over voorraadbeheer in excel\"",
   "fix": "Capitalize: title: \"Alles wat je moet weten over voorraadbeheer in Excel\""
  }
 ],
 "src/content/seo/effectief-voorraadbeheer-met-excel.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Title lowercases 'excel'. The body uses 'Excel' 38 times; the lowercase title is inconsistent with the body and with the well-formed sibling title 'Effectief voorraadbeheer in Excel: tips en tricks'.",
   "ev": "title: \"Effectief voorraadbeheer met excel\"",
   "fix": "Capitalize: title: \"Effectief voorraadbeheer met Excel\""
  }
 ],
 "src/content/seo/gratis-voorraadbeheer-excel-template-download-nu.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Title lowercases 'excel'. The body consistently writes 'Excel' (e.g. 'Excel template', 'Microsoft Excel'). Lowercase 'excel' in the title is inconsistent.",
   "ev": "title: \"Gratis voorraadbeheer excel template: download nu!\"",
   "fix": "Capitalize: title: \"Gratis voorraadbeheer Excel template: download nu!\""
  }
 ],
 "src/content/seo/gratis-voorraadbeheer-in-excel-zo-doe-je-dat.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Title lowercases 'excel'. The body uses 'Excel' throughout; lowercase 'excel' in the title is inconsistent with the body and sibling titles.",
   "ev": "title: \"Gratis voorraadbeheer in excel: zo doe je dat!\"",
   "fix": "Capitalize: title: \"Gratis voorraadbeheer in Excel: zo doe je dat!\""
  },
  {
   "line": "38",
   "category": "grammar",
   "severity": "medium",
   "locale": "nl",
   "d": "Missing article. 'Je kunt bijvoorbeeld kolom toevoegen' is ungrammatical; the indefinite article 'een' is missing before 'kolom'.",
   "ev": "Je kunt bijvoorbeeld kolom toevoegen waarin je de datum en het tijdstip noteert",
   "fix": "Insert 'een': 'Je kunt bijvoorbeeld een kolom toevoegen waarin je de datum en het tijdstip noteert'."
  }
 ],
 "src/content/seo/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md": [
  {
   "line": "69",
   "category": "grammar",
   "severity": "medium",
   "locale": "nl",
   "d": "Adjective inflection error with a het-word. 'werkblad' is a het-word, so after the indefinite article 'een' the adjective takes no -e: it should be 'een apart werkblad', not 'een aparte werkblad'.",
   "ev": "Dit kan je doen door een aparte werkblad te maken",
   "fix": "Change 'een aparte werkblad' to 'een apart werkblad'."
  }
 ],
 "src/content/seo/hoe-koppel-ik-innosend-met-woocommerce.md": [
  {
   "line": "11",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Het/de agreement slip: 'platform' is a het-word, so 'een populaire e-commerce platform' should read 'een populair e-commerceplatform'. (Also note 'e-commerce platform' is written as two words here but compounded elsewhere.)",
   "ev": "WooCommerce daarentegen is een populaire e-commerce platform dat wordt gebruikt door miljoenen online winkels",
   "fix": "Change to 'een populair e-commerceplatform'."
  }
 ],
 "src/content/seo/hoe-koppel-ik-qls-met-bol.md": [
  {
   "line": "54 and 57",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Two internal links are root-relative while every other internal link across these articles uses an absolute https://shoplinkr.com/... URL. They resolve correctly (served at the site root) but break the link-format convention used everywhere else.",
   "ev": "<a href=\"/blogs/bol-com-koppelen-aan-shoplinkr\">Bol als verkoopkanaal</a> and <a href=\"/integraties/qls\">QLS als vervoerder</a>",
   "fix": "Make these absolute to match the rest of the content: https://shoplinkr.com/blogs/bol-com-koppelen-aan-shoplinkr and https://shoplinkr.com/integraties/qls."
  }
 ],
 "src/content/seo/hoe-koppel-ik-dpd-met-woocommerce.md": [
  {
   "line": "10 and 12",
   "category": "seo-content",
   "severity": "low",
   "locale": "nl",
   "d": "Two section sub-introductions are wrapped in <p> instead of heading tags, unlike every other article in the set where 'Een korte introductie tot <brand>' is an <h3>. This flattens the heading hierarchy under the 'Wat is DPD en WooCommerce?' H2 (no subheadings) and is inconsistent with the sibling articles.",
   "ev": "<p>Een korte introductie tot DPD</p> and <p>Een korte introductie tot WooCommerce</p>",
   "fix": "Wrap both intro labels in <h3> to match the rest of the articles and restore the heading hierarchy."
  }
 ],
 "src/content/seo/hoe-koppel-ik-innosend-met-bol.md": [
  {
   "line": "15",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Grammar/agreement: 'een populaire e-commerceplatform' uses the article 'een' with adjective inflection 'populaire' while 'platform' is a het-word, so it should be 'een populair e-commerceplatform'. The same het/de agreement slip recurs in sibling articles (e.g. innosend-met-woocommerce.md line 11: 'een populaire e-commerce platform').",
   "ev": "Shopify is een populaire e-commerceplatform waarmee je jouw eigen online winkel kunt creëren",
   "fix": "Change to 'een populair e-commerceplatform' (and fix the same construction in the other articles)."
  }
 ],
 "src/content/seo/hoe-koppel-ik-sendcloud-met-shopify.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "high",
   "locale": "nl",
   "d": "Titel bevat merknamen in kleine letters. De title wordt 1-op-1 als <title> en als H1 op de pagina gerenderd (SeoArticlePage -> ArticleLayout heading), dus dit is zichtbaar in de zoekresultaten en bovenaan de pagina. 'sendcloud' en 'shopify' horen 'Sendcloud' en 'Shopify' te zijn.",
   "ev": "title: \"Hoe koppel ik sendcloud met shopify?\"",
   "fix": "Wijzig naar: \"Hoe koppel ik Sendcloud met Shopify?\""
  },
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Titel-casing is inconsistent binnen deze set: de WooCommerce-varianten schrijven merknamen correct ('Hoe koppel ik Sendcloud met WooCommerce?', 'Hoe koppel ik Sendy met WooCommerce?'), terwijl de Shopify/bol-varianten ze in kleine letters hebben. Na het corrigeren van de individuele titels zijn alle 5 koppel-artikelen consistent.",
   "ev": "sendcloud-shopify/sendy-shopify/sendy-bol: kleine letters; sendcloud-woocommerce/sendy-woocommerce: correcte hoofdletters",
   "fix": "Maak alle koppel-titels consistent met hoofdletter-merknamen (Sendcloud, Sendy, Shopify, WooCommerce; bol blijft klein)."
  }
 ],
 "src/content/seo/hoe-koppel-ik-sendy-met-bol.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "high",
   "locale": "nl",
   "d": "Titel bevat de productnaam 'sendy' in kleine letters. De title wordt als <title> en H1 gerenderd, dus zichtbaar. 'sendy' hoort 'Sendy' te zijn (bol mag wel klein blijven).",
   "ev": "title: \"Hoe koppel ik sendy met bol?\"",
   "fix": "Wijzig naar: \"Hoe koppel ik Sendy met bol?\""
  }
 ],
 "src/content/seo/hoe-koppel-ik-sendy-met-shopify.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "high",
   "locale": "nl",
   "d": "Titel bevat merknamen in kleine letters. De title wordt als <title> en H1 gerenderd, dus zichtbaar. 'sendy' en 'shopify' horen 'Sendy' en 'Shopify' te zijn.",
   "ev": "title: \"Hoe koppel ik sendy met shopify?\"",
   "fix": "Wijzig naar: \"Hoe koppel ik Sendy met Shopify?\""
  }
 ],
 "src/content/seo/sendy-en-bol-samen-gebruiken.md": [
  {
   "line": "frontmatter + body lines 8,17,18,19,20,21,22,23,25,26,28,29,30,31,32,34,35",
   "category": "brand",
   "severity": "medium",
   "locale": "nl",
   "d": "This entire article treats the retailer name as the proper noun 'Bol' (capital B) 33 times, almost all of them mid-sentence. The site standard is deliberately lowercase 'bol'/'bol.com' mid-sentence; capital 'Bol' is only correct at the very start of a sentence. Its sibling files (sendcloud-en-bol, producten-verkopen-via-bol) use lowercase 'bol' consistently, so this file is an outlier.",
   "ev": "title \"Sendy en bol samen gebruiken\" but body: \"Sendy en Bol samen te gebruiken\" (l8), \"Wat is Bol?\" (l17), \"Bol is een bekend en populair verkoopplatform\" (l18), \"Met Bol kun je\" (l18), \"de klantenservice van Bol\" (l31)",
   "fix": "Lowercase every mid-sentence 'Bol' to 'bol' (keep only a sentence-initial 'Bol' if one starts a sentence). Headings 'Wat is Bol?', 'De functies en voordelen van Bol', 'Hoe Bol werkt' become 'Wat is bol?' etc., matching the sibling articles."
  }
 ],
 "src/content/seo/qls-en-bol-samen-gebruiken.md": [
  {
   "line": "15",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Capital 'Bol' used mid-sentence in the H2 heading and intro, inconsistent with the rest of the file which uses lowercase 'bol'. 'Bol' here is not at the start of a sentence.",
   "ev": "<h2>Wat is Bol?</h2> (l15); \"\\\"Fulfillment by Bol\\\" (FBB)\" (l20)",
   "fix": "Change the heading to 'Wat is bol?' to match the lowercase 'bol is een van de grootste...' that follows on line 16."
  },
  {
   "line": "2",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Frontmatter title lowercases the brand acronym 'QLS' as 'Qls'. QLS is uppercase throughout the body.",
   "ev": "title: \"Qls en bol samen gebruiken\"",
   "fix": "Change title to \"QLS en bol samen gebruiken\"."
  }
 ],
 "src/content/seo/qls-en-shopify-samen-gebruiken.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "medium",
   "locale": "nl",
   "d": "Frontmatter title lowercases the brand 'QLS' as 'Qls'. QLS is consistently uppercase in the body and is a proper brand acronym. The sibling title 'Sendcloud en Shopify samen gebruiken' is correctly cased, so this drifts.",
   "ev": "title: \"Qls en shopify samen gebruiken\"",
   "fix": "Change title to \"QLS en Shopify samen gebruiken\"."
  }
 ],
 "src/content/seo/qls-en-woocommerce-samen-gebruiken.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "medium",
   "locale": "nl",
   "d": "Frontmatter title lowercases both brand names: 'Qls' (should be QLS) and 'woocommerce' (should be WooCommerce). The body uses 'QLS' and 'WooCommerce' correctly, and the sibling title 'Sendcloud en WooCommerce samen gebruiken' is correctly cased.",
   "ev": "title: \"Qls en woocommerce samen gebruiken\"",
   "fix": "Change title to \"QLS en WooCommerce samen gebruiken\"."
  }
 ],
 "src/content/seo/sendy-en-shopify-samen-gebruiken.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Frontmatter title lowercases the brand 'Shopify' as 'shopify'. Body uses 'Shopify' correctly throughout.",
   "ev": "title: \"Sendy en shopify samen gebruiken\"",
   "fix": "Change title to \"Sendy en Shopify samen gebruiken\"."
  },
  {
   "line": "15",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "Inconsistent hyphenation of the same term within one article: 'realtime' (one word) vs 'real-time'. Pick one form.",
   "ev": "l15: \"je pakket volgen en real-time updates ontvangen\" vs the corpus norm 'realtime' used in sendy-en-bol l12",
   "fix": "Standardize on 'realtime' (or 'real-time') consistently."
  }
 ],
 "src/content/seo/sendy-en-woocommerce-samen-gebruiken.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "medium",
   "locale": "nl",
   "d": "Frontmatter title lowercases the brand 'WooCommerce' as 'woocommerce'. Body uses 'WooCommerce' correctly.",
   "ev": "title: \"Sendy en woocommerce samen gebruiken\"",
   "fix": "Change title to \"Sendy en WooCommerce samen gebruiken\"."
  },
  {
   "line": "70",
   "category": "consistency",
   "severity": "low",
   "locale": "nl",
   "d": "The conclusion is rendered as a plain bold-less paragraph 'Conclusie:' on its own line followed by a paragraph, instead of an H2 heading like the other articles use ('<h2>Conclusie: ...</h2>'). Breaks heading-hierarchy consistency with the sibling Sendcloud/Sendy articles.",
   "ev": "l70: \"<p>Conclusie:</p>\" followed by l71 body, vs sendy-en-shopify l34 \"<h2>Conclusie: De kracht van...\"",
   "fix": "Convert 'Conclusie:' into a proper <h2> heading consistent with the other articles."
  }
 ],
 "src/content/seo/voorraadbeheer-met-excel-een-complete-gids.md": [
  {
   "line": "2",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Frontmatter title lowercases 'excel'. Excel is a proper product name and is capitalized everywhere in the body ('Excel').",
   "ev": "title: \"Voorraadbeheer met excel: een complete gids\"",
   "fix": "Change title to \"Voorraadbeheer met Excel: een complete gids\"."
  }
 ],
 "src/content/seo/verkopen-via-bol-com.md": [
  {
   "line": "17",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Formal 'uw' used in an H2 heading, breaking the informal je/jij/jouw tone used everywhere else in the article (the very next line uses 'je productaanbod').",
   "ev": "l17: <h2>Het beheren van uw productaanbod op bol.com</h2>",
   "fix": "Change to 'Het beheren van je productaanbod op bol.com' to match the informal tone."
  },
  {
   "line": "20, 24",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Numeral '1' used as the word 'één' in running text ('alles in 1 systeem'), twice. Elsewhere in the corpus the spelled-out 'één plek' / 'één centrale plek' is used. Reads as informal shorthand in body prose.",
   "ev": "l20 and l24: \"kun je alles in 1 systeem beheren van al je verkoopkanalen\"",
   "fix": "Write 'alles in één systeem beheren'."
  }
 ],
 "src/content/support/aan-de-slag/voorbereiding/plan-een-demo-in.md": [
  {
   "line": "16",
   "category": "link",
   "severity": "low",
   "locale": "nl",
   "d": "Externe link opent in een nieuw tabblad (target=\"_blank\") maar mist rel=\"noopener noreferrer\". Inconsistent met een-abonnement-starten.md, dat de rel wel zet, en het is een bekend reverse-tabnabbing risico.",
   "ev": "regel 16: href=\"https://crm.shoplinkr.com/widget/booking/S28QQt8uyFAAiqTLNSuQ\" target=\"_blank\"  (geen rel)",
   "fix": "Voeg rel=\"noopener noreferrer\" toe aan de anchor, net als in een-abonnement-starten.md."
  }
 ],
 "src/content/support/account/facturatie-en-prijzen/alles-wat-je-moet-weten-over-het-abonnement.md": [
  {
   "line": "16",
   "category": "link",
   "severity": "low",
   "locale": "nl",
   "d": "Externe link opent in nieuw tabblad (target=\"_blank\") zonder rel=\"noopener noreferrer\". Inconsistent met de rel die elders in deze contentset wel gezet wordt.",
   "ev": "regel 16: href=\"https://shoplinkr.featurebase.app/nl\" target=\"_blank\"  (geen rel)",
   "fix": "Voeg rel=\"noopener noreferrer\" toe aan de anchor."
  }
 ],
 "src/content/support/account/toegang-en-beveiliging/wachtwoord-wijzigen.md": [
  {
   "line": "43",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Nederlandse samenstelling 'reset link' is los geschreven; correct is aaneen of met koppelteken.",
   "ev": "om een reset link te ontvangen",
   "fix": "Schrijf 'resetlink' (of 'reset-link') aaneen: 'om een resetlink te ontvangen'."
  }
 ],
 "src/content/support/account/gebruikers-en-rollen/rollen-en-rechten-beheren.md": [
  {
   "line": "17, 48",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Nederlandse samenstelling 'Beheerder rol' is los geschreven (komt 2x voor). Een samenstelling van twee zelfstandige naamwoorden hoort aaneen of met koppelteken, zeker omdat 'Beheerder' hier een eigennaam/rolnaam is.",
   "ev": "De Beheerder rol kan niet worden gewijzigd of verwijderd. (regel 17) / Let op: de Beheerder rol kan niet worden bewerkt. (regel 48)",
   "fix": "Schrijf 'Beheerder-rol' (koppelteken na de rolnaam) of herformuleer naar 'de rol Beheerder'. Pas beide voorkomens consistent aan."
  }
 ],
 "src/content/support/orderverwerking/bestellingen/bestellingen-samenvoegen.md": [
  {
   "line": "23",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Retailer brand 'bol' is capitalized mid-sentence. The rest of the support corpus deliberately writes 'bol' lowercase mid-sentence (e.g. 'voor bol.', 'van bol.', 'bijvoorbeeld bol'). Capital 'Bol' is only correct at the very start of a sentence.",
   "ev": "Er mag maximaal 1 Bol VVB-bestelling in de samenvoeging zitten",
   "fix": "Change 'Bol VVB-bestelling' to 'bol VVB-bestelling'."
  },
  {
   "line": "90",
   "category": "brand",
   "severity": "low",
   "locale": "nl",
   "d": "Retailer brand 'bol' is capitalized mid-sentence ('en Bol'). Shopify keeps its capital correctly, but 'bol' should be lowercase mid-sentence per the convention used everywhere else in the docs.",
   "ev": "Ja, je kunt bestellingen van bijvoorbeeld Shopify en Bol samenvoegen tot één samengevoegde bestelling.",
   "fix": "Change 'Shopify en Bol' to 'Shopify en bol'."
  },
  {
   "line": "96",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "Dangling/hanging hyphen compound error. 'product-' uses a weglatingsstreepje implying it elides to 'wijzigingen' (productwijzigingen), but the parallel term 'aantal wijzigingen' is written as two separate words, so the hanging hyphen has no matching compound. Parallel structure requires 'aantalwijzigingen' as one word.",
   "ev": "(zoals product- of aantal wijzigingen)",
   "fix": "Write as 'product- of aantalwijzigingen' (one word so the elided '-' on 'product-' resolves correctly), or spell both out: 'productwijzigingen of aantalwijzigingen'."
  }
 ],
 "src/content/support/orderverwerking/picklijsten/filters-opslaan-op-picklijsten.md": [
  {
   "line": "38",
   "category": "grammar",
   "severity": "medium",
   "locale": "nl",
   "d": "Relative-pronoun gender disagreement. This file consistently treats 'filter' as a de-word ('Geef de filter een herkenbare naam', line 25), so the relative pronoun referring back to 'een filter' must be 'die', not the neuter 'dat'.",
   "ev": "Als je een filter probeert op te slaan dat al bestaat, krijg je een melding.",
   "fix": "Change 'dat al bestaat' to 'die al bestaat'."
  }
 ],
 "src/content/support/rapportages-en-inzicht/rapporten/nooit-verkochte-producten.md": [
  {
   "line": "60",
   "category": "typo",
   "severity": "low",
   "locale": "nl",
   "d": "Dubbel woord 'als als'. De correlatieve constructie loopt niet: 'zowel als individueel product als als onderdeel' bevat een herhaald 'als'.",
   "ev": "zowel als individueel product als als onderdeel van een <a href=\"/support/een-bundel-aanmaken\">bundel</a>",
   "fix": "Verwijder het dubbele woord: 'zowel als individueel product als als onderdeel' -> 'zowel als individueel product als onderdeel van een bundel'."
  }
 ],
 "src/content/support/voorraadbeheer/locaties/tips-voor-locatienummers.md": [
  {
   "line": "12",
   "category": "typo",
   "severity": "low",
   "locale": "nl",
   "d": "Dubbel woord 'het het'.",
   "ev": "voorkomt een consistente naamgeving fouten en versnelt het het <a href=\"/support/wat-zijn-picklijsten\">pickproces</a>",
   "fix": "Verwijder het dubbele 'het': '...en versnelt het pickproces.'"
  }
 ],
 "src/content/support/voorraadbeheer/inkoop/inkoopadvies.md": [
  {
   "line": "12",
   "category": "grammar",
   "severity": "low",
   "locale": "nl",
   "d": "'teveel' is hier bijwoordelijk gebruikt ('te veel op de plank') en moet als twee woorden geschreven worden. Het aaneengeschreven 'teveel' is alleen het zelfstandig naamwoord (een teveel aan iets).",
   "ev": "zonder dat je teveel op de plank krijgt",
   "fix": "Schrijf 'te veel' los: 'zonder dat je te veel op de plank krijgt'."
  }
 ],
 "src/content/support/voorraadbeheer/producten/een-bundel-aanmaken.md": [
  {
   "line": "154",
   "category": "typo",
   "severity": "low",
   "locale": "nl",
   "d": "Onjuist gesplitste samenstelling 'bundel voorraad' (moet aaneen). Elders in hetzelfde artikel wordt correct 'voorraad van de bundel' gebruikt; de losse vorm 'bundel voorraad' is fout.",
   "ev": "De bundel voorraad wordt altijd automatisch herberekend.",
   "fix": "Schrijf aaneen: 'De bundelvoorraad wordt altijd automatisch herberekend.'"
  }
 ],
 "src/content/support/voorraadbeheer/producten/producten-overzicht.md": [
  {
   "line": "73",
   "category": "typo",
   "severity": "low",
   "locale": "nl",
   "d": "Open compound 'Bulk acties' should be one word in Dutch ('Bulkacties'). The rest of the doc uses closed compounds (productoverzicht, productenpagina, verpakkingstype).",
   "ev": "<strong>Bulk acties</strong>: verpakkingstype, tags of kosten in bulk aanpassen",
   "fix": "Schrijf 'Bulkacties' aaneen."
  }
 ],
 "src/content/blogs-en/inventory-management.md": [
  {
   "line": "10, 12, 24, 36, 38",
   "category": "consistency",
   "severity": "medium",
   "locale": "en",
   "d": "Heading-level drift from the NL twin. The NL twin (blogs/voorraadmanagement.md) uses <h2> for all five section headings, but this EN file uses <h3>. Since the page title (frontmatter) acts as the h1, the body should begin at h2; jumping to h3 skips a heading level and diverges from the byte-parity expectation for twins.",
   "ev": "Line 10 '<h3><strong>What Is Inventory Management?</strong></h3>' (NL twin uses <h2>); same pattern on lines 12, 24, 36, 38",
   "fix": "Change the five <h3> body headings to <h2> to match the NL twin and avoid a skipped heading level."
  }
 ],
 "src/content/blogs-en/how-advanced-inventory-systems-make-the-difference.md": [
  {
   "line": "11, 13, 15, 27, 29",
   "category": "consistency",
   "severity": "medium",
   "locale": "en",
   "d": "Heading-level drift from the NL twin. The NL twin (blogs/hoe-geavanceerde-voorraadsystemen-het-verschil-maken.md) uses <h2> for all section headings; this EN file uses <h3>. With the frontmatter title acting as h1, the body should start at h2; <h3> skips a level and breaks twin structural parity.",
   "ev": "Line 11 '<h3>What Are Inventory Systems?</h3>' (NL twin uses <h2>); also lines 13, 15, 27, 29",
   "fix": "Change the five <h3> body headings to <h2> to match the NL twin and avoid a skipped heading level."
  }
 ],
 "src/content/blogs-en/the-importance-of-good-inventory-management-for-your-webshop.md": [
  {
   "line": "12",
   "category": "brand",
   "severity": "low",
   "locale": "en",
   "d": "Mid-sentence retailer brand 'Bol' is capitalized. Per the brand rule, 'bol'/'bol.com' is deliberately lowercase mid-sentence; capital 'Bol' is only correct at the very start of a sentence.",
   "ev": "you're looking for a product on Bol. You find exactly what you need",
   "fix": "Lowercase to 'on bol.' (or 'on bol.com.') to match the deliberate lowercase brand convention used elsewhere on the site."
  }
 ],
 "src/content/seo-en/how-to-connect-qls-to-shopify.md": [
  {
   "line": "70-71",
   "category": "bug",
   "severity": "critical",
   "locale": "en",
   "d": "The file body ends with leaked tool-call markup instead of valid content. After the final </p>, the raw lines </content> and </invoke> are present. These are not valid HTML/markdown and will render as visible broken text (or break the closing structure) at the bottom of the published article.",
   "ev": "lines 70-71: </content>\\n</invoke>",
   "fix": "Delete the trailing </content> and </invoke> lines so the file ends cleanly after the last </p>."
  }
 ],
 "src/content/seo-en/how-to-connect-qls-to-bol.md": [
  {
   "line": "63",
   "category": "link",
   "severity": "medium",
   "locale": "en",
   "d": "Internal links use root-relative hrefs ('/en/...') while every other internal link across this content set uses absolute 'https://shoplinkr.com/en/...'. Inconsistent link style within the same content collection; the relative form also will not resolve correctly if content is ever consumed off-domain (RSS, AI export).",
   "ev": "line 63: <a href=\"/en/integrations/qls\">QLS</a> and <a href=\"/en/blog/connect-bol-to-shoplinkr\">Bol</a>",
   "fix": "Use absolute https://shoplinkr.com/en/... URLs to match the rest of the set, or standardize all links to relative deliberately."
  }
 ],
 "src/content/seo-en/how-to-connect-qls-to-woocommerce.md": [
  {
   "line": "35,38",
   "category": "link",
   "severity": "medium",
   "locale": "en",
   "d": "Same root-relative href inconsistency as the QLS-to-Bol article: '/en/...' links while the rest of the content set uses absolute shoplinkr.com URLs.",
   "ev": "line 35: <a href=\"/en/blog/connect-woocommerce-to-shoplinkr\">WooCommerce webshop</a>  |  line 38: <a href=\"/en/integrations/qls\">QLS</a>",
   "fix": "Standardize to absolute https://shoplinkr.com/en/... URLs to match the rest of the collection."
  }
 ],
 "src/content/seo-en/the-importance-of-effective-inventory-management.md": [
  {
   "line": "42",
   "category": "grammar",
   "severity": "low",
   "locale": "en",
   "d": "British spelling in EN content; site standard is American English.",
   "ev": "Blockchain can be used to create a decentralised and secure system",
   "fix": "Change \"decentralised\" to \"decentralized\"."
  }
 ],
 "src/content/seo-en/using-dpd-and-shopify-together.md": [
  {
   "line": "2 (frontmatter title)",
   "category": "consistency",
   "severity": "low",
   "locale": "en",
   "d": "Title capitalizes \"Together\" while 18 of 21 sibling \"Using ... together\" titles use lowercase \"together\". Inconsistent title casing.",
   "ev": "title: \"Using DPD and Shopify Together\"",
   "fix": "Lowercase to \"Using DPD and Shopify together\" to match the dominant convention."
  }
 ],
 "src/content/seo-en/using-dpd-and-woocommerce-together.md": [
  {
   "line": "2 (frontmatter title)",
   "category": "consistency",
   "severity": "low",
   "locale": "en",
   "d": "Title capitalizes \"Together\" while the corpus convention is lowercase \"together\".",
   "ev": "title: \"Using DPD and WooCommerce Together\"",
   "fix": "Lowercase to \"Using DPD and WooCommerce together\"."
  }
 ],
 "src/content/support-en/account/billing-and-pricing/subscription-information.md": [
  {
   "line": "14",
   "category": "consistency",
   "severity": "low",
   "locale": "en",
   "d": "The product feature is named \"Pay as you Go\" everywhere else (the dedicated article title \"The \\\"Pay as you Go\\\" model\", in view-invoices.md, in what-is-shoplinkr.md, and in this file's own NL twin alles-wat-je-moet-weten-over-het-abonnement.md which writes \"Pay as you Go\"). Only this EN line lowercases it as \"pay as you go\", so the EN copy has drifted from both the rest of the EN content and its NL twin.",
   "ev": "We use a \"pay as you go\" model.",
   "fix": "Capitalize to match the canonical name: We use a \"Pay as you Go\" model."
  }
 ],
 "src/content/support-en/getting-started/introduction/what-is-shoplinkr.md": [
  {
   "line": "19",
   "category": "brand",
   "severity": "low",
   "locale": "en",
   "d": "The bol.com link text is capitalized \"Bol\" mid-sentence. The retailer brand is deliberately lowercase \"bol\" except at the very start of a sentence. Here it sits mid-sentence in a list of marketplaces, so it should be lowercase. The NL twin (wat-is-shoplinkr.md L18) correctly uses lowercase <a ...>bol</a>, so this is also a twin drift.",
   "ev": "<a href=\"/en/support/connect-bol\">Bol</a>",
   "fix": "Change the link text to lowercase: <a href=\"/en/support/connect-bol\">bol</a> (matching the NL twin)."
  }
 ],
 "src/content/support-en/integrations/carriers/connect-myparcel.md": [
  {
   "line": "2",
   "category": "consistency",
   "severity": "low",
   "locale": "en",
   "d": "Title verb form is inconsistent with sibling carrier articles in the same subcategory. This file uses the imperative \"Connect MyParcel\" while connect-dpd.md and connect-innosend.md use the gerund (\"Connecting DPD\", \"Connecting Innosend\"). The NL twins are uniform (\"X koppelen\"), so the inconsistency is EN-only.",
   "ev": "title: \"Connect MyParcel\" (vs \"Connecting DPD\" / \"Connecting Innosend\")",
   "fix": "Standardize to \"Connecting MyParcel\" for consistency across the carriers subcategory."
  }
 ],
 "src/content/support-en/integrations/webshops-and-marketplaces/connect-shopify.md": [
  {
   "line": "52",
   "category": "consistency",
   "severity": "low",
   "locale": "en",
   "d": "Closing line uses \"From this moment on\" while the sibling marketplace files (connect-bol, connect-kaufland, connect-woocommerce) all use \"From this point on\". Minor wording drift between twins/siblings.",
   "ev": "<strong>From this moment on, ShopLinkr is the only place where you need to adjust your stock.</strong>",
   "fix": "Standardize to \"From this point on, ShopLinkr is the only place where you need to adjust your stock.\" to match the other marketplace articles."
  }
 ],
 "src/content/support-en/order-processing/orders/orders-overview.md": [
  {
   "line": "79",
   "category": "brand",
   "severity": "medium",
   "locale": "en",
   "d": "Mid-sentence the retailer brand is capitalized as 'Bol', but the site convention is lowercase 'bol' mid-sentence (capital only at sentence start). The NL twin (bestellingen-overzicht.md:78) confirms the intended casing by writing 'bij bol-bestellingen' (lowercase). This is also internally inconsistent with cancel-an-order.md:38 in the same set, which correctly uses lowercase 'bol'.",
   "ev": "<a href=\"/en/support/cancel-an-order\">Cancel an order</a> (for Bol orders)",
   "fix": "Change 'Bol orders' to 'bol orders' to match the lowercase-bol convention and the NL twin."
  }
 ],
 "src/content/support-en/order-processing/orders/create-reshipments.md": [
  {
   "line": "34",
   "category": "a11y",
   "severity": "medium",
   "locale": "en",
   "d": "Content/screenshot image has an empty alt attribute, so screen-reader users get no description of the illustration.",
   "ev": "<img alt=\"\" src=\"/images/support/nazendingen-aanmaken/LO7xOEJ6oWbGWULjhOlcKfgww.png\">",
   "fix": "Add a descriptive alt, e.g. alt=\"Reshipment shown in the order list with the Reshipment type linked to the original order\"."
  }
 ],
 "src/content/support-en/order-processing/orders/mark-order-as-high-priority.md": [
  {
   "line": "14",
   "category": "a11y",
   "severity": "medium",
   "locale": "en",
   "d": "Content/screenshot image has an empty alt attribute, so the high-priority visual indicator it illustrates is not described for screen-reader users.",
   "ev": "<img alt=\"\" src=\"/images/support/bestelling-markeren-als-hoge-prioriteit/cCDf4j3UANoKA6l3aZEdt7CzyA.png\">",
   "fix": "Add a descriptive alt, e.g. alt=\"Order in the list with a high-priority indicator\"."
  }
 ],
 "src/content/support-en/order-processing/orders/postpone-an-order.md": [
  {
   "line": "14",
   "category": "a11y",
   "severity": "medium",
   "locale": "en",
   "d": "Content/screenshot image has an empty alt attribute, leaving screen-reader users without a description of the postpone feature it illustrates.",
   "ev": "<img alt=\"\" src=\"/images/support/bestelling-uitstellen/6CMkLEqQVZ4WVRfaDotMKYQagI.png\">",
   "fix": "Add a descriptive alt, e.g. alt=\"Postpone order option in the order action menu\"."
  }
 ],
 "src/content/seo/hoe-koppel-ik-*.md": [
  {
   "line": "na",
   "category": "seo-content",
   "severity": "medium",
   "locale": "both",
   "d": "Inconsistent brand/product casing across the carrier-matrix titles, which are also the rendered H1s. The same products appear capitalized on some pages and lowercase on others: 'dpd' vs 'DPD', 'qls'/'Qls' vs 'QLS', 'innosend' vs 'Innosend', 'shopify' vs 'Shopify', 'woocommerce' vs 'WooCommerce'. 'bol' at the START of a title ('bol samen gebruiken' contexts are fine mid-sentence, but title-initial 'Bol' should be capital). EN twins also mix 'together' vs 'Together'. Inconsistent H1/title casing for brand terms weakens keyword clarity and looks low-quality.",
   "ev": "titles include 'Hoe koppel ik dpd met bol?', 'Hoe koppel ik QLS met Shopify?', 'Qls en shopify samen gebruiken', 'Qls en woocommerce samen gebruiken', 'Sendy en shopify samen gebruiken', 'Innosend en bol samen gebruiken' vs 'Innosend en Shopify samen gebruiken'; EN: 'Using DPD and WooCommerce Together' vs 'Using DPD and Bol together'.",
   "fix": "Normalize all titles/H1s to correct product casing: DPD, QLS, PostNL, MyParcel, Sendcloud, Sendy, Innosend, Shopify, WooCommerce, and Bol when title-initial (keep lowercase 'bol' only mid-sentence per brand rule). Pick one EN convention for 'together' (lowercase mid-title). These are H1/title strings, so consistency directly affects keyword targeting."
  }
 ]
};

const RULES = `SHOPLINKR CONTENT FIX RULES (strict):
- Brand is EXACTLY "ShopLinkr". Proper nouns/acronyms to capitalize when wrongly lowercased: DPD, QLS, Excel, Sendcloud, Sendy, Shopify, WooCommerce, MyParcel, PostNL, Innosend, Kaufland, PrintNode, Zebra, ZPL.
- NEVER change the casing of "bol" / "bol.com". Leave every bol/Bol EXACTLY as it is. (A separate decision covers that.)
- NEVER invent, add, or alter facts, numbers, statistics, prices, feature names, dates, or claims. Only fix language/markup defects listed.
- EN files (path contains -en/): American English spelling.
- NL files: informal je/jij/jouw tone.
- NO emdash. Keep changes minimal and surgical - fix ONLY what each finding describes (plus any identical instance of the SAME defect in the same file, e.g. a split compound repeated several times).
- Preserve frontmatter structure, image paths, and all links/targets except where a finding explicitly says otherwise. Do NOT change root-relative vs absolute link style.`;

const SCHEMA = {
  type:'object',
  properties:{
    file:{type:'string'},
    applied:{type:'array',items:{type:'object',properties:{finding:{type:'string'},change:{type:'string'}},required:['finding','change']}},
    skipped:{type:'array',items:{type:'object',properties:{finding:{type:'string'},reason:{type:'string'}},required:['finding','reason']}},
  },
  required:['file','applied','skipped'],
};

function prompt(file, findings){
  const list = findings.map((f,i)=>`${i+1}. [${f.category}/${f.severity}${f.line?' L'+f.line:''}] ${f.d}\n   EVIDENCE: ${f.ev}\n   FIX: ${f.fix}`).join('\n');
  return `${RULES}

Read the file ${file} in full, then apply ONLY these verified findings with precise Edit calls. Re-verify each against the actual current text before editing (the file may already differ). If a finding no longer applies or is ambiguous/risky, skip it and say why.

FINDINGS:
${list}

After editing, return file, applied[] (finding short-name + what you changed), skipped[] (finding + reason). Do NOT touch anything not listed. Do NOT change bol/Bol casing or any fact/number.`;
}

phase('Fix');
const entries = Object.entries(TASKS);
log(`Fixing ${entries.length} content files`);
const results = (await parallel(entries.map(([file, findings]) => () =>
  agent(prompt(file, findings), { label: 'fix:'+file.replace('src/content/',''), phase:'Fix', schema: SCHEMA })
    .then(r => r || { file, applied:[], skipped:[{finding:'(agent returned null)',reason:'agent error'}] })
))).filter(Boolean);

let applied=0, skipped=0;
for(const r of results){ applied+=(r.applied||[]).length; skipped+=(r.skipped||[]).length; }
log(`Done: ${applied} fixes applied, ${skipped} skipped across ${results.length} files`);
return { files: results.length, applied, skipped, results };
