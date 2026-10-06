import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllGuideSlugs, getGuideBySlug } from '@/lib/guides-registry';
import { getBlogPostBySlug } from '@/lib/blog-registry';
import { getToolBySlug, SITE_CONFIG } from '@/lib/tools-registry';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { ProseBlock } from '@/components/content/ProseBlock';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: 'Guide Not Found | YouTubeFreeToolkit' };
  }
  return {
    title: { absolute: `${guide.metaTitle} | YouTubeFreeToolkit` },
    description: guide.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_CONFIG.url}/guides/${guide.slug}`,
    },
  };
}

export default async function GuideHubPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const tools = guide.toolSlugs.map((s) => getToolBySlug(s)).filter(Boolean);
  const articles = guide.blogSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const faqSchema = generateFAQSchema(guide.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Guides', url: `${SITE_CONFIG.url}/guides` },
    { name: guide.title, url: `${SITE_CONFIG.url}/guides/${guide.slug}` },
  ]);

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-16">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-700 dark:text-slate-300">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/guides" className="hover:text-slate-700 dark:text-slate-300">Guides</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700 dark:text-slate-300">{guide.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{guide.title}</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">{guide.intro}</p>
          <p className="mt-2 text-xs text-slate-500">Last updated {guide.updatedAt}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {guide.sections.map((section) => (
          <ProseBlock key={section.id} id={section.id} heading={section.heading} paragraphs={section.paragraphs} />
        ))}

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Free tools in this hub</h2>
          <ul className="space-y-2 text-sm">
            {tools.map((tool) =>
              tool ? (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline">
                    {tool.name}
                  </Link>
                  <span className="text-slate-500"> — {tool.description.slice(0, 100)}…</span>
                </li>
              ) : null
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Related articles</h2>
          <ul className="space-y-3">
            {articles.map((post) => (
              <li key={post.slug} className="text-sm">
                <Link href={`/blog/${post.slug}`} className="font-medium text-slate-800 dark:text-slate-200 hover:text-red-400">
                  {post.title}
                </Link>
                <p className="text-slate-500 mt-0.5">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>

        {guide.faqs.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Frequently asked questions</h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, i) => (
                <details key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 px-4 py-3">
                  <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-200 list-none">{faq.question}</summary>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <p className="text-sm text-slate-500">
          <Link href="/guides" className="text-red-400 hover:text-red-300">← All guide hubs</Link>
          {' · '}
          <Link href="/blog" className="hover:text-slate-400">Blog index</Link>
          {' · '}
          <Link href="/tools" className="hover:text-slate-400">Tools directory</Link>
        </p>
      </div>
    </article>
  );
}
