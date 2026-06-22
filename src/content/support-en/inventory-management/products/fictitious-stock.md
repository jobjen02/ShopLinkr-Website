---
title: "Fictitious stock"
summary: "Hide your real stock from competitors by setting a fictitious stock level."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "products"
subcategoryLabel: "Products"
order: 44
lastUpdated: "2026-06-01"
translationKey: "fictieve-voorraad"
---

<p>With a fictitious stock level, you can send a different stock figure to your sales channel than the amount you actually have in stock. This is useful for preventing competitors from seeing how much stock you hold. There are tools that can read the stock of products on bol, for example, to gauge whether a product sells well. A fictitious stock level makes sure this does not work for your products.</p>
<h3>How does it work?</h3>
<p>You set a fictitious stock level (for example 400 units) and a threshold (for example 300). As long as your real stock stays above the threshold, ShopLinkr sends the fictitious stock to your sales channel. As soon as your real stock drops below the threshold, ShopLinkr automatically switches to the actual stock.</p>
<h3>Example</h3>
<p>You set a fictitious stock of 400 with a threshold of 300:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Stock in ShopLinkr</p>
</th>
<th>
<p>Fictitious stock</p>
</th>
<th>
<p>Threshold</p>
</th>
<th>
<p>Stock on sales channel</p>
</th>
</tr>
<tr>
<td>
<p>850</p>
</td>
<td>
<p>400</p>
</td>
<td>
<p>300</p>
</td>
<td>
<p>400</p>
</td>
</tr>
<tr>
<td>
<p>302</p>
</td>
<td>
<p>400</p>
</td>
<td>
<p>300</p>
</td>
<td>
<p>400</p>
</td>
</tr>
<tr>
<td>
<p>112</p>
</td>
<td>
<p>400</p>
</td>
<td>
<p>300</p>
</td>
<td>
<p>112</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>At 850 and 302 units, the real stock is above the threshold of 300, so the sales channel shows 400. At 112 units, the threshold is reached and the sales channel shows the actual stock.</p>
<p>This also works when you set the fictitious stock and threshold at a different level:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Stock in ShopLinkr</p>
</th>
<th>
<p>Fictitious stock</p>
</th>
<th>
<p>Threshold</p>
</th>
<th>
<p>Stock on sales channel</p>
</th>
</tr>
<tr>
<td>
<p>2</p>
</td>
<td>
<p>150</p>
</td>
<td>
<p>1</p>
</td>
<td>
<p>150</p>
</td>
</tr>
<tr>
<td>
<p>1</p>
</td>
<td>
<p>150</p>
</td>
<td>
<p>1</p>
</td>
<td>
<p>1</p>
</td>
</tr>
</tbody>
</table>
</figure>
<h3>Setting it up</h3>
<p>You can set a fictitious stock level at two levels:</p>
<ul>
<li>
<p><strong>Company level</strong>: go to <strong>Settings &gt; My company</strong>. This setting applies to all products. See <a href="/en/support/company-settings">Company settings</a>.</p>
</li>
<li>
<p><strong>Product level</strong>: open a product and click <strong>Edit</strong>. Here you can override the company-wide setting for that specific product.</p>
</li>
</ul>
<h3>Good to know</h3>
<ul>
<li>
<p>The fictitious stock is only sent to your sales channels. Within ShopLinkr you always see your real stock.</p>
</li>
<li>
<p>Do not set your threshold too low: you need enough margin to process orders, since customers can actually order the full fictitious stock amount.</p>
</li>
</ul>
