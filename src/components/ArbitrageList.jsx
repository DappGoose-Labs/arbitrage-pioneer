import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ArbitrageList = ({ opportunities }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Token Pair</TableHead>
            <TableHead>Networks</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Profit (USD)</TableHead>
            <TableHead>Est. Fees (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opp, index) => (
            <TableRow key={index}>
              <TableCell>{opp.type}</TableCell>
              <TableCell>{opp.tokenPair}</TableCell>
              <TableCell>{opp.networks.join(', ')}</TableCell>
              <TableCell>{opp.route.join(' → ')}</TableCell>
              <TableCell>${opp.profitUSD.toFixed(2)}</TableCell>
              <TableCell>${opp.estimatedFees.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArbitrageList;
