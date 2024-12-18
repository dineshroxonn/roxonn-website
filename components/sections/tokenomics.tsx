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

type TokenMetrics = {
  maxSupply: number;
  currentSupply: number;
  circulatingSupply: number;
  rewardPool: number;
};

export function TokenomicsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [metrics, setMetrics] = useState<TokenMetrics>({
    maxSupply: 0,
    currentSupply: 0,
    circulatingSupply: 0,
    rewardPool: 0,
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

  const formatNumber = (value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
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
            Empowering contributors through transparent and fair token distribution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Total Supply</h3>
            <p className="text-4xl font-bold gradient-text">
              {loading ? 'Loading...' : formatNumber(metrics.maxSupply)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">ROXN Tokens</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Circulating Supply</h3>
            <p className="text-4xl font-bold gradient-text">
              {loading ? 'Loading...' : formatNumber(metrics.circulatingSupply)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Tokens in Circulation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Reward Pool</h3>
            <p className="text-4xl font-bold gradient-text">
              {loading ? 'Loading...' : formatNumber(metrics.rewardPool)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Available for Contributors</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-8">Token Features</h3>
            <div className="grid grid-cols-1 gap-6">
              {tokenFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 gradient-text">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">Token Distribution</h3>
            <div className="space-y-4">
              {tokenDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{item.category}</span>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2.5 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
