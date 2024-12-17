'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, GitPullRequest, Users, Coins } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getOrganizationProjects, type Project } from '@/lib/services/github';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectSkeleton() {
  return (
    <div className="glass-card group animate-pulse">
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-4 p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

function ProjectsError() {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-semibold mb-2">Unable to load projects</h3>
      <p className="text-black/80 dark:text-white/80">
        Please try again later or visit our{' '}
        <a
          href="https://github.com/Roxonn-FutureTech"
          className="text-[#00C2FF] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub organization
        </a>
      </p>
    </div>
  );
}

const IconMap = {
  GitPullRequest,
  Users,
  Coins,
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getOrganizationProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Active Projects</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Choose from open source and enterprise projects to contribute and earn
          </p>
        </motion.div>

        {error ? (
          <ProjectsError />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <ProjectSkeleton key={index} />)
              : projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="glass-card group"
                  >
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-[#00C2FF]/20 border border-[#00C2FF]/30 text-[#00C2FF]">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-4">{project.name}</h3>
                      <p className="text-black/70 dark:text-white/70 mb-6">{project.summary}</p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        {project.features.map((feature, featureIndex) => {
                          const Icon = IconMap[feature.icon as keyof typeof IconMap];
                          return (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <Icon className="w-5 h-5" />
                              <span>{feature.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                        <div>
                          <div className="text-sm text-black/60 dark:text-white/60 mb-1">
                            Reward
                          </div>
                          <div className="font-semibold text-[#00C2FF]">{project.reward}</div>
                        </div>
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-[#00C2FF] hover:text-[#00C2FF]/80 transition-colors"
                        >
                          <span>View on GitHub</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        )}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Link
            href="/contribute"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200"
          >
            View All Tasks
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="https://github.com/Roxonn-FutureTech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-card border border-border hover:bg-card/80 transition-all duration-200"
          >
            View All Projects
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
