---
title: "Voorraadbeheer met Excel: een complete gids"
excerpt: "Zo zet je voorraadbeheer op in Excel: de juiste kolommen, slimme formules en een gratis template. Plus wanneer je beter overstapt naar software."
author: "Stijn Verhagen"
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/voorraadbeheer-met-excel-een-complete-gids/BtA4mAWgXjgoMjQo4P6c5T2PaM.png"
imageAlt: "Voorraadlijst in een Excel-spreadsheet op een laptop"
---

<p><strong>Voorraadbeheer met Excel begint met een nette lijst waarin elke rij één product is, met kolommen voor SKU, aantal en bestelpunt. Met formules als VERT.ZOEKEN en SOMMEN.ALS en voorwaardelijke opmaak houd je alles bij. Voor een klein assortiment op één kanaal werkt dat prima, bij meerdere kanalen loop je tegen de grenzen aan.</strong></p>

<p>Voor veel webshops en verkopers begint voorraadbeheer met Excel: een gratis, flexibele spreadsheet die je meteen onder de knie hebt. Het werkt prima zolang je voorraad overzichtelijk is. In deze gids zet je stap voor stap een bruikbaar voorraadsysteem op, met de juiste kolommen en formules, en lees je waar Excel tegen zijn grenzen aanloopt.</p>
<h2>Een voorraadlijst opzetten in Excel</h2>
<p>De basis is een nette lijst waarin elke rij één product is. Houd het simpel en consistent, dan blijven je formules en filters werken.</p>
<ol>
<li><strong>Maak kolommen aan</strong> voor productnaam, SKU, locatie, aantal op voorraad, inkoopprijs en minimale voorraad (je bestelpunt). Voeg desgewenst aparte kolommen toe voor binnenkomende en uitgaande aantallen en voor leverancier en levertijd, zodat je weet hoe ver vooruit je moet bestellen.</li>
<li><strong>Vul per product één rij</strong> en gebruik overal hetzelfde formaat voor SKU's. Eén afwijkende notatie en je zoekfuncties lopen mis.</li>
<li><strong>Zet je lijst om naar een Excel-tabel</strong> (Invoegen, Tabel of Ctrl+T). Formules, opmaak, filters en sortering groeien dan automatisch mee zodra je rijen toevoegt.</li>
<li><strong>Gebruik gegevensvalidatie</strong> (dropdownlijsten) op kolommen als categorie en leverancier, zodat je alleen uit een vaste lijst kiest en geen typefouten maakt die je filters onbruikbaar maken. Zet ook datafilters op de kopregel om snel te sorteren op leverancier, categorie of voorraadniveau.</li>
<li><strong>Bereken de voorraadwaarde</strong> met een kolom <code>=aantal*inkoopprijs</code>. Wil je je actuele voorraad automatisch bijhouden, gebruik dan een rekensom als <strong>beginvoorraad + ontvangen - verkocht</strong>.</li>
<li><strong>Markeer lage voorraad</strong> met voorwaardelijke opmaak (kleur een rij rood zodra het aantal onder je bestelpunt zakt), of laat met een <strong>ALS</strong>-formule "Bestellen" verschijnen zodra de voorraad onder je minimum zakt.</li>
</ol>
<p>Werk je met veel producten? Houd dan één tabblad voor de voorraad zelf en gebruik losse tabbladen voor inkoop en verkoop, of per productcategorie of magazijnlocatie. Zo blijft je hoofdoverzicht overzichtelijk en hoef je niet door honderden rijen te scrollen.</p>
<p>Een lege opzet hoef je niet zelf te bouwen. Download onze <a href="/voorraadbeheer-excel-template" target="_blank">gratis Excel voorraadbeheer template</a> en pas hem aan naar jouw assortiment.</p>
<h2>Handige Excel-formules voor je voorraad</h2>
<p>Een paar formules besparen je het meeste handwerk. Met <strong>VERT.ZOEKEN</strong> haal je productgegevens op bij een SKU, met <strong>SOMMEN.ALS</strong> tel je verkochte aantallen per product op en met <strong>ALS.FOUT</strong> verberg je foutmeldingen die je lijst rommelig maken. Een draaitabel vat je verkopen vervolgens samen per product of per maand, zodat je ziet wat hard loopt en wat blijft liggen.</p>
<p>Naast <strong>SOM</strong> bereken je met <strong>AANTAL</strong> en <strong>GEMIDDELDE</strong> je aantal SKU's en je gemiddelde marge, en met <strong>SOMPRODUCT</strong> van voorraad maal inkoopprijs zet je je totale voorraadwaarde in één cel. Let bij het kopiëren van formules op absolute verwijzingen met een dollarteken (<code>$A$2</code>), anders verschuiven je bereiken ongemerkt en kloppen je totalen niet meer.</p>
<p>Combineer een minimumvoorraad met de gemiddelde levertijd van je leverancier en je hebt een eenvoudig signaal voor wanneer je moet bestellen, nog voordat je nee moet verkopen. Wil je verder gaan, dan combineer je met <strong>Power Query</strong> gegevens uit meerdere bestanden, al is dat voor de meeste webshops de moeite niet omdat de echte rem ergens anders zit.</p>
<h2>Veelgemaakte fouten in Excel</h2>
<p>Excel werkt prima zolang je het netjes houdt. Vermijd de meest voorkomende valkuilen:</p>
<ul>
<li><strong>Dubbele en inconsistente invoer</strong>: leg vast hoe je een SKU schrijft en gebruik gegevensvalidatie om typefouten tegen te gaan.</li>
<li><strong>Vergeten bij te werken</strong>: handmatig aftellen na elke verkoop is foutgevoelig en kost tijd.</li>
<li><strong>Geen back-up</strong>: sla op in de cloud of bewaar versies, zodat een crash je administratie niet wist.</li>
</ul>
<h2>Waar Excel tekortschiet</h2>
<p>Excel is statisch: het weet niets van je verkopen. Verkoop je op meerdere kanalen zoals bol, Shopify of WooCommerce, dan moet je elke voorraadmutatie met de hand overtypen. Eén vergeten update en je verkoopt iets dat al op is. Bij groeiende aantallen kost dat overtypen steeds meer tijd en sluipen er fouten in.</p>
<p>Op dat punt is een tool die je voorraad automatisch bijhoudt logischer. <a href="https://shoplinkr.com/">ShopLinkr</a> synchroniseert je <a href="/functionaliteiten/voorraad">voorraad</a> realtime over al je kanalen, zodat je nooit meer dubbel verkoopt. Je <a href="/functionaliteiten/bestellingen">bestellingen</a> komen centraal binnen, je pakt ze in met <a href="/functionaliteiten/picklijsten">picklijsten</a> en je print verzendlabels voor <a href="/functionaliteiten/vervoerders">vervoerders</a> als PostNL en DPD. Track and trace gaat automatisch terug naar het verkoopkanaal.</p>
<p>De berekeningen die je in Excel zelf zou bouwen, zoals <a href="/functionaliteiten/inkoopadvies">inkoopadvies per leverancier</a> en <a href="/functionaliteiten/rapporten">rapporten over omzet en marge per product</a>, staan er kant-en-klaar in.</p>
<h2>Veelgestelde vragen</h2>
<h3>Kan ik mijn hele voorraad in Excel beheren?</h3>
<p>Voor een klein, overzichtelijk assortiment op één kanaal werkt Excel prima. Verkoop je op meerdere kanalen of groeit je aantal orders, dan wordt handmatig bijwerken foutgevoelig en kost het te veel tijd.</p>
<h3>Is voorraadbeheer in Excel gratis?</h3>
<p>Ja, als je al over Excel of een gratis alternatief zoals Google Spreadsheets beschikt, kost een voorraadlijst niets. De verborgen kosten zitten in de tijd die handmatig bijwerken kost en in fouten zoals overselling.</p>
<h3>Hoe voorkom ik fouten in mijn voorraadbestand?</h3>
<p>Gebruik gegevensvalidatie voor invoer, controleer je formules met de auditingtools van Excel en werk je voorraad op vaste momenten bij. Een tweede paar ogen op je formules helpt ook.</p>
<h3>Wat zijn de grootste risico's van voorraad in Excel?</h3>
<p>Verouderde cijfers en menselijke fouten. Omdat alles handmatig is, klopt je voorraad alleen als iedereen elke mutatie meteen invoert. Eén gemiste update kan al tot dubbele verkoop of een misgelopen bestelling leiden.</p>
<h3>Hoe voorkom ik overselling met Excel?</h3>
<p>In Excel kun je overselling alleen beperken door je standen heel strikt en direct na elke verkoop bij te werken. Volledig voorkomen lukt pas met <a href="/functionaliteiten/voorraad">realtime voorraadsynchronisatie</a> die je kanalen automatisch up-to-date houdt.</p>
<h3>Hoe voorkom ik dat ik mijn voorraadbestand kwijtraak?</h3>
<p>Bewaar je bestand in de cloud, maak regelmatig back-ups en beperk wie wijzigingen mag maken. Zo voorkom je dat één foute bewerking je hele lijst onbruikbaar maakt.</p>
<h3>Wanneer stap ik over op voorraadbeheer-software?</h3>
<p>Zodra je meerdere kanalen koppelt, met varianten of bundels werkt of structureel tijd kwijt bent aan overtypen. Dan verdient automatisering zich snel terug.</p>
<p>Begin gerust met Excel en de gratis template. Groeit je voorraad over die ene spreadsheet heen? Bekijk onze <a href="/gidsen">gidsen</a>, stel je vraag via <a href="/support">support</a>, of <a href="https://app.shoplinkr.com/auth/register">probeer ShopLinkr 14 dagen gratis</a> en beheer je voorraad en bestellingen voortaan op één plek.</p>
