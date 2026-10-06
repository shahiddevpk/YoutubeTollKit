import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd(), 'src');

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx|ts|css)$/.test(name)) files.push(p);
  }
  return files;
}

const replacements = [
  ['min-h-screen bg-slate-950 text-slate-100', 'min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'],
  ['min-h-screen bg-slate-950 py', 'min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 py'],
  ['min-h-screen bg-slate-950 ', 'min-h-screen bg-slate-50 dark:bg-slate-950 '],
  ['border-slate-800/80', 'border-slate-200 dark:border-slate-800/80'],
  ['border-slate-800/60', 'border-slate-200 dark:border-slate-800/60'],
  ['border-slate-800', 'border-slate-200 dark:border-slate-800'],
  ['bg-slate-950/95', 'bg-white/95 dark:bg-slate-950/95'],
  ['bg-slate-950/70', 'bg-slate-50 dark:bg-slate-950/70'],
  ['bg-slate-950/60', 'bg-slate-50 dark:bg-slate-950/60'],
  ['bg-slate-950', 'bg-slate-50 dark:bg-slate-950'],
  ['bg-slate-900/80', 'bg-white dark:bg-slate-900/80'],
  ['bg-slate-900/60', 'bg-slate-100 dark:bg-slate-900/60'],
  ['bg-slate-900/50', 'bg-slate-100 dark:bg-slate-900/50'],
  ['bg-slate-900/40', 'bg-slate-100 dark:bg-slate-900/40'],
  ['bg-slate-900/30', 'bg-slate-100 dark:bg-slate-900/30'],
  ['bg-slate-900', 'bg-slate-100 dark:bg-slate-900'],
  ['text-slate-100', 'text-slate-900 dark:text-slate-100'],
  ['text-slate-200', 'text-slate-800 dark:text-slate-200'],
  ['text-slate-300', 'text-slate-700 dark:text-slate-300'],
  ['hover:text-white', 'hover:text-slate-900 dark:hover:text-white'],
  ['placeholder-slate-500', 'placeholder-slate-400 dark:placeholder-slate-500'],
  ['border-slate-700', 'border-slate-300 dark:border-slate-700'],
  ['bg-slate-800', 'bg-slate-200 dark:bg-slate-800'],
  ['hover:bg-slate-800', 'hover:bg-slate-200 dark:hover:bg-slate-800'],
  ['hover:bg-slate-900', 'hover:bg-slate-100 dark:hover:bg-slate-900'],
  ['hover:border-slate-700', 'hover:border-slate-400 dark:hover:border-slate-700'],
  ['hover:border-slate-600', 'hover:border-slate-400 dark:hover:border-slate-600'],
  ['shadow-inner', 'shadow-sm dark:shadow-inner'],
];

/** Headings / body on page — keep buttons on red as text-white */
function fixTextWhite(content) {
  return content
    .replace(/class="([^"]*)"/g, (full, classes) => {
      if (!classes.includes('text-white')) return full;
      if (/bg-red|text-white font-bold text-white|text-white shadow|text-white hover|text-white transition|text-white font-mono|text-white font-black|text-white flex|text-white">/.test(classes)) {
        if (classes.includes('bg-red') || classes.includes('ToolPrimary') || /rounded-xl bg-red/.test(classes)) {
          return full;
        }
      }
      if (classes.includes('dark:text-white')) return full;
      const next = classes.replace(/\btext-white\b/g, 'text-slate-900 dark:text-white');
      return `class="${next}"`;
    })
    .replace(/className="([^"]*)"/g, (full, classes) => {
      if (!classes.includes('text-white')) return full;
      if (classes.includes('dark:text-white')) return full;
      if (classes.includes('bg-red-600') || classes.includes('bg-red-500') || classes.includes('text-white font-bold text-white')) {
        const parts = classes.split(' ');
        const isRedButton = parts.some((c) => c.startsWith('bg-red-'));
        if (isRedButton) return full;
      }
      const next = classes.replace(/\btext-white\b/g, 'text-slate-900 dark:text-white');
      return `className="${next}"`;
    });
}

let changed = 0;
for (const file of walk(root)) {
  if (file.includes('apply-theme')) continue;
  let text = readFileSync(file, 'utf8');
  const orig = text;
  for (const [from, to] of replacements) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  text = fixTextWhite(text);
  if (text !== orig) {
    writeFileSync(file, text);
    changed++;
    console.log('updated', file.replace(process.cwd(), ''));
  }
}

console.log('files changed:', changed);
