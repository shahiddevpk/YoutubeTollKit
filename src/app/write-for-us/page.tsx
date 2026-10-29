import React from 'react';
import Link from '@/components/link';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots } from '@/lib/seo-site-config';


export const metadata: Metadata = {
  title: 'Write for Us — Guest Post Guidelines',
  description:
    'Pitch an original, in-depth guest post on YouTube SEO, monetization or channel growth. Read our editorial guidelines and submission process.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/write-for-us`,
  },
  robots: defaultRobots(),
  openGraph: {
    title: 'Write for Us — YouTubeFreeToolkit',
    description:
      'Submit a guest post on YouTube SEO, monetization, or channel growth. We publish original, expert-level content and include a dofollow author backlink.',
    url: `${SITE_CONFIG.url}/write-for-us`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Write for Us', item: `${SITE_CONFIG.url}/write-for-us` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What topics does YouTubeFreeToolkit accept for guest posts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We accept original articles on YouTube SEO, monetization strategies, channel growth, YouTube Analytics, creator tools, thumbnail design, video production tips, and YouTube algorithm insights. We do not accept articles promoting video downloaders or tools that violate YouTube Terms of Service.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I get a backlink in my guest post?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every accepted guest post includes one dofollow backlink to your site in the author bio section, plus optional contextual links within the article where genuinely relevant and editorially appropriate.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long should a guest post be?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A minimum of 1,200 words. We prefer 1,500–2,500 words for in-depth guides and how-to articles. Thin content under 800 words will not be accepted.',
          },
        },
      ],
    },
  ],
};

const topics = [
  { title: 'YouTube SEO & Keyword Research', desc: 'Title optimization, tag strategies, description writing, search ranking factors.' },
  { title: 'YouTube Monetization', desc: 'YPP requirements, CPM/RPM explained, Super Chat, memberships, AdSense setup.' },
  { title: 'Channel Growth Strategies', desc: 'Niche selection, thumbnails, posting consistency, Shorts strategy, audience retention.' },
  { title: 'YouTube Analytics', desc: 'Reading Studio metrics, click-through rate, watch time, impressions, audience insights.' },
  { title: 'Creator Tools & Workflows', desc: 'Free tools for research, scripting, editing, scheduling, and publishing workflows.' },
  { title: 'YouTube Algorithm', desc: 'How recommendations work, ranking signals, what changed in recent updates.' },
];

const requirements = [
  'Original content not published elsewhere (no AI-generated filler, no spun articles)',
  'Minimum 1,200 words; 1,500–2,500 preferred for guides',
  'At least one practical takeaway or step-by-step section readers can act on immediately',
  'Factual claims backed by YouTube\'s own documentation or official creator resources',
  'No promotional links to paid tools, affiliate products in the body (author bio link is fine)',
  'No content promoting video or audio downloaders, piracy tools, or TOS-violating tactics',
  'Must include at least one relevant internal link to an existing tool or blog post on our site',
  'Images should be royalty-free or screenshots with source attribution',
];

export default function WriteForUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
        {/* Hero */}
        <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#606060] dark:text-[#a0a0a0]">
              <Link href="/" className="hover:text-[#ff0000] transition-colors">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-[#0f0f0f] dark:text-[#f1f1f1]">Write for Us</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#cc0000] dark:text-red-400 border border-[#ff0000]/20 mb-4">
              <span>✍</span> Guest Contributions Open
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
              Write for YouTubeFreeToolkit
            </h1>
            <p className="mt-4 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              We publish expert-level articles on YouTube SEO, monetization, and channel growth for a growing audience of YouTube creators and digital marketers. If you have deep knowledge in this space and want to reach that audience with a quality backlink in return, we want to hear from you.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">

          {/* What you get */}
          <section>
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-5">What You Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🔗', title: 'Dofollow Backlink', desc: 'One dofollow link to your site in your author bio on every accepted post.' },
                { icon: '👤', title: 'Author Bio', desc: 'Your name, photo, short bio, and links published with your article.' },
                { icon: '📈', title: 'Creator Audience', desc: 'Exposure to an audience of active YouTube creators and digital marketers.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5">
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">{title}</h3>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Topics we accept */}
          <section>
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-5">Topics We Accept</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
                  <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">{title}</h3>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-5">Submission Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#606060] dark:text-[#aaaaaa]">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-5">How the Process Works</h2>
            <ol className="space-y-4">
              {[
                { step: '01', title: 'Send a Pitch', desc: 'Email us a 2–3 sentence pitch: the title, the angle, and why it helps our readers. Include a link to one published sample of your writing.' },
                { step: '02', title: 'We Review Within 5 Days', desc: "We'll let you know if we want to move forward. If we do, we may suggest a revised angle or title." },
                { step: '03', title: 'Submit Your Draft', desc: 'Send the full draft in Google Docs or Markdown. Include your author bio (50–100 words), photo, and the URL you want linked.' },
                { step: '04', title: 'Editorial Review', desc: 'We review for accuracy, readability, and fit. We may request revisions — typically one round.' },
                { step: '05', title: 'Published', desc: "Once approved, your article goes live. We'll share the URL with you and keep it indexed permanently." },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-[#ff0000]/10 text-[#cc0000] dark:text-red-400 flex items-center justify-center text-xs font-black border border-[#ff0000]/20">
                    {step}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{title}</p>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-5">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: 'What topics does YouTubeFreeToolkit accept for guest posts?',
                  a: 'We accept original articles on YouTube SEO, monetization strategies, channel growth, YouTube Analytics, creator tools, thumbnail design, video production tips, and YouTube algorithm insights. We do not accept articles promoting video downloaders or tools that violate YouTube Terms of Service.',
                },
                {
                  q: 'Do I get a backlink in my guest post?',
                  a: 'Yes. Every accepted guest post includes one dofollow backlink to your site in the author bio section, plus optional contextual links within the article where genuinely relevant and editorially appropriate.',
                },
                {
                  q: 'How long should a guest post be?',
                  a: 'A minimum of 1,200 words. We prefer 1,500–2,500 words for in-depth guides and how-to articles. Thin content under 800 words will not be accepted.',
                },
                {
                  q: 'Can I republish my article on my own site after it goes live here?',
                  a: 'No. We require exclusivity — the article must not be published on any other site before or after publication on YouTubeFreeToolkit. You may link to the live article from your own site.',
                },
                {
                  q: 'Do you accept AI-generated articles?',
                  a: 'No. We only publish human-written content with genuine expertise behind it. Articles that appear AI-generated will be rejected without review.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-3.5">
                  <summary className="cursor-pointer font-semibold text-sm text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] list-none flex items-center justify-between">
                    <span>{q}</span>
                    <span className="text-[#606060] dark:text-[#a0a0a0] group-open:rotate-180 transition-transform text-xs ml-2">▼</span>
                  </summary>
                  <p className="mt-2.5 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-2.5">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-8 text-center">
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">Ready to Submit a Pitch?</h2>
            <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-5 max-w-md mx-auto">
              Send your 2–3 sentence pitch and a writing sample to our editorial team. We review all pitches within 5 business days.
            </p>
            <a
              href="mailto:contact@youtubefreetoolkit.com?subject=Guest Post Pitch"
              className="inline-flex items-center gap-2 rounded-xl bg-[#d40000] px-6 py-3 text-sm font-bold text-white hover:bg-[#cc0000] transition-colors"
            >
              Send Your Pitch →
            </a>
            <p className="mt-3 text-xs text-[#606060] dark:text-[#a0a0a0]">
              contact@youtubefreetoolkit.com — response within 5 business days
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
