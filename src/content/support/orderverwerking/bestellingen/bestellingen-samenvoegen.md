---
title: "Bestellingen samenvoegen"
summary: "Voeg meerdere bestellingen samen tot één pakket om verzendkosten te besparen en het magazijnproces te versnellen."
category: "orderverwerking"
categoryLabel: "Orderverwerking"
subcategory: "bestellingen"
subcategoryLabel: "Bestellingen"
order: 26
lastUpdated: "2026-05-28"
---

<p>Met de samenvoeg functie kun je meerdere open bestellingen combineren tot een samengevoegde bestelling. Dit is handig wanneer dezelfde klant meerdere bestellingen heeft geplaatst die je samen als één pakket wilt verzenden. De originele bestellingen blijven bestaan voor je administratie, terwijl de samengevoegde bestelling wordt gebruikt voor het magazijnproces.</p>
<h3>Wanneer kun je bestellingen samenvoegen?</h3>
<p>Bestellingen kunnen worden samengevoegd als ze aan de volgende voorwaarden voldoen:</p>
<ul>
<li>
<p>De bestellingen hebben de status <strong>Open</strong>, <strong>Uitgesteld</strong> of <strong>Backorder</strong></p>
</li>
<li>
<p>De bestellingen zijn nog niet onderdeel van een andere samenvoeging</p>
</li>
<li>
<p>Er mag maximaal 1 Bol VVB-bestelling in de samenvoeging zitten</p>
</li>
<li>
<p>Bestellingen van verschillende verkoopkanalen mogen worden samengevoegd</p>
</li>
</ul>
<h3>Hoe voeg je bestellingen samen?</h3>
<p>Er zijn twee manieren om bestellingen samen te voegen:</p>
<h4>Via de detailpagina</h4>
<ol>
<li>
<p>Ga naar de detailpagina van een bestelling</p>
</li>
<li>
<p>Klik op <strong>Bestelling samenvoegen</strong> in het actiemenu</p>
</li>
<li>
<p>Zoek en selecteer de bestellingen die je wilt samenvoegen</p>
</li>
<li>
<p>Kies welke bestelling de <strong>primaire bestelling</strong> is (deze bepaalt het verzendadres)</p>
</li>
<li>
<p>Klik op <strong>Bestellingen samenvoegen</strong></p>
</li>
</ol>
<h4>Via een meldingen indicatie</h4>
<p>ShopLinkr detecteert automatisch wanneer er meerdere open bestellingen zijn voor hetzelfde afleveradres. Je ziet dan een blauw icoon naast de klantnaam in de bestellijst, of een banner op de detailpagina. Klik hierop om direct de samenvoeging door te voeren met de overeenkomende bestellingen.</p>
<h3>Wat gebeurt er na het samenvoegen?</h3>
<ul>
<li>
<p>Er wordt een nieuwe <strong>samengevoegde bestelling</strong> aangemaakt</p>
</li>
<li>
<p>De orderregels van alle geselecteerde bestellingen worden samengevoegd per product (aantallen worden opgeteld)</p>
</li>
<li>
<p>De voorraad wordt opnieuw gealloceerd voor de samengevoegde bestelling</p>
</li>
<li>
<p>De originele bestellingen zijn tijdelijk niet zichtbaar in de bestellijst, maar blijven bestaan</p>
</li>
<li>
<p>De samengevoegde bestelling verschijnt in de bestellijst met een paarse badge <strong>Samengevoegd</strong></p>
</li>
</ul>
<h3>Automatisch bijwerken</h3>
<p>Zolang de samengevoegde bestelling nog niet in verwerking is, wordt deze automatisch bijgewerkt wanneer een verkoopkanaal wijzigingen doorstuurt naar de originele bestellingen. Denk hierbij aan het toevoegen, verwijderen of aanpassen van producten. De samengevoegde bestelling blijft zo altijd in sync met de originele bestellingen.</p>
<h3>Bestellingen verwerken</h3>
<p>Wanneer je de samengevoegde bestelling verwerkt, wordt er een verzendlabel aangemaakt. Vervolgens worden alle originele bestellingen automatisch verwerkt via hun eigen verkoopkanaal met dezelfde track &amp; trace code. Zodra alle originele bestellingen zijn verwerkt, wordt ook de samengevoegde bestelling als verwerkt gemarkeerd.</p>
<h3>Samenvoeging ongedaan maken</h3>
<p>Zolang de samengevoegde bestelling nog niet in verwerking is genomen (status Open, Uitgesteld of Backorder), kun je de samenvoeging ongedaan maken:</p>
<ol>
<li>
<p>Ga naar de detailpagina van de samengevoegde bestelling</p>
</li>
<li>
<p>Klik op <strong>Samenvoeging ongedaan maken</strong> in het actiemenu</p>
</li>
<li>
<p>Bevestig de actie</p>
</li>
</ol>
<p>De originele bestellingen worden hersteld en verschijnen weer in de bestellijst.</p>
<h3>Veelgestelde vragen</h3>
<p><strong>Kan ik bestellingen van verschillende verkoopkanalen samenvoegen?</strong>
<br>
Ja, je kunt bestellingen van bijvoorbeeld Shopify en Bol samenvoegen tot één samengevoegde bestelling.</p>
<p><strong>Wat gebeurt er als een originele bestelling wordt geannuleerd?</strong>
<br>
De geannuleerde bestelling wordt automatisch uit de samenvoeging gehaald. Als er nog maar een bestelling over is, wordt de hele samenvoeging ongedaan gemaakt.</p>
<p><strong>Worden wijzigingen aan originele bestellingen automatisch bijgewerkt?</strong>
<br>
Ja, wanneer een verkoopkanaal wijzigingen doorstuurt (zoals product- of aantal wijzigingen), wordt de samengevoegde bestelling automatisch herberekend. Dit geldt zolang de samengevoegde bestelling nog niet in verwerking is.</p>
<p><strong>Wat als een bestelling in backorder staat?</strong>
<br>
Als de voorraad onvoldoende is, krijgt de samengevoegde bestelling de status Backorder. Zodra de voorraad weer beschikbaar is, wordt de status automatisch bijgewerkt. Dit werkt hetzelfde als je gewend bent bij reguliere bestellingen.</p>
