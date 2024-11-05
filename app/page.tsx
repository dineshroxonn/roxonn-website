import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}