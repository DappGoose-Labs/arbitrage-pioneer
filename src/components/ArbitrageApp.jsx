import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArbitrageList from './ArbitrageList';
import ArbitrageCalculator from './ArbitrageCalculator';
import InfoPanel from './InfoPanel';
import DonateModal from './DonateModal';
import { fetchTokenPrices, getArbitrageOpportunities } from '../utils/priceData';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ArbitrageApp = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [degenMode, setDegenMode] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-block px-4">
            This tool uses real-time data from leading sources; and is provided free of charge. Donations are of course accepted and appreciated!
          </span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Real-time Arbitrage Opportunities</h1>
          <Button onClick={() => setIsDonateModalOpen(true)}>Donate</Button>
        </div>
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
        <div className="space-y-8">
          <ArbitrageCalculator opportunity={selectedOpportunity} />
          <InfoPanel opportunity={selectedOpportunity} />
        </div>
      </div>
      </div>
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} />
    </div>
  );
};

export default ArbitrageApp;
