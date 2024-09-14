import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ArbitrageList from './ArbitrageList';
import FlashloanCalculator from './FlashloanCalculator';
import { fetchArbitrageOpportunities } from '../utils/api';

const ArbitrageApp = () => {
  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['arbitrageOpportunities'],
    queryFn: fetchArbitrageOpportunities,
  });

  if (isLoading) return <div className="text-center mt-8">Loading arbitrage opportunities...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching data: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Arbitrage Opportunities</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ArbitrageList opportunities={opportunities} />
        </div>
        <div>
          <FlashloanCalculator />
        </div>
      </div>
    </div>
  );
};

export default ArbitrageApp;
