'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { toolPrimaryButtonClass } from '@/lib/tool-ui';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 py-16 text-slate-700 dark:text-slate-300">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Contact & feedback</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Send tool ideas, bug reports, privacy questions, or copyright notices. We read every message and route
            compliance issues to the same queue as general support.
          </p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/40 p-4 text-xs text-slate-400 leading-relaxed space-y-2">
            <p className="font-medium text-slate-700 dark:text-slate-300">Copyright (DMCA)</p>
            <p>
              If you believe material on this site infringes your copyright, include your contact information, a
              description of the work, the URL in question, and a statement of good faith. We do not host user-uploaded
              YouTube videos; most issues relate to written content or tool output descriptions.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Thank you for contacting YouTubeFreeToolkit. Our team will review your message shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-6 sm:p-8 space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Message / Tool Request
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what tool you'd like to see added or report an issue..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <button type="submit" className={cn(toolPrimaryButtonClass, 'w-full')}>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
