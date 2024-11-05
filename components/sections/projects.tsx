"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Layers, Zap, Users, BarChart3, Cloud, Shield } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    name: "Enterprise Resource Hub",
    summary: "A comprehensive enterprise resource planning solution that streamlines business operations and enhances productivity. Built with scalability and performance in mind.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    features: [
      {
        icon: <Layers className="w-5 h-5" />,
        text: "Modular Architecture"
      },
      {
        icon: <Zap className="w-5 h-5" />,
        text: "Real-time Analytics"
      },
      {
        icon: <Users className="w-5 h-5" />,
        text: "Team Collaboration"
      }
    ],
    link: "#"
  },
  {
    name: "Smart Analytics Platform",
    summary: "An intelligent analytics platform that transforms raw data into actionable insights. Leveraging AI to provide predictive analytics and data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    features: [
      {
        icon: <BarChart3 className="w-5 h-5" />,
        text: "Advanced Visualizations"
      },
      {
        icon: <Cloud className="w-5 h-5" />,
        text: "Cloud-native"
      },
      {
        icon: <Shield className="w-5 h-5" />,
        text: "Enterprise Security"
      }
    ],
    link: "#"
  }
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
          <h2 className="text-4xl font-bold mb-4 gradient-text">Ongoing Projects</h2>
          <p className="text-xl text-white/80">
            Innovating through technology to solve real-world challenges
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
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <h3 className="text-2xl font-semibold mb-3">{project.name}</h3>
              <p className="text-white/70 mb-6">{project.summary}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {project.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2 text-white/80"
                  >
                    <div className="text-[#00C2FF]">{feature.icon}</div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href={project.link}
                className="inline-flex items-center space-x-2 text-[#00C2FF] hover:text-white transition-colors group"
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
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
            href="#contact"
            className="glass-panel px-8 py-3 hover-glow inline-flex items-center space-x-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}