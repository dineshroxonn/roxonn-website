import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsSection } from "@/components/sections/projects";
import { TokenomicsSection } from "@/components/sections/tokenomics";
import { GovernanceSection } from "@/components/sections/governance";
import { StakingSection } from "@/components/sections/staking";
import { RoadmapSection } from "@/components/sections/roadmap";
import { SubscribeForm } from "@/components/ui/subscribe-form";

export default function Home() {
  return (
    <main className="min-h-screen">
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
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            Stay Updated
          </h2>
          <div className="glass-panel p-8">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}