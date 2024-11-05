"use client";

import { motion } from 'framer-motion';
import { Code2, Shield, Cpu, Network } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your unique business requirements."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and services for modern applications."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Enterprise Solutions",
    description: "Robust enterprise software to streamline your business operations."
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: "Digital Transformation",
    description: "End-to-end digital solutions to modernize your business processes."
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
          <h2 className="text-4xl font-bold mb-4 gradient-text">Our Services</h2>
          <p className="text-xl text-white/80">Delivering excellence in software development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card group"
            >
              <div className="mb-4 text-[#00C2FF] group-hover:scale-110 transform transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}