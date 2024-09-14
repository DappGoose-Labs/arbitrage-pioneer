import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ArbitrageList = ({ opportunities }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token Pair</TableHead>
            <TableHead>DEX 1</TableHead>
            <TableHead>DEX 2</TableHead>
            <TableHead>Profit %</TableHead>
            <TableHead>Est. Profit (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opp, index) => (
            <TableRow key={index}>
              <TableCell>{`${opp.baseToken}/${opp.quoteToken}`}</TableCell>
              <TableCell>
                {`${opp.dex1.name} on ${opp.dex1.network} - $${opp.dex1.price} (${opp.dex1.price} ${opp.quoteToken}/${opp.baseToken})`}
              </TableCell>
              <TableCell>
                {`${opp.dex2.name} on ${opp.dex2.network} - $${opp.dex2.price} (${opp.dex2.price} ${opp.quoteToken}/${opp.baseToken})`}
              </TableCell>
              <TableCell>{`${opp.profitPercent}%`}</TableCell>
              <TableCell>${opp.estimatedProfit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArbitrageList;
