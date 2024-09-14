import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FlashloanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [profitPercentage, setProfitPercentage] = useState('');
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    const amount = parseFloat(loanAmount);
    const percentage = parseFloat(profitPercentage);
    if (isNaN(amount) || isNaN(percentage)) {
      setResult('Please enter valid numbers');
      return;
    }
    const profit = amount * (percentage / 100);
    const fees = amount * 0.0009; // Assuming 0.09% flash loan fee
    const netProfit = profit - fees;
    setResult(`Net Profit: $${netProfit.toFixed(2)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flashloan Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Loan Amount ($)"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Profit Percentage (%)"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(e.target.value)}
          />
          <Button onClick={calculateProfit}>Calculate</Button>
          {result && <p className="mt-4 font-semibold">{result}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashloanCalculator;