import { THEME_STORAGE_KEY } from '@/lib/theme-storage';

/** Runs before paint to avoid theme flash. Default: dark unless user chose light or system. */
export function ThemeScript() {
  const script = `
(function () {
  try {
    var key = '${THEME_STORAGE_KEY}';
    var pref = localStorage.getItem(key);
    var dark = true;
    if (pref === 'light') dark = false;
    else if (pref === 'dark') dark = true;
    else if (pref === 'system') dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
