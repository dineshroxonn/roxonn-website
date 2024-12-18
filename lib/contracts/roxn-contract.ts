import { ethers } from 'ethers';

// ROXN Token Contract ABI - only including the functions we need
const ROXN_ABI = [
  // View functions
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  // Optional functions that might not be implemented yet
  'function maxTotalSupply() view returns (uint256)',
];

// Polygon Mainnet ROXN Token Contract Address
const ROXN_CONTRACT_ADDRESS = '0x433F257d837E8577dB379Ae55061F913599B29A8';

// Fallback values for development/testing
const FALLBACK_VALUES = {
  maxSupply: ethers.parseEther('1000000000'), // 1 billion tokens
  currentSupply: ethers.parseEther('300000000'), // 300 million tokens
  circulatingSupply: ethers.parseEther('100000000'), // 100 million tokens
  rewardPool: ethers.parseEther('300000000'), // 300 million tokens
};

// RPC endpoints with fallbacks
const RPC_ENDPOINTS = [
  process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  'https://polygon-rpc.com',
  'https://rpc-mainnet.matic.network',
  'https://matic-mainnet.chainstacklabs.com',
];

async function tryProvider(url: string) {
  try {
    const provider = new ethers.JsonRpcProvider(url);
    await provider.getNetwork(); // Test the connection
    return provider;
  } catch {
    return null;
  }
}

export const getRoxnContract = async () => {
  // Try each RPC endpoint until one works
  for (const rpc of RPC_ENDPOINTS) {
    if (!rpc) continue;
    const provider = await tryProvider(rpc);
    if (provider) {
      return new ethers.Contract(ROXN_CONTRACT_ADDRESS, ROXN_ABI, provider);
    }
  }
  throw new Error('Unable to connect to any RPC endpoint');
};

export const fetchTokenMetrics = async () => {
  try {
    const contract = await getRoxnContract();
    console.log('Contract instance created successfully');

    let maxSupply, currentSupply;

    // Try to get totalSupply first as it's a standard ERC20 function
    try {
      currentSupply = await contract.totalSupply();
    } catch (error) {
      console.error('Error fetching totalSupply:', error);
      currentSupply = FALLBACK_VALUES.currentSupply;
    }

    // Try to get maxTotalSupply if implemented
    try {
      maxSupply = await contract.maxTotalSupply();
    } catch {
      // If maxTotalSupply is not implemented, use a calculated value
      maxSupply =
        currentSupply > FALLBACK_VALUES.maxSupply ? currentSupply : FALLBACK_VALUES.maxSupply;
    }

    // Calculate metrics
    const circulatingSupply = currentSupply;
    const rewardPool = (maxSupply * BigInt(30)) / BigInt(100); // 30% of max supply

    // Format all values to numbers
    return {
      maxSupply: Number(ethers.formatEther(maxSupply)),
      currentSupply: Number(ethers.formatEther(currentSupply)),
      circulatingSupply: Number(ethers.formatEther(circulatingSupply)),
      rewardPool: Number(ethers.formatEther(rewardPool)),
    };
  } catch (error) {
    console.error('Error in fetchTokenMetrics:', error);

    // Return fallback values formatted as numbers
    return {
      maxSupply: Number(ethers.formatEther(FALLBACK_VALUES.maxSupply)),
      currentSupply: Number(ethers.formatEther(FALLBACK_VALUES.currentSupply)),
      circulatingSupply: Number(ethers.formatEther(FALLBACK_VALUES.circulatingSupply)),
      rewardPool: Number(ethers.formatEther(FALLBACK_VALUES.rewardPool)),
    };
  }
};
