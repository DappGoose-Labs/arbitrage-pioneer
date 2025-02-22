// Simulated API call - replace with actual API integration
export const fetchArbitrageOpportunities = async () => {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data
  return [
    {
      type: 'Price Discrepancy',
      profitUSD: 120.50,
      route: ['Uniswap V3 (Ethereum)', 'PancakeSwap (BSC)'],
      networks: ['Ethereum', 'BSC'],
      estimatedFees: 15.20,
    },
    {
      type: 'Triangular Arbitrage',
      profitUSD: 85.30,
      route: ['SushiSwap', 'QuickSwap', 'Uniswap V3'],
      networks: ['Polygon'],
      estimatedFees: 5.50,
    },
    {
      type: 'Cross-Chain',
      profitUSD: 200.10,
      route: ['Uniswap V3 (Optimism)', 'Trader Joe (Avalanche)'],
      networks: ['Optimism', 'Avalanche'],
      estimatedFees: 25.80,
    },
  ];
};