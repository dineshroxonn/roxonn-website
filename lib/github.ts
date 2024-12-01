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

export interface ContributionMetrics {
  additions: number;
  deletions: number;
  changedFiles: number;
}

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

function determineContributionType(title: string, labels: any[]): GitHubContribution['type'] {
  const labelNames = labels.map((label: any) => label.name.toLowerCase());
  
  if (labelNames.includes('bug') || title.toLowerCase().includes('fix')) return 'bug';
  if (labelNames.includes('documentation') || title.toLowerCase().includes('docs')) return 'docs';
  if (labelNames.includes('refactor') || title.toLowerCase().includes('refactor')) return 'refactor';
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
