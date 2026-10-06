import Link from 'next/link';
import type { Metadata } from 'next';
import { GUIDE_HUBS } from '@/lib/guides-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'YouTube Creator Guide Hubs | YouTubeFreeToolkit',
  description:
    'Pillar hubs for YouTube monetization, SEO metadata, and policy-safe troubleshooting — with links to free tools and in-depth articles.',
  alternates: { canonical: `${SITE_CONFIG.url}/guides` },
};

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
            <span>▶</span> Strategic Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            Creator guide hubs
          </h1>
          <p className="mt-3 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-2xl">
            These pillar pages organize our monetization, SEO, and troubleshooting content. Each hub explains
            limitations, links to matching free tools, and points to longer blog articles.
          </p>
        </div>
      </section>

      <ul className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        {GUIDE_HUBS.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group block rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 hover:border-[#ff0000]/60 dark:hover:border-[#ff0000]/40 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{guide.intro.slice(0, 220)}…</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff0000] dark:text-red-400 group-hover:underline">
                Read hub →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
