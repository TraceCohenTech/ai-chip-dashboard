'use client';

import { motion } from 'framer-motion';
import { topInvestors } from '../data';

export default function InvestorNetwork() {
  const maxCount = topInvestors[0]?.count || 1;

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <h2 className="text-xs tracking-[0.25em] uppercase text-[#FF6B35]/60 font-medium">
            Smart Money
          </h2>
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">
          Most Active Investors
        </h3>
        <p className="text-white/40 text-sm mb-8 max-w-lg">
          Who&apos;s placing the most bets across the AI chip landscape.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topInvestors.map((inv, i) => {
            const pct = (inv.count / maxCount) * 100;
            return (
              <motion.div
                key={inv.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="relative border border-[#1E1E2E] rounded-lg bg-[#12121A]/60 p-4 overflow-hidden group hover:border-[#2A2A3E] transition-colors"
              >
                <div
                  className="absolute inset-y-0 left-0 opacity-[0.06]"
                  style={{
                    width: `${pct}%`,
                    background:
                      'linear-gradient(to right, #FF6B35, transparent)',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/20 tabular-nums w-5 text-right font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-white/90">
                      {inv.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: inv.count }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"
                          style={{ opacity: 0.4 + (j / inv.count) * 0.6 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40 tabular-nums ml-1">
                      {inv.count}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
