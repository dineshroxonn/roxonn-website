'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports with loading fallbacks
const HeroSection = dynamic(
  () => import('@/components/sections/hero').then((mod) => mod.HeroSection),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">Loading Hero...</div>
    ),
  }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/services').then((mod) => mod.ServicesSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Services...</div>
    ),
  }
);

const ProjectsSection = dynamic(
  () => import('@/components/sections/projects').then((mod) => mod.ProjectsSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Projects...</div>
    ),
  }
);

const TokenomicsSection = dynamic(
  () => import('@/components/sections/tokenomics').then((mod) => mod.TokenomicsSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Tokenomics...</div>
    ),
  }
);

const GovernanceSection = dynamic(
  () => import('@/components/sections/governance').then((mod) => mod.GovernanceSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Governance...</div>
    ),
  }
);

const StakingSection = dynamic(
  () => import('@/components/sections/staking').then((mod) => mod.StakingSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Staking...</div>
    ),
  }
);

const RoadmapSection = dynamic(
  () => import('@/components/sections/roadmap').then((mod) => mod.RoadmapSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Roadmap...</div>
    ),
  }
);

const SubscribeForm = dynamic(
  () => import('@/components/ui/subscribe-form').then((mod) => mod.SubscribeForm),
  {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">Loading Subscribe Form...</div>
    ),
  }
);

export function SectionsWrapper() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TokenomicsSection />
      <GovernanceSection />
      <StakingSection />
      <RoadmapSection />

      {/* Email Subscription Section */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Stay Updated</h2>
          <div className="glass-panel p-8">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
