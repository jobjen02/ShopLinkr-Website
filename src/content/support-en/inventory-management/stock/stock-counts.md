---
title: "Stock counts"
summary: "Check your physical stock and correct any differences with the system."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "stock"
subcategoryLabel: "Stock"
order: 51
lastUpdated: "2025-07-10"
translationKey: "voorraadtellingen"
---

<p>With stock counts you check whether the physical stock in your warehouse matches what is recorded in ShopLinkr. If the numbers don't add up, you can correct them right away. This helps you avoid picking errors and keeps your stock reliable.</p>
<p>To use stock counts, it's important that you have set up <a href="/en/support/location-management">locations</a>.</p>
<h3>Starting a count</h3>
<ol>
<li>
<p>Go to <strong>Products &gt; Stock counts</strong> and click <strong>Start stock count</strong>.</p>
</li>
<li>
<p>Add one or more <strong>locations</strong> that you want to count. Sublocations are included automatically.</p>
</li>
</ol>
<p>The count is automatically given a name and the status <strong>Open</strong>.</p>
<h3>Counting products</h3>
<p>For each location, you count all the products you find:</p>
<ol>
<li>
<p>Open a location from the <strong>To be counted</strong> tab.</p>
</li>
<li>
<p>Scan the products with a barcode scanner or add them manually via <strong>Add products</strong>.</p>
</li>
<li>
<p>Enter the <strong>counted quantity</strong> for each product. When scanning, the quantity is increased automatically.</p>
</li>
</ol>
<p>Come across a product that shouldn't be stored at that location? Just add it. ShopLinkr then automatically links the product to the location.</p>
<h3>Reviewing and updating</h3>
<p>Once you have counted all products, click <strong>Review</strong>. ShopLinkr compares your counted quantities with the stock in the system:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Result</p>
</th>
<th>
<p>What you see</p>
</th>
<th>
<p>What you do</p>
</th>
</tr>
<tr>
<td>
<p>Stock is correct</p>
</td>
<td>
<p>Green check mark</p>
</td>
<td>
<p>Nothing, everything is fine</p>
</td>
</tr>
<tr>
<td>
<p>Difference found</p>
</td>
<td>
<p>Red difference (e.g. +5 or -3)</p>
</td>
<td>
<p>Check whether your count is correct</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>Are the counted quantities correct? Click <strong>Update stock</strong>. The stock is adjusted immediately and recorded as a <a href="/en/support/stock-movements">stock movement</a> with the reason "Stock count". Not sure? Click <strong>Count again</strong> to go back.</p>
<h3>Multiple locations</h3>
<p>A count can contain multiple locations. You count each location separately and the overview shows which locations have already been counted (the <strong>Counted</strong> tab) and which still need counting (the <strong>To be counted</strong> tab). Once all locations have been counted, you can complete the count. The status changes to <strong>Completed</strong> and the count can no longer be changed.</p>
<h3>Good to know</h3>
<ul>
<li>
<p><a href="/en/support/create-a-bundle">Bundles</a> and products with <a href="/en/support/unlimited-stock">unlimited stock</a> are not included in a count.</p>
</li>
<li>
<p>The counted stock cannot be lower than a product's reserved stock. This prevents orders that are already being processed from no longer being fulfillable.</p>
</li>
<li>
<p>For each location, ShopLinkr records who carried out the count and when.</p>
</li>
</ul>
