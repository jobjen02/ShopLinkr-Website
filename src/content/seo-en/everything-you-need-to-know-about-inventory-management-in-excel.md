---
title: "Everything you need to know about inventory management in Excel"
excerpt: "Inventory management in Excel: how to set up a working file, which formulas to use, and where it breaks down once you sell across multiple channels."
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel/xPetkMNxhNucwbYD53Kn8BMNyE.png"
translationKey: "alles-wat-je-moet-weten-over-voorraadbeheer-in-excel"
---

<p>Inventory management in Excel is the logical first step for many new webshops: it costs nothing extra, you already know the program, and you can set up your sheet exactly how you want. Below you'll learn how to build a working inventory file, which formulas save you time, and the point at which Excel starts working against you once you sell seriously.</p>

<h2>Setting up an inventory file in Excel</h2>
<p>Start with a fresh worksheet where every row is one product and every column is one data point. A solid starting layout looks like this:</p>
<ol>
<li><strong>SKU</strong>: a unique code per product so you never mix two items up.</li>
<li><strong>Product name</strong>, and optionally a category or brand.</li>
<li><strong>Purchase price</strong> and <strong>sales price</strong>, so your margin is visible.</li>
<li><strong>Stock</strong>: the current quantity on the shelf.</li>
<li><strong>Minimum stock</strong>: the level at which you need to reorder.</li>
</ol>
<p>Keep one tab for the inventory itself and use separate tabs for purchasing and sales. That keeps your main overview clean and lets you trace every change.</p>

<h2>Formulas that save you time</h2>
<p>The real payoff comes from a handful of standard functions. These let your sheet calculate for you instead of tracking everything by hand:</p>
<ul>
<li><strong>SUM</strong> calculates total inventory value by adding up purchase price times quantity.</li>
<li><strong>VLOOKUP</strong> (or the newer XLOOKUP) pulls product details by SKU, handy on your purchasing and sales tabs.</li>
<li><strong>Conditional formatting</strong> turns a row red the moment stock drops below your minimum.</li>
<li><strong>Data validation</strong> forces entries to match an existing category or SKU, which prevents typos.</li>
</ul>
<p>When you copy formulas, watch out for absolute references with a dollar sign ($A$2), otherwise your ranges shift unnoticed and your totals stop adding up.</p>

<h2>Where Excel starts working against you</h2>
<p>Excel is fine as long as one person tracks one inventory. It falls apart the moment you sell across multiple channels. A manual file is never updated in real time, so you sell a product on your webshop while it's already gone on a marketplace. That overselling costs you canceled orders and bad reviews. On top of that, a single broken formula or a wrong paste can quietly make your entire overview unreliable.</p>
<p>That's the point where you move to software that guards your stock for you. <a href="https://shoplinkr.com/en/features/inventory">ShopLinkr syncs your inventory in real time</a> across all your sales channels, like bol, Shopify, and WooCommerce, so overselling can't happen anymore. You also get stock forecasting, <a href="https://shoplinkr.com/en/features/pick-lists">pick lists with a smart warehouse route</a>, and reports on margin, dead stock, and stock value, the kind of things you'd have to rebuild by hand in Excel every time.</p>

<h2>Frequently asked questions</h2>
<h3>Is Excel enough for inventory management?</h3>
<p>For a small inventory on a single sales channel, Excel works fine. Once you sell across multiple channels or your order volume grows, tracking by hand becomes error-prone and too slow.</p>
<h3>How do I prevent errors in my inventory file?</h3>
<p>Use data validation for entries, check your formulas with Excel's auditing tools, and update your stock at fixed moments. A second pair of eyes on your formulas helps too.</p>

<p>Hitting the limits of Excel? With <a href="https://app.shoplinkr.com/auth/register">a 14-day free ShopLinkr trial</a> you can see what it's like to manage your inventory and orders in one central place, without the risks of a manual sheet.</p>
