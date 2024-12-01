---

## **Phase 1: Coming Soon Features**
### **How to Implement "Coming Soon" Functionality**
1. **UI Updates**:
   - Replace actionable buttons (like "Stake ROXN" or "Buy ROXN") with **"Coming Soon" badges** or disabled buttons.
   - Add tooltips or modals explaining that these features will be available after the token launch.

2. **Interactive Roadmap**:
   - Build an interactive roadmap (e.g., using `ui/timeline.tsx` or a similar component).
   - Highlight upcoming features like staking, governance, marketplace, and community rewards.

3. **Gamify the Wait**:
   - Allow users to "unlock previews" by interacting with your website, such as subscribing to updates or connecting their wallets.

4. **Wallet Integration**:
   - Allow wallet connections and display balances (even if only mock data or placeholders) to build familiarity.

---

## **Phase 2: Code Contribution Rewarding Functionality**

### **Overview**
Reward contributors with **ROXN tokens** based on their code contributions to the project. This encourages active community involvement and aligns with blockchain’s ethos of decentralization.

### **Workflow**
#### **1. Contributor Workflow**
- A developer contributes code to the project (e.g., via GitHub Pull Requests).
- The contribution is reviewed and merged by the core team.
- Rewards are calculated based on predefined metrics.
- ROXN tokens are transferred to the contributor’s wallet.

#### **2. Admin Workflow**
- Admins configure reward rules (e.g., tokens per line of code, complexity, issue type).
- Admins approve contributions and trigger token rewards.

---

### **Key Features**
1. **Contribution Tracking**:
   - Use GitHub APIs to fetch data on pull requests, commits, and issues.
   - Assign reward points based on:
     - **Type of Contribution**: Bug fixes, feature implementations, documentation.
     - **Complexity**: Easy, medium, hard.
     - **Impact**: Critical fixes or widely used features.

2. **Reward Distribution**:
   - Automatically calculate rewards in ROXN for eligible contributions.
   - Trigger token transfers to contributors' wallets via a smart contract.

3. **Leaderboard**:
   - Display a public leaderboard showcasing top contributors and their rewards.
   - Use `ui/table.tsx` or a similar component for an interactive view.

4. **Audit Log**:
   - Maintain a transparent log of contributions and rewards.

---

### **Implementation Plan**

#### **Step 1: Define Reward Rules**
- Metrics to calculate rewards:
  - Lines of code added/modified (exclude deletions).
  - Pull request type (feature, bug fix, documentation).
  - Complexity (admin-assigned).
  - Code quality (e.g., passing automated tests, coverage increase).

- Example Reward Table:
  | Contribution Type       | Reward (ROXN)       |
  |-------------------------|---------------------|
  | Bug Fix (Critical)      | 500 ROXN            |
  | Feature Implementation  | 1000 ROXN           |
  | Documentation           | 200 ROXN            |
  | Refactoring             | 300 ROXN            |

---

#### **Step 2: Fetch GitHub Data**
- Use the **GitHub REST API** or **GraphQL API** to:
  - Fetch recent pull requests.
  - Check merged status and commit details.
  - Track issue fixes and linked pull requests.

##### Example API Call:
```javascript
// Fetch Pull Requests
fetch("https://api.github.com/repos/OWNER/REPO/pulls?state=closed", {
  headers: {
    Authorization: `Bearer YOUR_GITHUB_TOKEN`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Pull Request Details
  });
```

---

#### **Step 3: Automate Token Distribution**
1. **Smart Contract for Rewards**:
   - Write a contract that:
     - Accepts wallet addresses and reward amounts.
     - Distributes ROXN tokens upon admin approval.
   - Functions:
     - `distributeRewards(address recipient, uint256 amount)`: Transfers tokens.

2. **Integration with Codebase**:
   - Use Web3.js or Ethers.js to call the smart contract from your backend or frontend.
   - Example:
     ```javascript
     const contract = new ethers.Contract(contractAddress, abi, signer);
     await contract.distributeRewards(walletAddress, rewardAmount);
     ```

3. **Admin Dashboard**:
   - Build a simple interface for approving rewards:
     - List eligible contributors and their reward amounts.
     - Provide an "Approve and Distribute" button.

---

#### **Step 4: Build a Leaderboard**
- Use `ui/table.tsx` to display:
  - Contributor name or wallet address.
  - Total contributions.
  - Total ROXN earned.
  - Recent contributions.

---

#### **Step 5: Notifications and Transparency**
1. **To Contributors**:
   - Send notifications (via email or in-app) when rewards are distributed.
   - Use `ui/toaster.tsx` for in-app alerts.

2. **To Community**:
   - Maintain a public log of contributions and rewards.

---

### **Version 1 Code Contribution Functionality**
**Features**:
1. **Track Contributions**:
   - Integrate GitHub API to fetch and display pull requests/issues.

2. **Admin Panel**:
   - Build a minimal dashboard for managing contributions and approving rewards.

