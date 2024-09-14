import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const fetchTokenPrices = async (tokenIds) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: tokenIds.join(','),
        vs_currencies: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
};

export const getArbitrageOpportunities = (prices) => {
  const opportunities = [];
  const networks = ['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism', 'avalanche'];

  for (const baseToken in prices) {
    for (const quoteToken in prices) {
      if (baseToken !== quoteToken) {
        const basePrice = prices[baseToken].usd;
        const quotePrice = prices[quoteToken].usd;
        const priceDiff = Math.abs(basePrice / quotePrice - 1);

        if (priceDiff > 0.01) { // 1% threshold for arbitrage
          opportunities.push({
            type: 'Price Discrepancy',
            tokenPair: `${baseToken.toUpperCase()}/${quoteToken.toUpperCase()}`,
            networks: [networks[Math.floor(Math.random() * networks.length)], networks[Math.floor(Math.random() * networks.length)]],
            route: ['DEX A', 'DEX B'],
            profitUSD: priceDiff * 1000, // Assuming $1000 trade size
            estimatedFees: Math.random() * 10 + 5, // Random fee between $5 and $15
          });
        }
      }
    }
  }

  return opportunities.sort((a, b) => b.profitUSD - a.profitUSD);
};