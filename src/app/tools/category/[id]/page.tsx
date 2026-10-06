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

  return {
    title: { absolute: `${title} | YouTubeFreeToolkit` },
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tools/category/${category.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/tools/category/${category.id}`,
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

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] pb-20 transition-colors">
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
          <p className="mt-2 text-base text-[#606060] dark:text-[#aaaaaa]">{category.description}</p>
          {CATEGORY_GUIDES[category.id] && (
            <div className="mt-6 space-y-3 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl border-t border-[#e5e5e5] dark:border-[#272727] pt-4">
              <p className="text-[#0f0f0f] dark:text-[#f1f1f1] font-medium">{CATEGORY_GUIDES[category.id].intro}</p>
              {CATEGORY_GUIDES[category.id].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

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
