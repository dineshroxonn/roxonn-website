'use client';

import { useState, useEffect, useCallback } from 'react';
import { GitHubContribution, fetchContributions } from '@/lib/github';
import { ContributionCard } from './contribution-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export function ContributionList() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const loadContributions = useCallback(async () => {
    try {
      // TODO: Replace with actual username or get from authentication
      const data = await fetchContributions('example-user');
      setContributions(data);
    } catch (error) {
      toast({
        title: 'Error loading contributions',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  const filteredContributions = contributions
    .filter((contribution) => {
      if (filter === 'all') return true;
      return contribution.type === filter;
    })
    .filter((contribution) => contribution.title.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 glass-card animate-pulse bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search contributions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="bug">Bug Fixes</SelectItem>
            <SelectItem value="feature">Features</SelectItem>
            <SelectItem value="docs">Documentation</SelectItem>
            <SelectItem value="refactor">Refactoring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredContributions.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-gray-500 dark:text-gray-400">No contributions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContributions.map((contribution) => (
            <ContributionCard key={contribution.prNumber} contribution={contribution} />
          ))}
        </div>
      )}
    </div>
  );
}
