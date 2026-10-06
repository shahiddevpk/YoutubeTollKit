import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

function wc(text) {
  return String(text)
    .replace(/[#*_\`>\[\]()!|-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

// Blog: use compiled approach - parse slugs and content between backticks
const br = readFileSync('src/lib/blog-registry.ts', 'utf8');
const be = readFileSync('src/lib/blog-expansions.ts', 'utf8');
let bea = '';
try {
  bea = readFileSync('src/lib/blog-expansion-append.ts', 'utf8');
} catch {}

function extractExpansionContents(src) {
  const map = {};
  const re = /'([a-z0-9-]+)':\s*\{[\s\S]*?content:\s*`([\s\S]*?)`\s*,/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

const expansions = extractExpansionContents(be);
const appends = extractExpansionContents(bea);

const postRe = /slug:\s*'([^']+)'[\s\S]*?content:\s*`([\s\S]*?)`\s*,/g;
const blog = [];
let pm;
while ((pm = postRe.exec(br)) !== null) {
  const slug = pm[1];
  if (slug === 'monetization-checker') continue;
  const base = pm[2];
  const merged = (expansions[slug] ?? base) + '\n\n' + (appends[slug] ?? '');
  const postChunk = pm[0];
  const faqMatches = [...postChunk.matchAll(/question:\s*'([^']*)'[\s\S]*?answer:\s*'([^']*)'/g)];
  const faqWords = faqMatches.map((f) => wc(f[1] + ' ' + f[2])).reduce((a, b) => a + b, 0);
  blog.push({ slug, words: wc(merged) + faqWords, expanded: Boolean(expansions[slug] || appends[slug]) });
}

// Tool guides
const tg = readFileSync('src/lib/tool-guides.ts', 'utf8');
const toolGuides = [];
const guideRe = /'([a-z-]+)':\s*\{[\s\S]*?sections:\s*\[([\s\S]*?)\]\s*,\s*\}/g;
let gm;
while ((gm = guideRe.exec(tg)) !== null) {
  const slug = gm[1];
  const body = gm[2];
  const paras = [...body.matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g)].map((x) =>
    x[1].replace(/\\'/g, "'")
  );
  toolGuides.push({ slug, words: wc(paras.join(' ')) });
}

// Tools registry - description + howItWorks + features + limitations + faqs
const tr = readFileSync('src/lib/tools-registry.ts', 'utf8');
const tools = [];
const toolBlocks = tr.split(/\n  \{\n    slug:/).slice(1);
for (const block of toolBlocks) {
  const slug = block.match(/^ '([^']+)'/)?.[1];
  if (!slug) continue;
  const desc = block.match(/description:\s*\n\s*'([^']*(?:\\'[^']*)*)'/)?.[1] ?? '';
  const strings = [...block.matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g)].map((x) =>
    x[1].replace(/\\'/g, "'")
  );
  const registryWords = wc(strings.join(' '));
  const guide = toolGuides.find((g) => g.slug === slug);
  const totalOnPage = registryWords + (guide?.words ?? 0);
  tools.push({ slug, registryWords, guideWords: guide?.words ?? 0, totalOnPage });
}

// Category guides
const cg = readFileSync('src/lib/category-guides.ts', 'utf8');
const cats = [];
const catRe = /(\w+):\s*\{[\s\S]*?intro:\s*'([^']*)'[\s\S]*?paragraphs:\s*\[([\s\S]*?)\]/g;
let cm;
while ((cm = catRe.exec(cg)) !== null) {
  const paras = [...cm[3].matchAll(/'([^']*)'/g)].map((x) => x[1]);
  cats.push({ id: cm[1], words: wc(cm[2] + ' ' + paras.join(' ')) });
}

// Guides registry pillars
const gr = readFileSync('src/lib/guides-registry.ts', 'utf8');
const pillars = [];
const pillarRe = /slug:\s*'([^']+)'[\s\S]*?sections:\s*\[([\s\S]*?)\]\s*,/g;
let pr;
while ((pr = pillarRe.exec(gr)) !== null) {
  const paras = [...pr[2].matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g)].map((x) =>
    x[1].replace(/\\'/g, "'")
  );
  pillars.push({ slug: pr[1], words: wc(paras.join(' ')) });
}

console.log('=== BLOG POSTS (body + inline FAQs, merged expansions) ===');
blog.sort((a, b) => a.words - b.words);
for (const b of blog) {
  const flag = b.words < 600 ? 'THIN' : b.words < 800 ? 'LOW' : 'OK';
  console.log(`${flag.padEnd(4)} ${b.words.toString().padStart(5)}  ${b.expanded ? 'exp' : '   '}  ${b.slug}`);
}

console.log('\n=== TOOL PAGES (registry copy + tool-guides only) ===');
tools.sort((a, b) => a.totalOnPage - b.totalOnPage);
for (const t of tools) {
  const flag = t.totalOnPage < 400 ? 'THIN' : t.totalOnPage < 550 ? 'LOW' : 'OK';
  console.log(
    `${flag.padEnd(4)} ${t.totalOnPage.toString().padStart(5)} (guide ${t.guideWords})  ${t.slug}`
  );
}

console.log('\n=== CATEGORY HUBS ===');
for (const c of cats) {
  const flag = c.words < 120 ? 'THIN' : 'OK';
  console.log(`${flag.padEnd(4)} ${c.words.toString().padStart(5)}  ${c.id}`);
}

console.log('\n=== PILLAR GUIDES ===');
for (const p of pillars) {
  const flag = p.words < 400 ? 'THIN' : 'OK';
  console.log(`${flag.padEnd(4)} ${p.words.toString().padStart(5)}  ${p.slug}`);
}
