interface TocItem {
  id: string;
  title: string;
}

/** Lightweight markdown subset for blog + guide bodies (server-only). */
export function markdownToHtml(markdown: string, tableOfContents?: TocItem[]): string {
  let html = markdown.trim();

  // Parse markdown tables first before paragraphs split
  html = html.replace(/(?:^\|.+?\|\r?\n?)+/gm, (tableBlock) => {
    const rows = tableBlock.trim().split(/\r?\n/).map((r) => r.trim()).filter(Boolean);
    if (rows.length < 2) return tableBlock;

    const isSep = /^\|(?:\s*:?-+:?\s*\|)+$/.test(rows[1]);
    if (!isSep) return tableBlock;

    const parseCells = (row: string) => row.slice(1, -1).split('|').map((c) => c.trim());

    const headers = parseCells(rows[0]);
    const bodyRows = rows.slice(2).map(parseCells);

    const ths = headers
      .map(
        (h) =>
          `<th class="border border-[#e5e5e5] dark:border-[#272727] bg-[#f5f5f5] dark:bg-[#202020] px-3.5 py-2.5 text-left font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">${h}</th>`
      )
      .join('');

    const trs = bodyRows
      .map((cells) => {
        const tds = cells
          .map(
            (c) =>
              `<td class="border border-[#e5e5e5] dark:border-[#272727] px-3.5 py-2 text-[#0f0f0f] dark:text-[#f1f1f1]">${c}</td>`
          )
          .join('');
        return `<tr class="hover:bg-[#f9f9f9] dark:hover:bg-[#181818] transition-colors">${tds}</tr>`;
      })
      .join('');

    return `\n\n<div class="my-6 overflow-x-auto rounded-xl border border-[#e5e5e5] dark:border-[#272727]"><table class="w-full text-xs sm:text-sm border-collapse"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>\n\n`;
  });

  // Parse H2 with ID matching Table of Contents
  html = html.replace(/^## (.*)$/gim, (_, headingText: string) => {
    const raw = headingText.trim();
    const cleanRaw = raw.replace(/^\d+[\.\)]\s*/, '').toLowerCase().trim();

    const matched = tableOfContents?.find((item) => {
      const cleanItemTitle = item.title.replace(/^\d+[\.\)]\s*/, '').toLowerCase().trim();
      return (
        item.title.toLowerCase() === raw.toLowerCase() ||
        cleanItemTitle === cleanRaw ||
        item.id === raw.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      );
    });

    const slugId = matched
      ? matched.id
      : raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return `<h2 id="${slugId}" class="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-10 mb-3 scroll-mt-24">${raw}</h2>`;
  });

  // Parse H3 with clean slug ID
  html = html.replace(/^### (.*)$/gim, (_, headingText: string) => {
    const raw = headingText.trim();
    const slugId = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h3 id="${slugId}" class="text-base sm:text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-6 mb-2 scroll-mt-24">${raw}</h3>`;
  });

  // Bold
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">$1</strong>'
  );

  // Italics
  html = html.replace(/\*(.*?)\*/gim, '<em class="text-[#606060] dark:text-[#aaaaaa]">$1</em>');

  // Inline code
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="rounded bg-[#f2f2f2] dark:bg-[#272727] px-1.5 py-0.5 font-mono text-xs text-[#cc0000] dark:text-[#ff4e4e] border border-[#e5e5e5] dark:border-[#272727]">$1</code>'
  );

  // Links (Rank Math: new_window_external_links)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, (_, label: string, href: string) => {
    const isExternal = /^https?:\/\//i.test(href.trim());
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}"${externalAttrs} class="text-[#cc0000] hover:text-[#ff0000] dark:text-[#ff4e4e] dark:hover:text-[#ff7878] underline">${label}</a>`;
  });

  // Unordered list items
  html = html.replace(/^- (.*)$/gim, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(
    /(<li[\s\S]*?<\/li>)+/gim,
    (block) => `<ul class="my-3 space-y-1.5 text-[#0f0f0f] dark:text-[#f1f1f1]">${block}</ul>`
  );

  // Horizontal rules
  html = html.replace(/\n\n---\n\n/gim, '<hr class="border-[#e5e5e5] dark:border-[#272727] my-8" />');

  // Paragraphs
  html = html.replace(
    /\n\n/gim,
    '</p><p class="my-3 text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">'
  );

  html = `<p class="my-3 text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">${html}</p>`;

  // Clean up empty paragraphs around block elements
  html = html.replace(/<p class="[^"]*">\s*<\/p>/gim, '');
  html = html.replace(/<p class="[^"]*">(<(?:div|table|h2|h3|ul|hr)[\s\S]*?)<\/p>/gim, '$1');

  return html;
}
