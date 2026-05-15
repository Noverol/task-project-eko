'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Flame, Zap, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export function StatsCards({ user }: { user: any }) {
  const progress = (user?.xp % 100);

  const stats = [
    {
      title: 'Current Level',
      value: `Level ${user?.level || 1}`,
      icon: Trophy,
      subtitle: `${user?.xp || 0} Total XP`,
      gradient: 'from-blue-500 to-cyan-400',
      textColor: 'text-blue-500',
    },
    {
      title: 'Active Streak',
      value: `${user?.streak || 0} Days`,
      icon: Flame,
      subtitle: 'Personal Best: 12 Days',
      gradient: 'from-orange-500 to-amber-400',
      textColor: 'text-orange-500',
    },
    {
      title: 'Activity Score',
      value: (user?.xp * 1.5).toFixed(0),
      icon: Zap,
      subtitle: 'Top 10% this week',
      gradient: 'from-purple-500 to-pink-400',
      textColor: 'text-purple-500',
    },
    {
      title: 'Achievements',
      value: `${user?.badges?.length || 0} Badges`,
      icon: Star,
      subtitle: '2 new today',
      gradient: 'from-teal-500 to-emerald-400',
      textColor: 'text-teal-500',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none bg-white dark:bg-zinc-900 card-shadow card-shadow-hover overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-blue-500/10`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Status: Active
                </span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground/80 font-medium">{stat.subtitle}</p>
              </div>

              {stat.title === 'Current Level' && (
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>XP Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-400" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
