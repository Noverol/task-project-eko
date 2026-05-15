'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

export function ProductivityChart({ stats }: { stats: any[] }) {
  const chartData = stats?.map(s => ({
    date: s.date.split('-').slice(1).join('/'),
    completed: s.tasksCompleted,
    xp: s.xpEarned,
  })) || [];

  return (
    <Card className="h-full border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-bold tracking-tight">Performance</CardTitle>
          <CardDescription className="text-xs">Last 7 days activity</CardDescription>
        </div>
        <div className="p-2 bg-primary/5 rounded-xl text-primary">
          <Activity className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="h-[320px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={10} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={10} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px', color: '#64748b' }}
            />
            <Bar 
              dataKey="completed" 
              fill="url(#chartGradient)" 
              radius={[6, 6, 0, 0]} 
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
