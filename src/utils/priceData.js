import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const fetchTokenPrices = async (tokenIds, degenMode) => {
  try {
    if (degenMode) {
      // In degen mode, fetch data for recently deployed or small cap tokens
      const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'volume_desc',
          per_page: 250,
          page: 1,
          sparkline: false,
        },
      });
      const degenTokens = response.data
        .filter(token => token.market_cap_rank > 100 || token.total_volume < 1000000)
        .slice(0, 10);
      return degenTokens.reduce((acc, token) => {
        acc[token.id] = { 
          usd: token.current_price,
          contract_address: token.contract_address || 'N/A'
        };
        return acc;
      }, {});
    } else {
      console.log('Fetching token prices for:', tokenIds);
      const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: tokenIds.join(','),
          order: 'market_cap_desc',
          per_page: 250,
          page: 1,
          sparkline: false,
        },
      });
      console.log('API response:', response.data);
      return response.data.reduce((acc, token) => {
        acc[token.id] = { 
          usd: token.current_price,
          contract_address: token.contract_address || 'N/A'
        };
        return acc;
      }, {});
    }
  } catch (error) {
    console.error('Error fetching token prices:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
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

const stablecoins = [
  { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
  { symbol: 'BUSD', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53' },
];

export const getArbitrageOpportunities = (prices, degenMode) => {
  console.log('Generating arbitrage opportunities. Prices:', prices);
  const opportunities = [];

  for (const token in prices) {
    const basePrice = prices[token].usd;
    const tokenAddress = prices[token].contract_address;

    for (let i = 0; i < dexes.length; i++) {
      for (let j = i + 1; j < dexes.length; j++) {
        const dex1 = dexes[i];
        const dex2 = dexes[j];

        const stablecoin1 = stablecoins[Math.floor(Math.random() * stablecoins.length)];
        const stablecoin2 = stablecoins[Math.floor(Math.random() * stablecoins.length)];

        let price1, price2;
        if (degenMode) {
          price1 = basePrice * (1 + (Math.random() * 0.1 - 0.05)); // +/- 5%
          price2 = basePrice * (1 + (Math.random() * 0.1 - 0.05)); // +/- 5%
        } else {
          price1 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%
          price2 = basePrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%
        }

        const priceDiff = Math.abs(price1 - price2);
        const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;

        if (profitPercent > (degenMode ? 1 : 0.5)) {
          opportunities.push({
            token: token.toUpperCase(),
            tokenAddress: tokenAddress,
            dex1: {
              name: dex1.name,
              network: dex1.network,
              price: price1,
              pair: {
                symbol: stablecoin1.symbol,
                address: stablecoin1.address
              }
            },
            dex2: {
              name: dex2.name,
              network: dex2.network,
              price: price2,
              pair: {
                symbol: stablecoin2.symbol,
                address: stablecoin2.address
              }
            },
            profitPercent: profitPercent,
          });
        }
      }
    }
  }

  console.log('Generated opportunities:', opportunities.length);
  return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
};