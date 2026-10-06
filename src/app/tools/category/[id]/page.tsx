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
import { generateBreadcrumbSchema } from '@/lib/seo';
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

  const title = `Free ${category.name} Tools for YouTube Creators`;
  const description = `${category.description} Browse ${getToolsByCategory(category.id).length} free utilities on YouTubeFreeToolkit.`;
  const canonicalUrl = `${SITE_CONFIG.url}/tools/category/${category.id}`;
  const ogImage = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(category.description.slice(0, 120))}`;

  return {
    title: { absolute: `${title} | YouTubeFreeToolkit` },
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

        {/* Category Guide & Selection Advice */}
        {guide && guide.paragraphs.length > 0 && (
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
