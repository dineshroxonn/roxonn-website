import { HeroSection } from '@/components/sections/hero';
import { GovernanceSection } from '@/components/sections/governance';
import { ServicesSection } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/footer';
import { JoinUsSection } from '@/components/sections/join-us';
import { PaymentSection } from '@/components/sections/payment';
import { TokenomicsSection } from '@/components/sections/tokenomics';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <GovernanceSection />
      <TokenomicsSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <JoinUsSection />
      <PaymentSection />
      <ContactSection />
      <Footer />
    </div>
  );
}