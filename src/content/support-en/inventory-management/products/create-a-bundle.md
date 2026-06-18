---
title: "Creating a bundle"
summary: "Combine multiple products into a bundle and let ShopLinkr calculate the stock automatically."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "products"
subcategoryLabel: "Products"
order: 42
lastUpdated: "2026-05-28"
translationKey: "een-bundel-aanmaken"
---

<p>Bundles let you combine several products into one new product. Say you sell a phone and a charger. You sell each on its own, but you also want to offer them together as a bundle. In that case you create a product bundle. You then have three products in ShopLinkr: the phone, the charger and the bundle. The stock for the bundle is calculated automatically based on the individual products.</p>
<h3>Creating a bundle</h3>
<ol>
<li>
<p>Create a new product in your sales channel. This becomes your bundle. Set a title, price and image, for example "Phone + Charger".</p>
</li>
<li>
<p>In ShopLinkr, go to the product page for this new product.</p>
</li>
<li>
<p>Click <strong>Edit</strong> and turn on <strong>Bundle product</strong>.</p>
</li>
<li>
<p>Look up the first product you want to add to the bundle and set the quantity (how many times this product is included in the bundle).</p>
</li>
<li>
<p>Click <strong>Add product to bundle</strong> to add more products.</p>
</li>
<li>
<p>Click <strong>Update product</strong>.</p>
</li>
</ol>
<h3>Example</h3>
<p>You create a bundle "Phone + Charger" with the following products:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Product in bundle</p>
</th>
<th>
<p>Quantity per bundle</p>
</th>
<th>
<p>Stock of individual product</p>
</th>
</tr>
<tr>
<td>
<p>Phone</p>
</td>
<td>
<p>1x</p>
</td>
<td>
<p>10 units</p>
</td>
</tr>
<tr>
<td>
<p>Charger</p>
</td>
<td>
<p>1x</p>
</td>
<td>
<p>6 units</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>The bundle stock automatically becomes <strong>6</strong>, because you can only assemble 6 complete bundles. The product with the lowest availability determines the stock for the bundle.</p>
<h3>What happens when an order comes in?</h3>
<p>As soon as someone orders the bundle, the stock of every individual product in the bundle drops by the configured quantity. In the example above:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Situation</p>
</th>
<th>
<p>Phone</p>
</th>
<th>
<p>Charger</p>
</th>
<th>
<p>Bundle</p>
</th>
</tr>
<tr>
<td>
<p>Before order</p>
</td>
<td>
<p>10</p>
</td>
<td>
<p>6</p>
</td>
<td>
<p>6</p>
</td>
</tr>
<tr>
<td>
<p>After ordering 1x bundle</p>
</td>
<td>
<p>9</p>
</td>
<td>
<p>5</p>
</td>
<td>
<p>5</p>
</td>
</tr>
<tr>
<td>
<p>After ordering 1x phone on its own</p>
</td>
<td>
<p>8</p>
</td>
<td>
<p>5</p>
</td>
<td>
<p>5</p>
</td>
</tr>
<tr>
<td>
<p>After ordering 1x charger on its own</p>
</td>
<td>
<p>8</p>
</td>
<td>
<p>4</p>
</td>
<td>
<p>4</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>The bundle stock is always recalculated automatically. Whether you sell an individual product or the bundle itself, the stock is always correct.</p>
<h3>Good to know</h3>
<ul>
<li>
<p>A product can appear in several bundles at the same time.</p>
</li>
<li>
<p>You can set per product how many times it appears in the bundle (for example 2x the same charger).</p>
</li>
<li>
<p>Bundles are not included in <a href="/support/voorraadtellingen">stock counts</a>, because their stock is determined by the individual products.</p>
</li>
<li>
<p>If you <a href="/support/producten-archiveren">archive</a> an individual product, it is automatically detached from the bundle.</p>
</li>
</ul>
