'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ComingSoonBadge } from '@/components/ui/coming-soon-badge';
import { Button } from '@/components/ui/button';
import { Lock, Timer, TrendingUp, Trophy, Coins, Star, Target, Gift } from 'lucide-react';

const technicalContent = {
  title: 'Token Staking',
  subtitle: 'Lock ROXN tokens to earn enhanced rewards and governance power',
  features: [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Flexible Lock Periods',
      description: 'Choose lock durations from 3 to 24 months for increased APY',
    },
    {
      icon: <Timer className="w-8 h-8" />,
      title: 'Time-Weighted Multiplier',
      description: 'Earn up to 2.5x rewards based on lock duration',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Compound Yields',
      description: 'Auto-compound rewards for optimal APY',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Governance Weight',
      description: 'Increased voting power based on stake amount and duration',
    },
  ],
  tiers: [
    {
      name: 'Bronze Validator',
      requirement: '1,000 ROXN',
      benefits: ['1x Base APY', 'Standard Voting Power', 'Basic Rewards'],
    },
    {
      name: 'Silver Validator',
      requirement: '5,000 ROXN',
      benefits: ['1.5x Base APY', 'Enhanced Voting Power', 'Priority Support'],
    },
    {
      name: 'Gold Validator',
      requirement: '10,000 ROXN',
      benefits: ['2x Base APY', 'Premium Voting Weight', 'Exclusive Features'],
    },
    {
      name: 'Platinum Validator',
      requirement: '25,000 ROXN',
      benefits: ['2.5x Base APY', 'Maximum Influence', 'Elite Benefits'],
    },
  ],
  cta: {
    title: 'Ready to Stake?',
    description:
      'Lock your ROXN tokens to start earning enhanced rewards and gain more influence in governance decisions.',
    buttonText: 'Connect Wallet',
  },
};

const simpleContent = {
  title: 'Point Locking',
  subtitle: 'Lock your points to earn more rewards and increase your influence',
  features: [
    {
      icon: <Coins className="w-8 h-8" />,
      title: 'Earn More Points',
      description: 'Lock your points longer to earn bigger rewards',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Choose Your Time',
      description: 'Pick how long you want to lock your points (3-24 months)',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Grow Your Rewards',
      description: 'Your rewards automatically grow over time',
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Get Special Perks',
      description: 'Unlock special features and stronger voting power',
    },
  ],
  tiers: [
    {
      name: 'Starter',
      requirement: '1,000 Points',
      benefits: ['Regular Rewards', 'Basic Voting', 'Standard Features'],
    },
    {
      name: 'Builder',
      requirement: '5,000 Points',
      benefits: ['50% More Rewards', 'Stronger Voice', 'Quick Support'],
    },
    {
      name: 'Expert',
      requirement: '10,000 Points',
      benefits: ['Double Rewards', 'Major Influence', 'Special Access'],
    },
    {
      name: 'Master',
      requirement: '25,000 Points',
      benefits: ['Maximum Rewards', 'Highest Impact', 'VIP Benefits'],
    },
  ],
  cta: {
    title: 'Start Earning More',
    description:
      'Lock your points today to earn bigger rewards and have more say in community decisions.',
    buttonText: 'Get Started',
  },
};

export function StakingSection() {
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
    <section id="staking" className="py-20 relative">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {currentContent.tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="glass-card text-center p-6"
                >
                  <h3 className="text-xl font-semibold mb-4 gradient-text">{tier.name}</h3>
                  <p className="text-lg font-medium mb-4 text-[#00C2FF]">{tier.requirement}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-black/70 dark:text-white/70">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
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
