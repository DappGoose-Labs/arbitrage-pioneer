import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArbitrageList = ({ opportunities }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profitable Arbitrage Opportunities</h2>
      {opportunities.map((opp, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">
              {opp.type} - Profit: ${opp.profitUSD.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Route:</strong> {opp.route.join(' → ')}</p>
            <p><strong>Networks:</strong> {opp.networks.join(', ')}</p>
            <p><strong>Estimated Fees:</strong> ${opp.estimatedFees.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArbitrageList;