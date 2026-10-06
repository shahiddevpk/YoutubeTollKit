'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Event-driven global dispatcher so non-React files (like api-client.ts) can also trigger toasts
const TOAST_EVENT = 'ytt_custom_toast_event';

export const toast = {
  show: (message: string, options?: { type?: ToastType; title?: string; duration?: number }) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent(TOAST_EVENT, {
        detail: {
          type: options?.type || 'info',
          title: options?.title,
          message,
          duration: options?.duration,
        },
      });
      window.dispatchEvent(event);
    }
  },
  warning: (message: string, options?: { title?: string; duration?: number }) => {
    toast.show(message, { ...options, type: 'warning' });
  },
  error: (message: string, options?: { title?: string; duration?: number }) => {
    toast.show(message, { ...options, type: 'error' });
  },
  success: (message: string, options?: { title?: string; duration?: number }) => {
    toast.show(message, { ...options, type: 'success' });
  },
  info: (message: string, options?: { title?: string; duration?: number }) => {
    toast.show(message, { ...options, type: 'info' });
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    const duration = t.duration ?? (t.type === 'warning' || t.type === 'error' ? 7000 : 4000);
    const item: ToastItem = { ...t, id, duration };

    setToasts((prev) => [...prev.slice(-4), item]); // keep maximum 5 active

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent<Omit<ToastItem, 'id'>>;
      if (customEvent.detail) {
        addToast(customEvent.detail);
      }
    };

    window.addEventListener(TOAST_EVENT, handleCustomToast);
    return () => window.removeEventListener(TOAST_EVENT, handleCustomToast);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container floating on top right */}
      <div
        aria-live="polite"
        className="fixed top-5 right-4 sm:right-6 z-[100] flex flex-col gap-2.5 max-w-md w-[calc(100vw-2rem)] pointer-events-none transition-all"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-top-3 fade-in duration-200 ${
              item.type === 'warning'
                ? 'border-amber-500/40 bg-white/95 dark:bg-[#181818]/95 text-[#0f0f0f] dark:text-[#f1f1f1] shadow-amber-500/10'
                : item.type === 'error'
                  ? 'border-red-500/40 bg-white/95 dark:bg-[#181818]/95 text-[#0f0f0f] dark:text-[#f1f1f1] shadow-red-500/10'
                  : item.type === 'success'
                    ? 'border-emerald-500/40 bg-white/95 dark:bg-[#181818]/95 text-[#0f0f0f] dark:text-[#f1f1f1] shadow-emerald-500/10'
                    : 'border-blue-500/40 bg-white/95 dark:bg-[#181818]/95 text-[#0f0f0f] dark:text-[#f1f1f1] shadow-blue-500/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {item.type === 'warning' && (
                <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              )}
              {item.type === 'error' && (
                <AlertCircle className="h-5 w-5 text-[#ff0000] dark:text-red-400" />
              )}
              {item.type === 'success' && (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {item.type === 'info' && (
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              {item.title && (
                <h4 className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-0.5">
                  {item.title}
                </h4>
              )}
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed font-normal">
                {item.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(item.id)}
              className="shrink-0 text-[#909090] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] p-1 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
