---
title: "Backorders"
summary: "Wat backorders zijn, hoe ze automatisch worden vrijgegeven en hoe de backorder-vrijgeeffunctie werkt."
category: "orderverwerking"
categoryLabel: "Orderverwerking"
subcategory: "bestellingen"
subcategoryLabel: "Bestellingen"
order: 27
lastUpdated: "2026-04-01"
---

<p>Een backorder is een bestelling die niet direct verwerkt kan worden omdat er onvoldoende voorraad beschikbaar is op de juiste locatie. De bestelling krijgt automatisch de status <strong>Backorder</strong> en wordt pas weer vrijgegeven zodra de voorraad beschikbaar is.</p>
<p>Er zijn twee manieren waarop backorders kunnen ontstaan en worden opgelost. Het is belangrijk om het verschil te begrijpen.</p>
<h3>Backorders door ontbrekende voorraad</h3>
<p>De meest voorkomende situatie: een klant bestelt een product waarvoor op dat moment geen voorraad beschikbaar is. Dit kan bijvoorbeeld gebeuren als je backorders hebt ingeschakeld. Klanten kunnen dan gewoon een bestelling plaatsen, ook al is het product niet op voorraad.</p>
<p>In ShopLinkr kun je op drie niveaus instellen of backorders zijn toegestaan:</p>
<ul>
<li>
<p><strong>Bedrijfsbreed</strong>: een standaardinstelling die geldt voor al je producten.</p>
</li>
<li>
<p><strong>Per verkoopkanaal</strong>: overschrijf de standaardinstelling voor een specifiek verkoopkanaal.</p>
</li>
<li>
<p><strong>Per product</strong>: overschrijf de instelling voor een individueel product.</p>
</li>
</ul>
<p>Een instelling op productniveau heeft altijd voorrang op het verkoopkanaal, en het verkoopkanaal heeft voorrang op de bedrijfsbrede instelling.</p>
<h4>Hoe worden deze backorders vrijgegeven?</h4>
<p>Zodra je de voorraad van het product weer aanvult (bijvoorbeeld door een <a href="/support/levering-ontvangen-en-verwerken">levering te ontvangen</a>), worden de bestellingen automatisch vrijgegeven. Ze gaan dan van de status <strong>Backorder</strong> naar <strong>Open</strong> en kun je op de normale manier verwerken. Hier hoef je zelf niets voor te doen.</p>
<h3>Backorders door bulklocatie voorraad</h3>
<p>Deze situatie is specifieker. In ShopLinkr kun je instellen dat de voorraad voor bestellingen alleen van <a href="/support/locatiebeheer">picklocaties</a> gepakt mag worden, en niet van bulklocaties. Dit is handig als je wilt voorkomen dat orderpickers naar de bulklocatie worden gestuurd.</p>
<p>Als er wel voorraad beschikbaar is, maar alleen op een bulklocatie, gaat de bestelling alsnog naar de status <strong>Backorder</strong>. De voorraad is er dan wel, maar niet op de juiste locatie in je magazijn.</p>
<h4>Backorders vrijgeven</h4>
<p>Voor deze situatie gebruik je de <strong>Backorders vrijgeven</strong> functie. Hier verplaats je voorraad van een bulklocatie naar een picklocatie, zodat de bestellingen verwerkt kunnen worden.</p>
<p>Op de bestellingen pagina verschijnt rechtsboven een oranje knop <strong>Backorders vrijgeven</strong> zodra er backorders beschikbaar zijn voor vrijgave. Als er geen backorders zijn, is deze knop niet zichtbaar.</p>
<ol>
<li>
<p>Klik op de oranje knop <strong>Backorders vrijgeven</strong>.</p>
</li>
<li>
<p>Je ziet nu een overzicht van producten met backorders. Per product zie je op welke bulklocatie de voorraad beschikbaar is en hoeveel bestellingen je daarmee kunt vrijgeven.</p>
</li>
<li>
<p>Verplaats de voorraad van de bulklocatie naar een picklocatie.</p>
</li>
</ol>
<p>Zodra de voorraad op de picklocatie staat, worden de bestellingen automatisch vrijgegeven en kun je ze op de normale manier verwerken.</p>
<h4>Goed om te weten</h4>
<ul>
<li>
<p>Je kunt bij het vrijgeven filteren op verkoopkanaal en uiterlijke verwerkingsdatum.</p>
</li>
<li>
<p>Deze functie is specifiek bedoeld voor de situatie waarbij voorraad op een bulklocatie staat en verplaatst moet worden naar een picklocatie.</p>
</li>
</ul>
