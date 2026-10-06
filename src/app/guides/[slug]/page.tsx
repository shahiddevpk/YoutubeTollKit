import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllGuideSlugs, getGuideBySlug } from '@/lib/guides-registry';
import { getBlogPostBySlug } from '@/lib/blog-registry';
import { getToolBySlug, SITE_CONFIG } from '@/lib/tools-registry';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { defaultRobots } from '@/lib/seo-site-config';
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
  const canonicalUrl = `${SITE_CONFIG.url}/guides/${guide.slug}`;
  const guideOgImage = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(guide.title)}&desc=${encodeURIComponent(guide.metaDescription.slice(0, 120))}`;
  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    keywords: [guide.primaryKeyword],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_CONFIG.name,
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: guideOgImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
    robots: defaultRobots(),
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Guides', url: `${SITE_CONFIG.url}/guides` },
    { name: guide.title, url: `${SITE_CONFIG.url}/guides/${guide.slug}` },
  ]);

  return (
    <article className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/guides" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">Guides</Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">{guide.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">{guide.title}</h1>
          <p className="mt-3 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">{guide.intro}</p>
          <p className="mt-3 text-xs text-[#909090] dark:text-[#717171]">Last updated {guide.updatedAt}</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {guide.sections.map((section) => (
          <ProseBlock key={section.id} id={section.id} heading={section.heading} paragraphs={section.paragraphs} />
        ))}

        <section className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">Free tools in this hub</h2>
          <ul className="space-y-2.5 text-sm">
            {tools.map((tool) =>
              tool ? (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">
                    {tool.name}
                  </Link>
                  <span className="text-[#606060] dark:text-[#aaaaaa]"> — {tool.description.slice(0, 100)}…</span>
                </li>
              ) : null
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">Related creator articles</h2>
          <ul className="space-y-3">
            {articles.map((post) => (
              <li key={post.slug} className="text-sm">
                <Link href={`/blog/${post.slug}`} className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  {post.title}
                </Link>
                <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] mt-0.5">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>

        {guide.faqs.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-5 py-4 transition-all">
                  <summary className="cursor-pointer font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-[#909090] dark:text-[#717171] group-open:rotate-180 transition-transform text-xs ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <p className="text-sm text-[#606060] dark:text-[#aaaaaa] pt-4 border-t border-[#e5e5e5] dark:border-[#272727]">
          <Link href="/guides" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">← All guide hubs</Link>
          {' · '}
          <Link href="/blog" className="hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">Blog index</Link>
          {' · '}
          <Link href="/tools" className="hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">Tools directory</Link>
        </p>
      </div>
    </article>
  );
}
