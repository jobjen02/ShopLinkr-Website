---
title: "Overzicht van de API"
summary: "Ontdek wat je kunt doen met de ShopLinkr API en hoe je aan de slag gaat."
category: "integraties"
categoryLabel: "Integraties"
subcategory: "api"
subcategoryLabel: "API"
order: 78
lastUpdated: "2026-05-28"
---

<p>De ShopLinkr API geeft je de mogelijkheid om vanuit je eigen systemen direct te werken met je magazijndata. Denk aan het automatisch aanmaken van bestellingen, bijwerken van voorraad of ophalen van productinformatie. De API is bedoeld voor ontwikkelaars en technische partners die een eigen koppeling willen bouwen.</p>
<h3>Documentatie</h3>
<p>De volledige technische documentatie vind je op <a href="https://api.shoplinkr.com/api/docs" target="_blank">api.shoplinkr.com/api/docs</a>. Daar vind je alle beschikbare resources, endpoints, parameters en voorbeeldverzoeken. Je kunt er ook direct verzoeken uitproberen.</p>
<h3>Aan de slag</h3>
<ol>
<li>
<p>Maak een <a href="/support/api-token-aanmaken">API-token</a> aan met de juiste rechten.</p>
</li>
<li>
<p>Bekijk de interactieve documentatie <a href="https://api.shoplinkr.com/api/docs" target="_blank">hier</a>.</p>
</li>
<li>
<p>Stuur je eerste verzoek met je token in de <code>Authorization</code> header.</p>
</li>
</ol>
<h3>Goed om te weten</h3>
<ul>
<li>
<p>De API is gelimiteerd tot 5 verzoeken per seconde. Dit limiet geldt voor alle tokens binnen je account.</p>
</li>
<li>
<p>Alle verzoeken vereisen een <code>User-Agent</code> header waarmee je je integratie identificeert.</p>
</li>
<li>
<p>De API gebruikt Bearer token authenticatie. Je token stuur je mee in de <code>Authorization</code> header.</p>
</li>
</ul>
