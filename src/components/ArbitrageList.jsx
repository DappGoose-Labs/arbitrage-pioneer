import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

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

  const getDexLink = (dex, token, pair) => {
    // This is a simplified example. In a real-world scenario, you'd need to implement
    // proper URL generation for each DEX based on their specific URL structures.
    const baseUrls = {
      'Uniswap V3': 'https://app.uniswap.org/#/swap?inputCurrency=',
      'PancakeSwap': 'https://pancakeswap.finance/swap?inputCurrency=',
      'SushiSwap': 'https://app.sushi.com/swap?inputCurrency=',
      'QuickSwap': 'https://quickswap.exchange/#/swap?inputCurrency=',
      'Trader Joe': 'https://traderjoexyz.com/#/trade?inputCurrency=',
    };

    const baseUrl = baseUrls[dex.name] || '#';
    return `${baseUrl}${pair}&outputCurrency=${token}`;
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
            <TableHead>Links</TableHead>
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
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(getDexLink(opp.dex1, opp.token, opp.dex1.pair), '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DEX 1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(getDexLink(opp.dex2, opp.token, opp.dex2.pair), '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    DEX 2
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArbitrageList;