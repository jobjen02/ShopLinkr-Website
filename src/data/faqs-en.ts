export interface FaqItem {
    question: string;
    answer: string;
}

// Single source of truth voor alle FAQ's. Wordt gebruikt door de losse
// functionaliteitenpagina's en door de gebundelde /veelgestelde-vragen hub.
export const faqsByPageEn: Record<string, Array<FaqItem>> = {
    voorraad: [
        {
            question: "Can I see why a product's stock level changed?",
            answer: "Yes. Every product has a complete stock history that logs each movement: sales, picks, returns, deliveries, manual corrections and stock counts. For every movement you can see the reason, the old and new quantity, the location, the date and who made the change.",
        },
        {
            question: "Can competitors see how much stock I have?",
            answer: "Not if you use fictional stock. You set a fixed number (for example 400) plus a threshold (for example 20). As long as your real stock stays above the threshold, ShopLinkr sends the fictional number to your channels. When your stock drops below the threshold, ShopLinkr automatically switches to your actual numbers, so you never sell a product you don't have.",
        },
        {
            question: "What happens to stock when there's a return?",
            answer: "While processing a return, you tick per item whether it should go back into stock and pick the location. ShopLinkr updates the stock and syncs the change straight to the linked channel.",
        },
    ],
    producten: [
        {
            question: "How does ShopLinkr handle variants of the same product, such as sizes or colours?",
            answer: "You group those products into a variant group. Each variant stays an independent product with its own EAN, stock and listing, but in the product overview you see the main product with the combined stock and the number of variants. A product can only belong to one variant group at a time.",
        },
        {
            question: "What happens to bundle stock if I sell a single component?",
            answer: "Bundle stock always follows the scarcest component. If you sell a component on its own, the bundle stock drops along with it, so you never offer more bundles than you can put together. A product can appear in several bundles at once and stays sellable on its own as well.",
        },
        {
            question: "Does ShopLinkr also work for products I sell by weight or length, such as kibble or fabric?",
            answer: "Yes, with stock sources. You track the base stock in kilos, metres or litres and link variants like 500 grams or 1 metre to that source. With every sale the right quantity is deducted from the source, and ShopLinkr calculates how much is still available per variant.",
        },
        {
            question: "Does a bundle automatically get unlimited stock if all of its sub-products have it?",
            answer: "Yes. As soon as every sub-product in the bundle is set to unlimited stock, the bundle gets that status automatically. You don't have to set it manually. If one of the sub-products returns to normal stock, the bundle loses that status again too.",
        },
        {
            question: "Can the same product be in several bundles at once?",
            answer: "Yes. A sub-product can appear in several bundles at once, and you decide per bundle how many of it go in. Each bundle works out its availability independently based on the shared stock, so the numbers always stay in balance.",
        },
        {
            question: "Are bundles included in a stock count?",
            answer: "No. A bundle is derived from its sub-products and has no physical stock of its own. During a stock count you only count the individual products. The bundle stock is then automatically recalculated based on the counted quantities.",
        },
        {
            question: "What happens if I archive a product that's in a bundle or variant group?",
            answer: "The product is unlinked from bundles. If it's in a variant group, ShopLinkr automatically assigns another product as the main product. If the product later comes back in through a channel, ShopLinkr restores it based on the EAN code.",
        },
    ],
    bestellingen: [
        {
            question: "Can I combine orders from different sales channels?",
            answer: "Yes. Has a single customer placed an order on both Bol and Shopify? Then you merge them into one shipment. ShopLinkr flags that there are multiple open orders for the same delivery address and offers the merge right away.",
        },
        {
            question: "Can I also create phone orders or B2B shipments in ShopLinkr?",
            answer: "Yes, with manual shipments. You fill in the customer details and the delivery address, choose a carrier, and ShopLinkr generates the shipping label. The shipment doesn't have to be linked to an order from your sales channel.",
        },
        {
            question: "What happens if a customer orders something that's out of stock?",
            answer: "The order automatically gets the status <strong>Backorder</strong> and waits for stock. As soon as you receive a delivery and replenish the stock, the order automatically moves to <strong>Open</strong> and you can process it the usual way. You can turn backorders on or off per company, per sales channel or per product.",
        },
        {
            question: "Which carriers are supported?",
            answer: "ShopLinkr supports PostNL, DPD and GLS among others. You link as many carriers as you need and pick the right one per order. <a href=\"/integraties\">See the full list on the integrations page</a>.",
        },
    ],
    picklijsten: [
        {
            question: "When should I choose single orders, a picking list without bins or a picking list with bins?",
            answer: "Do you have lots of orders with just one product? Then you filter for single orders separately and process them in bulk. A picking list without bins works fine for smaller batches where you collect everything in one big bin, or simply when you don't have the space to work with separate bins. For larger volumes or orders with multiple products, bins give you that extra bit of control that prevents mistakes.",
        },
        {
            question: "Does AutoPrint work with any printer?",
            answer: "AutoPrint works with practically any printer and recognises your devices automatically as soon as you install the connection. You link each printer to a packing station, so the labels are always printed in the right place. For Zebra printers we recommend ZPL mode.",
        },
        {
            question: "What are bins and when is it worth using them?",
            answer: "Bins are physical crates with a unique barcode that you link to an order while picking. You create them in bulk through the wizard and print the barcode labels from ShopLinkr. Do you work with orders that consist of multiple products, or do you pick in larger batches? Then bins prevent products from ending up in the wrong box.",
        },
        {
            question: "What hardware do I need to be able to pick?",
            answer: "A handheld scanner. At each step you see which product to grab and where it is in your warehouse, and after every successful scan the next product appears. A phone or computer works fine for displaying the picking list, but for the scans themselves you need a real handheld scanner. We can supply these from stock and set them up the right way for you straight away, just get in touch with our support team for this.",
        },
        {
            question: "How do I set up a fixed filter combination for recurring picking rounds?",
            answer: "Go to Picking lists, click Generate picking list and set the filters you use often, for example sales channel, parcel type and location. Click Saved filters in the top right and then Save filters, give the set a recognisable name like \"Letterbox parcels webshop\" and save. Next time the combination is ready as a quick choice for your whole team.",
        },
    ],
    leveringen: [
        {
            question: "Can you create a delivery from a purchasing advice?",
            answer: "Yes. Based on your stock, backorders and expected sales, the purchasing advice calculates what you should order per supplier. Happy with the advice? Then you turn it into deliveries in a single click. ShopLinkr creates a delivery per supplier with the advised products and quantities, with status <strong>Draft</strong> and ready to order.",
        },
        {
            question: "How do you process a delivery where you receive less than you ordered?",
            answer: "While receiving, you fill in the actual quantity per line. The difference stays listed under Expected, so you can still receive it later if more comes in. Do you close off the delivery while there are still open items? Then you'll find them under Not received.",
        },
        {
            question: "What happens to backorders as soon as you receive a delivery?",
            answer: "Backorders for products in the delivery are automatically released as soon as you receive the stock. The orders jump back to <strong>Open</strong> and you can simply pick and ship them. You don't have to go through all the backorders yourself first.",
        },
        {
            question: "Can you undo a receipt?",
            answer: "Yes. If you accidentally received a product or chose the wrong location, you can undo the receipt. The stock is written back off the location, so you can receive the product again.",
        },
        {
            question: "How do you link a delivery to a specific warehouse location?",
            answer: "Per received line you choose the location the product goes to. That way you can split a delivery across multiple locations or zones in your warehouse. Every receipt is recorded as a stock movement with the reason Delivery received, so you can later see exactly which units went to which location.",
        },
    ],
    retouren: [
        {
            question: "How do returns come into ShopLinkr?",
            answer: "Returns come into ShopLinkr automatically from your linked sales channel. You process them in one place, and the status and stock then go back to the channel automatically.",
        },
        {
            question: "Can I decide per item whether it goes back into stock?",
            answer: "Yes, you decide that per item. With the Add to stock toggle you put a product back into the sellable stock and choose the warehouse location, per sub-product for bundles. If you leave that toggle off, the item doesn't count as sellable.",
        },
        {
            question: "Can I add photos to a return?",
            answer: "Yes, you add photos per return item. Handy as evidence for damaged or incomplete returns, for example in a dispute with a customer or to record internally what state a product arrived in.",
        },
        {
            question: "What happens to the status on the sales channel?",
            answer: "As soon as you process a return, ShopLinkr syncs the processing back to your sales channel automatically. You don't have to log in separately for that. At the same time your stock is adjusted, so every linked channel immediately shows the right numbers.",
        },
    ],
    vervoerders: [
        {
            question: "Which carriers are supported?",
            answer: "All the well-known carriers and shipping platforms, such as PostNL, DPD and GLS. You link as many as you need and pick the right one per order. <a href=\"/integraties\">See the full list and the connection instructions on the integrations page</a>.",
        },
        {
            question: "Can you link multiple accounts from the same carrier?",
            answer: "Yes. For each connection you enter your own login details or API keys, so you can link two DPD contracts or several Sendcloud accounts side by side, for example. Handy if you work with different shipping locations or brands that each have their own contract.",
        },
        {
            question: "What exactly does AutoPrint do?",
            answer: "AutoPrint sends shipping labels to the printer at your packing station automatically as soon as you process an order. For that we use PrintNode, a software tool you install on a computer in your warehouse. PrintNode runs in the background and picks up every new label, so you no longer have to click print per order. <a href=\"/support/auto-print-instellen\">Read how to set up AutoPrint</a>.",
        },
        {
            question: "Can you choose a different carrier per order?",
            answer: "Yes. As long as the carrier is linked, you choose which one to use per order. Don't want to do that manually? With our <a href=\"/support/wat-zijn-regels\">rules feature</a> you let ShopLinkr select the right carrier automatically based on weight, destination, channel or product type.",
        },
        {
            question: "What if your carrier isn't on the list?",
            answer: "Let us know. We expand the connections regularly and are happy to look into whether we can add your carrier. Often it already works through a shipping platform like Sendcloud, MyParcel or ParcelPro: one connection gives you access to dozens of carriers.",
        },
    ],
    locatiebeheer: [
        {
            question: "How deep does the location hierarchy go?",
            answer: "As deep as your warehouse needs. You create a location and optionally choose a parent location. A common structure is aisle, rack, shelf and bin, possibly with a zone as the top level. You link products to the bottom layer, so your picker can see right away where to go.",
        },
        {
            question: "What's the difference between a pick location and a bulk location?",
            answer: "A pick location is the spot you pick from daily, usually easy to reach and close to the packing station. A bulk location holds larger quantities on pallets or in tall racks. ShopLinkr takes from the pick location first and only moves on to the bulk location once it's empty. That keeps your warehouse moving without sending pickers to hard-to-reach spots.",
        },
        {
            question: "What if a product is stored in multiple locations?",
            answer: "No problem. A product can be in several locations at once, for example a few units at the pick location and the rest in bulk. In the product overview you see how many units are in each location, and on the picking list your picker is shown the right location based on the picking order.",
        },
        {
            question: "Do I also see the location while processing an order?",
            answer: "Yes. On the orders page each line shows the product's location, on the picking list you see where every product is, and in the product overview each location shows how many units are available. Whether you process individual orders or put together a round, your picker knows right away where to go.",
        },
        {
            question: "How do I move stock from one location to another?",
            answer: "Open the product, click Update stock and choose Move. Select the source location, the destination location and the number of units. Want to move everything? Then turn on the 'Move all stock' toggle. The move appears in the product's stock movements straight away.",
        },
    ],
    inkoopadvies: [
        {
            question: "What period does the purchasing advice calculate over?",
            answer: "Under the Expected sales section you choose the advice period: 14 days, 28 days, 3 months or a custom period. ShopLinkr takes a product's average daily sales and works out how much you need over that period. The Smart purchasing quick choice combines that forecast with backorders, thresholds and your supplier's lead time.",
        },
        {
            question: "Does the advice take my supplier's lead time into account?",
            answer: "Yes, if you turn on the Include lead time section. The lead time is then added to the advice period. If you have a 14-day advice period and a 3-day lead time, the advice calculates with 17 days of expected sales. The lead time comes from the product itself, or falls back to the default lead time from your company settings.",
        },
        {
            question: "Does the purchasing advice also work if I buy by the box or in fixed multiples?",
            answer: "Yes. Have you set a minimum purchase quantity or a multiple on a product? Then the advice automatically rounds up to it. A calculated advice of 17 units, with boxes of 12, becomes 24 units. The advised quantity can therefore differ slightly from a pure calculation.",
        },
        {
            question: "What's the difference with stock notifications?",
            answer: "Stock notifications send you an email as soon as a product drops below a set limit: a signal per product, at the moment it's needed. The purchasing advice looks wider and does the maths: for the suppliers you select, ShopLinkr works out how much of each product you'd best reorder, including backorders, thresholds, expected sales and lead time. Both work fine alongside each other.",
        },
        {
            question: "Can I adjust the advice manually before I convert it?",
            answer: "Yes. On the advice detail page you see the advised quantity per line and the reason the product was included. You can adjust lines, remove them or add your own before you convert the advice into deliveries. The deliveries then get the status <strong>Draft</strong>, so you can still make changes after that too.",
        },
    ],
    rapporten: [
        {
            question: "Which reports are available by default in ShopLinkr?",
            answer: "You'll find four fixed reports under Reports in the menu: Product performance, Never sold products, Stock value and ABC analysis. Each report has its own filters and answers a specific question about your range, your stock or your sales.",
        },
        {
            question: "Can you export reports?",
            answer: "Yes, every report has an export button and you get it as an Excel file. Handy for forwarding to your accountant or including in your own analysis.",
        },
        {
            question: "How often is the ABC analysis updated and what does it look at?",
            answer: "The analysis runs automatically every night over the picking frequency of the past 90 days. If you work with picking lists, every time a product appears on a list counts as a pick. If you work without picking lists, ShopLinkr looks at how often a product appears in orders. It's about how often an employee has to walk to a product, not about the quantities being picked.",
        },
        {
            question: "Can I filter the Never sold products report by sales channel?",
            answer: "Yes. Alongside period, tags and packaging type, you can filter this report by sales channel. That way you can see, for example, which products aren't moving in your Shopify shop while they do sell on Bol, or the other way around.",
        },
        {
            question: "Why does the stock value report differ from the stock value on a product itself?",
            answer: "In the product screen you see the current stock value of that one product. The report lines up your entire range side by side on a chosen date, including the total value across everything, and you can jump to historical dates to spot trends. Products without a purchase price get a value of zero in both cases. Bundles aren't counted separately in the report, because their value comes from the individual products.",
        },
    ],
    regels: [
        {
            question: "What conditions can I have a rule respond to?",
            answer: "Dozens of fields, split across customer details and order. Think of sales channel, total weight, total amount, number of products, packaging type, specific product, tag, service point, shipping method and order date. For customer details you choose per field whether it's about the shipping address or billing address, and within that about name, email, postal code, country and more.",
        },
        {
            question: "Which actions can ShopLinkr carry out automatically?",
            answer: "A broad set of actions. Think of setting a shipping option, adding a tag or marking an order as high priority. You can combine multiple actions within a single rule.",
        },
        {
            question: "Can I combine multiple conditions in one rule?",
            answer: "Yes. Within a group of conditions you decide whether all conditions must be met, or whether one condition is already enough. That way you make a rule that only applies to a specific combination, or instead a rule that catches several situations at once.",
        },
        {
            question: "What happens if two rules apply to the same order?",
            answer: "Rules are processed in the order they're listed. Per rule you choose whether it stops here once it's triggered, or whether ShopLinkr keeps checking the following rules. That way you decide for yourself which rule takes priority when there's overlap.",
        },
        {
            question: "Are rules also applied to existing orders?",
            answer: "No, only to new orders that come in after you've saved the rule. The rule is active immediately and is applied from that moment on to every new order that meets the conditions.",
        },
    ],
    gebruikers: [
        {
            question: "Does an extra user cost anything?",
            answer: "No. With ShopLinkr you don't pay per user. Whether you work with two people or a team of twenty, your bill stays the same. So feel free to invite everyone who works in your warehouse.",
        },
        {
            question: "Which default roles does ShopLinkr come with?",
            answer: "Five roles are ready to go: Admin (full access), Warehouse (process orders and update stock), Administration (reports and exports), Customer service (orders and returns) and Purchasing (suppliers and deliveries). You can't change or delete the Admin role, but you can adjust the other default roles however you like.",
        },
        {
            question: "Can I create roles myself?",
            answer: "Yes. Via Settings > Roles you click Create role, give it a name like Team lead or Intern and tick per section what this role is allowed to do. Or duplicate a default role and adjust it, so you don't have to start from scratch.",
        },
        {
            question: "Which permissions can you assign per role?",
            answer: "Permissions are grouped per section: orders, products, stock, settings and more. Per section you choose whether a user can view, create, edit or delete. On top of that there are specific permissions, such as processing orders, exporting products or viewing financial insights.",
        },
        {
            question: "Do two-factor authentication and QR login work together?",
            answer: "Yes. You turn on two-factor authentication per user via Settings > Security, and it works with Google Authenticator, Microsoft Authenticator, Authy or 1Password. QR login is meant for quickly switching on shared stations. If you have 2FA on, ShopLinkr also asks for the 6-digit code after the QR scan.",
        },
    ],
    klanten: [
        {
            question: "Can I edit customer details and addresses directly in ShopLinkr?",
            answer: "Yes. From an order you open the shipping or billing profile and update the name, contact details, company details and address right away. The new details go straight onto the shipping label and the delivery options are fetched again.",
        },
        {
            question: "Does a change I make in ShopLinkr go back to the sales channel?",
            answer: "No. Changes to customer details and addresses stay within ShopLinkr and are used for your shipping and administration.",
        },
        {
            question: "Won't my changes be overwritten by a sync from the channel?",
            answer: "No. As soon as you adjust a field manually, a later sync from the sales channel leaves that field alone. What you change stays in place.",
        },
        {
            question: "Which customer details do I see per order?",
            answer: "Salutation, first and last name with any name prefix, email address, phone number, company name, VAT and Chamber of Commerce number, plus a full address with street, house number, postal code, city and country.",
        },
        {
            question: "How securely are customer details stored?",
            answer: "All personal data, such as names, addresses and contact details, is stored encrypted in our database. On top of that you use roles and permissions to set per user who is allowed to view the customer details, so only the right people can access them.",
        },
        {
            question: "Can I combine orders from the same customer into one shipment?",
            answer: "Yes, based on the delivery address. If multiple open orders share the same shipping address, ShopLinkr recognises that and you can merge them into one shipment. That also works when the orders come from different sales channels.",
        },
    ],
    prijzen: [
        {
            question: "What if I have more orders in a month than expected?",
            answer: "Your bill scales along automatically. Every order falls within a tier with its own rate, and you pay neatly per tier you reach. The next month you settle up again based on that volume. No contract changes, no surprises.",
        },
        {
            question: "Can I pause or cancel my subscription?",
            answer: "You can cancel every month with no notice period. Pausing is possible too, for example in a quiet season. Send us a message and we'll arrange it.",
        },
        {
            question: "Which sales channels and carriers are supported?",
            answer: "Bol, Shopify, WooCommerce, Lightspeed, Kaufland and connections with PostNL, DPD, GLS, MyParcel, Sendcloud, Sendy, QLS, ParcelPro and Innosend. We keep expanding the line-up based on customer demand.",
        },
        {
            question: "How does the free 14-day trial work?",
            answer: "You get two weeks of full access to all features. You don't have to leave a credit card. After the trial you decide for yourself whether to continue. Do nothing and the account stops automatically.",
        },
        {
            question: "Is migration from another system included?",
            answer: "Yes. We set up the first configuration together with you, import your products and stock and help with the connections to your channels. You pay nothing extra for that.",
        },
        {
            question: "What's included in the support?",
            answer: "Access to our chat and email support, with a response time of usually within 2 hours during office hours. No tickets in a queue, no separate support packages. For setup questions we're also happy to schedule a short call.",
        },
        {
            question: "What if I have questions later or want to know more?",
            answer: "Schedule a demo or send us a message. We're happy to think along about the setup for your warehouse, with no obligation.",
        },
    ],
    contact: [
        {
            question: "How quickly will I get a reply?",
            answer: "During office hours we usually respond within 2 hours. Send something over the weekend? Then you'll almost always hear from us on Monday morning.",
        },
        {
            question: "Can I also call or reach you via WhatsApp?",
            answer: "You can call or send a WhatsApp on +31 6 49 78 12 12, Monday to Friday from 08:30 to 17:00. For quick questions WhatsApp, email or the form is often fastest, because then we can take a look right away.",
        },
        {
            question: "I'm not a customer yet. Can I still get in touch?",
            answer: "Absolutely. Whether you're exploring, weighing up tools or have a specific question, we're happy to help. With no obligation at all.",
        },
        {
            question: "What if I'd rather have a look around myself first?",
            answer: "You can try ShopLinkr free for 14 days, with no credit card. If you run into anything, we're here for you.",
        },
    ],
};

export interface FaqCategory {
    title: string;
    intro: string;
    pages: Array<string>;
}

export const faqCategories: Array<FaqCategory> = [
    {
        title: "Stock and products",
        intro: "Everything about stock management, product types, locations and purchasing.",
        pages: ["voorraad","producten","locatiebeheer","inkoopadvies"],
    },
    {
        title: "Order processing and shipping",
        intro: "From incoming order to ship-ready parcel.",
        pages: ["bestellingen","picklijsten","leveringen","vervoerders","retouren"],
    },
    {
        title: "Automation, customers and team",
        intro: "Rules, customer details, users and reporting.",
        pages: ["regels","klanten","gebruikers","rapporten"],
    },
    {
        title: "Pricing and account",
        intro: "The pricing model, getting started and contact.",
        pages: ["prijzen","contact"],
    },
];
