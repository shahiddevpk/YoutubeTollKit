import Link from 'next/link';
import { headers } from 'next/headers';
import { TOOLS_REGISTRY, SITE_CONFIG } from '@/lib/tools-registry';
import { logNotFoundRequest } from '@/lib/not-found-monitor';
import { noindexFollowRobots } from '@/lib/seo-site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: `The page you requested is not on ${SITE_CONFIG.name}. Browse free YouTube creator tools, guides, and policy pages.`,
  robots: noindexFollowRobots(),
};

export default async function NotFound() {
  const headerList = await headers();
  const path = headerList.get('x-request-path') ?? 'unknown';
  logNotFoundRequest(path, headerList.get('referer'));

  const popular = TOOLS_REGISTRY.filter((t) => t.featured).slice(0, 5);

  return (
    <div className="min-h-[60vh] bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Error 404</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Page not found</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            The link may be outdated, mistyped, or removed. {SITE_CONFIG.name} only publishes creator tools,
            guides, and legal pages — we do not host video downloads or WordPress-style attachment URLs.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">Try these instead</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/tools" className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline">
                All YouTube creator tools
              </Link>
              <span className="text-slate-500"> — {TOOLS_REGISTRY.length} free utilities</span>
            </li>
            <li>
              <Link
                href="/tools/monetization-checker"
                className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline"
              >
                YouTube Monetization Checker
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline">
                Creator guides & blog
              </Link>
            </li>
            <li>
              <Link href="/" className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-white mb-2">Popular tools</h2>
          <ul className="space-y-1.5 text-sm text-slate-400">
            {popular.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="hover:text-slate-200">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-slate-500">
          Wrong URL on our site?{' '}
          <Link href="/contact" className="underline hover:text-slate-400">Contact us</Link> so we can add a redirect.
        </p>
      </div>
    </div>
  );
}
