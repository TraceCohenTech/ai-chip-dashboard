'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { fundingTimeline } from '../data';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-3">
      <div className="text-sm font-semibold text-white">Founded {label}</div>
      <div className="text-xs text-white/50 mt-1">
        {payload.find((p) => p.dataKey === 'count')?.value} companies
      </div>
      <div className="text-xs text-white/50">
        ${((payload.find((p) => p.dataKey === 'totalFundingM')?.value || 0) / 1000).toFixed(1)}B raised
      </div>
    </div>
  );
}

export default function TimelineChart() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
          <h2 className="text-xs tracking-[0.25em] uppercase text-[#00FF88]/60 font-medium">
            Founding Timeline
          </h2>
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">
          The Wave of Challengers
        </h3>
        <p className="text-white/40 text-sm mb-8 max-w-lg">
          When these companies were founded — the 2017-2022 wave dominates, with
          a second surge in 2023-2025 as generative AI exploded.
        </p>

        <div className="border border-[#1E1E2E] rounded-2xl bg-[#12121A]/60 p-6">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={fundingTimeline}>
              <defs>
                <linearGradient id="gradCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradFunding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="year"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="count"
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <YAxis
                yAxisId="funding"
                orientation="right"
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}B`}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="count"
                type="monotone"
                dataKey="count"
                stroke="#00FF88"
                strokeWidth={2}
                fill="url(#gradCount)"
              />
              <Area
                yAxisId="funding"
                type="monotone"
                dataKey="totalFundingM"
                stroke="#00D4FF"
                strokeWidth={2}
                fill="url(#gradFunding)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#00FF88] rounded" />
              <span className="text-xs text-white/40">Companies Founded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#00D4FF] rounded" />
              <span className="text-xs text-white/40">Total Funding</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
