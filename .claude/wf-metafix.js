export const meta = {
  name: 'shoplinkr-meta-shorten',
  description: 'Shorten over-long meta descriptions: dict description fields + SEO/blog excerpts to <=160 chars, keep meaning, no new claims',
  phases: [{ title: 'Shorten', detail: 'dict files + per-file excerpt shortening' }],
};

const EXCERPT_FILES = [
 "src/content/seo/alles-wat-je-moet-weten-over-voorraadbeheer-in-excel.md",
 "src/content/seo/myparcel-en-shopify-samen-gebruiken.md",
 "src/content/seo/sendy-en-bol-samen-gebruiken.md",
 "src/content/seo/postnl-en-woocommerce-samen-gebruiken.md",
 "src/content/seo/dpd-en-shopify-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-qls-met-bol.md",
 "src/content/seo/hoe-koppel-ik-sendy-met-bol.md",
 "src/content/seo/myparcel-en-woocommerce-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-myparcel-met-shopify.md",
 "src/content/seo/qls-en-shopify-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-qls-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-myparcel-met-bol.md",
 "src/content/seo/dpd-en-bol-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-dpd-met-woocommerce.md",
 "src/content/seo/qls-en-bol-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-postnl-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-sendcloud-met-shopify.md",
 "src/content/seo/sendcloud-en-shopify-samen-gebruiken.md",
 "src/content/seo/hoe-koppel-ik-sendy-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-sendcloud-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-qls-met-shopify.md",
 "src/content/seo/hoe-koppel-ik-postnl-met-woocommerce.md",
 "src/content/seo/hoe-koppel-ik-innosend-met-bol.md",
 "src/content/seo/bol-lvb-voorraad-switch.md",
 "src/content/seo-en/using-sendy-and-bol-together.md",
 "src/content/seo-en/everything-you-need-to-know-about-inventory-management-in-excel.md",
 "src/content/seo-en/bol-lvb-stock-switch.md",
 "src/content/seo-en/how-to-connect-postnl-to-shopify.md",
 "src/content/seo-en/how-to-connect-myparcel-to-bol.md",
 "src/content/seo-en/how-to-connect-sendy-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-sendy-to-bol.md",
 "src/content/seo-en/using-postnl-and-woocommerce-together.md",
 "src/content/seo-en/how-to-connect-sendy-to-shopify.md",
 "src/content/seo-en/how-to-connect-postnl-to-woocommerce.md",
 "src/content/seo-en/using-myparcel-and-woocommerce-together.md",
 "src/content/seo-en/using-dpd-and-shopify-together.md",
 "src/content/seo-en/how-to-connect-myparcel-to-shopify.md",
 "src/content/seo-en/using-qls-and-shopify-together.md",
 "src/content/seo-en/using-myparcel-and-shopify-together.md",
 "src/content/seo-en/how-to-connect-qls-to-shopify.md",
 "src/content/seo-en/how-to-connect-qls-to-woocommerce.md",
 "src/content/seo-en/how-to-connect-dpd-to-woocommerce.md",
 "src/content/seo-en/using-qls-and-bol-together.md",
 "src/content/seo-en/using-sendcloud-and-shopify-together.md",
 "src/content/blogs/sendy-koppelen-aan-shoplinkr.md",
 "src/content/blogs/sendcloud-koppelen-aan-shoplinkr.md",
 "src/content/blogs/wat-is-verzenden-via-bol-(vvb)-precies.md",
 "src/content/blogs/hoe-koppel-je-bol-com-met-jouw-webshop.md",
 "src/content/blogs/qls-koppelen-aan-shoplinkr.md",
 "src/content/blogs/wat-is-een-ean-code.md",
 "src/content/blogs/bol-com-koppelen-aan-shoplinkr.md",
 "src/content/blogs/voorraadmanagement.md",
 "src/content/blogs/myparcel-koppelen-aan-shoplinkr.md",
 "src/content/blogs-en/what-is-an-ean-code.md",
 "src/content/blogs-en/connect-sendy-to-shoplinkr.md",
 "src/content/blogs-en/connect-myparcel-to-shoplinkr.md",
 "src/content/blogs-en/how-to-connect-bol-com-to-your-webshop.md",
 "src/content/blogs-en/connect-sendcloud-to-shoplinkr.md",
 "src/content/blogs-en/connect-qls-to-shoplinkr.md",
 "src/content/blogs-en/connect-bol-to-shoplinkr.md",
 "src/content/blogs-en/what-is-shipping-via-bol-vvb-exactly.md",
 "src/content/blogs-en/inventory-management.md"
];

const SCHEMA = { type:'object', properties:{ file:{type:'string'}, changed:{type:'boolean'}, edits:{type:'array',items:{type:'object',properties:{before:{type:'string'},after:{type:'string'}},required:['before','after']}} }, required:['file','changed','edits'] };

const RULES = 'STRICT: keep the core message and the main keyword; introduce NO new facts, numbers, features or claims; keep brand "ShopLinkr"; keep "bol"/"bol.com" casing exactly; no emdash. Target 150-160 characters, never over 160. It must read as a complete, natural, compelling sentence (it is shown to users as a meta description and, for SEO/blog excerpts, also as the visible page subheading).';

function dictPrompt(file, locale){
  return `Read ${file}. Find EVERY \`description:\` string value that is LONGER than 160 characters (these are page meta descriptions that get truncated in Google search results). Shorten each one to 150-160 characters. ${locale==='en'?'American English.':'Informal Dutch (je/jij/jouw).'} ${RULES} Use precise Edit calls (match the exact current string). Return file, changed, and edits[] (before/after) for each shortened description. Do NOT touch any value that is already <=160 chars, and do NOT touch title/heading/other fields.`;
}
function exPrompt(file){
  const en = file.includes('-en/');
  return `Read ${file}. Its frontmatter \`excerpt:\` value is too long (>165 chars). It is used as BOTH the page meta description AND the visible page subheading, so it must stay a complete, compelling sentence. Shorten ONLY the excerpt frontmatter value to 150-160 characters. ${en?'American English.':'Informal Dutch (je/jij/jouw).'} ${RULES} Edit only the excerpt line. Return file, changed, edits[] (before/after).`;
}

phase('Shorten');
log(`Shortening 2 dict files + ${EXCERPT_FILES.length} excerpts`);
const tasks = [
  () => agent(dictPrompt('src/i18n/locales/nl.ts','nl'), {label:'dict:nl', phase:'Shorten', schema:SCHEMA}).then(r=>r||{file:'nl.ts',changed:false,edits:[]}),
  () => agent(dictPrompt('src/i18n/locales/en.ts','en'), {label:'dict:en', phase:'Shorten', schema:SCHEMA}).then(r=>r||{file:'en.ts',changed:false,edits:[]}),
  ...EXCERPT_FILES.map(f => () => agent(exPrompt(f), {label:'ex:'+f.replace('src/content/',''), phase:'Shorten', schema:SCHEMA}).then(r=>r||{file:f,changed:false,edits:[]})),
];
const results = (await parallel(tasks)).filter(Boolean);
let edited=0,total=0; for(const r of results){if(r.changed)edited++; total+=(r.edits||[]).length;}
log(`Done: ${edited} targets changed, ${total} descriptions shortened`);
return { targets: results.length, edited, shortened: total, results };
