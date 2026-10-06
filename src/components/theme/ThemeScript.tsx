import { THEME_STORAGE_KEY } from '@/lib/theme-storage';

/** Runs before paint to avoid light/dark flash. Default: light unless user chose dark or system+dark OS. */
export function ThemeScript() {
  const script = `
(function () {
  try {
    var key = '${THEME_STORAGE_KEY}';
    var pref = localStorage.getItem(key);
    var dark = false;
    if (pref === 'dark') dark = true;
    else if (pref === 'system') dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    else dark = false;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
