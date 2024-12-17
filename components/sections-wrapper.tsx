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

const HowItWorksSection = dynamic(
  () => import('@/components/sections/how-it-works').then((mod) => mod.HowItWorksSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading How It Works...</div>
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

const ContactSection = dynamic(
  () => import('@/components/sections/contact').then((mod) => mod.ContactSection),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Contact...</div>
    ),
  }
);

const SubscribeForm = dynamic(
  () => import('@/components/ui/subscribe-form').then((mod) => mod.SubscribeForm),
  {
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center">Loading Subscribe...</div>
    ),
  }
);

interface SectionsWrapperProps {
  children?: React.ReactNode;
}

export function SectionsWrapper({ children }: SectionsWrapperProps) {
  return (
    <div className="flex flex-col gap-0">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <TokenomicsSection />
        <GovernanceSection />
        <StakingSection />
        <RoadmapSection />
        <ContactSection />
        <HowItWorksSection />
        <SubscribeForm />
      </Suspense>
    </div>
  );
}
