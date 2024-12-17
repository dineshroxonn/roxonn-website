'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users2, Target, Rocket, Users, Shield, GitBranch } from 'lucide-react';

const teamHighlights = [
  {
    title: 'Core Contributors',
    description: 'Global network of skilled developers and innovators.',
    icon: <Users2 className="w-12 h-12" />,
  },
  {
    title: 'Governance Council',
    description: 'Elected members guiding strategic decisions.',
    icon: <Shield className="w-12 h-12" />,
  },
  {
    title: 'Community Leaders',
    description: 'Active members championing initiatives.',
    icon: <GitBranch className="w-12 h-12" />,
  },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Growing Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community where talent meets opportunity, and innovation drives success.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border/50 shadow-sm transition-colors"
              >
                <div className="text-primary flex justify-center mb-4">{highlight.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-foreground text-center">
                  {highlight.title}
                </h4>
                <p className="text-muted-foreground text-center text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
