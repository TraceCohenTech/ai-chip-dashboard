'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold text-white mb-1">
              The Silicon Wars
            </div>
            <p className="text-xs text-white/30">
              Data as of June 30, 2026. US-only private AI chip startups.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/Trace_Cohen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              @Trace_Cohen
            </a>
            <a
              href="mailto:t@nyvp.com"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              t@nyvp.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
