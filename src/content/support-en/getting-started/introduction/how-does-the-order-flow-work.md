---
title: "How does the order flow work?"
summary: "Understand how an order moves through ShopLinkr, from the moment it comes in to the moment it ships."
category: "getting-started"
categoryLabel: "Getting started"
subcategory: "introduction"
subcategoryLabel: "Introduction"
order: 1
lastUpdated: "2026-05-28"
translationKey: "hoe-werkt-de-orderflow"
---

<p>Every order goes through a number of steps in ShopLinkr, from the moment it comes in to the moment the parcel goes out the door. Below we explain each step.</p>
<h3>The steps</h3>
<h4>Step 1: The order is synced</h4>
<p>As soon as a customer places an order in your webshop or on a marketplace, it is automatically synced to ShopLinkr. The order is given the status <strong>Syncing</strong>.</p>
<h4>Step 2: The order is open</h4>
<p>After a successful sync, the order is validated. If everything checks out, the order is given the status <strong>Open</strong> and is ready to be processed. Not enough stock? Then the order is automatically given the status <a href="/support/backorders"><strong>Backorder</strong></a>.</p>
<h4>Step 3: Picking</h4>
<p>When you create a <a href="/support/wat-zijn-picklijsten">pick list</a> and add the order to it, the status changes to <strong>Picking</strong>. This means the products are being collected from the warehouse. Once all products have been picked, the status changes to <strong>Picked</strong>.</p>
<h4>Step 4: Packing and shipping</h4>
<p>After picking, the products are packed at a <a href="/support/inpakstations-instellen">packing station</a>. Here the shipping label is generated and, if set up, automatically printed via <a href="/support/auto-print-instellen">AutoPrint</a>. The order is given the status <strong>Processing</strong>.</p>
<h4>Step 5: Completed</h4>
<p>As soon as the parcel has been shipped, the order is marked as <strong>Completed</strong>. The stock is permanently deducted and the order is finished.</p>
<h3>Overview of all statuses</h3>
<figure>
<table>
<tbody>
<tr>
<th>
<p>Status</p>
</th>
<th>
<p>Meaning</p>
</th>
</tr>
<tr>
<td>
<p><strong>Syncing</strong></p>
</td>
<td>
<p>Order is being fetched from the sales channel</p>
</td>
</tr>
<tr>
<td>
<p><strong>Pending</strong></p>
</td>
<td>
<p>Order has been received and is being validated</p>
</td>
</tr>
<tr>
<td>
<p><strong>Open</strong></p>
</td>
<td>
<p>Order is ready to be processed</p>
</td>
</tr>
<tr>
<td>
<p><strong>Picking</strong></p>
</td>
<td>
<p>Products are being collected in the warehouse</p>
</td>
</tr>
<tr>
<td>
<p><strong>Picked</strong></p>
</td>
<td>
<p>All products have been collected</p>
</td>
</tr>
<tr>
<td>
<p><strong>Processing</strong></p>
</td>
<td>
<p>Order is being packed and prepared</p>
</td>
</tr>
<tr>
<td>
<p><strong>Postponed</strong></p>
</td>
<td>
<p>Processing has been temporarily paused</p>
</td>
</tr>
<tr>
<td>
<p><strong>Completed</strong></p>
</td>
<td>
<p>Order has been shipped and finished</p>
</td>
</tr>
<tr>
<td>
<p><strong>Cancelled</strong></p>
</td>
<td>
<p>Order has been cancelled</p>
</td>
</tr>
<tr>
<td>
<p><strong>Backorder</strong></p>
</td>
<td>
<p>Insufficient stock, waiting for replenishment</p>
</td>
</tr>
</tbody>
</table>
</figure>
<h3>
<br>
</h3>
<h3>Special situations</h3>
<h4>Postponing an order</h4>
<p>With the <a href="/support/bestelling-uitstellen">postpone function</a> you temporarily park an order so that it no longer sits among your open orders. That way, your overview of open orders only contains the orders you need to process right away.</p>
<p>When postponing, you can optionally enter a reason and a date. If you enter a date, the order automatically returns to the status <strong>Open</strong> at that moment and you can process it the regular way. If you do not enter a date, the order stays postponed until you resume it manually.</p>
<h4>Marking as high priority</h4>
<p>You can <a href="/support/bestelling-markeren-als-hoge-prioriteit">mark urgent orders as high priority</a>. These orders get a visual indicator so it is immediately clear that they take precedence. In addition, they are added to a pick list first, so they are processed with priority.</p>
<h4>Cancelling an order</h4>
<p>If an order no longer needs to be shipped, you can <a href="/support/bestelling-annuleren">cancel</a> it. The reserved stock is then released again.</p>
