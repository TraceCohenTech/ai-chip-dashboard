'use client';

import { motion } from 'framer-motion';
import { aggregateStats } from '../data';

const stats = [
  { label: 'US Chip Startups', value: aggregateStats.totalCompanies.toString(), suffix: '', accent: '#00D4FF' },
  { label: 'Total Funding', value: `$${aggregateStats.totalFundingB.toFixed(1)}`, suffix: 'B', accent: '#00FF88' },
  { label: 'Median Raise', value: `$${aggregateStats.medianFundingM.toFixed(0)}`, suffix: 'M', accent: '#FFB800' },
  { label: 'Still Private', value: aggregateStats.privateCount.toString(), suffix: '', accent: '#4488FF' },
  { label: 'Public / IPO', value: aggregateStats.publicCount.toString(), suffix: '', accent: '#00FF88' },
  { label: 'Acquired', value: aggregateStats.acquiredCount.toString(), suffix: '', accent: '#FF6B35' },
];

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
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative group cursor-default"
          >
            <div
              className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
              style={{ background: `linear-gradient(135deg, ${stat.accent}20, transparent)` }}
            />
            <div className="relative border border-[#1E1E2E] group-hover:border-[#2A2A3E] rounded-xl p-4 bg-[#12121A]/80 backdrop-blur-sm transition-colors duration-200">
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${stat.accent}60, transparent)` }}
              />
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight tabular-nums">
                {stat.value}
                <span style={{ color: stat.accent }} className="text-xl opacity-70">{stat.suffix}</span>
              </div>
              <div className="text-xs text-white/40 mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
