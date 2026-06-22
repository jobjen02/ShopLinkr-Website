---
title: "Purchase advice"
summary: "Work out in a few clicks what to reorder from which supplier, then turn the advice into concrete deliveries."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "purchasing"
subcategoryLabel: "Purchasing"
order: 80
lastUpdated: "2026-05-26"
translationKey: "inkoopadvies"
---

<p>With purchase advice you let ShopLinkr calculate which products you should buy and how much to order per <a href="/en/support/managing-suppliers">supplier</a>. This keeps you from selling products that aren't in stock (overselling) without leaving you with too much sitting on the shelf. From there you can turn the advice into concrete <a href="/en/support/creating-a-delivery">deliveries</a> in a single click.</p>
<h3>Generating advice</h3>
<ol>
<li>
<p>Go to <strong>Purchasing &gt; Purchase advice</strong>.</p>
</li>
<li>
<p>Click <strong>Generate advice</strong>.</p>
</li>
<li>
<p>Select one or more <strong>suppliers</strong>. Only products linked to these suppliers are included.</p>
</li>
<li>
<p>Pick a <strong>quick option</strong> or put together yourself which parts the advice takes into account.</p>
</li>
<li>
<p>Click <strong>Generate</strong>.</p>
</li>
</ol>
<p>Once the advice is ready it appears in the overview and you can open it. Earlier advice stays visible in the overview, so you can look back later at what was advised.</p>
<h3>Quick options</h3>
<p>Three quick options switch on the right parts for you. After that you can still make individual adjustments.</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Quick option</p>
</th>
<th>
<p>When to choose it</p>
</th>
</tr>
<tr>
<td>
<p><strong>Cover backorders</strong></p>
</td>
<td>
<p>When you only want to reorder what you urgently need for open orders. No forecast, no thresholds, just what has already been ordered.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Maintain stock levels</strong></p>
</td>
<td>
<p>When you use a fixed threshold per product and want to top up as soon as you drop below it. Also accounts for open backorders.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Smart purchasing</strong></p>
</td>
<td>
<p>The most forward looking choice. It combines backorders, thresholds and a sales forecast including lead time, so the advice also anticipates what you're going to sell in the period ahead. Suited to products with steady sales.</p>
</td>
</tr>
</tbody>
</table>
</figure>
<h3>Parts</h3>
<p>Below the quick options you'll find all the parts individually. You can tick which ones the advice should take into account.</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Part</p>
</th>
<th>
<p>Description</p>
</th>
</tr>
<tr>
<td>
<p><strong>Cover backorders</strong></p>
</td>
<td>
<p>Products with open backorders are included, so orders you've already accepted can be fulfilled.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Stock thresholds</strong></p>
</td>
<td>
<p>Products whose available stock is below the set threshold are topped up to the set target.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Expected sales</strong></p>
</td>
<td>
<p>Products are topped up based on the average sales per day over the advice period.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Include lead time</strong></p>
</td>
<td>
<p>Adds the supplier's lead time to the advice period, so the advice also covers the waiting time.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Subtract open deliveries</strong></p>
</td>
<td>
<p>Products you've already ordered from a supplier are subtracted from the advice, so you don't buy twice.</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>Backorders, thresholds and expected sales together determine how much the advice wants to reorder. Threshold and expected sales are two ways of calculating the same thing, so the higher of the two wins (they are not added together). Backorders come on top of that, because those are orders you've already accepted.</p>
<h3>Setting thresholds per product</h3>
<p>On the product page you can set a purchase threshold and a purchase target per product. This determines when a product is included in the advice through the <strong>Stock thresholds</strong> part.</p>
<ol>
<li>
<p>Open a product and click <strong>Edit</strong>.</p>
</li>
<li>
<p>Scroll to the <strong>Purchasing</strong> section.</p>
</li>
<li>
<p>Enter the <strong>purchase threshold</strong>. As soon as the available stock drops below this number the product is added to the advice.</p>
</li>
<li>
<p>Enter the <strong>purchase target</strong>. The advice then tops up to this number.</p>
</li>
<li>
<p>Click <strong>Save</strong>.</p>
</li>
</ol>
<p>Example: threshold 50, target 200. As soon as your available stock drops to 49, the system suggests reordering 151 units. If you leave both fields empty, the product is not included through this part. Expected sales and backorders keep working independently.</p>
<h3>Advice period and lead time</h3>
<p>The <strong>Expected sales</strong> part needs an advice period. You can choose from 14 days, 28 days, 3 months or a custom period. ShopLinkr looks at a product's average sales per day and calculates how much you need over that period.</p>
<p>If you switch on <strong>Include lead time</strong>, the supplier's lead time is added to the advice period. If you have an advice period of 14 days and a lead time of 3 days, the advice calculates with 17 days of expected sales. That way you don't run out of stock while your new purchase is still on its way.</p>
<p>The lead time comes from the product itself, or falls back to the default lead time from your company settings if it isn't filled in per product.</p>
<h3>Setting a minimum sales level</h3>
<p>You can set things up so that only products with a minimum number of sales are included (for example at least 3 sales per month). Slow movers and one off sales then automatically stay out of your advice, so you don't buy dead capital.</p>
<h3>Buying per box or minimum</h3>
<p>Have you set a <strong>minimum purchase quantity</strong> or a <strong>buy in multiples of</strong> on a product? Then the advice rounds to that automatically. For example: the calculated advice is 17 units, but you buy in boxes of 12. The advice then becomes 24 units (2 boxes). Because of this, advised quantities can differ slightly from a pure calculation.</p>
<h3>Reviewing and adjusting the advice</h3>
<p>On the advice detail page you see the advised quantity per line and the reason why the product was included.</p>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Reason</p>
</th>
<th>
<p>Meaning</p>
</th>
</tr>
<tr>
<td>
<p><strong>Cover backorders</strong></p>
</td>
<td>
<p>The product has open backorders that weigh the heaviest.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Stock below purchase threshold</strong></p>
</td>
<td>
<p>The available stock is below the set threshold.</p>
</td>
</tr>
<tr>
<td>
<p><strong>Restocking needed for target number of days</strong></p>
</td>
<td>
<p>The expected sales for the coming period are higher than what you currently have in stock.</p>
</td>
</tr>
</tbody>
</table>
</figure>
<p>You can still adjust lines, remove them or add your own before you turn the advice into deliveries.</p>
<h3>Turning into deliveries</h3>
<p>Happy with it? Then click <strong>Turn into deliveries</strong>. ShopLinkr automatically creates a delivery per supplier with the advised products and quantities. The deliveries appear in your regular <a href="/en/support/creating-a-delivery">deliveries overview</a> with the status <strong>Draft</strong> and are ready to order from your supplier.</p>
<h3>Good to know</h3>
<ul>
<li>
<p>The advice uses the <strong>available stock</strong>: that's the total stock minus the stock already reserved for orders.</p>
</li>
<li>
<p>For the <strong>Expected sales</strong> part, products need a filled in average sales figure. Products without sales history are not included through this part.</p>
</li>
<li>
<p>An <strong>empty advice</strong> means all products are above their threshold and nothing is expected. Switch on more parts or adjust your thresholds if you still want advice.</p>
</li>
<li>
<p>Advice is generated in the background. For large catalogs this can take a few minutes. You can click away and come back later.</p>
</li>
</ul>
