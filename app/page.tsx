'use client';

import dynamic from 'next/dynamic';
import HeroStats from './components/HeroStats';
import Footer from './components/Footer';
import { Grid } from '../components/canvasui/Grid';

const CircuitBackground = dynamic(() => import('./components/CircuitBackground'), { ssr: false });
const FundingBubbles = dynamic(() => import('./components/FundingBubbles'), { ssr: false });
const SegmentBreakdown = dynamic(() => import('./components/SegmentBreakdown'), { ssr: false });
const TimelineChart = dynamic(() => import('./components/TimelineChart'), { ssr: false });
const ChipDiagram = dynamic(() => import('./components/ChipDiagram'), { ssr: false });
const FocusRadar = dynamic(() => import('./components/FocusRadar'), { ssr: false });
const InvestorNetwork = dynamic(() => import('./components/InvestorNetwork'), { ssr: false });
const CompanyGrid = dynamic(() => import('./components/CompanyGrid'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[800px] overflow-hidden">
        <CircuitBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0F]" />
      </div>

      <Grid
        tileSize={110}
        gap={1}
        cornerRadius={2}
        amplitude={1.6}
        liftHeight={34}
        tilt={0.5}
        shading={0.08}
        tint={[0, 0.83, 1]}
        tintStrength={0.08}
        idleRipples={0}
      >
        <HeroStats />
      </Grid>

      <div className="relative z-10">
        <FundingBubbles />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <ChipDiagram />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <SegmentBreakdown />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <TimelineChart />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <FocusRadar />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <InvestorNetwork />

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
        </div>

        <CompanyGrid />

        <Footer />
      </div>
    </main>
  );
}
