'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ComingSoonBadge } from '@/components/ui/coming-soon-badge';
import { Button } from '@/components/ui/button';
import {
  Vote,
  Users,
  FileText,
  Settings,
  LightbulbIcon,
  MessageCircle,
  Award,
  Target,
} from 'lucide-react';

const technicalContent = {
  title: 'Decentralized Governance',
  subtitle: 'Shape the future of Roxonn through decentralized decision-making',
  features: [
    {
      icon: <Vote className="w-8 h-8" />,
      title: 'On-Chain Voting',
      description: 'Participate in transparent, verifiable voting using your ROXN tokens',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'DAO Structure',
      description: 'Be part of a Decentralized Autonomous Organization',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Protocol Proposals',
      description: 'Submit and vote on protocol improvement proposals',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Parameter Control',
      description: 'Vote on protocol parameters and reward mechanisms',
    },
  ],
  cta: {
    title: 'Ready to Participate?',
    description:
      'Governance will be enabled once the ROXN token is launched. Hold ROXN tokens to participate in decision-making and shape the future of our platform.',
    buttonText: 'View Governance Portal',
  },
};

const simpleContent = {
  title: 'Community Voice',
  subtitle: 'Help make decisions and shape our future together',
  features: [
    {
      icon: <LightbulbIcon className="w-8 h-8" />,
      title: 'Share Ideas',
      description: 'Suggest improvements and new features for the platform',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Vote Together',
      description: 'Use your points to vote on important decisions',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Get Rewards',
      description: 'Earn extra points for good suggestions and active voting',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Set Goals',
      description: 'Help decide what we should work on next',
    },
  ],
  cta: {
    title: 'Want to Join?',
    description:
      'Start earning points by helping others. Once you have enough points, you can vote and suggest new ideas to make the platform better.',
    buttonText: 'Join Community',
  },
};

export function GovernanceSection() {
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
    <section id="governance" className="py-20 relative">
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
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-4xl font-bold gradient-text">{currentContent.title}</h2>
                <ComingSoonBadge message="Coming soon - Join us to get updates!" />
              </div>
              <p className="text-xl text-black/80 dark:text-white/80">{currentContent.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {currentContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card text-center group"
                >
                  <div className="mb-6 text-[#00C2FF] group-hover:scale-110 transform transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-black/70 dark:text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-panel p-8 text-center"
            >
              <h3 className="text-2xl font-semibold mb-4">{currentContent.cta.title}</h3>
              <p className="text-black/70 dark:text-white/70 mb-8 max-w-2xl mx-auto">
                {currentContent.cta.description}
              </p>
              <Button
                disabled
                className="bg-white/90 dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20 px-8 py-3 rounded-lg hover:bg-white dark:hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
              >
                {currentContent.cta.buttonText}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
