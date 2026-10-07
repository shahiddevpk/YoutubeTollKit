import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { defaultRobots } from '@/lib/seo-site-config';
import { markdownToHtml } from '@/lib/markdown-to-html';
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Wrench,
} from 'lucide-react';
import { toolPrimaryButtonClass } from '@/lib/tool-ui';
import { cn } from '@/lib/utils';
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
      locale: 'en_US',
      siteName: SITE_CONFIG.name,
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
      site: SITE_CONFIG.twitterHandle,
      title: post.metaTitle,
      description: post.metaDescription,
    },
    robots: defaultRobots(),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const ogImageUrl = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.excerpt)}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImageUrl,
    datePublished: post.publishedAt,
    ...(post.updatedAt !== post.publishedAt && { dateModified: post.updatedAt }),
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${SITE_CONFIG.url}/author/shahid`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
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
    <article className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-20 transition-colors">
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
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#606060] dark:text-[#aaaaaa] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-[#909090] dark:text-[#717171]" />
            <Link href="/blog" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-[#909090] dark:text-[#717171]" />
            <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-medium truncate">{post.category}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-[#ff0000]/10 px-3 py-0.5 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#606060] dark:text-[#aaaaaa]">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#606060] dark:text-[#aaaaaa]">
              <Calendar className="h-3.5 w-3.5" />
              {post.updatedAt !== post.publishedAt
                ? `Updated ${post.updatedAt}`
                : post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1] leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="mt-6 flex items-center gap-3 border-t border-[#e5e5e5] dark:border-[#272727] pt-4">
            <Link href="/author/shahid" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-full bg-[#ff0000] text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                SD
              </div>
              <div>
                <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{post.author.role}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Table of Contents */}
        {post.tableOfContents.length > 0 && (
          <nav className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#ff0000]" />
              Table of Contents
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              {post.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[#606060] dark:text-[#aaaaaa] hover:text-[#ff0000] dark:hover:text-red-400 transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Embedded Tool CTA Widget */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#ff0000] dark:text-red-400">
              <Wrench className="h-3 w-3" aria-hidden />
              Related free tool
            </span>
            <h3 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{post.toolCta.title}</h3>
            <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa]">{post.toolCta.description}</p>
          </div>
          <Link
            href={`/tools/${post.toolCta.slug}`}
            className={cn(toolPrimaryButtonClass, 'text-xs sm:text-sm')}
          >
            <span>{post.toolCta.buttonText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Article Body Content */}
        <div className="prose max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-[#0f0f0f] dark:text-[#f1f1f1]">
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content, post.tableOfContents) }} />
        </div>

        {/* Article FAQs */}
        {post.faqs.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#272727] space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#ff0000]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {post.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-5 py-4 transition-all"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] text-base group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span className="ml-4 text-[#909090] dark:text-[#717171] group-open:rotate-180 transition-transform text-xs">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#272727]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-6">Related Creator Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 hover:border-[#ff0000]/60 dark:hover:border-[#ff0000]/40 hover:shadow-md transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff0000] dark:text-red-400">
                    {related.category}
                  </span>
                  <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors mt-1">
                    {related.title}
                  </h4>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-2 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
