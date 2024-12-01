'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, GitPullRequest, Users, Clock, Coins } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    name: 'DeFi Lending Protocol',
    type: 'Open Source',
    summary:
      'A decentralized lending protocol enabling peer-to-peer lending with algorithmic interest rates.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop',
    features: [
      {
        icon: <GitPullRequest className="w-5 h-5" />,
        text: 'Active Development',
      },
      {
        icon: <Users className="w-5 h-5" />,
        text: '12 Contributors',
      },
      {
        icon: <Coins className="w-5 h-5" />,
        text: 'Token Rewards',
      },
    ],
    reward: '2000 ROXN',
    timeframe: '3 months',
    link: '#',
  },
  {
    name: 'AI-Powered Analytics',
    type: 'Enterprise',
    summary:
      'Building an enterprise analytics platform using machine learning for predictive insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    features: [
      {
        icon: <GitPullRequest className="w-5 h-5" />,
        text: 'Private Repo',
      },
      {
        icon: <Users className="w-5 h-5" />,
        text: '8 Contributors',
      },
      {
        icon: <Clock className="w-5 h-5" />,
        text: 'Ongoing',
      },
    ],
    reward: '$5000/month',
    timeframe: '6 months',
    link: '#',
  },
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Active Projects</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Choose from open source and enterprise projects to contribute and earn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card group"
            >
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-[#00C2FF]/20 border border-[#00C2FF]/30 text-[#00C2FF]">
                    {project.type}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">{project.name}</h3>
              <p className="text-black/70 dark:text-white/70 mb-6">{project.summary}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                {project.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2 text-black/70 dark:text-white/70"
                  >
                    <div className="text-[#00C2FF]">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                <div>
                  <div className="text-sm text-black/60 dark:text-white/60 mb-1">Reward</div>
                  <div className="font-semibold text-[#00C2FF]">{project.reward}</div>
                </div>
                <div>
                  <div className="text-sm text-black/60 dark:text-white/60 mb-1">Timeline</div>
                  <div className="font-semibold text-black/90 dark:text-white/90">
                    {project.timeframe}
                  </div>
                </div>
                <Link
                  href={project.link}
                  className="flex items-center space-x-2 text-[#00C2FF] hover:text-[#00C2FF]/80 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="#join-us"
            className="glass-panel px-8 py-3 hover-glow inline-flex items-center space-x-2"
          >
            <span>Start Contributing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
