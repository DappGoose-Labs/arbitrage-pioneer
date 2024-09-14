import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ArbitrageCalculator = ({ opportunity }) => {
  const [tokenQuantity, setTokenQuantity] = useState('');
  const [profit, setProfit] = useState(null);

  useEffect(() => {
    setTokenQuantity('');
    setProfit(null);
  }, [opportunity]);

  const calculateProfit = () => {
    if (!opportunity || !tokenQuantity) {
      setProfit(null);
      return;
    }

    const quantity = parseFloat(tokenQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      setProfit(null);
      return;
    }

    const buyPrice = Math.min(opportunity.dex1.price, opportunity.dex2.price);
    const sellPrice = Math.max(opportunity.dex1.price, opportunity.dex2.price);

    const grossProfit = (sellPrice - buyPrice) * quantity;
    const estimatedFees = (buyPrice + sellPrice) * quantity * 0.003; // Assuming 0.3% fee per trade
    const netProfit = grossProfit - estimatedFees;

    setProfit(netProfit);
  };

  if (!opportunity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Arbitrage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Select an opportunity to calculate potential profit.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arbitrage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Selected: {opportunity.token} ({opportunity.dex1.name} ↔ {opportunity.dex2.name})</p>
          <Input
            type="number"
            placeholder="Token Quantity"
            value={tokenQuantity}
            onChange={(e) => setTokenQuantity(e.target.value)}
          />
          <Button onClick={calculateProfit}>Calculate Profit</Button>
          {profit !== null && (
            <p className="mt-4 font-semibold">
              Estimated Net Profit: ${profit.toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArbitrageCalculator;