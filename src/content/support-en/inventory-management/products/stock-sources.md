---
title: "Stock sources"
summary: "Sell multiple variants from a single central stock measured in weight, length or volume."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "products"
subcategoryLabel: "Products"
order: 45
lastUpdated: "2025-09-17"
translationKey: "voorraadbronnen"
---

<p>A stock source is a base product whose stock you track in a unit of measure such as weight, length or volume. From this single source you sell multiple variants. ShopLinkr automatically calculates how much is available per variant.</p>
<h3>When should you use this?</h3>
<p>Stock sources are meant for products whose variants only come into being when they are filled or picked. For example:</p>
<ul>
<li>
<p>Dog food that you sell in bags of 500 grams, 1 kilo and 5 kilos</p>
</li>
<li>
<p>Fabric that you sell per 50 cm, 1 meter or 3 meters</p>
</li>
<li>
<p>Perfume that you decant into bottles of 50 ml, 100 ml and 250 ml</p>
</li>
<li>
<p>Cable that you sell in lengths of 2, 5 and 10 meters</p>
</li>
</ul>
<p>Do you sell variants that are produced in advance and stored separately (for example pallets of ready-made bottles of shampoo)? Then you manage those as individual products, not as a stock source.</p>
<h3>Example</h3>
<p>You have 100 kilos of dog food as a stock source and sell variants of 500 grams and 1 kilo:</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Situation</p>
</th>
<th>
<p>Source stock</p>
</th>
<th>
<p>500g variant</p>
</th>
<th>
<p>1kg variant</p>
</th>
</tr>
<tr>
<td>
<p>Start</p>
</td>
<td>
<p>100 kilos</p>
</td>
<td>
<p>200 units</p>
</td>
<td>
<p>100 units</p>
</td>
</tr>
<tr>
<td>
<p>After selling 1x 1kg</p>
</td>
<td>
<p>99 kilos</p>
</td>
<td>
<p>198 units</p>
</td>
<td>
<p>99 units</p>
</td>
</tr>
<tr>
<td>
<p>After selling 1x 500g</p>
</td>
<td>
<p>98.5 kilos</p>
</td>
<td>
<p>197 units</p>
</td>
<td>
<p>98 units</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>With each sale the right amount is deducted from the source stock and all variants are recalculated automatically.</p>
<h3>Setting it up</h3>
<ol>
<li>
<p>Go to <strong>Products</strong> and open the product you want to use as the source.</p>
</li>
<li>
<p>Enable <strong>Stock source</strong> and choose the unit of measure (weight, length or volume).</p>
</li>
<li>
<p>Link variants and enter the amount for each variant (for example 500 grams or 1 kilo).</p>
</li>
<li>
<p>Click <strong>Save</strong>.</p>
</li>
</ol>
<p>The stock of all variants is automatically synced with your sales channels.</p>
<h3>Pre-produced variants</h3>
<p>You can also produce variants in advance from the source. This is handy for variants that sell frequently. For example: you produce 10 bags of 100 grams from your source of 100 kilos. 1 kilo is deducted from the source stock and the variant gets its own stock of 10 units.</p>
<ul>
<li>
<p>When a sale comes in, the pre-produced stock is used first.</p>
</li>
<li>
<p>Once that runs out, you are prompted to produce from the source during <a href="/en/support/working-with-pick-lists">picking</a>.</p>
</li>
</ul>
<h3>Returns and cancellations</h3>
<ul>
<li>
<p><strong>Returns</strong>: the stock is added to the variant, not to the source. This keeps the variant stock accurate.</p>
</li>
<li>
<p><strong>Cancellations before shipping</strong>: the reservation lapses and the amount is returned to the source stock.</p>
</li>
</ul>
