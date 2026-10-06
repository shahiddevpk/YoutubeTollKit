import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tools';
import { SITE_CONFIG, getToolBySlug } from '@/lib/tools-registry';
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from '@/lib/seo';
import { getToolGuide } from '@/lib/tool-guides';
import { ProseBlock } from '@/components/content/ProseBlock';

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const guide = getToolGuide(tool.slug);
  const webAppSchema = generateWebApplicationSchema(tool);
  const faqSchema = generateFAQSchema(tool.faqs);
  const howToSchema = generateHowToSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Tools', url: `${SITE_CONFIG.url}/tools` },
    { name: tool.name, url: `${SITE_CONFIG.url}/tools/${tool.slug}` },
  ]);

  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t))
    .slice(0, 4);

  return (
    <article className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
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
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header section with proper alignment */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Tools</Link>
          <span className="mx-1.5">/</span>
          <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-medium">{tool.shortTitle}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
          {tool.name}
        </h1>
        {tool.headline !== tool.name && (
          <p className="mt-2 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa]">{tool.headline}</p>
        )}
        <p className="mt-3 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">{tool.description}</p>
        <p className="mt-3 text-xs text-[#909090] dark:text-[#717171]">
          Last updated {tool.updatedAt}.{' '}
          <Link href="/compliance" className="text-[#ff0000] dark:text-red-400 hover:underline">
            Policy & limitations
          </Link>
        </p>
      </div>

      {/* Primary Tool interactive surface */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="elevated-card rounded-2xl p-5 sm:p-7">
          {children}
        </div>
      </section>

      {/* Content & Education */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 text-sm">
        <section aria-labelledby="how-to-heading">
          <h2 id="how-to-heading" className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">
            How it works
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-[#606060] dark:text-[#aaaaaa]">
            {tool.howItWorks.map((step) => (
              <li key={step.step}>
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{step.title}</span>
                {' — '}
                {step.description}
              </li>
            ))}
          </ol>
        </section>

        {guide && (
          <section className="space-y-8 border-t border-[#e5e5e5] dark:border-[#272727] pt-8" aria-label="Guide">
            {guide.sections.map((section) => (
              <ProseBlock key={section.heading} heading={section.heading} paragraphs={section.paragraphs} />
            ))}
          </section>
        )}

        <section className="grid gap-6 sm:grid-cols-2 border-t border-[#e5e5e5] dark:border-[#272727] pt-8">
          <div>
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1.5 text-[#606060] dark:text-[#aaaaaa]">
              {tool.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">Limitations</h2>
            <ul className="list-disc list-inside space-y-1.5 text-[#606060] dark:text-[#aaaaaa]">
              {tool.limitations.map((limitation, i) => (
                <li key={i}>{limitation}</li>
              ))}
            </ul>
          </div>
        </section>

        {tool.faqs.length > 0 && (
          <section className="border-t border-[#e5e5e5] dark:border-[#272727] pt-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-theme bg-card px-4 py-3.5 transition-all"
                >
                  <summary className="cursor-pointer font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-[#909090] dark:text-[#717171] group-open:rotate-180 transition-transform text-xs ml-2">▼</span>
                  </summary>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-2.5">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="border-t border-[#e5e5e5] dark:border-[#272727] pt-8">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">Related tools</h2>
            <ul className="space-y-2">
              {relatedTools.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/tools/${related.slug}`}
                    className="text-[#ff0000] dark:text-red-400 hover:underline font-medium"
                  >
                    {related.name}
                  </Link>
                  <span className="text-[#606060] dark:text-[#aaaaaa] text-xs ml-2 hidden sm:inline">
                    — {related.description.slice(0, 72)}
                    {related.description.length > 72 ? '…' : ''}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link href="/tools" className="text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                Browse all creator tools →
              </Link>
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
