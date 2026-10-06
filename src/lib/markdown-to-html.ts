/** Lightweight markdown subset for blog + guide bodies (server-only). */
export function markdownToHtml(markdown: string): string {
  let html = markdown.trim();

  html = html.replace(
    /^## (.*)$/gim,
    '<h2 id="$1" class="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-8 mb-3">$1</h2>'
  );
  html = html.replace(
    /^### (.*)$/gim,
    '<h3 class="text-lg font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mt-5 mb-2">$1</h3>'
  );
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/gim, '<em class="text-[#606060] dark:text-[#aaaaaa]">$1</em>');
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="rounded bg-[#f2f2f2] dark:bg-[#272727] px-1.5 py-0.5 font-mono text-xs text-[#cc0000] dark:text-[#ff4e4e] border border-[#e5e5e5] dark:border-[#272727]">$1</code>'
  );
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" class="text-[#cc0000] hover:text-[#ff0000] dark:text-[#ff4e4e] dark:hover:text-[#ff7878] underline">$1</a>'
  );
  html = html.replace(/^- (.*)$/gim, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(
    /(<li[\s\S]*?<\/li>)+/gim,
    (block) => `<ul class="my-3 space-y-1 text-[#0f0f0f] dark:text-[#f1f1f1]">${block}</ul>`
  );
  html = html.replace(/\n\n---\n\n/gim, '<hr class="border-[#e5e5e5] dark:border-[#272727] my-6" />');
  html = html.replace(
    /\n\n/gim,
    '</p><p class="my-3 text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">'
  );
  html = `<p class="my-3 text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">${html}</p>`;

  return html;
}
