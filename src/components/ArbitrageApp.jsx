import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArbitrageList from './ArbitrageList';
import ArbitrageCalculator from './ArbitrageCalculator';
import { fetchTokenPrices, getArbitrageOpportunities } from '../utils/priceData';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ArbitrageApp = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [degenMode, setDegenMode] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const { data: prices, isLoading, error, refetch } = useQuery({
    queryKey: ['tokenPrices', degenMode],
    queryFn: () => fetchTokenPrices(['bitcoin', 'ethereum', 'binancecoin', 'matic-network', 'avalanche-2'], degenMode),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    onError: (error) => {
      console.error('Error fetching token prices:', error);
    },
  });

  useEffect(() => {
    if (prices) {
      console.log('Received prices:', prices);
      const newOpportunities = getArbitrageOpportunities(prices, degenMode);
      console.log('New opportunities:', newOpportunities);
      setOpportunities(newOpportunities);
      setSelectedOpportunity(newOpportunities[0] || null);
    }
  }, [prices, degenMode]);

  const handleRefresh = () => {
    refetch();
  };

  const handleDegenModeToggle = () => {
    setDegenMode(!degenMode);
  };

  const handleOpportunitySelect = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  if (isLoading) return <div className="text-center mt-8">Loading price data...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching price data: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Real-time Arbitrage Opportunities</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleRefresh}>Refresh Data</Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="degen-mode"
            checked={degenMode}
            onCheckedChange={handleDegenModeToggle}
          />
          <Label htmlFor="degen-mode">Degen Mode</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ArbitrageList 
            opportunities={opportunities} 
            onSelectOpportunity={handleOpportunitySelect}
          />
        </div>
        <div>
          <ArbitrageCalculator opportunity={selectedOpportunity} />
        </div>
      </div>
    </div>
  );
};

export default ArbitrageApp;