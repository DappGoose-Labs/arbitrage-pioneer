
import axios from 'axios';
import { fetchTokenPrices, getArbitrageOpportunities } from './priceData';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchArbitrageData = async (degenMode = false) => {
  try {
    const tokenIds = [
      'bitcoin', 'ethereum', 'binancecoin', 'matic-network', 'avalanche-2',
      'arbitrum', 'zksync-era', 'bald', 'optimism', 'solana'
    ];

    const prices = await fetchTokenPrices(tokenIds, degenMode);
    const opportunities = getArbitrageOpportunities(prices, degenMode);

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        opportunities,
        metadata: {
          degenMode,
          totalOpportunities: opportunities.length,
          highestProfit: opportunities.length > 0 
            ? Math.max(...opportunities.map(o => o.profitPercent))
            : 0,
          lowestProfit: opportunities.length > 0 
            ? Math.min(...opportunities.map(o => o.profitPercent))
            : 0,
        }
      }
    };
  } catch (error) {
    console.error('Error fetching arbitrage data:', error);
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        message: error.message || 'Failed to fetch arbitrage data',
        code: error.response?.status || 500
      }
    };
  }
};

export const getFormattedArbitrageData = async (degenMode = false) => {
  const response = await fetchArbitrageData(degenMode);
  
  if (!response.success) {
    throw new Error(response.error.message);
  }

  const { opportunities } = response.data;

  // Format opportunities for API consumption
  return opportunities.map(opp => ({
    token: opp.token,
    tokenAddress: opp.tokenAddress,
    exchange1: {
      name: opp.dex1.name,
      network: opp.dex1.network,
      price: parseFloat(opp.dex1.price.toFixed(8)),
      liquidity: opp.dex1.liquidity,
      pair: opp.dex1.pair
    },
    exchange2: {
      name: opp.dex2.name,
      network: opp.dex2.network,
      price: parseFloat(opp.dex2.price.toFixed(8)),
      liquidity: opp.dex2.liquidity,
      pair: opp.dex2.pair
    },
    profitPercentage: parseFloat(opp.profitPercent.toFixed(2)),
    timestamp: response.timestamp
  }));
};
