"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target, Rocket } from 'lucide-react';

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Technical Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Michael Rodriguez",
    role: "Solutions Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

const values = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Client Success",
    description: "Building software that delivers real value and drives business growth."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Innovation Driven",
    description: "Leveraging cutting-edge technologies to create powerful solutions."
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Future Ready",
    description: "Developing scalable solutions that evolve with your business needs."
  }
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
          <h2 className="text-4xl font-bold mb-4 gradient-text">About Us</h2>
          <p className="text-xl text-black/80 dark:text-white/80">Excellence in software development and innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card text-center"
            >
              <div className="mb-4 text-[#00C2FF]">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-black/70 dark:text-white/70">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card text-center group"
            >
              <div className="mb-4 relative overflow-hidden rounded-full w-32 h-32 mx-auto">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-black/70 dark:text-white/70">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}