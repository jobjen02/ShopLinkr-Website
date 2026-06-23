---
title: "Inventory management with Excel: a complete guide"
excerpt: "How to set up inventory management in Excel: the right columns, smart formulas, and a free template. Plus when it pays to switch to software."
publishedAt: "2024-05-18T00:00:00.000Z"
image: "/images/blog/voorraadbeheer-met-excel-een-complete-gids/BtA4mAWgXjgoMjQo4P6c5T2PaM.png"
imageAlt: "Inventory list in an Excel spreadsheet on a laptop"
translationKey: "voorraadbeheer-met-excel-een-complete-gids"
---

<p>For many webshops and sellers, inventory management with Excel is the obvious first step: a free, flexible spreadsheet you already know how to use. It works fine while your catalog stays small and clear. This guide walks you through building a workable inventory system, with the right columns and formulas, and shows you where Excel starts to hit its limits.</p>
<h2>Setting up an inventory list in Excel</h2>
<p>The foundation is a clean list where every row is one product. Keep it simple and consistent so your formulas and filters keep working.</p>
<ol>
<li><strong>Create columns</strong> for product name, SKU, location, quantity in stock, purchase price, and minimum stock (your reorder point).</li>
<li><strong>Use one row per product</strong> and apply the same format to every SKU. A single odd entry will break your lookups.</li>
<li><strong>Calculate stock value</strong> with a column for <code>=quantity*purchase price</code>, so you can see at a glance how much money is sitting in your warehouse.</li>
<li><strong>Flag low stock</strong> with conditional formatting: turn a row red the moment the quantity drops below your reorder point.</li>
</ol>
<p>You don't have to build the layout from scratch. Download our <a href="/en/inventory-excel-template" target="_blank">free Excel inventory management template</a> and adapt it to your own product range.</p>
<h2>Useful Excel formulas for your inventory</h2>
<p>A handful of formulas save you the most manual work. Use <strong>VLOOKUP</strong> to pull product details from a SKU, <strong>SUMIFS</strong> to total units sold per product, and <strong>IFERROR</strong> to hide error messages that clutter your list. A pivot table then summarizes your sales by product or by month, so you can see what moves fast and what stays on the shelf.</p>
<h2>Where Excel falls short</h2>
<p>Excel is static: it knows nothing about your sales. If you sell across multiple channels like bol, Shopify, or WooCommerce, you have to retype every stock change by hand. Miss one update and you sell something that's already gone. As your volume grows, that retyping eats more time and invites mistakes.</p>
<p>That's the point where a tool that tracks stock automatically makes more sense. <a href="https://shoplinkr.com/en">ShopLinkr</a> syncs your <a href="/en/features/inventory">inventory</a> in real time across every channel, so you never oversell again. Your <a href="/en/features/orders">orders</a> land in one place, you pack them with <a href="/en/features/pick-lists">pick lists</a>, and you print shipping labels for <a href="/en/features/carriers">carriers</a> like PostNL and DPD. Track and trace flows back to the sales channel automatically.</p>
<h2>Frequently asked questions</h2>
<h3>Can I manage my entire inventory in Excel?</h3>
<p>For a small, clear catalog on a single channel, Excel works fine. Once you sell on several channels or your order volume climbs, manual updates become error-prone and take too much time.</p>
<h3>How do I avoid losing my inventory file?</h3>
<p>Keep the file in the cloud, back it up regularly, and limit who can make changes. That keeps one bad edit from wrecking your whole list.</p>
<h3>When should I switch to inventory software?</h3>
<p>As soon as you connect multiple channels, work with variants or bundles, or lose time to retyping. At that point, automation pays for itself quickly.</p>
<p>By all means start with Excel and the free template. Outgrowing that single spreadsheet? <a href="https://app.shoplinkr.com/auth/register">Try ShopLinkr free for 14 days</a> and manage your inventory and orders in one place from now on.</p>
