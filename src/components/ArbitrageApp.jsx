import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArbitrageList from './ArbitrageList';
import ArbitrageCalculator from './ArbitrageCalculator';
import InfoPanel from './InfoPanel';
import { fetchTokenPrices, getArbitrageOpportunities } from '../utils/priceData';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skull } from "lucide-react";

const ArbitrageApp = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [degenMode, setDegenMode] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const { data: prices, isLoading, error, refetch } = useQuery({
    queryKey: ['tokenPrices', degenMode],
    queryFn: () => fetchTokenPrices([
      'bitcoin', 'ethereum', 'binancecoin', 'matic-network', 'avalanche-2',
      'arbitrum', 'zksync-era', 'bald', 'optimism', 'solana'
    ], degenMode),
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

  return (
    <div className="flex flex-col min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleRefresh} className="btn">Refresh Data</Button>
          <div className="flex items-center space-x-2">
            <Label htmlFor="degen-mode" className="text-yellow-300 font-bold text-lg">!! DEGEN MODE !!</Label>
            <Switch
              id="degen-mode"
              checked={degenMode}
              onCheckedChange={handleDegenModeToggle}
              className="data-[state=checked]:bg-limeGreen"
            />
          </div>
        </div>
        {degenMode && (
          <Alert className="mb-4 bg-red-200 border-red-300">
            <Skull className="h-4 w-4 text-white" />
            <AlertDescription className="text-white">
              Warning: Degen Mode activated! Prepare for wild rides and potential rekt-age. WAGMI... or not?
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArbitrageList 
              opportunities={opportunities} 
              onSelectOpportunity={handleOpportunitySelect}
            />
          </div>
          <div className="space-y-8">
            <ArbitrageCalculator opportunity={selectedOpportunity} />
            <InfoPanel opportunity={selectedOpportunity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageApp;