"use client";

import { motion } from 'framer-motion';
import { Code2, Shield, Cpu, Network, Database, Bot, Smartphone, Blocks } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your unique business requirements."
  },
  {
    icon: <Blocks className="w-8 h-8" />,
    title: "Blockchain Integration",
    description: "Decentralized solutions and blockchain technology integration for modern businesses."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Web & Mobile Development",
    description: "Responsive web applications and native mobile apps for all platforms."
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI & Automation",
    description: "Intelligent solutions powered by machine learning and automation."
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and services for modern applications."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Security Solutions",
    description: "Robust security implementations and best practices for your applications."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Enterprise Solutions",
    description: "Comprehensive enterprise software to streamline business operations."
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
          <p className="text-xl text-white/80">Comprehensive solutions for modern businesses</p>
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
              <p className="text-white/70">{service.description}</p>
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
            href="#contact"
            className="glass-panel px-8 py-3 hover-glow inline-block"
          >
            Explore Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}