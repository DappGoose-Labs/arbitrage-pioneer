import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoPanel = ({ opportunity }) => {
  if (!opportunity) {
    return null;
  }

  // Determine which DEX has the lower price (buy) and which has the higher price (sell)
  const buyDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex1 : opportunity.dex2;
  const sellDex = opportunity.dex1.price < opportunity.dex2.price ? opportunity.dex2 : opportunity.dex1;

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
            <div className="mt-2">
              <p>{opportunity.token}/{buyDex.pair.symbol} on {buyDex.name}</p>
              <p>{opportunity.token}/{sellDex.pair.symbol} on {sellDex.name}</p>
            </div>
          </div>
          <p><strong>Estimated Profit:</strong> ${((sellDex.price - buyDex.price) * 100).toFixed(2)} per 100 tokens</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoPanel;