import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { BLOG_POSTS } from '@/lib/blog-registry';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { defaultRobots } from '@/lib/seo-site-config';
import {
  Code2,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Mail,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'Shahid Developer — Creator & Lead Developer | YouTubeFreeToolkit',
  },
  description:
    'Full-stack developer and creator of YouTubeFreeToolkit. Building policy-safe, transparent tools and technical guides for YouTube creators using the YouTube Data API.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/author/shahid`,
  },
  openGraph: {
    title: 'Shahid Developer — Lead Developer of YouTubeFreeToolkit',
    description:
      'Full-stack developer and creator of YouTubeFreeToolkit. Building policy-safe, transparent tools and technical guides for YouTube creators.',
    url: `${SITE_CONFIG.url}/author/shahid`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahid Developer — Lead Developer of YouTubeFreeToolkit',
    description:
      'Full-stack developer and creator of YouTubeFreeToolkit. Policy-safe YouTube Data API tools and creator guides.',
  },
  robots: defaultRobots(),
};

export default function AuthorProfilePage() {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahid Developer',
    jobTitle: 'Lead Developer & Creator',
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    url: `${SITE_CONFIG.url}/author/shahid`,
    description:
      'Full-stack developer specializing in YouTube Data API v3 integrations, creator analytics, and policy-compliant research utilities.',
    knowsAbout: [
      'YouTube Data API v3',
      'YouTube Analytics API',
      'Google OAuth 2.0',
      'YouTube Partner Program Policies',
      'Video Metadata SEO',
      'Web Development',
    ],
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Authors', url: `${SITE_CONFIG.url}/author/shahid` },
    { name: 'Shahid Developer', url: `${SITE_CONFIG.url}/author/shahid` },
  ]);

  const featuredPosts = BLOG_POSTS.slice(0, 6);

  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-20 transition-colors">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero / Profile Header */}
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">Author Profile</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-[#ff0000] text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0">
              SD
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 mb-2">
                <Code2 className="h-3.5 w-3.5" />
                Creator & Developer
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
                Shahid Developer
              </h1>
              <p className="text-base text-[#606060] dark:text-[#aaaaaa] mt-1 font-medium">
                Lead Developer & Creator of YouTubeFreeToolkit
              </p>
            </div>
          </div>

          <p className="mt-6 text-base sm:text-lg text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">
            I am a full-stack developer dedicated to building transparent, high-utility, and policy-compliant tools
            for YouTube creators. I created YouTubeFreeToolkit to provide creators with free, reliable research utilities
            without paywalls, shady extensions, or misleading download promises.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-2 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000] transition-colors shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#ff0000]" />
              About Our Platform
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-2 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000] transition-colors shadow-sm"
            >
              <Mail className="h-3.5 w-3.5 text-[#ff0000]" />
              Contact Shahid
            </Link>
          </div>
        </div>
      </section>

      {/* Experience & Principles */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-[#ff0000] dark:text-red-400 font-bold text-sm mb-3">
              <Code2 className="h-5 w-5" />
              Technical & Platform Background
            </div>
            <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              Extensive hands-on experience building web applications integrated with the official{' '}
              <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Data API v3</strong> and{' '}
              <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Analytics API</strong>. Focused on quota efficiency,
              ephemeral token security, and strict separation between public metadata lookups and channel-owner OAuth verification.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3">
              <ShieldCheck className="h-5 w-5" />
              Policy-First Philosophy
            </div>
            <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              We never host video downloaders, audio rippers, or private content bypasses. Our tools operate within
              the documented YouTube API Services Terms of Service and Google Developer policies, ensuring creators and
              users stay protected.
            </p>
          </div>
        </div>

        {/* Editorial Standards & Fact Verification */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#151515] p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Editorial Standards & Fact Verification Methodology
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            <p>
              Every article and technical guide on YouTubeFreeToolkit undergoes rigorous editorial verification:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">Official Documentation First:</strong> Policy rules (such as YPP eligibility, watch hours qualification, and Shorts thresholds) are verified directly against official Google and YouTube Help Centers.
              </li>
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">Clear Distinction of Signals:</strong> We strictly distinguish between public API signals (inferred indicators) and verified owner data from YouTube Studio. We never promote undocumented hacks or view-source scraping myths.
              </li>
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">AI-Assisted Research Disclosure:</strong> While AI tools may assist in initial topic research and structure drafting, all published content is reviewed, fact-checked, code-audited, and formatted by Shahid Developer.
              </li>
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">Rapid Error Correction:</strong> If YouTube updates a policy or threshold, we promptly update our guides and tools. Feedback can be submitted directly via our contact form.
              </li>
            </ul>
          </div>
        </div>

        {/* Authored Guides */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Guides Authored by Shahid
            </h2>
            <Link
              href="/blog"
              className="text-xs font-semibold text-[#ff0000] dark:text-red-400 hover:underline flex items-center gap-1"
            >
              All Articles <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 shadow-sm hover:border-[#ff0000]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#ff0000] dark:text-red-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors mt-1.5 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e5e5e5] dark:border-[#272727] flex items-center justify-between text-[11px] text-[#909090] dark:text-[#717171]">
                  <span>{post.readTime}</span>
                  <span>Updated {post.updatedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
