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
