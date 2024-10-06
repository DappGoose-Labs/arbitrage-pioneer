import axios from 'axios';

const DEXSCREENER_API_URL = 'https://api.dexscreener.com/latest/dex';

export const fetchTokenPrices = async (tokenIds) => {
  try {
    const promises = tokenIds.map(tokenId => 
      axios.get(`${DEXSCREENER_API_URL}/tokens/${tokenId}`)
    );
    const responses = await Promise.all(promises);
    
    return responses.reduce((acc, response, index) => {
      const tokenData = response.data.pairs[0]; // Assuming we're interested in the first pair
      acc[tokenIds[index]] = {
        usd: parseFloat(tokenData.priceUsd),
        contract_address: tokenData.baseToken.address
      };
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
};

export const getArbitrageOpportunities = (prices) => {
  const opportunities = [];

  for (const token in prices) {
    const basePrice = prices[token].usd;
    const tokenAddress = prices[token].contract_address;

    // Generate opportunities based on the fetched data
    // This is a simplified version and should be expanded based on actual data
    const dexes = ['Uniswap', 'PancakeSwap', 'SushiSwap'];
    
    for (let i = 0; i < dexes.length; i++) {
      for (let j = i + 1; j < dexes.length; j++) {
        const price1 = basePrice * (1 + (Math.random() * 0.02 - 0.01));
        const price2 = basePrice * (1 + (Math.random() * 0.02 - 0.01));
        
        const priceDiff = Math.abs(price1 - price2);
        const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;

        if (profitPercent > 0.5) {
          opportunities.push({
            token: token.toUpperCase(),
            tokenAddress: tokenAddress,
            dex1: {
              name: dexes[i],
              price: price1,
            },
            dex2: {
              name: dexes[j],
              price: price2,
            },
            profitPercent: profitPercent,
          });
        }
      }
    }
  }

  return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
};