'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coins, Award, BarChart, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchTokenMetrics } from '@/lib/contracts/roxn-contract';

const tokenFeatures = [
  {
    icon: <Coins className="w-8 h-8" />,
    title: 'Governance Power',
    description: "Vote on proposals and shape the organization's future",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Contribution Rewards',
    description: 'Earn tokens for completing tasks and projects',
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: 'Value Accrual',
    description: 'Token value grows with organization success',
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: 'Staking Benefits',
    description: 'Earn additional rewards by staking tokens',
  },
];

const tokenDistribution = [
  {
    category: 'Liquidity',
    percentage: 40,
  },
  {
    category: 'Developer Rewards',
    percentage: 30,
  },
  {
    category: 'Staking/Governance',
    percentage: 15,
  },
  {
    category: 'Marketing',
    percentage: 10,
  },
  {
    category: 'Treasury/Founder',
    percentage: 5,
  },
];

export function TokenomicsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [metrics, setMetrics] = useState({
    totalSupply: '0',
    circulatingSupply: '0',
    rewardPool: '0',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        setLoading(true);
        const data = await fetchTokenMetrics();
        if (data) {
          setMetrics(data);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    getMetrics();
  }, []);

  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

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
          <p className="text-xl text-black/80 dark:text-white/80">
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
              <div className="text-[#00C2FF] mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-black/70 dark:text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Token Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="glass-card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Supply</h3>
            <p className="text-3xl font-bold text-[#00C2FF]">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                `${formatNumber(metrics.totalSupply)} ROXN`
              )}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Circulating Supply</h3>
            <p className="text-3xl font-bold text-[#00C2FF]">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                `${formatNumber(metrics.circulatingSupply)} ROXN`
              )}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Reward Pool</h3>
            <p className="text-3xl font-bold text-[#00C2FF]">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                `${formatNumber(metrics.rewardPool)} ROXN`
              )}
            </p>
          </div>
        </motion.div>

        {/* Token Distribution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-8 mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8">Token Distribution</h3>
          <div className="space-y-6">
            {tokenDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-black/90 dark:text-white/90">{item.category}</span>
                  <span className="text-[#00C2FF]">{item.percentage}%</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                  <div
                    className="bg-[#00C2FF] h-full rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to Earn ROXN Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">How to Earn ROXN</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="text-[#00C2FF] mr-3">•</div>
              <span>Complete tasks and contribute to projects</span>
            </li>
            <li className="flex items-center">
              <div className="text-[#00C2FF] mr-3">•</div>
              <span>Participate in governance and voting</span>
            </li>
            <li className="flex items-center">
              <div className="text-[#00C2FF] mr-3">•</div>
              <span>Stake tokens for additional rewards</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#join-us" className="glass-panel px-6 py-3 inline-flex items-center hover-glow">
            Start Earning ROXN
          </a>
        </motion.div>
      </div>
    </section>
  );
}
