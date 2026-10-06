import React from 'react';

interface ProseBlockProps {
  heading: string;
  paragraphs: string[];
  id?: string;
}

/** Lightweight semantic prose — no extra client JS. */
export function ProseBlock({ heading, paragraphs, id }: ProseBlockProps) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{heading}</h2>
      {paragraphs.map((text, i) => (
        <p key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {text}
        </p>
      ))}
    </section>
  );
}
