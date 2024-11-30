"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Timeline } from "@/components/ui/timeline";

const roadmapItems = [
  {
    title: "Website Launch",
    description: "Launch of the Roxonn website with core information and community engagement features.",
    date: "Q2 2024",
    status: "completed" as const,
  },
  {
    title: "Token Launch",
    description: "ROXN token launch with initial distribution and listing on decentralized exchanges.",
    date: "Q2 2024",
    status: "current" as const,
  },
  {
    title: "Contribution System",
    description: "Launch of the code contribution tracking and reward distribution system.",
    date: "Q3 2024",
    status: "upcoming" as const,
  },
  {
    title: "Governance",
    description: "Implementation of decentralized governance for project decisions.",
    date: "Q3 2024",
    status: "upcoming" as const,
  },
  {
    title: "Staking",
    description: "Launch of staking mechanisms for additional token holder benefits.",
    date: "Q4 2024",
    status: "upcoming" as const,
  },
];

export function RoadmapSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Roadmap</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Our journey to building a decentralized software organization
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8"
        >
          <Timeline items={roadmapItems} />
        </motion.div>
      </div>
    </section>
  );
}
