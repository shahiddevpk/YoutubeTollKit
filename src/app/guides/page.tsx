import Link from 'next/link';
import type { Metadata } from 'next';
import { GUIDE_HUBS } from '@/lib/guides-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots } from '@/lib/seo-site-config';
import { generateFAQSchema } from '@/lib/seo';


export const metadata: Metadata = {
  title: 'YouTube Creator Guide Hubs',
  description:
    'Pillar hubs for YouTube monetization, SEO metadata, and policy-safe troubleshooting — with links to free tools and in-depth articles.',
  alternates: { canonical: `${SITE_CONFIG.url}/guides` },
  robots: defaultRobots(),
  openGraph: {
    title: 'YouTube Creator Guide Hubs',
    description:
      'Pillar hubs for YouTube monetization, SEO metadata, and policy-safe troubleshooting — with links to free tools and in-depth articles.',
    url: `${SITE_CONFIG.url}/guides`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Creator Guide Hubs',
    description: 'Monetization, SEO, and troubleshooting hubs with free creator tools.',
  },
};

const HUB_FAQS = [
  {
    question: 'What is a guide hub?',
    answer:
      'A guide hub is an overview page for one big topic. It explains the essentials in one place, then links to the free tools and detailed articles that cover each part, so you can follow a logical path instead of jumping between unrelated posts.',
  },
  {
    question: 'Which hub should I start with?',
    answer:
      'Start with the Monetization hub if you want to join or understand the YouTube Partner Program, the SEO hub if your videos are not being found, and the Troubleshooting hub if you need to look up channel details or understand a confusing public metric.',
  },
  {
    question: 'Are the hubs kept up to date?',
    answer:
      'Yes. Each hub shows when it was last updated, and we update it when YouTube changes eligibility thresholds, metadata limits or Studio features. Always confirm account-specific details in YouTube Studio.',
  },
];

const faqSchema = generateFAQSchema(HUB_FAQS);

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#cc0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
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
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#cc0000] dark:text-red-400 group-hover:underline">
                Read hub →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <div>
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">How to use these hubs</h2>
          <div className="mt-3 space-y-3 text-sm text-[#3f3f3f] dark:text-[#cccccc] leading-relaxed">
            <p>
              Each hub is written for one goal. Read the overview first to understand the rules and the numbers that
              matter, then use the linked tools to check your own channel or video, and finally open the detailed
              articles for the steps that apply to you. Every hub states what public data can and cannot show, so you
              know when a result is an estimate and when you need to confirm it in YouTube Studio.
            </p>
            <p>
              The <Link href="/guides/youtube-monetization" className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">Monetization hub</Link>{' '}
              covers Partner Program requirements, RPM and realistic earning estimates. The{' '}
              <Link href="/guides/youtube-seo" className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">SEO hub</Link>{' '}
              walks through titles, descriptions, tags, hashtags and chapters. The{' '}
              <Link href="/guides/youtube-troubleshooting" className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">Troubleshooting hub</Link>{' '}
              explains channel IDs, public counters and policy-safe ways to research other channels.
            </p>
            <p>
              Prefer to jump straight in? Browse <Link href="/tools" className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">all tools by category</Link>{' '}
              or read the latest articles on the <Link href="/blog" className="font-semibold text-[#cc0000] dark:text-red-400 hover:underline">blog</Link>.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Frequently asked questions</h2>
          <div className="mt-3 divide-y divide-[#e5e5e5] dark:divide-[#272727]">
            {HUB_FAQS.map((f) => (
              <div key={f.question} className="py-4">
                <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{f.question}</h3>
                <p className="mt-1.5 text-sm text-[#3f3f3f] dark:text-[#cccccc] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
