import { ethers } from 'ethers';
import { toast } from 'sonner';

// ABI for the basic token metrics
const TOKEN_ABI = [
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

const CONTRACT_ADDRESS = '0x433F257d837E8577dB379Ae55061F913599B29A8';

interface TokenMetrics {
  totalSupply: string;
  circulatingSupply: string;
  price: string;
  marketCap: string;
}

export const defaultMetrics: TokenMetrics = {
  totalSupply: '0',
  circulatingSupply: '0',
  price: '0',
  marketCap: '0',
};

export async function fetchTokenMetrics(): Promise<TokenMetrics> {
  try {
    // For development/preview, return mock data if window is not defined
    if (typeof window === 'undefined') {
      return {
        totalSupply: '100,000,000',
        circulatingSupply: '45,000,000',
        price: '0.15',
        marketCap: '6,750,000',
      };
    }

    // Check if ethereum is available
    if (!window.ethereum) {
      console.warn('Ethereum provider not found');
      return defaultMetrics;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TOKEN_ABI, provider);

    // Fetch basic token metrics
    const [totalSupply, decimals] = await Promise.all([
      contract.totalSupply(),
      contract.decimals(),
    ]);

    // Convert values
    const formattedSupply = ethers.formatUnits(totalSupply, decimals);
    const circulatingSupply = (Number(formattedSupply) * 0.45).toString(); // 45% circulating
    const price = '0.15'; // Mock price for now
    const marketCap = (Number(circulatingSupply) * Number(price)).toString();

    return {
      totalSupply: Number(formattedSupply).toLocaleString(),
      circulatingSupply: Number(circulatingSupply).toLocaleString(),
      price: price,
      marketCap: Number(marketCap).toLocaleString(),
    };
  } catch (error) {
    console.error('Error fetching token metrics:', error);
    // Don't show error toast in production for contract calls
    if (process.env.NODE_ENV === 'development') {
      toast.error('Error fetching token metrics. Using default values.');
    }
    return defaultMetrics;
  }
}
