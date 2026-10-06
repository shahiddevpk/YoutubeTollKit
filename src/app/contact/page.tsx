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
    <div className="min-h-screen bg-[#f9f9f9] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] py-16 transition-colors">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
            <span>▶</span> Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            Contact & feedback
          </h1>
          <p className="text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            Send tool ideas, bug reports, privacy questions, or copyright notices. We read every message and route
            compliance issues to our dedicated team.
          </p>
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed space-y-2 shadow-sm">
            <p className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Copyright (DMCA)</p>
            <p>
              If you believe material on this site infringes your copyright, include your contact information, a
              description of the work, the URL in question, and a statement of good faith. We do not host user-uploaded
              YouTube videos; most issues relate to written content or tool output descriptions.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Message Received!</h3>
            <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">
              Thank you for contacting YouTubeFreeToolkit. Our team will review your message shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 space-y-5 shadow-sm"
          >
            <div>
              <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
                Message / Tool Request
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what tool you'd like to see added or report an issue..."
                className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
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
