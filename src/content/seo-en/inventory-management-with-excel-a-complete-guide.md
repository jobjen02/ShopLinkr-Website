---
title: "Inventory management with Excel: a complete guide"
excerpt: "How to set up inventory management in Excel: the right columns, smart formulas, and a free template. Plus when it pays to switch to software."
author: "Stijn Verhagen"
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/voorraadbeheer-met-excel-een-complete-gids/BtA4mAWgXjgoMjQo4P6c5T2PaM.png"
imageAlt: "Inventory list in an Excel spreadsheet on a laptop"
translationKey: "voorraadbeheer-met-excel-een-complete-gids"
---

<p><strong>Inventory management with Excel starts with a clean list where every row is one product, with columns for SKU, quantity, and reorder point. Formulas like VLOOKUP and SUMIFS plus conditional formatting keep it up to date. For a small catalog on a single channel it works fine; with multiple channels you hit its limits.</strong></p>

<p>For many webshops and sellers, inventory management with Excel is the obvious first step: a free, flexible spreadsheet you already know how to use. It works fine while your catalog stays small and clear. This guide walks you through building a workable inventory system, with the right columns and formulas, and shows you where Excel starts to hit its limits.</p>
<h2>Setting up an inventory list in Excel</h2>
<p>The foundation is a clean list where every row is one product. Keep it simple and consistent so your formulas and filters keep working.</p>
<ol>
<li><strong>Create columns</strong> for product name, SKU, location, quantity in stock, purchase price, and minimum stock (your reorder point). Add separate columns for <strong>incoming</strong> and <strong>outgoing</strong> quantities, and for supplier and lead time, so you know how far ahead to reorder.</li>
<li><strong>Use one row per product</strong> and apply the same format to every SKU. A single odd entry will break your lookups.</li>
<li><strong>Convert your list into an Excel table</strong> (Insert, Table). Formulas, formatting, and filters then extend to new rows automatically, so nothing falls out of your ranges as your catalog grows.</li>
<li><strong>Add data validation</strong> to columns like category or supplier, so every entry is picked from a fixed list. That one setting stops the typos that quietly break your filters and lookups. Apply data filters to the header row too, so you can sort by supplier, category, or stock level in one click.</li>
<li><strong>Calculate stock value</strong> with a column for <code>=quantity*purchase price</code>. To keep current stock up to date automatically, calculate it with <code>opening stock + received - sold</code>.</li>
<li><strong>Flag low stock</strong> with conditional formatting (turn a row red when the quantity drops below your reorder point), or use an <strong>IF</strong> formula so a cell shows "Reorder" the moment stock falls below your minimum.</li>
</ol>
<p>As your catalog grows, use separate tabs per product category or warehouse location, or one tab for the inventory itself and separate tabs for purchasing and sales. That keeps your main overview clean and saves you scrolling through hundreds of rows.</p>
<p>You don't have to build the layout from scratch. Download our <a href="/en/inventory-excel-template" target="_blank">free Excel inventory management template</a> and adapt it to your own product range.</p>
<h2>Useful Excel formulas for your inventory</h2>
<p>A handful of formulas save you the most manual work. Use <strong>VLOOKUP</strong> to pull product details from a SKU, <strong>SUMIFS</strong> to total units sold per product, and <strong>IFERROR</strong> to hide error messages that clutter your list. A pivot table then summarizes your sales by product or by month, so you can see what moves fast and what stays on the shelf.</p>
<p>Alongside <strong>SUM</strong>, functions like <strong>COUNT</strong> and <strong>AVERAGE</strong> let you count your SKUs and work out your average margin, and <strong>SUMPRODUCT</strong> of stock times purchase price gives your total inventory value in a single cell. When you copy a formula down your list, lock the ranges it points to with absolute references (a dollar sign, like <code>$A$2</code>). Skip that and your ranges shift row by row, so your totals stop adding up without any visible error.</p>
<p>Add your supplier's average lead time next to each product's minimum stock. Together they give you a simple reorder signal, so you restock early enough that you never have to tell a customer an item is out. To combine data from several files, Power Query can merge them into one overview, though for most webshops that effort isn't worth it, because the real bottleneck is the lack of real-time sync, not the formulas.</p>
<h2>Common mistakes to avoid</h2>
<p>Excel works fine as long as you keep it tidy. Steer clear of the most common pitfalls:</p>
<ul>
<li><strong>Duplicate or inconsistent entries.</strong> Decide how you write a SKU and enforce it with data validation, so the same product never shows up twice.</li>
<li><strong>Forgetting to update.</strong> Counting down by hand after every sale is easy to skip, and quickly leaves your numbers wrong.</li>
<li><strong>No backup.</strong> A spreadsheet keeps no automatic version history of its own, so save to the cloud or keep versions, so a crash doesn't wipe out your records.</li>
</ul>
<h2>Where Excel falls short</h2>
<p>Excel is static: it knows nothing about your sales. If you sell across multiple channels like bol, Shopify, or WooCommerce, you have to retype every stock change by hand. Miss one update and you sell something that's already gone. As your volume grows, that retyping eats more time and invites mistakes.</p>
<p>That's the point where a tool that tracks stock automatically makes more sense. <a href="https://www.shoplinkr.com/en">ShopLinkr</a> syncs your <a href="/en/features/inventory">inventory</a> in real time across every channel, so you never oversell again. Your <a href="/en/features/orders">orders</a> land in one place, you pack them with <a href="/en/features/pick-lists">pick lists</a>, and you print shipping labels for <a href="/en/features/carriers">carriers</a> like PostNL and DPD. Track and trace flows back to the sales channel automatically.</p>
<p>Calculations you would rebuild by hand in Excel come ready to use, like <a href="/en/features/purchase-advice">purchase advice per supplier</a> and <a href="/en/features/reports">reports on revenue and margin per product</a>.</p>
<h2>Frequently asked questions</h2>
<h3>Can I manage my entire inventory in Excel?</h3>
<p>For a small, clear catalog on a single channel, Excel works fine. Once you sell on several channels or your order volume climbs, manual updates become error-prone and take too much time.</p>
<h3>Is inventory management in Excel free?</h3>
<p>Yes. If you already have Excel, or a free alternative like Google Sheets, a stock list costs nothing. The hidden costs sit in the time manual updates take and in mistakes such as overselling.</p>
<h3>How do I prevent errors in my inventory file?</h3>
<p>Use data validation for entries, check your formulas with Excel's auditing tools, and update your stock at fixed moments instead of ad hoc. A second pair of eyes on your formulas catches the rest.</p>
<h3>What are the biggest risks of inventory in Excel?</h3>
<p>Outdated numbers and human error. Because every change is manual, your stock is only correct if everyone enters every sale and delivery right away. A single missed update leads to a double sale or a missed order.</p>
<h3>What is the difference with inventory software?</h3>
<p>Software works in real time, connects directly to your sales channels and carriers, and automates the pick and ship process. A spreadsheet does all of that by hand, and for each channel separately.</p>
<h3>How do I prevent overselling with Excel?</h3>
<p>In Excel you can only limit overselling by updating counts immediately after every sale. Preventing it entirely takes <a href="/en/features/inventory">real-time inventory sync</a> that keeps all your channels up to date automatically.</p>
<h3>How do I avoid losing my inventory file?</h3>
<p>Keep the file in the cloud, back it up regularly, and limit who can make changes. That keeps one bad edit from wrecking your whole list.</p>
<h3>When should I switch to inventory software?</h3>
<p>As soon as you connect multiple channels, work with variants or bundles, or lose time to retyping. At that point, automation pays for itself quickly.</p>
<p>By all means start with Excel and the free template. Outgrowing that single spreadsheet? Take a look at our <a href="/en/guides">guides</a>, ask a question through <a href="/en/support">support</a>, or <a href="https://app.shoplinkr.com/auth/register">try ShopLinkr free for 14 days</a> and manage your inventory and orders in one place from now on.</p>
