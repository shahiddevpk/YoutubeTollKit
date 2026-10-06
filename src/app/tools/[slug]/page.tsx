import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getToolBySlug, getAllToolSlugs } from '@/lib/tools-registry';
import { constructToolMetadata } from '@/lib/seo';
import { hasNoindexSearchParams, noindexFollowRobots } from '@/lib/seo-site-config';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolRenderer } from '@/components/tools/ToolRenderer';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | YouTubeFreeToolkit',
      description: 'The requested YouTube creator tool does not exist.',
    };
  }

  const metadata = constructToolMetadata(tool);
  if (hasNoindexSearchParams(query)) {
    return { ...metadata, robots: noindexFollowRobots() };
  }
  return metadata;
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <ToolLayout tool={tool}>
      <ToolRenderer slug={tool.slug} />
    </ToolLayout>
  );
}
