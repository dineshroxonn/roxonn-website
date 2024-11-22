"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Vote, GitPullRequest, Landmark, Users } from 'lucide-react';

const governanceFeatures = [
  {
    icon: <Vote className="w-8 h-8" />,
    title: "Token-Based Voting",
    description: "Participate in key decisions using your ROXN tokens"
  },
  {
    icon: <GitPullRequest className="w-8 h-8" />,
    title: "Proposal System",
    description: "Submit and vote on improvement proposals"
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    title: "Treasury Management",
    description: "Transparent allocation of organization resources"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community-First",
    description: "Power to the contributors and stakeholders"
  }
];

export function GovernanceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="governance" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Governance: Powered by Community</h2>
          <p className="text-xl text-white/80">
            Participate in shaping Roxonn's future through decentralized decision-making
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {governanceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card flex items-start space-x-4"
            >
              <div className="text-[#00C2FF]">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">How Governance Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-[#00C2FF] font-bold">1.</span>
                  <p className="text-white/70">Token holders can create and submit proposals for changes or improvements</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#00C2FF] font-bold">2.</span>
                  <p className="text-white/70">Community members vote using their ROXN tokens</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#00C2FF] font-bold">3.</span>
                  <p className="text-white/70">Approved proposals are implemented by the community</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#00C2FF] font-bold">4.</span>
                  <p className="text-white/70">Results and implementations are transparently tracked</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Governance Tools</h3>
              <div className="space-y-4">
                <div className="glass-panel p-4">
                  <h4 className="font-semibold mb-2">Snapshot</h4>
                  <p className="text-white/70">Off-chain voting system for proposals</p>
                </div>
                <div className="glass-panel p-4">
                  <h4 className="font-semibold mb-2">Gnosis Safe</h4>
                  <p className="text-white/70">Multi-signature treasury management</p>
                </div>
                <div className="glass-panel p-4">
                  <h4 className="font-semibold mb-2">Discord</h4>
                  <p className="text-white/70">Community discussion and coordination</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://snapshot.org/#/roxonn.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel px-8 py-3 hover-glow inline-block"
          >
            View Active Proposals
          </a>
        </motion.div>
      </div>
    </section>
  );
}