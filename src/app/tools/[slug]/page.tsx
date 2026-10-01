import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TOOLS_REGISTRY, getToolBySlug, getAllToolSlugs } from '@/lib/tools-registry';
import { constructToolMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolRenderer } from '@/components/tools/ToolRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | YouTubeFreeToolkit',
      description: 'The requested YouTube creator tool does not exist.',
    };
  }

  return constructToolMetadata(tool);
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
