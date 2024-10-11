import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ArbitrageList = ({ opportunities, onSelectOpportunity }) => {
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : 'N/A';
  };

  const calculateProfitPercent = (price1, price2) => {
    if (typeof price1 !== 'number' || typeof price2 !== 'number') {
      return 'N/A';
    }
    const priceDiff = Math.abs(price1 - price2);
    const profitPercent = (priceDiff / Math.min(price1, price2)) * 100;
    return profitPercent.toFixed(2);
  };

  const formatLiquidity = (liquidity) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(liquidity);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-lightGrey">
            <TableHead className="text-limeGreen">Token</TableHead>
            <TableHead className="text-limeGreen">DEX 1</TableHead>
            <TableHead className="text-limeGreen">DEX 2</TableHead>
            <TableHead className="text-limeGreen">Profit %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opp, index) => (
            <TableRow 
              key={index} 
              className="cursor-pointer hover:bg-gray-700 border-b border-lightGrey"
              onClick={() => onSelectOpportunity(opp)}
            >
              <TableCell>{opp.token}</TableCell>
              <TableCell>
                <div>{`${opp.dex1.name} on ${opp.dex1.network}`}</div>
                <div>{`$${formatPrice(opp.dex1.price)} (${formatPrice(opp.dex1.price)} ${opp.dex1.pair.symbol}/${opp.token})`}</div>
                <div className="text-sm text-gray-400">{`Liquidity: ${formatLiquidity(opp.dex1.liquidity)}`}</div>
              </TableCell>
              <TableCell>
                <div>{`${opp.dex2.name} on ${opp.dex2.network}`}</div>
                <div>{`$${formatPrice(opp.dex2.price)} (${formatPrice(opp.dex2.price)} ${opp.dex2.pair.symbol}/${opp.token})`}</div>
                <div className="text-sm text-gray-400">{`Liquidity: ${formatLiquidity(opp.dex2.liquidity)}`}</div>
              </TableCell>
              <TableCell>{`${calculateProfitPercent(opp.dex1.price, opp.dex2.price)}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArbitrageList;