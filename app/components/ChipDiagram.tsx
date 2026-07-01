'use client';

import { motion } from 'framer-motion';
import { companies, segmentColors } from '../data';

const topByFunding = [...companies]
  .sort((a, b) => b.fundingM - a.fundingM)
  .slice(0, 12);

export default function ChipDiagram() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF3366]" />
          <h2 className="text-xs tracking-[0.25em] uppercase text-[#FF3366]/60 font-medium">
            Top Funded
          </h2>
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">
          The $100M+ Club
        </h3>
        <p className="text-white/40 text-sm mb-8 max-w-lg">
          The 12 most-capitalized challengers to Nvidia, ranked by total
          funding.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topByFunding.map((company, i) => {
            const color = segmentColors[company.segment] || '#00D4FF';
            const maxFunding = topByFunding[0].fundingM;
            const barPct = (company.fundingM / maxFunding) * 100;

            return (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-[#1E1E2E] rounded-xl bg-[#12121A]/80 p-5 relative overflow-hidden group hover:border-[#2A2A3E] transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{
                    width: `${barPct}%`,
                    backgroundColor: color,
                    opacity: 0.5,
                  }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {company.name}
                      </h4>
                      <p className="text-[10px] text-white/40">
                        Est. {company.founded} · {company.hq}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold text-white tabular-nums">
                    ${company.fundingM >= 1000
                      ? `${(company.fundingM / 1000).toFixed(1)}`
                      : company.fundingM}
                  </span>
                  <span className="text-sm text-white/50">
                    {company.fundingM >= 1000 ? 'B' : 'M'} raised
                  </span>
                </div>

                {company.valuationM > 0 && (
                  <div className="text-xs text-white/40 mb-3">
                    Valued at ${company.valuationM >= 1000
                      ? `${(company.valuationM / 1000).toFixed(1)}B`
                      : `${company.valuationM}M`}
                  </div>
                )}

                <div
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium mb-3"
                  style={{
                    backgroundColor: `${color}12`,
                    color,
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {company.segment}
                </div>

                <p className="text-xs text-white/45 leading-relaxed line-clamp-2">
                  {company.architecture}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
