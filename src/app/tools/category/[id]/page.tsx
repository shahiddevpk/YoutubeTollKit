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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <section className="border-b border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-700 dark:text-slate-300">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/tools" className="hover:text-slate-700 dark:text-slate-300">Tools</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 dark:text-slate-300">{category.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{category.name}</h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{category.description}</p>
          {CATEGORY_GUIDES[category.id] && (
            <div className="mt-6 space-y-3 text-sm text-slate-400 leading-relaxed">
              <p className="text-slate-700 dark:text-slate-300">{CATEGORY_GUIDES[category.id].intro}</p>
              {CATEGORY_GUIDES[category.id].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/40 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Explore other categories</h2>
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/tools/category/${c.id}`}
                  className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-red-500/40 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-colors"
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
