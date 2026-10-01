import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tools';
import { SITE_CONFIG, getToolBySlug } from '@/lib/tools-registry';
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import { ToolCard } from '@/components/tools/ToolCard';
import { DynamicIcon } from '@/components/tools/DynamicIcon';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const webAppSchema = generateWebApplicationSchema(tool);
  const faqSchema = generateFAQSchema(tool.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Tools', url: `${SITE_CONFIG.url}/tools` },
    { name: tool.name, url: `${SITE_CONFIG.url}/tools/${tool.slug}` },
  ]);

  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Inject Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Header / Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 pt-8 pb-12">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-4xl bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-200 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/tools" className="hover:text-slate-200 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-200 font-medium truncate">{tool.shortTitle}</span>
          </nav>

          {/* Tool Title & Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-0.5 text-xs font-bold text-red-400 border border-red-500/20">
              <Sparkles className="h-3 w-3" />
              100% Free Creator Tool
            </span>
            <span className="rounded-full bg-slate-800/80 px-3 py-0.5 text-xs font-medium text-slate-300 capitalize border border-slate-700/50">
              {tool.category}
            </span>
            {tool.badge && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                {tool.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {tool.headline}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {tool.description}
          </p>
        </div>
      </section>

      {/* Main Interactive Tool Container */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to Use {tool.name}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Simple 3-step workflow designed for fast creator analytics without complex setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howItWorks.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/15 text-red-400 font-bold text-base border border-red-500/20 mb-4">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features & Limitations Split */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Features */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Key Capabilities & Features</h3>
            </div>
            <ul className="space-y-3">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Compliance & Accuracy */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Policy Compliance & Transparency</h3>
            </div>
            <ul className="space-y-3">
              {tool.limitations.map((limitation, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                  <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{limitation}</span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Operates within official YouTube API Services Guidelines and Google Search quality guidelines.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {tool.faqs.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-red-400" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {tool.faqs.map((faq, index) => (
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

      {/* Related Free Tools Grid */}
      {relatedTools.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Related YouTube Creator Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore more 100% free tools to optimize your channel and video reach.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              View all tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedTools.slice(0, 3).map((related) => (
              <ToolCard key={related.slug} tool={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
