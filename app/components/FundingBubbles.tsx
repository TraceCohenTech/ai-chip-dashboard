'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { companies, segmentColors, type Company } from '../data';
import { useState, useMemo, useEffect, useRef } from 'react';

function getRadius(funding: number): number {
  if (funding <= 0) return 14;
  return Math.max(14, Math.min(80, Math.sqrt(funding) * 1.8));
}

interface BubblePos {
  company: Company;
  x: number;
  y: number;
  r: number;
  color: string;
}

function layoutBubbles(list: Company[], width: number, height: number): BubblePos[] {
  const sorted = [...list].sort((a, b) => b.fundingM - a.fundingM);
  const positions: BubblePos[] = [];
  const cx = width / 2;
  const cy = height / 2;

  for (const company of sorted) {
    const r = getRadius(company.fundingM);
    const color = segmentColors[company.segment] || '#00D4FF';
    let bestX = cx;
    let bestY = cy;
    let placed = false;

    for (let attempt = 0; attempt < 300; attempt++) {
      const angle = attempt * 2.39996323;
      const dist = 8 + attempt * 1.8;
      const tx = cx + Math.cos(angle) * dist;
      const ty = cy + Math.sin(angle) * dist * 0.7;

      let overlaps = false;
      for (const p of positions) {
        const dx = tx - p.x;
        const dy = ty - p.y;
        const minDist = r + p.r + 4;
        if (dx * dx + dy * dy < minDist * minDist) {
          overlaps = true;
          break;
        }
      }

      if (!overlaps && tx - r > 10 && tx + r < width - 10 && ty - r > 10 && ty + r < height - 10) {
        bestX = tx;
        bestY = ty;
        placed = true;
        break;
      }
    }

    if (!placed) {
      bestX = cx + (Math.random() - 0.5) * (width * 0.6);
      bestY = cy + (Math.random() - 0.5) * (height * 0.6);
    }

    positions.push({ company, x: bestX, y: bestY, r, color });
  }
  return positions;
}

