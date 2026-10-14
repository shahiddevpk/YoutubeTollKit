import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  CATEGORIES,
  SITE_CONFIG,
  getAllCategoryIds,
  getCategoryById,
  getToolsByCategory,
} from '@/lib/tools-registry';
import { ToolCard } from '@/components/tools/ToolCard';
import type { ToolCategory } from '@/types/tools';
import { CATEGORY_GUIDES } from '@/lib/category-guides';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { CATEGORY_CONTENT } from '@/lib/category-content';
import { getToolBySlug } from '@/lib/tools-registry';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllCategoryIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id as ToolCategory);

  if (!category) {
    return { title: { absolute: 'Category Not Found | YouTubeFreeToolkit' } };
  }

  const title = `${category.name} Tools for YouTube Creators`;
  const description = `${getToolsByCategory(category.id).length} free ${category.name.toLowerCase()} tools for YouTube creators. ${category.description}`.slice(0, 158).replace(/\s+\S*$/, '') + '…';
  const canonicalUrl = `${SITE_CONFIG.url}/tools/category/${category.id}`;
  const ogImage = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(category.description.slice(0, 120))}`;

  return {
    title: { absolute: `${title}`.length + 21 <= 65 ? `${title} | YouTubeFreeToolkit` : title },
    description,
    keywords: [category.name.toLowerCase(), `free ${category.name.toLowerCase()} tools`, 'youtube creator tools'],
    robots: category.id === 'analytics' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_CONFIG.name,
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { id } = await params;
  const category = getCategoryById(id as ToolCategory);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);
  const guide = CATEGORY_GUIDES[category.id];
  const content = CATEGORY_CONTENT[category.id];
  const faqSchema = content ? generateFAQSchema(content.faqs) : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Tools', url: `${SITE_CONFIG.url}/tools` },
    { name: category.name, url: `${SITE_CONFIG.url}/tools/category/${category.id}` },
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} Tools`,
    description: category.description,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-20 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/tools" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Tools</Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">{category.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 text-base text-[#606060] dark:text-[#aaaaaa] max-w-3xl">
            {guide ? guide.intro : category.description}
          </p>
          {content && (
            <p className="mt-3 text-sm text-[#606060] dark:text-[#aaaaaa] max-w-3xl leading-relaxed">{content.lead}</p>
          )}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Available {category.name} Tools ({tools.length})
          </h2>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">100% Free · No Login</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {content && <CategoryDetails content={content} categoryName={category.name} />}

        {/* Category Guide & Selection Advice */}
        {!content && guide && guide.paragraphs.length > 0 && (
          <div className="mt-12 rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1] border-b border-[#e5e5e5] dark:border-[#272727] pb-3">
              How to Use & Choose Tools in {category.name}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              {guide.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">Explore other categories</h2>
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/tools/category/${c.id}`}
                  className="inline-flex rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3.5 py-1.5 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] hover:text-[#ff0000] dark:hover:text-red-400 transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

const card = 'mt-10 rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 shadow-sm';
const h2c = 'text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]';
const pc = 'text-sm text-[#3f3f3f] dark:text-[#cccccc] leading-relaxed';

function toolName(slug: string) {
  const t = getToolBySlug(slug);
  return t ? (t.shortTitle || t.name) : slug;
}

function CategoryDetails({
  content,
  categoryName,
}: {
  content: NonNullable<(typeof CATEGORY_CONTENT)[keyof typeof CATEGORY_CONTENT]>;
  categoryName: string;
}) {
  return (
    <>
      {content.sections.map((section) => (
        <section key={section.heading} className={card}>
          <h2 className={h2c}>{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((p, i) => (
              <p key={i} className={pc}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section className={card}>
        <h2 className={h2c}>Compare the {categoryName.toLowerCase()} tools</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] dark:border-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1]">
                <th scope="col" className="py-2 pr-4 font-semibold">Tool</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Best for</th>
                <th scope="col" className="py-2 pr-4 font-semibold">You enter</th>
                <th scope="col" className="py-2 font-semibold">You get</th>
              </tr>
            </thead>
            <tbody className="text-[#3f3f3f] dark:text-[#cccccc]">
              {content.comparison.map((row) => (
                <tr key={row.slug} className="border-b border-[#f2f2f2] dark:border-[#272727] align-top">
                  <td className="py-2.5 pr-4 font-semibold">
                    <Link href={`/tools/${row.slug}`} className="text-[#cc0000] dark:text-red-400 hover:underline">
                      {toolName(row.slug)}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4">{row.bestFor}</td>
                  <td className="py-2.5 pr-4">{row.input}</td>
                  <td className="py-2.5">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2c}>Common use cases</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {content.useCases.map((u) => (
            <div key={u.title} className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] p-4">
              <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{u.title}</h3>
              <p className={`mt-1.5 ${pc}`}>{u.text}</p>
              <p className="mt-2 text-xs">
                {u.slugs.map((slug, i) => (
                  <React.Fragment key={slug}>
                    {i > 0 && ' · '}
                    <Link href={`/tools/${slug}`} className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">
                      {toolName(slug)}
                    </Link>
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2c}>Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-[#e5e5e5] dark:divide-[#272727]">
          {content.faqs.map((f) => (
            <div key={f.question} className="py-4 first:pt-0 last:pb-0">
              <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{f.question}</h3>
              <p className={`mt-1.5 ${pc}`}>{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2c}>Keep learning</h2>
        <ul className="mt-3 space-y-2">
          {content.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="text-sm font-semibold text-[#cc0000] dark:text-red-400 hover:underline">
                {r.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
