"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Blocks, Bot, Database, Shield, Users, Coins, GitBranch } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Open Source Development",
    description: "Contribute to public projects and earn tokens while building your portfolio."
  },
  {
    icon: <Blocks className="w-8 h-8" />,
    title: "Enterprise Solutions",
    description: "Work on private enterprise projects with competitive compensation."
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI & Web3 Projects",
    description: "Join cutting-edge projects in artificial intelligence and blockchain."
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Infrastructure Projects",
    description: "Build scalable infrastructure and earn rewards for your expertise."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Security Audits",
    description: "Participate in security reviews and vulnerability assessments."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Projects",
    description: "Lead or contribute to community-driven initiatives."
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: "DeFi Development",
    description: "Build decentralized finance applications and protocols."
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: "Protocol Development",
    description: "Design and implement new blockchain protocols and standards."
  }
];

export function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Contribution Areas</h2>
          <p className="text-xl text-black/80 dark:text-white/80">Choose your path and start earning through meaningful contributions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card group cursor-pointer"
            >
              <div className="mb-4 text-[#00C2FF] group-hover:scale-110 transform transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-black/70 dark:text-white/70">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#join-us"
            className="glass-panel px-8 py-3 hover-glow inline-block"
          >
            Start Contributing
          </a>
        </motion.div>
      </div>
    </section>
  );
}