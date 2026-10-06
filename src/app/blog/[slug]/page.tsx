import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { markdownToHtml } from '@/lib/markdown-to-html';
import {
  ChevronRight,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | YouTubeFreeToolkit',
      description: 'The requested guide could not be found.',
    };
  }

  const canonicalUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.excerpt)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${post.slug}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ]);

  const relatedPosts = post.relatedBlogSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is typeof post => Boolean(p));

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header / Hero */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 pt-8 pb-12">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-200 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/blog" className="hover:text-slate-200 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-200 font-medium truncate">{post.category}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-red-500/10 px-3 py-0.5 text-xs font-bold text-red-400 border border-red-500/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              Updated {post.updatedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="mt-6 flex items-center gap-3 border-t border-slate-800 pt-4">
            <div className="h-10 w-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              SD
            </div>
            <div>
              <p className="text-sm font-bold text-white">{post.author.name}</p>
              <p className="text-xs text-slate-400">{post.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Table of Contents */}
        {post.tableOfContents.length > 0 && (
          <nav className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-red-500" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              {post.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-slate-300 hover:text-red-400 transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Embedded High-Converting Tool CTA Widget */}
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
              <Sparkles className="h-3 w-3" />
              Recommended Free Tool
            </span>
            <h3 className="text-lg font-bold text-white">{post.toolCta.title}</h3>
            <p className="text-xs text-slate-400">{post.toolCta.description}</p>
          </div>
          <Link
            href={`/tools/${post.toolCta.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all shrink-0 cursor-pointer"
          >
            <span>{post.toolCta.buttonText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-300">
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
        </div>

        {/* Article FAQs */}
        {post.faqs.length > 0 && (
          <section className="mt-16 pt-8 border-t border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 open:border-slate-700 transition-all"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-white text-base group-hover:text-red-400 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Related Creator Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-red-500/50 hover:bg-slate-900 transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                    {related.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors mt-1">
                    {related.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
