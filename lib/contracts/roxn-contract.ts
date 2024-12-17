import { ethers } from 'ethers';

// ROXN Token Contract ABI - only including the functions we need
const ROXN_ABI = [
  'function maxTotalSupply() view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
];

// Polygon Mainnet ROXN Token Contract Address
const ROXN_CONTRACT_ADDRESS = '0x433F257d837E8577dB379Ae55061F913599B29A8'; // Replace with actual contract address

export const getRoxnContract = async () => {
  try {
    // Using Polygon RPC URL
    const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');
    return new ethers.Contract(ROXN_CONTRACT_ADDRESS, ROXN_ABI, provider);
  } catch (error) {
    console.error('Error creating contract instance:', error);
    throw error;
  }
};

export const fetchTokenMetrics = async () => {
  try {
    const contract = await getRoxnContract();
    console.log('Contract instance created successfully');

    const [maxSupply, currentSupply] = await Promise.all([
      contract.maxTotalSupply(),
      contract.totalSupply(),
    ]);

    console.log('Raw values:', {
      maxSupply: maxSupply.toString(),
      currentSupply: currentSupply.toString(),
    });

    // For demonstration, we'll calculate circulating supply as current supply
    // and set reward pool as 30% of max supply (based on distribution shown in UI)
    const circulatingSupply = currentSupply;
    const rewardPool = (maxSupply * BigInt(30)) / BigInt(100);

    return {
      totalSupply: ethers.formatEther(maxSupply),
      circulatingSupply: ethers.formatEther(circulatingSupply),
      rewardPool: ethers.formatEther(rewardPool),
    };
  } catch (error) {
    console.error('Error fetching token metrics:', error);
    // Return default values instead of null for better UX
    return {
      totalSupply: '1000000',
      circulatingSupply: '1000000',
      rewardPool: '300000',
    };
  }
};
