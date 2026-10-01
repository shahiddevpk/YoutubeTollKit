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
import { ChevronRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 pb-20">
      <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/tools" className="hover:text-slate-200">Tools</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-200">{category.name}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 border border-red-500/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Category hub
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {category.name}
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-3xl leading-relaxed">{category.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-bold text-white mb-3">Explore other categories</h2>
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/tools/category/${c.id}`}
                  className="inline-flex rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-red-500/40 hover:text-white transition-colors"
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
