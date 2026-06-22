---
title: "Creating a rule"
summary: "Set up a rule step by step with conditions and actions."
category: "order-processing"
categoryLabel: "Order processing"
subcategory: "rules"
subcategoryLabel: "Rules"
order: 36
lastUpdated: "2026-05-28"
translationKey: "een-regel-aanmaken"
---

<p>This article walks you through creating a rule in ShopLinkr step by step. If you're not yet familiar with the concept, start by reading <a href="/en/support/what-are-rules">What are rules?</a>.</p>
<h3>Step 1: Create the rule</h3>
<ol>
<li>
<p>Go to <strong>Settings &gt; Rules</strong>.</p>
</li>
<li>
<p>Click <strong>Create rule</strong>.</p>
</li>
<li>
<p>Give the rule a recognizable <strong>name</strong> (for example "PostNL for letterbox parcels" or "Delay Wadden Islands").</p>
</li>
<li>
<p>Optionally add a <strong>description</strong> so your colleagues understand what the rule does and what it's for.</p>
</li>
</ol>
<h3>Step 2: Set the conditions</h3>
<p>Conditions determine which orders the rule applies to. You can group and combine conditions.</p>
<ol>
<li>
<p>Click <strong>Add condition</strong>.</p>
</li>
<li>
<p>Choose the condition <strong>type</strong>. There are dozens of options to pick from, split across three categories:</p>
<ul>
<li>
<p><strong>Customer details (shipping)</strong>: name, email, address, country, postal code, Wadden Islands</p>
</li>
<li>
<p><strong>Customer details (billing)</strong>: the same fields as shipping, but for the billing address</p>
</li>
<li>
<p><strong>Order</strong>: sales channel, total weight, total amount, number of products, package type, specific product, tag, service point, shipping method, order date and more</p>
</li>
</ul>
</li>
<li>
<p>Choose an <strong>operator</strong> (equals, contains, is greater than, is empty, etc.).</p>
</li>
<li>
<p>Enter the <strong>value</strong> to compare against.</p>
</li>
</ol>
<p>You can add multiple conditions. Within a group you can set whether <strong>all</strong> conditions must match (AND) or whether <strong>one</strong> of the conditions is enough (OR).</p>
<h3>Step 3: Set the actions</h3>
<ol>
<li>
<p>Click <strong>Add action</strong>.</p>
</li>
<li>
<p>Choose which action should run when an order meets the conditions.</p>
</li>
<li>
<p>Fill in the relevant details. For "Add tags" you select which tags, for example, for "Delay" you choose the number of days or a specific date, and for "Mark as pickup order" there's nothing extra to fill in.</p>
</li>
</ol>
<p>You can add multiple actions to a rule. All actions run when the conditions match.</p>
<h3>Step 4: Save</h3>
<p>Click <strong>Save</strong>. The rule is active immediately and from now on is applied to every new order that meets the conditions.</p>
<h3>Good to know</h3>
<ul>
<li>
<p>Rules run in the order they're listed. For each rule you can set whether the following rules should still be checked after this rule has been applied.</p>
</li>
<li>
<p>Rules are only applied to new orders, not to existing orders.</p>
</li>
</ul>
