export const THEME_STORAGE_KEY = 'yft-theme';

export type ThemePreference = 'light' | 'dark' | 'system';

const themeListeners = new Set<() => void>();

function emitThemeChange(): void {
  themeListeners.forEach((listener) => listener());
}

/** Subscribe for theme preference updates (same tab + other tabs). */
export function subscribeTheme(onStoreChange: () => void): () => void {
  themeListeners.add(onStoreChange);
  if (typeof window === 'undefined') {
    return () => themeListeners.delete(onStoreChange);
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    themeListeners.delete(onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function resolveDarkClass(preference: ThemePreference | null): boolean {
  if (preference === 'dark') return true;
  if (preference === 'light') return false;
  if (preference === 'system') {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true;
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
  emitThemeChange();
}

export function readStoredTheme(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* ignore */
  }
  return 'dark';
}
