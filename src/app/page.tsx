'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

interface TokenStats {
  price: number;
  volume: number;
  holders: number;
  marketCap: number;
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
  topHolders: Array<{
    address: string;
    amount: number;
  }>;
}

interface DashboardData {
  catguette: TokenStats;
  doguette: TokenStats;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const sampleData: DashboardData = {
          catguette: {
            price: 0.00023,
            volume: 156789,
            holders: 2345,
            marketCap: 890000,
            priceHistory: [
              { date: '2024-01-01', price: 0.00020 },
              { date: '2024-01-02', price: 0.00022 },
              { date: '2024-01-03', price: 0.00023 }
            ],
            topHolders: [
              { address: '0x1234...5678', amount: 50000 },
              { address: '0x8765...4321', amount: 45000 },
              { address: '0x9876...5432', amount: 40000 }
            ]
          },
          doguette: {
            price: 0.00025,
            volume: 167890,
            holders: 2456,
            marketCap: 920000,
            priceHistory: [
              { date: '2024-01-01', price: 0.00021 },
              { date: '2024-01-02', price: 0.00023 },
              { date: '2024-01-03', price: 0.00025 }
            ],
            topHolders: [
              { address: '0xabcd...efgh', amount: 52000 },
              { address: '0xijkl...mnop', amount: 47000 },
              { address: '0xqrst...uvwx', amount: 42000 }
            ]
          }
        };

        setData(sampleData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary)] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[var(--muted)]">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="card p-8 text-center max-w-md w-full mx-4">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-[var(--muted)]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg 
                     hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 
                     focus:ring-[var(--primary)] focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center text-[var(--muted)]">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          The Battle for the Sacred Baguette
        </h1>
        <Dashboard data={data} />
      </div>
    </div>
  );
}