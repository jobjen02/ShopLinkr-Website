export const meta = {
  name: 'shoplinkr-stat-reword',
  description: 'Reword sentences to remove the fabricated 110.000 orders / 22.000 products stats, keep 14-day-free CTA, invent no new numbers',
  phases: [{ title: 'Reword', detail: 'one agent per file removes the two stats and rewords naturally' }],
};

const FILES = [
 "src/content/blogs/producten-beheren-op-een-plek.md",
 "src/content/blogs-en/manage-products-in-one-place.md",
 "src/content/seo-en/everything-you-need-to-know-about-inventory-management-in-excel.md",
 "src/content/seo-en/bol-lvb-stock-switch.md",
 "src/content/seo-en/how-to-connect-postnl-to-shopify.md",
 "src/content/seo-en/how-to-connect-myparcel-to-bol.md",
 "src/content/seo-en/how-to-connect-sendy-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-sendy-to-bol.md",
 "src/content/seo-en/selling-on-bol-without-inventory.md",
 "src/content/seo-en/selling-on-bol.md",
 "src/content/seo-en/how-to-connect-sendy-to-shopify.md",
 "src/content/seo-en/how-to-connect-postnl-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-dpd-to-bol.md",
 "src/content/seo-en/how-to-connect-sendcloud-to-woocommerce.md",
 "src/content/seo-en/how-to-track-inventory-in-excel-tips-and-tricks.md",
 "src/content/seo-en/how-to-connect-dpd-to-shopify.md",
 "src/content/seo-en/how-to-connect-myparcel-to-shopify.md",
 "src/content/seo-en/excel-inventory-management-everything-you-need-to-know.md",
 "src/content/seo-en/how-to-connect-innosend-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-postnl-to-bol.md",
 "src/content/seo-en/how-to-connect-sendcloud-to-bol.md",
 "src/content/seo-en/how-to-connect-innosend-to-bol.md",
 "src/content/seo-en/how-to-connect-qls-to-shopify.md",
 "src/content/seo-en/the-ultimate-guide-to-warehouse-software.md",
 "src/content/seo-en/how-to-connect-qls-to-woocommerce.md",
 "src/content/seo-en/free-inventory-management-in-excel-heres-how.md",
 "src/content/seo-en/how-to-connect-qls-to-bol.md",
 "src/content/seo-en/how-to-connect-myparcel-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-innosend-to-shopify.md",
 "src/content/seo-en/free-inventory-management-excel-template-download-now.md",
 "src/content/seo-en/the-importance-of-effective-inventory-management.md",
 "src/content/seo-en/how-to-connect-dpd-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-sendcloud-to-shopify.md",
 "src/content/seo-en/effective-inventory-management-with-excel.md",
 "src/content/seo-en/inventory-management-with-excel-a-complete-guide.md",
 "src/content/seo-en/effective-inventory-management-in-excel-tips-and-tricks.md",
 "src/content/seo-en/easy-inventory-management-in-excel-tips-and-tricks.md",
 "src/content/seo/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel.md",
 "src/content/seo/gratis-voorraadbeheer-in-excel-zo-doe-je-dat.md",
 "src/content/seo/hoe-koppel-ik-sendcloud-met-bol.md",
 "src/content/seo/effectief-voorraadbeheer-met-excel.md",
 "src/content/seo/voorraadbeheer-met-excel-een-complete-gids.md",
 "src/content/seo/hoe-koppel-ik-innosend-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-qls-met-bol.md",
 "src/content/seo/effectief-voorraadbeheer-in-excel-tips-en-tricks.md",
 "src/content/seo/hoe-koppel-ik-sendy-met-bol.md",
 "src/content/seo/hoe-koppel-ik-dpd-met-shopify.md",
 "src/content/seo/eenvoudig-voorraadbeheer-in-excel-tips-en-tricks.md",
 "src/content/seo/verkopen-via-bol-zonder-voorraad.md",
 "src/content/seo/hoe-koppel-ik-sendy-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-myparcel-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-myparcel-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-qls-met-woocommerce.md",
 "src/content/seo/verkopen-via-bol-com.md",
 "src/content/seo/hoe-koppel-ik-myparcel-met-bol.md",
 "src/content/seo/hoe-koppel-ik-dpd-met-woocommerce.md",
 "src/content/seo/hoe-voorraad-bijhouden-in-excel-tips-en-tricks.md",
 "src/content/seo/gratis-voorraadbeheer-excel-template-download-nu.md",
 "src/content/seo/hoe-koppel-ik-postnl-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-sendcloud-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-postnl-met-bol.md",
 "src/content/seo/hoe-koppel-ik-sendy-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-innosend-met-woocommerce.md",
 "src/content/seo/de-ultieme-gids-voor-magazijnsoftware.md",
 "src/content/seo/hoe-koppel-ik-sendcloud-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-qls-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-dpd-met-bol.md",
 "src/content/seo/het-belang-van-effectief-voorraadbeheer.md",
 "src/content/seo/excel-voorraadbeheer-alles-wat-je-moet-weten.md",
 "src/content/seo/hoe-koppel-ik-postnl-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-innosend-met-bol.md",
 "src/content/seo/bol-lvb-voorraad-switch.md"
];

const SCHEMA = {
  type:'object',
  properties:{
    file:{type:'string'},
    changed:{type:'boolean'},
    edits:{type:'array',items:{type:'object',properties:{before:{type:'string'},after:{type:'string'}},required:['before','after']}},
  },
  required:['file','changed','edits'],
};

function prompt(file){
  const isEn = file.includes('-en/');
  return `Read the file ${file} in full. It contains one or more sentences that cite fabricated statistics: "110.000"/"110,000" processed orders and/or "22.000"/"22,000" products (also forms like "+110.000", "meer dan 110.000", "eerste 110.000", "22.000 producten in ons systeem").

TASK: Reword every such sentence so that BOTH specific numbers are completely gone, while keeping the surrounding marketing message and call-to-action natural, grammatical and persuasive.

STRICT RULES:
- Do NOT introduce ANY new number, statistic, percentage, or factual claim. Remove, do not replace-with-another-number.
- KEEP the free-trial mention intact wherever it appears ("14 dagen gratis" / "14 days free" / "Probeer ShopLinkr ... gratis" / "Try ShopLinkr free ...") and KEEP all links, anchors and CTAs exactly.
- KEEP vague social-proof phrasing such as "duizenden tevreden gebruikers" / "duizenden tevreden webshops" / "thousands of satisfied users/webshops" - only the two SPECIFIC counts must disappear.
- Make MINIMAL edits: only touch the sentence(s) that contain the numbers. Leave everything else byte-identical.
- ${isEn ? 'American English spelling.' : 'Informal Dutch (je/jij/jouw).'} No emdash.
- Keep "bol" casing exactly as-is.

Use precise Edit calls. Then return file, changed (bool), and edits[] (before/after snippet per reworded sentence). If the file somehow has no such number after re-reading, return changed:false.`;
}

phase('Reword');
log(`Rewording ${FILES.length} files to drop the 110k/22k stats`);
const results = (await parallel(FILES.map(f => () =>
  agent(prompt(f), { label: 'stat:'+f.replace('src/content/',''), phase:'Reword', schema: SCHEMA })
    .then(r => r || { file:f, changed:false, edits:[] })
))).filter(Boolean);

let edited=0, total=0;
for(const r of results){ if(r.changed)edited++; total+=(r.edits||[]).length; }
log(`Done: ${edited}/${results.length} files reworded, ${total} sentences`);
return { files: results.length, edited, sentences: total, results };
