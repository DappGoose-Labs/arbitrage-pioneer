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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>DEX 1</TableHead>
            <TableHead>DEX 2</TableHead>
            <TableHead>Profit %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opp, index) => (
            <TableRow 
              key={index} 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectOpportunity(opp)}
            >
              <TableCell>{opp.token}</TableCell>
              <TableCell>
                {`${opp.dex1.name} on ${opp.dex1.network} - $${formatPrice(opp.dex1.price)} (${formatPrice(opp.dex1.price)} ${opp.dex1.pair}/${opp.token})`}
              </TableCell>
              <TableCell>
                {`${opp.dex2.name} on ${opp.dex2.network} - $${formatPrice(opp.dex2.price)} (${formatPrice(opp.dex2.price)} ${opp.dex2.pair}/${opp.token})`}
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
