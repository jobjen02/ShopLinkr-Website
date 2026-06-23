---
title: "Effective inventory management with Excel"
excerpt: "How to set up inventory management in Excel: the columns, formulas, and alerts that matter, and when to switch to dedicated inventory software instead."
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/effectief-voorraadbeheer-met-excel/0BsQ5cmeZpg022G6ziNTWMS6jzI.png"
imageAlt: "Tracking inventory in an Excel spreadsheet"
translationKey: "effectief-voorraadbeheer-met-excel"
---

<p>Inventory management with Excel is a solid starting point: in one spreadsheet you track which products you carry, how many you have in stock, and when to reorder. A handful of formulas gives you real control over your inventory without buying new software. This article walks through how to set up that system, which formulas actually help, and when Excel starts working against you.</p>

<h2>Setting up an inventory file in Excel</h2>
<p>Start with a single tab that lists products as rows and your key data as columns. Keep it lean and only expand it when you genuinely need to.</p>
<ol>
<li><strong>SKU or item number</strong> as a unique key per product, so you never mix up two rows.</li>
<li><strong>Product name, purchase price, and selling price</strong>, so you can calculate margin and stock value later.</li>
<li><strong>Current stock</strong>, plus separate columns for incoming and outgoing quantities.</li>
<li><strong>Minimum stock</strong>: the level at which you want to reorder.</li>
<li><strong>Supplier and lead time</strong>, so you know how far ahead you need to order.</li>
</ol>
<p>Update this file consistently. One mistyped quantity or a missed sale, and your numbers no longer add up.</p>

<h2>Formulas that make your inventory smarter</h2>
<p>A few standard formulas take most of the work off your hands:</p>
<ul>
<li><strong>VLOOKUP</strong> to pull a product's name, price, or supplier straight from its SKU.</li>
<li><strong>A simple calculation</strong> (opening stock + received - sold) that updates your current stock automatically.</li>
<li><strong>Conditional formatting</strong> that turns a row red as soon as stock drops below the minimum, so you can see what to reorder at a glance.</li>
<li><strong>Pivot tables</strong> to spot which products move well and which ones sit on the shelf.</li>
</ul>
<p>If you want to go further, Power Query lets you combine data from multiple files. For most webshops that effort isn't worth it, though, because the real bottleneck lies elsewhere.</p>

<h2>When Excel starts working against you</h2>
<p>Excel works fine as long as you sell on one channel with a limited catalog. Sell across several channels at once and you run into its limits:</p>
<ul>
<li><strong>No real-time sync.</strong> If you sell the same product on bol and your own webshop, you have to update stock by hand in both. Forget one update and you sell the same item twice.</li>
<li><strong>Manual and error-prone.</strong> You type in every sale and delivery yourself. The busier it gets, the higher the chance of mistakes.</li>
<li><strong>No link to your process.</strong> Excel knows nothing about picking, shipping labels, or tracking. That stays separate work.</li>
</ul>
<p>At that point, inventory management software is the logical next step. <a href="/en/features/inventory">ShopLinkr syncs your stock in real time</a> across all your channels, so overselling can't happen anymore. Orders from bol, Shopify, WooCommerce, Kaufland, and other channels land in <a href="/en/features/orders">one central place</a>. From there you work with <a href="/en/features/pick-lists">pick lists and barcode scanning</a>, print <a href="/en/features/carriers">shipping labels</a> for PostNL, DPD, MyParcel, and Sendcloud, and the track &amp; trace is sent back to the sales channel automatically.</p>

<h2>Frequently asked questions</h2>
<h3>Is Excel good for inventory management?</h3>
<p>Yes. For a small catalog on a single channel, Excel works great and costs nothing. It gets tricky once you sell on multiple channels or several people update the stock.</p>
<h3>What are the biggest risks of inventory in Excel?</h3>
<p>Outdated numbers and human error. Because everything is manual, your stock is only correct if everyone enters every change right away. A single missed update can lead to a double sale or a missed order.</p>
<h3>When should I switch to inventory software?</h3>
<p>As soon as you sell on more than one channel, or you can no longer keep up with orders by hand. Software syncs your stock automatically and ties inventory, orders, and shipping together.</p>

<p>Feel free to start with Excel, but know when you outgrow it. If you want to manage inventory, orders, and shipping in one place, you can try ShopLinkr <a href="https://app.shoplinkr.com/auth/register">free for 14 days</a>. Not sure how to set things up? Take a look at our <a href="/en/guides">guides</a> or ask a question through <a href="/en/support">support</a>.</p>
