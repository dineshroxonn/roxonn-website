'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ContributionList } from '@/components/contributions/contribution-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GitPullRequest, Trophy, Users } from 'lucide-react';

export function ContributionsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contributions" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Code Contributions</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Contribute to our projects and earn ROXN tokens
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="contributions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="contributions" className="space-x-2">
                <GitPullRequest className="h-4 w-4" />
                <span>Contributions</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </TabsTrigger>
              <TabsTrigger value="contributors" className="space-x-2">
                <Users className="h-4 w-4" />
                <span>Contributors</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contributions" className="space-y-8">
              <div className="glass-panel p-8">
                <ContributionList />
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <div className="glass-panel p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">Leaderboard Coming Soon</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Track top contributors and their rewards
                </p>
                <Button variant="outline" disabled>
                  View Leaderboard
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contributors">
              <div className="glass-panel p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">Contributors Coming Soon</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Connect with other contributors
                </p>
                <Button variant="outline" disabled>
                  View Contributors
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/roxonn/roxonn-website"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel px-6 py-3 inline-flex items-center hover-glow"
          >
            Start Contributing
          </a>
        </motion.div>
      </div>
    </section>
  );
}
