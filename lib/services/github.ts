import { Octokit } from '@octokit/rest';
import { GitPullRequest, Users, Coins } from 'lucide-react';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface Project {
  name: string;
  type: 'Open Source' | 'Enterprise';
  summary: string;
  image: string;
  features: {
    icon: string;
    text: string;
  }[];
  reward: string;
  link: string;
}

export interface GitHubContribution {
  id: string;
  title: string;
  url: string;
  type: 'bug' | 'feature' | 'docs' | 'enhancement' | 'other';
  repository: string;
  createdAt: string;
  status: 'open' | 'closed' | 'merged';
  prNumber: number;
  complexity: 'low' | 'medium' | 'high';
  reward: string;
}

export interface GitHubIssue {
  id: string;
  title: string;
  description: string;
  repository: string;
  html_url: string;
  created_at: string;
  labels: string[];
  reward?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const PROJECT_IMAGES: Record<string, string> = {
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

function parseReward(labels: string[]): string | undefined {
  const rewardLabel = labels.find((label) => label.toLowerCase().includes('reward'));
  if (!rewardLabel) return '50 ROXN'; // Default reward if not specified
  const match = rewardLabel.match(/(\d+)\s*roxn/i);
  return match ? `${match[1]} ROXN` : '50 ROXN';
}

function parseDifficulty(labels: string[]): 'easy' | 'medium' | 'hard' {
  const difficultyLabel = labels.find((label) =>
    ['easy', 'medium', 'hard'].includes(label.toLowerCase())
  );
  return (difficultyLabel?.toLowerCase() as 'easy' | 'medium' | 'hard') || 'medium';
}

export async function getOrganizationProjects(): Promise<Project[]> {
  try {
    // Get all repositories
    const { data: repos } = await octokit.repos.listForOrg({
      org: 'Roxonn-FutureTech',
      type: 'public',
      sort: 'updated',
      per_page: 100,
    });

    // Filter out .github repository
    const filteredRepos = repos.filter((repo) => repo.name !== '.github');

    // Get contributors count for each repository
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

    // Transform the data into our Project format
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

export async function fetchContributions(username: string): Promise<GitHubContribution[]> {
  try {
    const { data: pulls } = await octokit.pulls.list({
      owner: username,
      repo: 'roxonn-website',
      state: 'all',
      per_page: 100,
    });

    return pulls.map((pull) => ({
      id: pull.node_id,
      title: pull.title,
      url: pull.html_url,
      type: determineContributionType(pull.title.toLowerCase()),
      repository: 'roxonn-website',
      createdAt: pull.created_at,
      status: pull.state === 'open' ? 'open' : pull.merged_at ? 'merged' : 'closed',
      prNumber: pull.number,
      complexity: 'low', // default complexity
      reward: '', // default reward
    }));
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}

function determineContributionType(title: string): GitHubContribution['type'] {
  if (title.includes('fix') || title.includes('bug')) return 'bug';
  if (title.includes('feat') || title.includes('add')) return 'feature';
  if (title.includes('doc')) return 'docs';
  if (title.includes('enhance') || title.includes('improve')) return 'enhancement';
  return 'other';
}

export async function fetchGitHubIssues(searchQuery?: string): Promise<GitHubIssue[]> {
  try {
    const { data: repos } = await octokit.repos.listForOrg({
      org: 'Roxonn-FutureTech',
      type: 'public',
      sort: 'updated',
      per_page: 100,
    });

    const issues: GitHubIssue[] = [];

    // Fetch issues from each public repository
    for (const repo of repos) {
      const { data: repoIssues } = await octokit.issues.listForRepo({
        owner: 'Roxonn-FutureTech',
        repo: repo.name,
        state: 'open',
        labels: 'help wanted',
      });

      issues.push(
        ...repoIssues
          .filter((issue) => !issue.pull_request) // Exclude PRs
          .filter((issue) =>
            searchQuery
              ? issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (issue.body || '').toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
          .map((issue) => ({
            id: issue.id.toString(),
            title: issue.title,
            description: issue.body || '',
            repository: repo.name,
            html_url: issue.html_url,
            created_at: issue.created_at,
            labels: issue.labels.map((label) =>
              typeof label === 'string' ? label : label.name || ''
            ),
            reward: parseReward(
              issue.labels.map((label) => (typeof label === 'string' ? label : label.name || ''))
            ),
            difficulty: parseDifficulty(
              issue.labels.map((label) => (typeof label === 'string' ? label : label.name || ''))
            ),
          }))
      );
    }

    return issues;
  } catch (error) {
    console.error('Error fetching GitHub issues:', error);
    return [];
  }
}
