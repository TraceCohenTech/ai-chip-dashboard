'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { segmentData, segmentColors } from '../data';

const chartData = segmentData.map((d) => ({
  ...d,
  color: segmentColors[d.segment] || '#00D4FF',
}));

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof chartData[0] }> }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-4 py-3">
      <div className="text-sm font-semibold text-white">{d.segment}</div>
      <div className="text-xs text-white/50 mt-1">
        {d.count} companies · ${(d.totalFundingM / 1000).toFixed(1)}B raised
      </div>
    </div>
  );
}

export default function SegmentBreakdown() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#FFB800]/60 font-medium">
              By Category
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-white mb-8">
            Segment Breakdown
          </h3>

          <div className="space-y-3">
            {chartData.map((seg, i) => {
              const maxFunding = Math.max(...chartData.map((d) => d.totalFundingM));
              const pct = (seg.totalFundingM / maxFunding) * 100;

              return (
                <motion.div
                  key={seg.segment}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: seg.color }}
                      />
                      <span className="text-sm text-white/80">{seg.segment}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/40">
                        {seg.count} companies
                      </span>
                      <span className="text-sm font-semibold text-white tabular-nums w-16 text-right">
                        ${(seg.totalFundingM / 1000).toFixed(1)}B
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.06 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#1E1E2E] rounded-2xl bg-[#12121A]/60 p-6"
        >
          <h4 className="text-sm font-medium text-white/60 mb-6">
            Companies per Segment
          </h4>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={chartData} layout="vertical" barSize={18}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="segment"
                width={140}
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.segment}
                    fill={entry.color}
                    fillOpacity={0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
