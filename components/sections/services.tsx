'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Code2, Blocks, Bot, Database, Shield, Users, Coins, GitBranch } from 'lucide-react';

const technicalServices = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'Open Source Development',
    description: 'Contribute to public projects and earn tokens while building your portfolio.',
  },
  {
    icon: <Blocks className="w-8 h-8" />,
    title: 'Enterprise Solutions',
    description: 'Work on private enterprise projects with competitive compensation.',
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI & Web3 Projects',
    description: 'Join cutting-edge projects in artificial intelligence and blockchain.',
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Infrastructure Projects',
    description: 'Build scalable infrastructure and earn rewards for your expertise.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Security Audits',
    description: 'Participate in security reviews and vulnerability assessments.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community Projects',
    description: 'Lead or contribute to community-driven initiatives.',
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: 'DeFi Development',
    description: 'Build decentralized finance applications and protocols.',
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'Protocol Development',
    description: 'Design and implement new blockchain protocols and standards.',
  },
];

const simpleServices = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'Fix Bugs',
    description: 'Help improve software by fixing problems and making it work better.',
  },
  {
    icon: <Blocks className="w-8 h-8" />,
    title: 'Add Features',
    description: 'Create new features that make software more useful for everyone.',
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'Write Documentation',
    description: 'Help others understand how to use the software better.',
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Test Software',
    description: 'Make sure everything works correctly by testing new changes.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Review Code',
    description: "Check other people's work and suggest improvements.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Help Others',
    description: 'Answer questions and help other developers solve problems.',
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: 'Earn Points',
    description: 'Get reward points for every helpful contribution you make.',
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'Join Teams',
    description: 'Work together with other developers on exciting projects.',
  },
];

const technicalContent = {
  title: 'Contribution Areas',
  subtitle: 'Choose your path and start earning through meaningful contributions',
  services: technicalServices,
};

const simpleContent = {
  title: 'Ways to Help',
  subtitle: "Pick what you're good at and start earning rewards",
  services: simpleServices,
};

export function ServicesSection() {
  const [showTechnical, setShowTechnical] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTechnical((prev) => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const currentContent = showTechnical ? technicalContent : simpleContent;

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={showTechnical ? 'technical' : 'simple'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div ref={ref} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">{currentContent.title}</h2>
              <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentContent.services.slice(0, 8).map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border/50 shadow-sm transition-all group cursor-pointer"
                >
                  <div className="mb-4 text-primary group-hover:scale-110 transform transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <a
                href="#join-us"
                className="bg-white/90 dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20 px-8 py-3 rounded-lg hover:bg-white dark:hover:bg-white/20 transition-all duration-200 inline-block"
              >
                {showTechnical ? 'Start Contributing' : 'Start Helping'}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