export default function FundingBubbles() {
  const [hovered, setHovered] = useState<Company | null>(null);
  const [selected, setSelected] = useState<Company | null>(null);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1100, h: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(500, Math.min(700, width * 0.55)) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const segments = Object.keys(segmentColors);
  const filtered = activeSegment
    ? companies.filter((c) => c.segment === activeSegment)
    : companies;

  const positions = useMemo(
    () => layoutBubbles(filtered, dims.w, dims.h),
    [filtered, dims.w, dims.h]
  );

  const active = hovered || selected;

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
        <h2 className="text-xs tracking-[0.25em] uppercase text-[#00D4FF]/60 font-medium">
          Capital Deployed
        </h2>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Funding Landscape
      </h3>
      <p className="text-white/40 text-sm mb-8 max-w-xl">
        Every bubble is a company. Size = total funding. Click to pin details.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { setActiveSegment(null); setSelected(null); }}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeSegment
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-white/40 border border-transparent hover:text-white/60'
          }`}
        >
          All
        </button>
        {segments.map((seg) => (
          <button
            key={seg}
            onClick={() => { setActiveSegment(activeSegment === seg ? null : seg); setSelected(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSegment === seg
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/40 border border-transparent hover:text-white/60'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: segmentColors[seg] }}
            />
            {seg}
          </button>
        ))}
      </div>

      <div className="relative border border-[#1E1E2E] rounded-2xl bg-[#0D0D15]/80 backdrop-blur-sm overflow-hidden" ref={containerRef}>
        <svg
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          className="w-full"
          style={{ height: dims.h }}
        >
          <defs>
            {segments.map((seg) => (
              <radialGradient key={seg} id={`glow-${seg.replace(/[\s\/]/g, '')}`}>
                <stop offset="0%" stopColor={segmentColors[seg]} stopOpacity={0.25} />
                <stop offset="70%" stopColor={segmentColors[seg]} stopOpacity={0.05} />
                <stop offset="100%" stopColor={segmentColors[seg]} stopOpacity={0} />
              </radialGradient>
            ))}
          </defs>

          {positions.map((pos, i) => {
            const isActive = active?.name === pos.company.name;
            const isDimmed = active && !isActive;
            const gradId = `glow-${pos.company.segment.replace(/[\s\/]/g, '')}`;

            return (
              <g
                key={pos.company.name}
                onMouseEnter={() => setHovered(pos.company)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected?.name === pos.company.name ? null : pos.company)}
                className="cursor-pointer"
              >
                <motion.circle
                  initial={{ cx: dims.w / 2, cy: dims.h / 2, r: 0, opacity: 0 }}
                  animate={{
                    cx: pos.x,
                    cy: pos.y,
                    r: isActive ? pos.r * 1.12 : pos.r,
                    opacity: isDimmed ? 0.25 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.015 }}
                  fill={`url(#${gradId})`}
                />
                <motion.circle
                  initial={{ cx: dims.w / 2, cy: dims.h / 2, r: 0 }}
                  animate={{
                    cx: pos.x,
                    cy: pos.y,
                    r: isActive ? pos.r * 1.12 : pos.r,
                    opacity: isDimmed ? 0.15 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.015 }}
                  fill="none"
                  stroke={pos.color}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.9 : 0.4}
                />
                {isActive && (
                  <motion.circle
                    initial={{ r: pos.r }}
                    animate={{ r: pos.r * 1.6 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    cx={pos.x}
                    cy={pos.y}
                    fill="none"
                    stroke={pos.color}
                    strokeWidth={0.5}
                    strokeOpacity={0.3}
                  />
                )}
                {pos.r > 20 && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDimmed ? 0.15 : 0.9 }}
                    transition={{ delay: i * 0.015 + 0.3 }}
                    x={pos.x}
                    y={pos.y - 4}
                    textAnchor="middle"
                    fill={pos.color}
                    fontSize={pos.r > 40 ? 11 : 9}
                    fontWeight={600}
                    fontFamily="var(--font-inter), system-ui"
                  >
                    {pos.company.name.length > 12 ? pos.company.name.slice(0, 10) + '…' : pos.company.name}
                  </motion.text>
                )}
                {pos.r > 30 && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDimmed ? 0.1 : 0.5 }}
                    transition={{ delay: i * 0.015 + 0.4 }}
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    fill="white"
                    fontSize={8}
                    fontFamily="var(--font-inter), system-ui"
                  >
                    ${pos.company.fundingM >= 1000
                      ? `${(pos.company.fundingM / 1000).toFixed(1)}B`
                      : `${pos.company.fundingM}M`}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[380px] bg-[#0A0A0F]/95 border border-[#1E1E2E] rounded-xl p-5 backdrop-blur-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">{active.name}</h4>
                  <p className="text-xs text-white/40">{active.hq} · Founded {active.founded}</p>
                </div>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-medium shrink-0"
                  style={{
                    backgroundColor: `${segmentColors[active.segment]}20`,
                    color: segmentColors[active.segment],
                  }}
                >
                  {active.segment}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white/[0.03] rounded-lg p-2.5">
                  <div className="text-[10px] text-white/40 uppercase tracking-wide mb-0.5">Raised</div>
                  <div className="text-xl font-bold text-white tabular-nums">
                    ${active.fundingM >= 1000 ? `${(active.fundingM / 1000).toFixed(1)}B` : `${active.fundingM}M`}
                  </div>
                </div>
                {active.valuationM > 0 && (
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-white/40 uppercase tracking-wide mb-0.5">Valuation</div>
                    <div className="text-xl font-bold text-white tabular-nums">
                      ${active.valuationM >= 1000 ? `${(active.valuationM / 1000).toFixed(1)}B` : `${active.valuationM}M`}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-2">
                <div className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Architecture</div>
                <p className="text-xs text-white/70 font-medium">{active.architecture}</p>
              </div>

              <p className="text-xs text-white/45 leading-relaxed line-clamp-3">{active.whatTheyDo}</p>

              {selected && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                  className="mt-3 text-[10px] text-white/30 hover:text-white/50 transition-colors"
                >
                  Click to unpin
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
