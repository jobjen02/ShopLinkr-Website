---
title: "Create an API token"
summary: "Create an API token to connect securely to the ShopLinkr API."
category: "integrations"
categoryLabel: "Integrations"
subcategory: "api"
subcategoryLabel: "API"
order: 79
lastUpdated: "2026-04-18"
translationKey: "api-token-aanmaken"
---

<p>To use the ShopLinkr API you need an API token. A token authenticates your requests and determines which permissions the integration receives.</p>
<h3>Create a token</h3>
<ol>
<li>
<p>Go to <strong>Settings &gt; API Tokens</strong>.</p>
</li>
<li>
<p>Click <strong>Create token</strong>.</p>
</li>
<li>
<p>Give your token a recognizable name, for example "ERP Integration" or "Webshop Sync".</p>
</li>
<li>
<p>Select the permissions your token needs. Permissions are grouped by category, and for each resource you can choose which actions the token is allowed to perform.</p>
</li>
<li>
<p>Click <strong>Save</strong>.</p>
</li>
<li>
<p>Copy your token right after creating it. You will not be able to view the token again afterwards.</p>
</li>
</ol>
<h3>Manage tokens</h3>
<p>You can manage existing tokens through <strong>Settings &gt; API Tokens</strong>.</p>
<ul>
<li>
<p><strong>Edit permissions</strong> - Adjust the permissions of an existing token.</p>
</li>
<li>
<p><strong>Refresh</strong> - Generate a new token value with the same permissions. The old token stops working immediately.</p>
</li>
<li>
<p><strong>Revoke</strong> - Delete the token permanently. Any applications using this token lose access immediately.</p>
</li>
</ul>
<h3>Good to know</h3>
<ul>
<li>
<p>Your token is shown only once, right after you create it. Store it safely, for example in a password manager.</p>
</li>
<li>
<p>Give each token only the permissions it actually needs. This limits the impact if a token ever leaks.</p>
</li>
<li>
<p>If you suspect that a token has leaked, revoke it immediately and create a new one.</p>
</li>
</ul>
<h3>Related</h3>
<p><a href="/en/support/api-overview">API overview</a></p>
