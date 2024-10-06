import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

const InfoPanel = ({ opportunity }) => {
  if (!opportunity) {
    return null;
  }

  // Determine which DEX has the lower price (buy) and which has the higher price (sell)
  const buyDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex1 : opportunity.dex2;
  const sellDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex2 : opportunity.dex1;

  // Function to generate GeckoTerminal URL for a specific DEX and token pair
  const getGeckoTerminalUrl = (dex, tokenAddress, pairAddress) => {
    const networkMap = {
      'Ethereum Mainnet': 'eth',
      'BNB Chain': 'bsc',
      'Polygon': 'polygon',
      'Avalanche': 'avax',
    };
    const network = networkMap[dex.network] || 'eth';
    
    // Check if tokenAddress is valid before including it in the URL
    const tokenPart = tokenAddress && tokenAddress !== 'N/A' ? `${tokenAddress}_` : '';
    
    return `https://www.geckoterminal.com/${network}/pools/${tokenPart}${pairAddress.toLowerCase()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arbitrage Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold">Steps to Execute Arbitrage:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Buy {opportunity.token} on {buyDex.name} at ${buyDex.price.toFixed(4)}</li>
            {buyDex.network !== sellDex.network && (
              <li>Transfer {opportunity.token} from {buyDex.network} to {sellDex.network}</li>
            )}
            <li>Sell {opportunity.token} on {sellDex.name} at ${sellDex.price.toFixed(4)}</li>
            <li>Transfer profits back to your wallet</li>
          </ol>
          <div className="mt-4">
            <strong>Token Pair Info:</strong>
            <div className="flex flex-col space-y-2 mt-2">
              <a
                href={getGeckoTerminalUrl(buyDex, opportunity.tokenAddress, buyDex.pair.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                View {opportunity.token}/{buyDex.pair.symbol} on {buyDex.name} (GeckoTerminal)
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              <a
                href={getGeckoTerminalUrl(sellDex, opportunity.tokenAddress, sellDex.pair.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                View {opportunity.token}/{sellDex.pair.symbol} on {sellDex.name} (GeckoTerminal)
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
          <p><strong>Estimated Profit:</strong> ${((sellDex.price - buyDex.price) * 100).toFixed(2)} per 100 tokens</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoPanel;