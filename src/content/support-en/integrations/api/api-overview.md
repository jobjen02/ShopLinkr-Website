---
title: "API overview"
summary: "Learn what you can do with the ShopLinkr API and how to get started."
category: "integrations"
categoryLabel: "Integrations"
subcategory: "api"
subcategoryLabel: "API"
order: 78
lastUpdated: "2026-04-18"
translationKey: "api-overzicht"
---

<p>The ShopLinkr API lets you work directly with your warehouse data from your own systems. Think of automatically creating orders, updating stock, or retrieving product information. The API is intended for developers and technical partners who want to build their own integration.</p>
<h3>Documentation</h3>
<p>You can find the full technical documentation at <a href="https://api.shoplinkr.com/api/docs" target="_blank">api.shoplinkr.com/api/docs</a>. There you will find all available resources, endpoints, parameters, and example requests. You can also try out requests directly.</p>
<h3>Getting started</h3>
<ol>
<li>
<p>Create an <a href="/en/support/create-api-token">API token</a> with the right permissions.</p>
</li>
<li>
<p>View the interactive documentation <a href="https://api.shoplinkr.com/api/docs" target="_blank">here</a>.</p>
</li>
<li>
<p>Send your first request with your token in the <code>Authorization</code> header.</p>
</li>
</ol>
<h3>Good to know</h3>
<ul>
<li>
<p>The API is limited to 5 requests per second. This limit applies to all tokens within your account.</p>
</li>
<li>
<p>Every request requires a <code>User-Agent</code> header that identifies your integration.</p>
</li>
<li>
<p>The API uses Bearer token authentication. You send your token in the <code>Authorization</code> header.</p>
</li>
</ul>
