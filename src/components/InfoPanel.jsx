import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoPanel = ({ opportunity }) => {
  if (!opportunity) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Token:</strong> {opportunity.token}</p>
          <p><strong>Token Address:</strong> {opportunity.tokenAddress || 'Not available'}</p>
          <h3 className="font-semibold mt-4">DEX 1: {opportunity.dex1.name}</h3>
          <p><strong>Network:</strong> {opportunity.dex1.network}</p>
          <p><strong>Price:</strong> ${opportunity.dex1.price.toFixed(4)}</p>
          <p><strong>Trading Pair:</strong> {opportunity.dex1.pair.symbol}/{opportunity.token}</p>
          <p><strong>Pair Address:</strong> {opportunity.dex1.pair.address || 'Not available'}</p>
          <h3 className="font-semibold mt-4">DEX 2: {opportunity.dex2.name}</h3>
          <p><strong>Network:</strong> {opportunity.dex2.network}</p>
          <p><strong>Price:</strong> ${opportunity.dex2.price.toFixed(4)}</p>
          <p><strong>Trading Pair:</strong> {opportunity.dex2.pair.symbol}/{opportunity.token}</p>
          <p><strong>Pair Address:</strong> {opportunity.dex2.pair.address || 'Not available'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoPanel;