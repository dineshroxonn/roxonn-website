'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GitPullRequest,
  Coins,
  Check,
  Lightbulb,
  FileCode,
  Users,
  Vote,
  MessageSquare,
  Settings,
} from 'lucide-react';

const flows = [
  {
    title: 'Contribute & Earn',
    description: 'Help build Roxonn projects and earn ROXN tokens',
    icon: GitPullRequest,
    isLive: true,
    steps: [
      {
        title: 'Find an Issue',
        icon: GitPullRequest,
        description: 'Browse through available tasks',
      },
      {
        title: 'Make Changes',
        icon: FileCode,
        description: 'Fix bugs or add features',
      },
      {
        title: 'Submit PR',
        icon: GitPullRequest,
        description: 'Create a pull request',
      },
      {
        title: 'Get Merged',
        icon: Check,
        description: 'PR approved and merged',
      },
      {
        title: 'Earn ROXN',
        icon: Coins,
        description: 'Tokens transferred to wallet',
        reward: '50 ROXN',
      },
    ],
  },
  {
    title: 'Submit Your Project',
    description: 'Use ROXN tokens to propose your project ideas',
    icon: Lightbulb,
    isLive: false,
    steps: [
      {
        title: 'Draft Proposal',
        icon: MessageSquare,
        description: 'Describe your project idea and required resources',
      },
      {
        title: 'Stake ROXN',
        icon: Coins,
        description: 'Stake tokens to submit your proposal',
        cost: '100 ROXN',
      },
      {
        title: 'Review Process',
        icon: Users,
        description: 'Project reviewed by Roxonn team',
      },
      {
        title: 'Get Listed',
        icon: Check,
        description: 'Project approved and listed',
      },
      {
        title: 'Start Building',
        icon: FileCode,
        description: 'Begin development with community',
      },
    ],
  },
  {
    title: 'Governance',
    description: 'Participate in decision-making with ROXN tokens',
    icon: Settings,
    isLive: false,
    steps: [
      {
        title: 'Create Proposal',
        icon: MessageSquare,
        description: 'Submit governance proposal',
      },
      {
        title: 'Discussion',
        icon: Users,
        description: 'Community discusses proposal',
      },
      {
        title: 'Voting Period',
        icon: Vote,
        description: 'Token holders cast votes',
      },
      {
        title: 'Implementation',
        icon: Check,
        description: 'Approved changes executed',
      },
    ],
  },
];

const teamHighlights = [
  {
    title: 'Core Contributors',
    description: 'Global network of skilled developers and innovators.',
    icon: Users,
  },
  {
    title: 'Governance Council',
    description: 'Elected members guiding strategic decisions.',
    icon: Vote,
  },
  {
    title: 'Community Leaders',
    description: 'Active members championing initiatives.',
    icon: MessageSquare,
  },
];

export function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Building Together</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Join our thriving ecosystem where innovation meets collaboration. Discover how you can
            contribute, earn, and shape the future of decentralized development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border/50 shadow-sm transition-colors"
            >
              <div className="text-primary flex justify-center mb-4">
                <highlight.icon className="w-12 h-12" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-foreground text-center">
                {highlight.title}
              </h4>
              <p className="text-muted-foreground text-center text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-16">
          {flows.map((flow, flowIndex) => (
            <motion.div
              key={flowIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: flowIndex * 0.2 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <flow.icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{flow.title}</h3>
                    <p className="text-muted-foreground">{flow.description}</p>
                  </div>
                </div>
                {!flow.isLive && (
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-6 h-full w-px bg-border" />
                <div className="space-y-8">
                  {flow.steps.map((step, stepIndex) => (
                    <motion.div
                      key={stepIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: stepIndex * 0.1 + flowIndex * 0.2 }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-0 p-3 bg-background border border-border rounded-full">
                        <step.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-foreground flex items-center gap-2">
                          {step.title}
                          {step.reward && (
                            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                              +{step.reward}
                            </span>
                          )}
                          {step.cost && (
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                              {step.cost}
                            </span>
                          )}
                        </h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
