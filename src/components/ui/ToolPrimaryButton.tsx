import React from 'react';
import { Loader2 } from 'lucide-react';
import { toolPrimaryButtonClass } from '@/lib/tool-ui';
import { cn } from '@/lib/utils';

type ToolPrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingLabel?: string;
};

export function ToolPrimaryButton({
  loading = false,
  loadingLabel = 'Loading…',
  className,
  children,
  disabled,
  ...props
}: ToolPrimaryButtonProps) {
  return (
    <button
      className={cn(toolPrimaryButtonClass, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