3. **Manual Reward Distribution**:
   - In Version 1, use a semi-automated process where admins approve contributions and manually trigger ROXN transfers via the dashboard.

---

### **Roxonn V1 Features Implementation Plan**

## Phase 1: Coming Soon Features

### How to Implement "Coming Soon" Functionality

#### 1. UI Updates
- Replace actionable buttons with "Coming Soon" badges
- Add informative tooltips/modals
- Implement disabled state styling
- Add email subscription for updates

#### 2. Interactive Roadmap
- Create timeline component using `ui/timeline.tsx`
- Display phases: Token Launch, Staking, Governance
- Add progress indicators
- Include estimated release dates

#### 3. Engagement Features
- Email subscription system
- Wallet connection preview
- Community updates section
- Social media integration

## Phase 2: Code Contribution Rewarding System

### Core Components

#### 1. GitHub Integration
```typescript
interface GitHubContribution {
  type: 'bug' | 'feature' | 'docs' | 'refactor';
  prNumber: number;
  complexity: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'approved' | 'rejected';
  reward: number;
}
```

#### 2. Reward Calculation System
| Contribution Type | Base Reward (ROXN) | Complexity Multiplier |
|------------------|-------------------|---------------------|
| Bug Fix          | 500              | 1x - 3x             |
| Feature          | 1000             | 1x - 3x             |
| Documentation    | 200              | 1x - 2x             |
| Refactoring      | 300              | 1x - 2x             |

#### 3. Smart Contract Interface
```solidity
interface IRewardDistributor {
    function distributeRewards(address recipient, uint256 amount) external;
    function getContributorBalance(address contributor) external view returns (uint256);
    function getTotalDistributed() external view returns (uint256);
}
```

### Implementation Steps

#### 1. GitHub API Integration
```typescript
// components/github/contribution-tracker.tsx
export async function fetchContributions(username: string) {
  const response = await fetch(
    `https://api.github.com/repos/roxonn/roxonn-website/pulls?state=closed&creator=${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  return response.json();
}
```

#### 2. Admin Dashboard
- Create `/admin` route
- Implement contribution review system
- Add reward distribution controls
- Include audit logging

#### 3. Contributor Dashboard
- Display contribution history
- Show pending rewards
- Implement wallet connection
- Add contribution guidelines

### Database Schema

```typescript
interface Contribution {
  id: string;
  githubPrId: number;
  contributorId: string;
  type: ContributionType;
  status: ContributionStatus;
  rewardAmount: number;
  reviewedAt?: Date;
  distributedAt?: Date;
}

interface Contributor {
  id: string;
  githubUsername: string;
  walletAddress?: string;
  totalContributions: number;
  totalRewards: number;
}
```

### API Routes

```typescript
// pages/api/contributions/index.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getContributions(req, res);
    case 'POST':
      return createContribution(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
```

### Components to Build

1. Contribution Tracking
```typescript
// components/contributions/contribution-list.tsx
export function ContributionList() {
  const { data, isLoading } = useContributions();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="space-y-4">
      {data.map((contribution) => (
        <ContributionCard key={contribution.id} {...contribution} />
      ))}
    </div>
  );
}
```

2. Reward Distribution
```typescript
// components/rewards/distribute-rewards.tsx
export function DistributeRewards({ contributionId }: { contributionId: string }) {
  const { distribute, isLoading } = useRewardDistribution();
  
  return (
    <Button
      onClick={() => distribute(contributionId)}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Distribute Rewards'}
    </Button>
  );
}
```

### Next Steps

1. Technical Setup
   - Set up GitHub API integration
   - Deploy smart contracts
   - Create database schema
   - Configure authentication

2. UI Development
   - Build admin dashboard
   - Create contributor portal
   - Implement leaderboard
   - Add notification system

3. Testing
   - Write unit tests
   - Perform integration testing
   - Complete security audit
   - Test reward distribution

4. Documentation
   - API documentation
   - Contribution guidelines
   - Admin manual
   - User guide

---

### **Tools and Technologies**
1. **GitHub API**:
   - Fetch and track contributions.

2. **Web3.js/Ethers.js**:
   - Interact with the ROXN smart contract for reward distribution.

3. **Frontend**:
   - Use components like `ui/table.tsx`, `ui/toaster.tsx`, and `ui/progress.tsx` for displaying data and feedback.

4. **Backend** (Optional for V1):
   - Use Node.js for server-side processing of GitHub contributions and smart contract calls.

---

### **Next Steps**
1. **Create Reward Rules**:
   - Define clear metrics for rewarding contributors.

2. **Set Up GitHub API Integration**:
   - Fetch and display pull request data in a dashboard.

3. **Smart Contract Deployment**:
   - Deploy or update the ROXN smart contract to include a reward distribution function.

4. **Build the Admin Dashboard**:
   - Enable reward approval and distribution.
