"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Globe, Wallet, Award } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Flexible Hours",
    description: "Work when you're most productive with our flexible scheduling."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Remote First",
    description: "Join our global team and work from anywhere in the world."
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Fair Compensation",
    description: "Earn 90% of project revenue with our transparent payment model."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Skill Growth",
    description: "Continuous learning and development opportunities."
  }
];

const positions = [
  {
    title: "Full Stack Developer",
    type: "Full-time / Part-time",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    title: "Blockchain Engineer",
    type: "Full-time",
    skills: ["Solidity", "Web3.js", "Smart Contracts"],
  },
  {
    title: "UI/UX Designer",
    type: "Freelance",
    skills: ["Figma", "User Research", "Design Systems"],
  }
];

export function JoinUsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="join-us" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Join Our Team</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Be part of a revolutionary software development company
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card flex items-start space-x-4"
            >
              <div className="text-[#00C2FF]">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-black/70 dark:text-white/70">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6">Open Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position, index) => (
              <div key={index} className="glass-panel p-6">
                <h4 className="text-xl font-semibold mb-2">{position.title}</h4>
                <p className="text-black/70 dark:text-white/70 mb-4">{position.type}</p>
                <div className="flex flex-wrap gap-2">
                  {position.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 rounded-full text-sm bg-black/10 dark:bg-white/10 text-black/90 dark:text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="glass-panel px-8 py-3 hover-glow inline-block"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}