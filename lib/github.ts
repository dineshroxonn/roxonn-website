import { Octokit } from '@octokit/rest';

// Initialize Octokit without auth for public repos
const octokit = new Octokit();

const ORGANIZATION = 'Roxonn-FutureTech';

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

export async function fetchGitHubIssues(searchQuery?: string): Promise<GitHubIssue[]> {
  try {
    // First, fetch all public repositories from the organization
    const { data: repos } = await octokit.repos.listForOrg({
      org: ORGANIZATION,
      type: 'public',
      sort: 'updated',
      per_page: 100,
    });

    console.log(
      'Found repositories:',
      repos.map((r) => r.name)
    ); // Debug log

    const issues: GitHubIssue[] = [];

    // Fetch issues from each public repository
    for (const repo of repos) {
      try {
        console.log(`Fetching issues for ${repo.name}`); // Debug log
        const response = await octokit.issues.listForRepo({
          owner: ORGANIZATION,
          repo: repo.name,
          state: 'open',
          per_page: 100,
        });

        console.log(`Found ${response.data.length} issues in ${repo.name}`); // Debug log

        const repoIssues = response.data
          .filter((issue) => !issue.pull_request) // Filter out pull requests
          .map((issue) => ({
            id: issue.node_id,
            title: issue.title,
            description: issue.body || 'No description provided.',
            repository: repo.name,
            html_url: issue.html_url,
            created_at: new Date(issue.created_at).toLocaleDateString(),
            labels: issue.labels
              .map((label) => (typeof label === 'string' ? label : label.name || ''))
              .filter(Boolean),
            reward: parseReward(
              issue.labels
                .map((label) => (typeof label === 'string' ? label : label.name || ''))
                .filter(Boolean)
            ),
            difficulty: parseDifficulty(
              issue.labels
                .map((label) => (typeof label === 'string' ? label : label.name || ''))
                .filter(Boolean)
            ),
          }));

        issues.push(...repoIssues);
      } catch (repoError) {
        console.error(`Error fetching issues for ${repo.name}:`, repoError); // Changed to error for better visibility
        continue;
      }
    }

    console.log('Total issues found:', issues.length); // Debug log

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query) ||
          issue.labels.some((label) => label.toLowerCase().includes(query)) ||
          issue.repository.toLowerCase().includes(query)
      );
    }

    return issues;
  } catch (error) {
    console.error('Error fetching GitHub issues:', error);
    return [];
  }
}
