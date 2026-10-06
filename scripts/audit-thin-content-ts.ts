/**
 * Indexable URL word-count audit (registry + merged blog content).
 * Run: npm run audit:thin-content
 */
import { getAllBlogSlugs, getBlogPostBySlug } from '../src/lib/blog-registry';
import { getToolGuide } from '../src/lib/tool-guides';
import { TOOLS_REGISTRY } from '../src/lib/tools-registry';
import { CATEGORY_GUIDES } from '../src/lib/category-guides';
import { GUIDE_HUBS } from '../src/lib/guides-registry';

const THRESHOLDS = {
  blog: 800,
  tool: 600,
  categoryHub: 150,
  pillarGuide: 700,
} as const;

function wc(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function toolPageWords(slug: string): number {
  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);
  if (!tool) return 0;
  const parts = [
    tool.name,
    tool.headline,
    tool.description,
    ...tool.howItWorks.flatMap((s) => [s.title, s.description]),
    ...tool.features,
    ...tool.limitations,
    ...tool.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  const guide = getToolGuide(slug);
  if (guide) {
    for (const sec of guide.sections) {
      parts.push(sec.heading, ...sec.paragraphs);
    }
  }
  return wc(parts.join(' '));
}

let failures = 0;

function report(kind: string, slug: string, words: number, min: number) {
  const ok = words >= min;
  const flag = ok ? 'OK  ' : 'FAIL';
  if (!ok) failures += 1;
  console.log(`${flag} ${String(words).padStart(5)} (min ${min})  [${kind}] ${slug}`);
}

console.log('=== BLOG (merged content + FAQs) ===');
const blogs = getAllBlogSlugs()
  .map((slug) => {
    const p = getBlogPostBySlug(slug)!;
    const body = wc(p.content) + wc(p.faqs.map((f) => f.question + ' ' + f.answer).join(' '));
    return { slug, words: body };
  })
  .sort((a, b) => a.words - b.words);
for (const b of blogs) {
  report('blog', b.slug, b.words, THRESHOLDS.blog);
}

console.log('\n=== TOOL PAGES (registry + guide prose) ===');
const tools = TOOLS_REGISTRY.map((t) => ({ slug: t.slug, words: toolPageWords(t.slug) })).sort(
  (a, b) => a.words - b.words
);
for (const t of tools) {
  report('tool', t.slug, t.words, THRESHOLDS.tool);
}

console.log('\n=== CATEGORY HUBS (indexable except analytics) ===');
for (const [id, g] of Object.entries(CATEGORY_GUIDES)) {
  if (id === 'analytics') continue;
  const words = wc([g.intro, ...g.paragraphs].join(' '));
  report('category', id, words, THRESHOLDS.categoryHub);
}

console.log('\n=== PILLAR GUIDES ===');
for (const hub of GUIDE_HUBS) {
  const parts = [hub.intro, ...hub.sections.flatMap((s) => [s.heading, ...s.paragraphs])];
  const faq = hub.faqs.map((f) => f.question + ' ' + f.answer).join(' ');
  const words = wc(parts.join(' ') + ' ' + faq);
  report('guide', hub.slug, words, THRESHOLDS.pillarGuide);
}

if (failures > 0) {
  console.error(`\nThin content audit failed: ${failures} URL(s) below threshold.`);
  process.exit(1);
}
console.log('\nThin content audit passed.');
