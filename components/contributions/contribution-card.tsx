'use client';

import { GitHubContribution } from '@/lib/services/github';
import { motion } from 'framer-motion';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContributionCardProps {
  contribution: GitHubContribution;
}

const typeColors = {
  bug: 'text-red-500 bg-red-500/10 border-red-500/20',
  feature: 'text-green-500 bg-green-500/10 border-green-500/20',
  docs: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  refactor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
};

const statusColors = {
  pending: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  approved: 'text-green-500 bg-green-500/10 border-green-500/20',
  rejected: 'text-red-500 bg-red-500/10 border-red-500/20',
};

export function ContributionCard({ contribution }: ContributionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">{contribution.title}</CardTitle>
              <CardDescription>
                PR #{contribution.prNumber} •{' '}
                {formatDistanceToNow(new Date(contribution.createdAt), {
                  addSuffix: true,
                })}
              </CardDescription>
            </div>
            <a
              href={contribution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`${typeColors[contribution.type]} capitalize`}>
              {contribution.type}
            </Badge>
            <Badge variant="outline" className={`${statusColors[contribution.status]} capitalize`}>
              {contribution.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {contribution.complexity}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <GitPullRequest className="h-4 w-4" />
              <span>Pull Request</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Reward</div>
              <div className="text-lg font-bold text-[#00C2FF]">{contribution.reward} ROXN</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
