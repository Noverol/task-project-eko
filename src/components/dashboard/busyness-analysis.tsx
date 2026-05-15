'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';

export function BusynessAnalysis({ stats }: { stats: any[] }) {
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    count: 0
  }));

  stats?.forEach(day => {
    if (day.hourlyActivity) {
      Object.entries(day.hourlyActivity).forEach(([hour, count]) => {
        hourlyData[parseInt(hour)].count += count as number;
      });
    }
  });

  const peakHour = [...hourlyData].sort((a, b) => b.count - a.count)[0];

  return (
    <Card className="h-full border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-lg font-bold tracking-tight">Productivity Peak</CardTitle>
            <CardDescription className="text-xs">
              {peakHour.count > 0 
                ? `You thrive at ${peakHour.hour}` 
                : "Activity patterns appearing soon."}
            </CardDescription>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-6 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <Tooltip 
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ display: 'none' }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" opacity={0.3} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
