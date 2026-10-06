import { getAllBlogSlugs, getBlogPostBySlug } from '../src/lib/blog-registry';
import { getToolGuide } from '../src/lib/tool-guides';
import { TOOLS_REGISTRY } from '../src/lib/tools-registry';
import { CATEGORY_GUIDES } from '../src/lib/category-guides';
import { GUIDE_HUBS } from '../src/lib/guides-registry';

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

console.log('=== BLOG (merged content + FAQs) ===');
const blogs = getAllBlogSlugs()
  .map((slug) => {
    const p = getBlogPostBySlug(slug)!;
    const body = wc(p.content) + wc(p.faqs.map((f) => f.question + ' ' + f.answer).join(' '));
    return { slug, words: body };
  })
  .sort((a, b) => a.words - b.words);
for (const b of blogs) {
  const flag = b.words < 600 ? 'THIN' : b.words < 800 ? 'LOW' : 'OK';
  console.log(`${flag.padEnd(4)} ${String(b.words).padStart(5)}  ${b.slug}`);
}

console.log('\n=== TOOL PAGES (registry + guide prose) ===');
const tools = TOOLS_REGISTRY.map((t) => ({ slug: t.slug, words: toolPageWords(t.slug) })).sort(
  (a, b) => a.words - b.words
);
for (const t of tools) {
  const flag = t.words < 450 ? 'LOW' : t.words < 600 ? 'MID' : 'OK';
  console.log(`${flag.padEnd(4)} ${String(t.words).padStart(5)}  ${t.slug}`);
}

console.log('\n=== CATEGORY HUBS ===');
for (const [id, g] of Object.entries(CATEGORY_GUIDES)) {
  const words = wc([g.intro, ...g.paragraphs].join(' '));
  const flag = words < 150 ? 'THIN' : 'OK';
  console.log(`${flag.padEnd(4)} ${String(words).padStart(5)}  ${id}`);
}

console.log('\n=== PILLAR GUIDES ===');
for (const hub of GUIDE_HUBS) {
  const parts = [hub.intro, ...hub.sections.flatMap((s) => [s.heading, ...s.paragraphs])];
  const faq = hub.faqs.map((f) => f.question + ' ' + f.answer).join(' ');
  const words = wc(parts.join(' ') + ' ' + faq);
  const flag = words < 400 ? 'THIN' : words < 700 ? 'LOW' : 'OK';
  console.log(`${flag.padEnd(4)} ${String(words).padStart(5)}  ${hub.slug}`);
}
