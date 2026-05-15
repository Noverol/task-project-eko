'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ProductivityChart } from '@/components/dashboard/productivity-chart';
import { DailyBoost } from '@/components/dashboard/daily-boost';
import { BusynessAnalysis } from '@/components/dashboard/busyness-analysis';
import { MiniTasks } from '@/components/dashboard/mini-tasks';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get('/api/user');
      return data.data;
    },
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics');
      return data.data;
    },
  });

  if (userLoading || statsLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Initializing Astra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-10 px-2">
      <header className="space-y-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="h-1 w-8 bg-primary rounded-full" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Intelligence</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-foreground"
        >
          Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}
        </motion.h1>
        <p className="text-muted-foreground font-medium">You have achieved <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">84%</span> of your goals this week. Keep up the momentum!</p>
      </header>

      <StatsCards user={user} />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ProductivityChart stats={stats} />
        </div>
        <div className="lg:col-span-4">
          <DailyBoost />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <BusynessAnalysis stats={stats} />
        </div>
        <div className="lg:col-span-8">
          <MiniTasks />
        </div>
      </div>
    </div>
  );
}
