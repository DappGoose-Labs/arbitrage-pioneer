import axios from 'axios';

const GECKOTERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';

export const fetchTokenPrices = async (tokenIds, degenMode) => {
  try {
    const networks = degenMode ? ['eth', 'bsc', 'polygon', 'arbitrum', 'optimism'] : ['eth', 'bsc'];
    const opportunities = [];

    for (const network of networks) {
      const response = await axios.get(`${GECKOTERMINAL_API_URL}/networks/${network}/tokens`);
      const tokens = response.data.data.slice(0, degenMode ? 50 : 20);

      for (const token of tokens) {
        const tokenData = token.attributes;
        const tokenId = token.id;
        const tokenAddress = tokenData.address;
        const tokenSymbol = tokenData.symbol;

        const poolsResponse = await axios.get(`${GECKOTERMINAL_API_URL}/networks/${network}/tokens/${tokenId}/pools`);
        const pools = poolsResponse.data.data.slice(0, 2);

        if (pools.length >= 2) {
          opportunities.push({
            token: tokenSymbol,
            tokenAddress: tokenAddress,
            dex1: {
              name: pools[0].attributes.exchange.name,
              network: network,
              price: parseFloat(pools[0].attributes.base_token_price_usd),
              url: `https://www.geckoterminal.com/${network}/pools/${pools[0].id}`
            },
            dex2: {
              name: pools[1].attributes.exchange.name,
              network: network,
              price: parseFloat(pools[1].attributes.base_token_price_usd),
              url: `https://www.geckoterminal.com/${network}/pools/${pools[1].id}`
            }
          });
        }
      }
    }

    return opportunities;
  } catch (error) {
    console.error('Error fetching token prices:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const getArbitrageOpportunities = (opportunities, degenMode) => {
  return opportunities.filter(opp => {
    const priceDiff = Math.abs(opp.dex1.price - opp.dex2.price);
    const profitPercent = (priceDiff / Math.min(opp.dex1.price, opp.dex2.price)) * 100;
    return profitPercent > (degenMode ? 1 : 0.5);
  }).sort((a, b) => {
    const profitA = Math.abs(a.dex1.price - a.dex2.price);
    const profitB = Math.abs(b.dex1.price - b.dex2.price);
    return profitB - profitA;
  });
};