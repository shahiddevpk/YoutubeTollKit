import React from 'react';

/** One-line disclaimer for calculators and unofficial data tools. */
export function ToolEstimateNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[#909090] dark:text-[#717171] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-4">
      {children}
    </p>
  );
}
