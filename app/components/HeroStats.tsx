'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { aggregateStats } from '../data';

function useCountUp(end: number, duration: number = 2000, delay: number = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now() + delay;
          const step = (now: number) => {
            const elapsed = Math.max(0, now - start);
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, delay]);

  return { value, ref };
}

const stats = [
  { label: 'US Chip Startups', numValue: aggregateStats.totalCompanies, prefix: '', suffix: '', accent: '#00D4FF' },
  { label: 'Total Funding', numValue: Math.round(aggregateStats.totalFundingB * 10), divisor: 10, prefix: '$', suffix: 'B', accent: '#00FF88' },
  { label: 'Median Raise', numValue: Math.round(aggregateStats.medianFundingM), prefix: '$', suffix: 'M', accent: '#FFB800' },
  { label: 'Still Private', numValue: aggregateStats.privateCount, prefix: '', suffix: '', accent: '#4488FF' },
  { label: 'Public / IPO', numValue: aggregateStats.publicCount, prefix: '', suffix: '', accent: '#00FF88' },
  { label: 'Acquired', numValue: aggregateStats.acquiredCount, prefix: '', suffix: '', accent: '#FF6B35' },
] as const;

function StatCard({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { value, ref } = useCountUp(stat.numValue, 1800, index * 120);
  const divisor = 'divisor' in stat ? (stat as { divisor: number }).divisor : 1;
  const display = divisor > 1 ? (value / divisor).toFixed(1) : value.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group cursor-default"
    >
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
        style={{ background: `linear-gradient(135deg, ${stat.accent}30, transparent)` }}
      />
      <div className="relative border border-[#1E1E2E] group-hover:border-[#2A2A3E] rounded-xl p-4 bg-[#12121A]/80 backdrop-blur-sm transition-colors duration-200">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${stat.accent}30, transparent)` }}
        />
        <div className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums" style={{ color: stat.accent }}>
          {stat.prefix}{display}
          <span className="text-xl opacity-70">{stat.suffix}</span>
        </div>
        <div className="text-xs text-white/40 mt-1 tracking-wide uppercase">
          {stat.label}
        </div>
        <div
          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-40"
          style={{ background: `linear-gradient(to right, ${stat.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function HeroStats() {
  return (
    <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#00D4FF]/70 font-medium">
            Live Market Intelligence · June 2026
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-4">
          <span className="text-white">The Silicon</span>
          <br />
          <span className="bg-gradient-to-r from-[#00D4FF] via-[#4488FF] to-[#00D4FF] bg-clip-text text-transparent">
            Wars
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-16 leading-relaxed">
          43 private US startups racing to break Nvidia&apos;s grip on AI compute —
          from transformer-specific ASICs to photonic interconnects to
          brain-inspired analog chips.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
