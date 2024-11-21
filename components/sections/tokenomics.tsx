"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coins, Award, BarChart, Wallet } from 'lucide-react';

const tokenFeatures = [
  {
    icon: <Coins className="w-8 h-8" />,
    title: "Governance Power",
    description: "Vote on proposals and shape the organization's future"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Contribution Rewards",
    description: "Earn tokens for completing tasks and projects"
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Value Accrual",
    description: "Token value grows with organization success"
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Staking Benefits",
    description: "Earn additional rewards by staking tokens"
  }
];

export function TokenomicsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">ROXN Token Economics</h2>
          <p className="text-xl text-white/80">
            Powering our decentralized ecosystem through fair token distribution and rewards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tokenFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card text-center"
            >
              <div className="text-[#00C2FF] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8">Token Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Contributors</span>
                  <span className="text-[#00C2FF]">40%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00C2FF] h-full rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Treasury</span>
                  <span className="text-[#00C2FF]">30%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00C2FF] h-full rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Community Initiatives</span>
                  <span className="text-[#00C2FF]">30%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00C2FF] h-full rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">How to Earn ROXN</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00C2FF] rounded-full" />
                  <span>Complete tasks and contribute to projects</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00C2FF] rounded-full" />
                  <span>Participate in governance and voting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00C2FF] rounded-full" />
                  <span>Stake tokens for additional rewards</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#00C2FF] rounded-full" />
                  <span>Contribute to community initiatives</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#join-us"
            className="glass-panel px-8 py-3 hover-glow inline-block"
          >
            Start Earning ROXN
          </a>
        </motion.div>
      </div>
    </section>
  );
}