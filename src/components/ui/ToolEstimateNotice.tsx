import React from 'react';

/** One-line disclaimer for calculators and unofficial data tools. */
export function ToolEstimateNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
      {children}
    </p>
  );
}
