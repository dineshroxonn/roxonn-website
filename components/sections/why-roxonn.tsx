//roxonn-website-fnnf31sf7-dineshs-projects-b62d01d4.vercel.app
https: 'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Network, Lock, Users, Coins } from 'lucide-react';

const features = [
  {
    icon: <Network className="w-12 h-12" />,
    title: 'Decentralized Model',
    description:
      'Our unique decentralized structure ensures fair decision-making and empowers every team member.',
  },
  {
    icon: <Coins className="w-12 h-12" />,
    title: '90% Revenue Share',
    description:
      'We believe in fair compensation, with 90% of project revenue going directly to our contributors.',
  },
  {
    icon: <Lock className="w-12 h-12" />,
    title: 'Complete Transparency',
    description:
      'Open access to project details, revenue distribution, and decision-making processes.',
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: 'Employee Empowerment',
    description: 'Every team member has a voice in project direction and company decisions.',
  },
];

export function WhyRoxonnSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Roxonn?</h2>
          <p className="text-muted-foreground">
            We&apos;re building the world&apos;s most advanced decentralized contribution platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border/50 shadow-sm transition-colors"
            >
              <div className="text-primary flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-card p-8 rounded-lg border border-border/50 shadow-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground">
              At Roxonn, we&apos;re building more than just software - we&apos;re creating a new
              paradigm for how technology companies operate. Through our decentralized model, we
              ensure that every contributor is valued, every voice is heard, and every project
              delivers exceptional results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
