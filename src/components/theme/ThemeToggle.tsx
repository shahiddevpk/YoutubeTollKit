'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  applyThemeToDocument,
  readStoredTheme,
  type ThemePreference,
} from '@/lib/theme-storage';
import { cn } from '@/lib/utils';

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>('light');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPreference(readStoredTheme());
  }, []);

  useEffect(() => {
    if (preference !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyThemeToDocument('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference]);

  const select = (value: ThemePreference) => {
    setPreference(value);
    applyThemeToDocument(value);
    setOpen(false);
  };

  const current = OPTIONS.find((o) => o.value === preference) ?? OPTIONS[0];

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-100 dark:bg-slate-900 dark:text-slate-800 dark:text-slate-200 dark:hover:bg-slate-200 dark:bg-slate-800 transition-colors"
        aria-label="Color theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Appearance: light, dark, or match system"
      >
        <current.Icon className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline text-xs font-medium">{current.label}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close theme menu"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label="Choose color theme"
            className="absolute right-0 z-50 mt-1 min-w-[9.5rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-100 dark:bg-slate-900"
          >
            {OPTIONS.map(({ value, label, Icon }) => {
              const selected = preference === value;
              return (
                <li key={value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => select(value)}
                    className={cn(
                      'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                      selected
                        ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-800 dark:text-slate-200 dark:hover:bg-slate-200 dark:bg-slate-800'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
