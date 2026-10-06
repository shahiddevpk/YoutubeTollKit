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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <section className="border-b border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Creator guide hubs</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            These pillar pages organize our monetization, SEO, and troubleshooting content. Each hub explains
            limitations, links to matching free tools, and points to longer blog articles. Updated regularly as
            YouTube policies and studio features change.
          </p>
        </div>
      </section>

      <ul className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        {GUIDE_HUBS.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/40 p-5 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{guide.title}</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{guide.intro.slice(0, 220)}…</p>
              <span className="mt-3 inline-block text-sm text-red-400">Read hub →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
