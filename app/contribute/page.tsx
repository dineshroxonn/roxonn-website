'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Search, GitBranch, Clock } from 'lucide-react';
import Link from 'next/link';
import { fetchGitHubIssues, type GitHubIssue } from '@/lib/github';
import { useDebounce } from '@/hooks/useDebounce';

export default function ContributePage() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const loadIssues = async () => {
      setIsLoading(true);
      const data = await fetchGitHubIssues(debouncedSearch);
      setIssues(data);
      setIsLoading(false);
    };

    loadIssues();
  }, [debouncedSearch]);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">Available Tasks</h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose a task, contribute, and earn ROXN tokens
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-400">Fetching issues from Roxonn-FutureTech repositories...</p>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && issues.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No tasks found. Try adjusting your search.</p>
          </div>
        )}

        {/* Tasks Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {issue.description.length > 150
                        ? `${issue.description.slice(0, 150)}...`
                        : issue.description}
                    </p>
                  </div>
                  {issue.reward && (
                    <span className="text-[#00C2FF] font-semibold">+{issue.reward}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {issue.difficulty && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                        issue.difficulty
                      )}`}
                    >
                      {issue.difficulty}
                    </span>
                  )}
                  {issue.labels.map((label) => (
                    <span
                      key={label}
                      className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span>{issue.repository}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{issue.created_at}</span>
                  </div>
                </div>

                <Link
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <GitPullRequest className="w-4 h-4 mr-2" />
                  Start Contributing
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
