'use client';

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { focusData, companies } from '../data';

const FOCUS_COLORS = ['#00D4FF', '#00FF88', '#FFB800', '#4488FF', '#FF6B35'];

const statusCounts = [
  { name: 'Private', count: companies.filter((c) => c.status === 'Private').length, color: '#00D4FF' },
  { name: 'Public', count: companies.filter((c) => c.status === 'Public').length, color: '#00FF88' },
  { name: 'Acquired', count: companies.filter((c) => c.status === 'Acquired').length, color: '#FFB800' },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name?: string; focus?: string; count: number } }> }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-3 py-2">
      <div className="text-xs font-semibold text-white">{d.name || d.focus}</div>
      <div className="text-xs text-white/50">{d.count} companies</div>
    </div>
  );
}

export default function FocusRadar() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#1E1E2E] rounded-2xl bg-[#12121A]/60 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#00D4FF]/60 font-medium">
              Focus Area
            </h2>
          </div>
          <h4 className="text-xl font-bold text-white mb-6">
            Inference vs Training
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={focusData}
                dataKey="count"
                nameKey="focus"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={2}
                stroke="#0A0A0F"
              >
                {focusData.map((_, i) => (
                  <Cell key={i} fill={FOCUS_COLORS[i % FOCUS_COLORS.length]} fillOpacity={0.75} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
            {focusData.map((d, i) => (
              <div key={d.focus} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: FOCUS_COLORS[i % FOCUS_COLORS.length] }}
                />
                <span className="text-xs text-white/50">{d.focus} ({d.count})</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-[#1E1E2E] rounded-2xl bg-[#12121A]/60 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#00FF88]/60 font-medium">
              Outcomes
            </h2>
          </div>
          <h4 className="text-xl font-bold text-white mb-6">
            Company Status
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={2}
                stroke="#0A0A0F"
              >
                {statusCounts.map((s) => (
                  <Cell key={s.name} fill={s.color} fillOpacity={0.75} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {statusCounts.map((s) => (
              <div key={s.name} className="text-center">
                <div className="text-2xl font-bold text-white">{s.count}</div>
                <div className="text-xs text-white/40 flex items-center justify-center gap-1.5 mt-0.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
