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

  for (const token in prices) {
    const basePrice = prices[token].usd;

    for (let i = 0; i < dexes.length; i++) {
      for (let j = i + 1; j < dexes.length; j++) {
        const dex1 = dexes[i];
        const dex2 = dexes[j];

        const stablecoin1 = stablecoins[Math.floor(Math.random() * stablecoins.length)];
        const stablecoin2 = stablecoins[Math.floor(Math.random() * stablecoins.length)];

        const price1 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%
        const price2 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%

        const priceDiff = Math.abs(price1 - price2);
        const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;

        if (profitPercent > 0.5) { // Only show opportunities with > 0.5% profit
          opportunities.push({
            token: token.toUpperCase(),
            dex1: {
              name: dex1.name,
              network: dex1.network,
              price: price1,
              pair: stablecoin1
            },
            dex2: {
              name: dex2.name,
              network: dex2.network,
              price: price2,
              pair: stablecoin2
            },
            profitPercent: profitPercent,
          });
        }
      }
    }
  }

  return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
};
