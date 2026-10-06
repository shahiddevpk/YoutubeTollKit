export const THEME_STORAGE_KEY = 'yft-theme';

export type ThemePreference = 'light' | 'dark' | 'system';

export function resolveDarkClass(preference: ThemePreference | null): boolean {
  if (preference === 'dark') return true;
  if (preference === 'light') return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyThemeToDocument(preference: ThemePreference): void {
  const root = document.documentElement;
  const isDark = resolveDarkClass(preference);
  root.classList.toggle('dark', isDark);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* private mode */
  }
}

export function readStoredTheme(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* ignore */
  }
  return 'light';
}
