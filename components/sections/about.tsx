'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users2, Target, Rocket, Users, Shield, GitBranch } from 'lucide-react';

const teamHighlights = [
  {
    title: 'Core Contributors',
    description:
      'A global network of skilled developers, designers, and innovators driving our platform forward.',
    icon: <Users2 className="w-12 h-12" />,
  },
  {
    title: 'Governance Council',
    description:
      'Elected community members who help guide strategic decisions through transparent voting.',
    icon: <Shield className="w-12 h-12" />,
  },
  {
    title: 'Community Leaders',
    description: 'Active members who champion initiatives and mentor new contributors.',
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Growing Together</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            At Roxonn, we&apos;re not just building software - we&apos;re cultivating a community
            where talent meets opportunity. Join us in creating a future where success is shared,
            innovation is collaborative, and growth knows no bounds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">
            Our Community Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border/50 shadow-sm transition-colors"
              >
                <div className="text-primary flex justify-center mb-4">{highlight.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground text-center">
                  {highlight.title}
                </h4>
                <p className="text-muted-foreground text-center">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-card p-8 rounded-lg border border-border/50 shadow-sm max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4 text-foreground text-center">
            Transparency & Governance
          </h3>
          <p className="text-muted-foreground mb-8 text-center">
            As a decentralized platform, Roxonn operates with full transparency. All major decisions
            are made through community voting, and our financial transactions are publicly
            verifiable on the blockchain. While we have founding contributors who helped establish
            the platform, the true power lies in our community of members who collectively own and
            govern the platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Community Governance</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Democratic decision-making process</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Transparent voting mechanisms</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Open participation in proposals</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Financial Transparency</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Public revenue distribution</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Verifiable smart contracts</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-3">•</span>
                  <span>Regular community audits</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
