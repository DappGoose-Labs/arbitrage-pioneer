import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

const InfoPanel = ({ opportunity }) => {
  if (!opportunity) {
    return null;
  }

  const geckoTerminalUrl = `https://www.geckoterminal.com/eth/tokens/${opportunity.tokenAddress}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arbitrage Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold">Steps to Execute Arbitrage:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Buy {opportunity.token} on {opportunity.dex1.name} at ${opportunity.dex1.price.toFixed(4)}</li>
            <li>Transfer {opportunity.token} to {opportunity.dex2.network}</li>
            <li>Sell {opportunity.token} on {opportunity.dex2.name} at ${opportunity.dex2.price.toFixed(4)}</li>
            <li>Transfer profits back to your wallet</li>
          </ol>
          <p className="mt-4">
            <strong>Token Info:</strong>
            <a href={geckoTerminalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
              View {opportunity.token} on GeckoTerminal
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </p>
          <p><strong>Estimated Profit:</strong> ${((opportunity.dex2.price - opportunity.dex1.price) * 100).toFixed(2)} per 100 tokens</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoPanel;