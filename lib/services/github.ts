import { Octokit } from '@octokit/rest';
import { GitPullRequest, Users, Coins } from 'lucide-react';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Types
export interface GitHubContribution {
  type: 'bug' | 'feature' | 'docs' | 'refactor';
  prNumber: number;
  complexity: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'approved' | 'rejected';
  reward: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  name: string;
  type: string;
  summary: string;
  image: string;
  features: Array<{
    icon: string;
    text: string;
  }>;
  reward: string;
  link: string;
}

// Constants
const COMPLEXITY_MULTIPLIERS = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const BASE_REWARDS = {
  bug: 500,
  feature: 1000,
  docs: 200,
  refactor: 300,
};

interface ContributionMetrics {
  additions: number;
  deletions: number;
  changedFiles: number;
}

// Helper functions
function determineContributionType(title: string, labels: any[]): GitHubContribution['type'] {
  const labelNames = labels.map((label: any) => label.name.toLowerCase());

  if (labelNames.includes('bug') || title.toLowerCase().includes('fix')) return 'bug';
  if (labelNames.includes('documentation') || title.toLowerCase().includes('docs')) return 'docs';
  if (labelNames.includes('refactor') || title.toLowerCase().includes('refactor'))
    return 'refactor';
  return 'feature';
}

function determineComplexity(pull: any): GitHubContribution['complexity'] {
  const metrics = getContributionMetrics(pull);

  if (metrics.changedFiles > 10 || metrics.additions + metrics.deletions > 500) return 'hard';
  if (metrics.changedFiles > 5 || metrics.additions + metrics.deletions > 200) return 'medium';
  return 'easy';
}

function determineStatus(state: string, mergedAt: string | null): GitHubContribution['status'] {
  if (mergedAt) return 'approved';
  if (state === 'closed') return 'rejected';
  return 'pending';
}

function calculateReward(pull: any): number {
  const type = determineContributionType(pull.title, pull.labels);
  const complexity = determineComplexity(pull);

  return BASE_REWARDS[type] * COMPLEXITY_MULTIPLIERS[complexity];
}

function getContributionMetrics(pull: any): ContributionMetrics {
  return {
    additions: pull.additions || 0,
    deletions: pull.deletions || 0,
    changedFiles: pull.changed_files || 0,
  };
}

// Main functions
export async function fetchContributions(username: string): Promise<GitHubContribution[]> {
  const response = await fetch(
    `https://api.github.com/repos/roxonn/roxonn-website/pulls?state=all&creator=${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch contributions');
  }

  const pulls = await response.json();

  return pulls.map((pull: any) => ({
    type: determineContributionType(pull.title, pull.labels),
    prNumber: pull.number,
    complexity: determineComplexity(pull),
    status: determineStatus(pull.state, pull.merged_at),
    reward: calculateReward(pull),
    title: pull.title,
    url: pull.html_url,
    createdAt: pull.created_at,
    updatedAt: pull.updated_at,
  }));
}

const PROJECT_IMAGES: { [key: string]: string } = {
  'roxonn-defi':
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop',
  DrowsyDriverAlertApp:
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop',
  'emergency-med-portal':
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop',
  'roxonn-website':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
};

export async function getOrganizationProjects(): Promise<Project[]> {
  try {
    const { data: repos } = await octokit.repos.listForOrg({
      org: 'Roxonn-FutureTech',
      type: 'public',
      sort: 'updated',
      per_page: 100,
    });

    const filteredRepos = repos.filter((repo) => repo.name !== '.github');

    const projectsWithContributors = await Promise.all(
      filteredRepos.map(async (repo) => {
        try {
          const { data: contributors } = await octokit.repos.listContributors({
            owner: 'Roxonn-FutureTech',
            repo: repo.name,
            per_page: 1,
            anon: 'true',
          });

          return {
            ...repo,
            contributors_count: contributors.length,
          };
        } catch (error) {
          console.error(`Failed to fetch contributors for ${repo.name}:`, error);
          return {
            ...repo,
            contributors_count: 0,
          };
        }
      })
    );

    return projectsWithContributors.map((repo) => ({
      name: repo.name,
      type: 'Open Source',
      summary: repo.description || `${repo.name} - Open source project by Roxonn FutureTech`,
      image: PROJECT_IMAGES[repo.name] || PROJECT_IMAGES.default,
      features: [
        {
          icon: 'GitPullRequest',
          text: 'Active Development',
        },
        {
          icon: 'Users',
          text: `${repo.contributors_count} Contributors`,
        },
        {
          icon: 'Coins',
          text: 'Token Rewards',
        },
      ],
      reward: '5000 ROXN',
      link: repo.html_url,
    }));
  } catch (error) {
    console.error('Failed to fetch organization projects:', error);
    throw error;
  }
}
