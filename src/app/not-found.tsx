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
    <div className="min-h-[70vh] bg-[#f9f9f9] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] py-16 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
            <span>404</span> Not Found
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-2xl">
            The link may be outdated, mistyped, or removed. {SITE_CONFIG.name} only publishes creator tools,
            guides, and legal pages — we do not host video downloads.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Try these popular links instead</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/tools" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">
                All YouTube creator tools
              </Link>
              <span className="text-[#606060] dark:text-[#aaaaaa]"> — {TOOLS_REGISTRY.length} free utilities</span>
            </li>
            <li>
              <Link
                href="/tools/monetization-checker"
                className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold"
              >
                YouTube Monetization Checker
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">
                Creator guides & blog
              </Link>
            </li>
            <li>
              <Link href="/" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">
                Home
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 shadow-sm max-w-xl">
          <h2 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2.5">Featured tools</h2>
          <ul className="space-y-2 text-sm text-[#606060] dark:text-[#aaaaaa]">
            {popular.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-[#909090] dark:text-[#717171]">
          Wrong URL on our site?{' '}
          <Link href="/contact" className="underline hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]">Contact us</Link> so we can add a redirect.
        </p>
      </div>
    </div>
  );
}
