---
title: "Location management"
summary: "Set up locations in your warehouse for faster picking and a better stock overview."
category: "inventory-management"
categoryLabel: "Inventory management"
subcategory: "locations"
subcategoryLabel: "Locations"
order: 53
lastUpdated: "2026-06-01"
translationKey: "locatiebeheer"
---

<p>Location management lets you set up the spots in your warehouse where your products are stored. This helps you pick faster and more efficiently, and gives you a clear overview of your stock.</p>
<h3>What are warehouse locations?</h3>
<p>A warehouse location is a physical spot in your warehouse where a product is stored. For example:</p>
<ul>
<li>
<p>Aisle A - Rack 1 - Shelf 3 - Bin 2</p>
</li>
<li>
<p>Aisle B - Rack 2 - Shelf 1 - Bin 12</p>
</li>
</ul>
<p>In ShopLinkr you can create these locations yourself and link products to them.</p>
<h3>Creating a location</h3>
<ol>
<li>
<p>Go to <strong>Locations</strong> in the menu.</p>
</li>
<li>
<p>Click <strong>Add location</strong>.</p>
</li>
<li>
<p>Give the location a name (for example "Aisle A" or "Rack 1").</p>
</li>
<li>
<p>Want to nest the location under an existing one? Then select the <strong>parent location</strong>.</p>
</li>
<li>
<p>Click <strong>Save</strong>.</p>
</li>
</ol>
<h3>Hierarchical locations</h3>
<p>You can build a hierarchy of locations. This means you can, for example, first create an aisle, then racks within it, and then bins or shelves within those. This hierarchy makes it easy to organize your warehouse logically, especially when you have a lot of products.</p>
<p>Example structure:</p>
<pre><code>Aisle A
├── Rack 1
│   ├── Shelf 1
│   │   ├── Bin 1 (A.1.1.1)
│   │   ├── Bin 2 (A.1.1.2)
│   │   ├── Bin 3 (A.1.1.3)
│   │   └── Bin 4 (A.1.1.4)
│   ├── Shelf 2
│   │   ├── Bin 1 (A.1.2.1)
│   │   └── Bin 2 (A.1.2.2)
│   └── Shelf 3
│       └── Bin 1 (A.1.3.1)
└── Rack 2
    └── Shelf 1
        ├── Bin 1 (A.2.1.1)
        └── Bin 2 (A.2.1.2)</code></pre>
<h3>Pick and bulk locations</h3>
<p>In ShopLinkr you can mark locations as a <strong>pick location</strong> or a <strong>bulk location</strong>:</p>
<ul>
<li>
<p><strong>Pick locations</strong>: these are the locations your warehouse staff pick products from when processing orders. They are usually in an easily accessible spot.</p>
</li>
<li>
<p><strong>Bulk locations</strong>: these are locations where you store larger quantities of stock, for example on pallets or in higher racks. Products on bulk locations are not picked directly for orders.</p>
</li>
</ul>
<p>This distinction is useful if you want to avoid sending order pickers to hard to reach spots. In your <a href="/en/support/company-settings">company settings</a> you can set orders to go to <a href="/en/support/backorders">backorder</a> when stock is only available on a bulk location.</p>
<h3>Linking products to locations</h3>
<p>Once you have created locations, you can link products to a specific spot. There are several ways to do this:</p>
<ul>
<li>
<p>From the product overview</p>
</li>
<li>
<p>While <a href="/en/support/stock-counts">counting stock</a></p>
</li>
<li>
<p>From the location itself</p>
</li>
<li>
<p>Through <strong>Tools &gt; Assign locations</strong> to link multiple products to locations at once (handy when you are setting up your warehouse with ShopLinkr)</p>
</li>
</ul>
<p>You can place multiple products on the same location, or a single product on multiple locations (for example when you have a lot of stock and store it in different spots).</p>
<h3>Where do you see the locations?</h3>
<p>The product overview shows you exactly which locations a product is stored at and how many units are available per location. The location is also shown while <a href="/en/support/working-with-pick-lists">picking</a>, so the warehouse employee immediately knows where to find the product.</p>
