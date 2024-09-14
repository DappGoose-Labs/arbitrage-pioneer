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

const dexes = [
  { name: 'Uniswap V3', network: 'Ethereum Mainnet' },
  { name: 'PancakeSwap', network: 'BNB Chain' },
  { name: 'SushiSwap', network: 'Polygon' },
  { name: 'QuickSwap', network: 'Polygon' },
  { name: 'Trader Joe', network: 'Avalanche' },
];

const stablecoins = ['USDT', 'USDC', 'DAI', 'BUSD'];

export const getArbitrageOpportunities = (prices) => {
  const opportunities = [];

  for (const baseToken in prices) {
    const basePrice = prices[baseToken].usd;

    stablecoins.forEach((stablecoin) => {
      const dex1 = dexes[Math.floor(Math.random() * dexes.length)];
      const dex2 = dexes[Math.floor(Math.random() * dexes.length)];

      if (dex1 !== dex2) {
        const price1 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%
        const price2 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%

        const priceDiff = Math.abs(price1 - price2);
        const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;

        if (profitPercent > 0.5) { // Only show opportunities with > 0.5% profit
          opportunities.push({
            type: 'Price Discrepancy',
            baseToken: baseToken.toUpperCase(),
            quoteToken: stablecoin,
            dex1: {
              name: dex1.name,
              network: dex1.network,
              price: price1.toFixed(2),
            },
            dex2: {
              name: dex2.name,
              network: dex2.network,
              price: price2.toFixed(2),
            },
            profitPercent: profitPercent.toFixed(2),
            estimatedProfit: (priceDiff * 100).toFixed(2), // Assuming 100 units traded
          });
        }
      }
    });
  }

  return opportunities.sort((a, b) => parseFloat(b.profitPercent) - parseFloat(a.profitPercent));
};
