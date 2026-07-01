'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { companies, segmentColors, type Company } from '../data';

type SortKey = 'funding' | 'valuation' | 'founded' | 'name';

export default function CompanyGrid() {
  const [search, setSearch] = useState('');
  const [segFilter, setSegFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('funding');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...companies];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.whatTheyDo.toLowerCase().includes(q) ||
          c.architecture.toLowerCase().includes(q) ||
          c.investors.toLowerCase().includes(q)
      );
    }
    if (segFilter) result = result.filter((c) => c.segment === segFilter);
    if (statusFilter) result = result.filter((c) => c.status === statusFilter);

    result.sort((a, b) => {
      if (sortBy === 'funding') return b.fundingM - a.fundingM;
      if (sortBy === 'valuation') return b.valuationM - a.valuationM;
      if (sortBy === 'founded') return b.founded - a.founded;
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [search, segFilter, statusFilter, sortBy]);

  const segments = Object.keys(segmentColors);

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4488FF]" />
        <h2 className="text-xs tracking-[0.25em] uppercase text-[#4488FF]/60 font-medium">
          Full Universe
        </h2>
      </div>
      <h3 className="text-3xl font-bold text-white mb-8">
        Company Directory
      </h3>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search companies, tech, investors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#12121A] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
        />
        <div className="flex gap-2">
          <select
            value={segFilter || ''}
            onChange={(e) => setSegFilter(e.target.value || null)}
            className="bg-[#12121A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-sm text-white/70 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">All Segments</option>
            {segments.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="bg-[#12121A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-sm text-white/70 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Acquired">Acquired</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-[#12121A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-sm text-white/70 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="funding">Sort: Funding</option>
            <option value="valuation">Sort: Valuation</option>
            <option value="founded">Sort: Newest</option>
            <option value="name">Sort: A-Z</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-white/30 mb-4">
        {filtered.length} of {companies.length} companies
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((company, i) => (
          <CompanyCard
            key={company.name}
            company={company}
            index={i}
            expanded={expanded === company.name}
            onToggle={() =>
              setExpanded(expanded === company.name ? null : company.name)
            }
          />
        ))}
      </div>
    </section>
  );
}

function CompanyCard({
  company,
  index,
  expanded,
  onToggle,
}: {
  company: Company;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const color = segmentColors[company.segment] || '#00D4FF';
  const statusColor =
    company.status === 'Public'
      ? '#00FF88'
      : company.status === 'Acquired'
        ? '#FFB800'
        : '#00D4FF';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onToggle}
      className="group cursor-pointer border border-[#1E1E2E] rounded-xl bg-[#12121A]/80 hover:bg-[#12121A] hover:border-[#2A2A3E] transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-white truncate">
              {company.name}
            </h4>
            <p className="text-xs text-white/40 mt-0.5">
              {company.hq} · {company.founded}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-3 shrink-0">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-medium"
              style={{
                backgroundColor: `${statusColor}15`,
                color: statusColor,
              }}
            >
              {company.status}
            </span>
          </div>
        </div>

        <div
          className="text-[10px] font-medium tracking-wide uppercase mb-3 flex items-center gap-1.5"
          style={{ color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {company.segment} · {company.focus}
        </div>

        <div className="flex items-baseline gap-4 mb-3">
          <div>
            <div className="text-xs text-white/40">Raised</div>
            <div className="text-lg font-bold text-white tabular-nums">
              ${company.fundingM >= 1000
                ? `${(company.fundingM / 1000).toFixed(1)}B`
                : `${company.fundingM}M`}
            </div>
          </div>
          {company.valuationM > 0 && (
            <div>
              <div className="text-xs text-white/40">Valuation</div>
              <div className="text-lg font-bold text-white tabular-nums">
                ${company.valuationM >= 1000
                  ? `${(company.valuationM / 1000).toFixed(1)}B`
                  : `${company.valuationM}M`}
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
          {company.architecture}
        </p>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-[#1E1E2E]"
          >
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                What They Build
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {company.whatTheyDo}
              </p>
            </div>
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Competitive Edge
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {company.edge}
              </p>
            </div>
            {company.founders && (
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                  Founders
                </div>
                <p className="text-xs text-white/60">{company.founders}</p>
              </div>
            )}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Key Investors
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {company.investors}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div
        className="h-0.5 w-full opacity-40"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      />
    </motion.div>
  );
}
