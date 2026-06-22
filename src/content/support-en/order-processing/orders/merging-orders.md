---
title: "Merging orders"
summary: "Combine multiple orders into a single package to save on shipping costs and speed up your warehouse process."
category: "order-processing"
categoryLabel: "Order processing"
subcategory: "orders"
subcategoryLabel: "Orders"
order: 26
lastUpdated: "2026-03-31"
translationKey: "bestellingen-samenvoegen"
---

<p>The merge function lets you combine several open orders into a single merged order. This comes in handy when the same customer has placed multiple orders that you want to ship together as one package. The original orders stay in place for your records, while the merged order is used for the warehouse process.</p>
<h3>When can you merge orders?</h3>
<p>Orders can be merged when they meet the following conditions:</p>
<ul>
<li>
<p>The orders have the status <strong>Open</strong>, <strong>Deferred</strong> or <strong>Backorder</strong></p>
</li>
<li>
<p>The orders are not already part of another merge</p>
</li>
<li>
<p>A merge may contain at most 1 Bol LVB order</p>
</li>
<li>
<p>Orders from different sales channels are allowed to be merged</p>
</li>
</ul>
<h3>How do you merge orders?</h3>
<p>There are two ways to merge orders:</p>
<h4>Via the detail page</h4>
<ol>
<li>
<p>Go to the detail page of an order</p>
</li>
<li>
<p>Click <strong>Merge order</strong> in the action menu</p>
</li>
<li>
<p>Search for and select the orders you want to merge</p>
</li>
<li>
<p>Choose which order is the <strong>primary order</strong> (this one determines the shipping address)</p>
</li>
<li>
<p>Click <strong>Merge orders</strong></p>
</li>
</ol>
<h4>Via a notification indicator</h4>
<p>ShopLinkr automatically detects when there are multiple open orders for the same delivery address. You will then see a blue icon next to the customer name in the order list, or a banner on the detail page. Click it to immediately carry out the merge with the matching orders.</p>
<h3>What happens after merging?</h3>
<ul>
<li>
<p>A new <strong>merged order</strong> is created</p>
</li>
<li>
<p>The order lines of all selected orders are combined per product (quantities are added together)</p>
</li>
<li>
<p>Stock is reallocated for the merged order</p>
</li>
<li>
<p>The original orders are temporarily hidden from the order list, but they remain in place</p>
</li>
<li>
<p>The merged order appears in the order list with a purple <strong>Merged</strong> badge</p>
</li>
</ul>
<h3>Automatic updating</h3>
<p>As long as the merged order is not yet being processed, it is updated automatically whenever a sales channel pushes changes to the original orders. This includes adding, removing or modifying products. That way the merged order always stays in sync with the original orders.</p>
<h3>Processing orders</h3>
<p>When you process the merged order, a shipping label is created. After that, all original orders are automatically processed through their own sales channel using the same track &amp; trace code. Once all original orders have been processed, the merged order is also marked as processed.</p>
<h3>Undoing a merge</h3>
<p>As long as the merged order has not yet entered processing (status Open, Deferred or Backorder), you can undo the merge:</p>
<ol>
<li>
<p>Go to the detail page of the merged order</p>
</li>
<li>
<p>Click <strong>Undo merge</strong> in the action menu</p>
</li>
<li>
<p>Confirm the action</p>
</li>
</ol>
<p>The original orders are restored and reappear in the order list.</p>
<h3>Frequently asked questions</h3>
<p><strong>Can I merge orders from different sales channels?</strong>
<br>
Yes, you can merge orders from, for example, Shopify and Bol into a single merged order.</p>
<p><strong>What happens if an original order is canceled?</strong>
<br>
The canceled order is automatically removed from the merge. If only one order is left, the entire merge is undone.</p>
<p><strong>Are changes to original orders updated automatically?</strong>
<br>
Yes, when a sales channel pushes changes (such as product or quantity changes), the merged order is recalculated automatically. This applies as long as the merged order is not yet being processed.</p>
<p><strong>What if an order is in backorder?</strong>
<br>
If there is not enough stock, the merged order gets the status Backorder. As soon as stock becomes available again, the status is updated automatically. This works the same way you are used to with regular orders.</p>
