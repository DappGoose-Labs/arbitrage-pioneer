import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArbitrageList from './ArbitrageList';
import ArbitrageCalculator from './ArbitrageCalculator';
import InfoPanel from './InfoPanel';
import { fetchTokenPrices, getArbitrageOpportunities } from '../utils/priceData';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ArbitrageApp = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [countdown, setCountdown] = useState(60);

  const { data: prices, isLoading, error } = useQuery({
    queryKey: ['tokenPrices'],
    queryFn: () => fetchTokenPrices(['ethereum', 'bitcoin', 'binancecoin', 'cardano', 'solana']),
    refetchInterval: 60000, // Refetch every 60 seconds
    retry: 3,
    onError: (error) => {
      console.error('Error fetching token prices:', error);
    },
  });

  useEffect(() => {
    if (prices) {
      const newOpportunities = getArbitrageOpportunities(prices);
      setOpportunities(newOpportunities);
      setSelectedOpportunity(newOpportunities[0] || null);
    }
  }, [prices]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpportunitySelect = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  if (isLoading) return <div className="text-center mt-8">Loading price data...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching price data: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-100 p-4 mb-6 rounded-lg flex justify-between items-center">
        <p className="text-blue-800">
          This tool uses real-time data from leading sources, and is provided free of charge. Donations are of course welcomed and appreciated!
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Donate</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Support Our Project</DialogTitle>
              <DialogDescription>
                Your donations help us maintain and improve this tool. Thank you for your support!
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p><strong>ETH Address:</strong> 0x1234...</p>
              <p><strong>BTC Address:</strong> bc1qxy2k...</p>
              {/* Add more wallet addresses as needed */}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-3xl font-bold mb-6">Real-time Arbitrage Opportunities</h1>
      <div className="flex justify-between items-center mb-4">
        <p>Next update in: {countdown} seconds</p>
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
  );
};

export default ArbitrageApp;