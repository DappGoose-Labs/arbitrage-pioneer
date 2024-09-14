import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ArbitrageList = ({ opportunities }) => {
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
            <TableRow key={index}>
              <TableCell>{opp.token}</TableCell>
              <TableCell>
                {`${opp.dex1.name} on ${opp.dex1.network} - $${opp.dex1.price.toFixed(2)} (${opp.dex1.price.toFixed(2)} ${opp.dex1.pair}/${opp.token})`}
              </TableCell>
              <TableCell>
                {`${opp.dex2.name} on ${opp.dex2.network} - $${opp.dex2.price.toFixed(2)} (${opp.dex2.price.toFixed(2)} ${opp.dex2.pair}/${opp.token})`}
              </TableCell>
              <TableCell>{`${opp.profitPercent.toFixed(2)}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArbitrageList;
