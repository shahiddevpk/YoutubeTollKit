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
    <article className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-16">
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

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <nav className="text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-700 dark:text-slate-300">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools" className="hover:text-slate-700 dark:text-slate-300">Tools</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700 dark:text-slate-300">{tool.shortTitle}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{tool.name}</h1>
        {tool.headline !== tool.name && (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{tool.headline}</p>
        )}
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">{tool.description}</p>
        <p className="mt-3 text-xs text-slate-500">
          Last updated {tool.updatedAt}.{' '}
          <Link href="/compliance" className="text-red-400/90 hover:text-red-400 underline">
            Policy & limitations
          </Link>
        </p>
      </div>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-100 dark:bg-slate-900/80 p-4 sm:p-6">{children}</div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-sm">
        <section aria-labelledby="how-to-heading">
          <h2 id="how-to-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            How it works
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-400">
            {tool.howItWorks.map((step) => (
              <li key={step.step}>
                <span className="font-medium text-slate-800 dark:text-slate-200">{step.title}</span>
                {' — '}
                {step.description}
              </li>
            ))}
          </ol>
        </section>

        {guide && (
          <section className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-8" aria-label="Guide">
            {guide.sections.map((section) => (
              <ProseBlock key={section.heading} heading={section.heading} paragraphs={section.paragraphs} />
            ))}
          </section>
        )}

        <section className="grid gap-6 sm:grid-cols-2 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
              {tool.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Limitations</h2>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
              {tool.limitations.map((limitation, i) => (
                <li key={i}>{limitation}</li>
              ))}
            </ul>
          </div>
        </section>

        {tool.faqs.length > 0 && (
          <section className="border-t border-slate-200 dark:border-slate-800 pt-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/40 px-4 py-3"
                >
                  <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-200 list-none">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-slate-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Related tools</h2>
            <ul className="space-y-2">
              {relatedTools.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/tools/${related.slug}`}
                    className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline"
                  >
                    {related.name}
                  </Link>
                  <span className="text-slate-500 text-xs ml-2 hidden sm:inline">
                    — {related.description.slice(0, 72)}
                    {related.description.length > 72 ? '…' : ''}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link href="/tools" className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white">
                Browse all creator tools →
              </Link>
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
