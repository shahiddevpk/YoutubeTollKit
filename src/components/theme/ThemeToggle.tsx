'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  applyThemeToDocument,
  readStoredTheme,
  subscribeTheme,
  type ThemePreference,
} from '@/lib/theme-storage';
import { cn } from '@/lib/utils';

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const preference = useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    () => 'dark' as ThemePreference
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (preference !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyThemeToDocument('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference]);

  const select = (value: ThemePreference) => {
    applyThemeToDocument(value);
    setOpen(false);
  };

  const current = OPTIONS.find((o) => o.value === preference) ?? OPTIONS[0];

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#1f1f1f] px-2.5 py-1.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#2e2e2e] transition-colors cursor-pointer"
        aria-label="Color theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Appearance: light, dark, or match system"
      >
        <current.Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="hidden sm:inline font-medium">{current.label}</span>
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
            className="absolute right-0 z-50 mt-1 min-w-[9rem] rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] py-1 shadow-xl animate-in fade-in duration-100"
          >
            {OPTIONS.map(({ value, label, Icon }) => {
              const selected = preference === value;
              return (
                <li key={value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => select(value)}
                    className={cn(
                      'flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer',
                      selected
                        ? 'bg-[#ff0000]/10 text-[#ff0000] dark:bg-[#ff0000]/20 dark:text-red-400 font-semibold'
                        : 'text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
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
