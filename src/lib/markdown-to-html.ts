/** Lightweight markdown subset for blog + guide bodies (server-only). */
export function markdownToHtml(markdown: string): string {
  let html = markdown.trim();

  html = html.replace(
    /^## (.*)$/gim,
    '<h2 id="$1" class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">$1</h2>'
  );
  html = html.replace(
    /^### (.*)$/gim,
    '<h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-5 mb-2">$1</h3>'
  );
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/gim, '<em class="text-slate-700 dark:text-slate-800 dark:text-slate-200">$1</em>');
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-red-600 border border-slate-200 dark:bg-slate-100 dark:bg-slate-900 dark:text-red-400 dark:border-slate-200 dark:border-slate-800">$1</code>'
  );
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" class="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 underline">$1</a>'
  );
  html = html.replace(/^- (.*)$/gim, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(
    /(<li[\s\S]*?<\/li>)+/gim,
    (block) => `<ul class="my-3 space-y-1 text-slate-700 dark:text-slate-700 dark:text-slate-300">${block}</ul>`
  );
  html = html.replace(/\n\n---\n\n/gim, '<hr class="border-slate-200 dark:border-slate-800 my-6" />');
  html = html.replace(
    /\n\n/gim,
    '</p><p class="my-3 text-slate-700 dark:text-slate-700 dark:text-slate-300 leading-relaxed">'
  );
  html = `<p class="my-3 text-slate-700 dark:text-slate-700 dark:text-slate-300 leading-relaxed">${html}</p>`;

  return html;
}
