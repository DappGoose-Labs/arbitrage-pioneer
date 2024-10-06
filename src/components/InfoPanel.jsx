import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

const InfoPanel = ({ opportunity }) => {
  if (!opportunity) {
    return null;
  }

  const buyDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex1 : opportunity.dex2;
  const sellDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex2 : opportunity.dex1;

  const getDexScreenerUrl = (dexName, tokenAddress) => {
    return `https://dexscreener.com/ethereum/${tokenAddress}`;
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
            <li>Sell {opportunity.token} on {sellDex.name} at ${sellDex.price.toFixed(4)}</li>
            <li>Transfer profits back to your wallet</li>
          </ol>
          <div className="mt-4">
            <strong>Token Info:</strong>
            <div className="flex flex-col space-y-2 mt-2">
              <a
                href={getDexScreenerUrl(buyDex.name, opportunity.tokenAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                View {opportunity.token} on DexScreener
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