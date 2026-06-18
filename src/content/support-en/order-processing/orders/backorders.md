---
title: "Backorders"
summary: "What backorders are, how they are released automatically, and how the backorder release feature works."
category: "order-processing"
categoryLabel: "Order processing"
subcategory: "orders"
subcategoryLabel: "Orders"
order: 27
lastUpdated: "2026-05-28"
translationKey: "backorders"
---

<p>A backorder is an order that cannot be processed right away because there is not enough stock available at the correct location. The order automatically gets the status <strong>Backorder</strong> and is only released again once stock becomes available.</p>
<p>There are two ways backorders can arise and be resolved. It is important to understand the difference.</p>
<h3>Backorders due to missing stock</h3>
<p>The most common situation: a customer orders a product that has no stock available at that moment. This can happen, for example, if you have backorders enabled. Customers can then simply place an order, even when the product is out of stock.</p>
<p>In ShopLinkr you can set whether backorders are allowed at three levels:</p>
<ul>
<li>
<p><strong>Company-wide</strong>: a default setting that applies to all your products.</p>
</li>
<li>
<p><strong>Per sales channel</strong>: override the default setting for a specific sales channel.</p>
</li>
<li>
<p><strong>Per product</strong>: override the setting for an individual product.</p>
</li>
</ul>
<p>A setting at the product level always takes precedence over the sales channel, and the sales channel takes precedence over the company-wide setting.</p>
<h4>How are these backorders released?</h4>
<p>As soon as you replenish the product's stock again (for example, by <a href="/support/levering-ontvangen-en-verwerken">receiving a delivery</a>), the orders are released automatically. They then move from the status <strong>Backorder</strong> to <strong>Open</strong> and you can process them in the usual way. You do not need to do anything yourself for this.</p>
<h3>Backorders due to bulk location stock</h3>
<p>This situation is more specific. In ShopLinkr you can set that stock for orders may only be taken from <a href="/support/locatiebeheer">pick locations</a> and not from bulk locations. This is useful if you want to prevent order pickers from being sent to the bulk location.</p>
<p>If stock is available but only at a bulk location, the order still goes to the status <strong>Backorder</strong>. The stock is there, but not at the correct location in your warehouse.</p>
<h4>Releasing backorders</h4>
<p>For this situation you use the <strong>Release backorders</strong> feature. Here you move stock from a bulk location to a pick location so that the orders can be processed.</p>
<p>On the orders page, an orange <strong>Release backorders</strong> button appears in the top right as soon as there are backorders available for release. If there are no backorders, this button is not visible.</p>
<ol>
<li>
<p>Click the orange <strong>Release backorders</strong> button.</p>
</li>
<li>
<p>You now see an overview of products with backorders. For each product you can see at which bulk location the stock is available and how many orders you can release with it.</p>
</li>
<li>
<p>Move the stock from the bulk location to a pick location.</p>
</li>
</ol>
<p>Once the stock is at the pick location, the orders are released automatically and you can process them in the usual way.</p>
<h4>Good to know</h4>
<ul>
<li>
<p>When releasing, you can filter by sales channel and latest processing date.</p>
</li>
<li>
<p>This feature is specifically intended for the situation where stock is at a bulk location and needs to be moved to a pick location.</p>
</li>
</ul>
