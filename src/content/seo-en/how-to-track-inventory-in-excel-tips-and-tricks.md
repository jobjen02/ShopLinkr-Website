---
title: "How to track inventory in Excel: tips and tricks"
excerpt: "Tracking inventory in Excel? Learn the right column setup, time-saving formulas, and smart tricks to keep your stock clear and avoid overselling."
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/hoe-voorraad-bijhouden-in-excel-tips-en-tricks/Xq0eC64USWLzKNmaavdG91IJyRc.png"
translationKey: "hoe-voorraad-bijhouden-in-excel-tips-en-tricks"
---

<p>For many small webshops and new sellers, tracking inventory in Excel is the obvious first step: it is free, flexible, and probably already on your computer. With a solid column structure, a few formulas, and a low-stock alert, you can keep your inventory firmly under control. Here is how to set it up and which tricks make the real difference.</p>

<h2>How to set up an inventory file in Excel</h2>
<p>A clear inventory file starts with a fixed column structure. Create a new workbook and give every column a clear header so you can later sort, filter, and calculate without clutter.</p>
<ol>
<li><strong>SKU</strong>: a unique code per product. This is your most important column, because everything links back to it.</li>
<li><strong>Product name and description</strong>: so you can find an item quickly.</li>
<li><strong>Purchase price and selling price</strong>: useful for your margin and inventory value.</li>
<li><strong>Quantity in stock</strong>: the current count you update with every sale or purchase.</li>
<li><strong>Minimum stock</strong>: the level at which you need to reorder.</li>
<li><strong>Supplier</strong>: so you know where to restock.</li>
</ol>
<p>Next, turn your data into a real Excel table through <strong>Insert, Table</strong>. A table automatically extends formulas to new rows and keeps your filters and sorting intact.</p>

<h2>Formulas and alerts that save you time</h2>
<p>The power of Excel lies in formulas that update themselves. A few you can use right away:</p>
<ul>
<li><strong>Inventory value per product</strong>: multiply purchase price by quantity in stock. At the bottom, add it up with <strong>SUM</strong> for your total inventory value.</li>
<li><strong>Automatic reorder alert</strong>: with <strong>IF</strong>, you can make a cell show "Reorder" as soon as the quantity drops below your minimum stock.</li>
<li><strong>Color highlighting</strong>: use <strong>conditional formatting</strong> to turn low counts red, so you can see at a glance what needs attention.</li>
<li><strong>Quick lookups</strong>: with <strong>XLOOKUP</strong> (or VLOOKUP), you can pull data for a SKU from another tab, for example when recording sales.</li>
</ul>
<p>Want to spot trends? Build a pivot table or a chart of your sales per month so you recognize seasonal peaks and slow movers, and adjust your purchasing accordingly.</p>

<h2>Common mistakes and the limits of Excel</h2>
<p>Excel works fine as long as you keep it tidy, but it has a few pitfalls. Avoid the most common ones:</p>
<ul>
<li><strong>Duplicate and inconsistent entries</strong>: define how you write a SKU and use data validation to prevent typos.</li>
<li><strong>Forgetting to update</strong>: counting down manually after every sale is error-prone and time-consuming.</li>
<li><strong>No backup</strong>: save to the cloud or keep versions, so a crash does not wipe out your records.</li>
</ul>
<p>The biggest limitation shows up the moment you sell on more than one channel. Sell through your own webshop and a marketplace at once, and your Excel count always lags behind reality. The result is overselling: you sell something that is already gone. One person updating a sheet still works, but a spreadsheet cannot sync stock across channels in real time.</p>

<h2>Frequently asked questions</h2>
<h3>Is Excel enough for my inventory?</h3>
<p>For a handful of products on a single channel, Excel is fine. Sell on multiple channels or process a lot of orders, and manual updates quickly become too error-prone. Inventory management software is then the logical next step.</p>
<h3>How do I prevent overselling with Excel?</h3>
<p>In Excel, you can only limit overselling by updating counts immediately after every sale. Preventing it completely takes <a href="/en/features/inventory">real-time inventory sync</a> that keeps your channels up to date automatically.</p>

<p>Outgrowing your spreadsheet? With ShopLinkr, you manage your <a href="/en/features/inventory">inventory</a> and <a href="/en/features/orders">orders</a> from all your channels in one place, with automatic sync so you never oversell again. <a href="https://app.shoplinkr.com/auth/register">Try ShopLinkr free for 14 days</a> and see how fast you get your inventory under control.</p>
