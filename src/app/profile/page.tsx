'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Edit2, Trophy, Flame, Zap, Star, Layout, History, Settings2, Globe, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog';

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get('/api/user');
      return data.data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics');
      return data.data;
    },
  });

  if (userLoading) {
    return <div className="h-[80vh] flex items-center justify-center animate-pulse">Loading Profile...</div>;
  }

  const totalTasks = stats?.reduce((acc: number, curr: any) => acc + (curr.tasksCompleted || 0), 0) || 0;
  const progress = ((user?.xp || 0) % 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-10 px-4">
      {/* Steam-Style Header */}
      <section className="relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl border-none">
        <div 
          className="h-48 w-full bg-gradient-to-r opacity-20" 
          style={{ backgroundColor: user?.themeColor || '#0ea5e9' }} 
        />
        <div className="absolute top-32 left-8 flex items-end gap-6 w-full pr-16">
          <div className="relative">
            <div 
              className="h-40 w-40 rounded-3xl p-1 bg-gradient-to-br shadow-2xl"
              style={{ background: `linear-gradient(to bottom right, ${user?.themeColor || '#0ea5e9'}, transparent)` }}
            >
              <img 
                src={user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'} 
                alt="Avatar" 
                className="h-full w-full rounded-[20px] object-cover bg-background"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-zinc-900 border-4 border-background rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[10px] font-black text-primary">LVL {user?.level || 1}</span>
            </div>
          </div>
          
          <div className="flex-1 flex justify-between items-start pb-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter uppercase">{user?.name}</h1>
              <p className="text-muted-foreground font-medium max-w-md">{user?.bio}</p>
              <div className="flex gap-2 mt-4">
                 <Badge variant="secondary" className="rounded-md px-3 py-1 bg-muted/50 border-none font-bold uppercase tracking-wider text-[10px]">
                   <Globe className="h-3 w-3 mr-1.5" /> Online
                 </Badge>
                 <Badge variant="secondary" className="rounded-md px-3 py-1 bg-muted/50 border-none font-bold uppercase tracking-wider text-[10px]">
                   <Heart className="h-3 w-3 mr-1.5 text-rose-500 fill-rose-500/20" /> Pro User
                 </Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="p-4 bg-muted/30 rounded-2xl border-none card-shadow text-right min-w-[150px]">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Level {user?.level || 1}</p>
                <div className="space-y-2">
                  <p className="text-xl font-black">{user?.xp || 0} XP</p>
                  <Progress value={progress} className="h-1.5 w-full bg-muted" />
                </div>
              </div>
              <EditProfileDialog user={user}>
                <Button variant="outline" className="rounded-xl border-none bg-muted/50 hover:bg-muted font-bold text-xs uppercase tracking-widest px-6 h-10">
                  <Settings2 className="h-3.5 w-3.5 mr-2" /> Edit Profile
                </Button>
              </EditProfileDialog>
            </div>
          </div>
        </div>
        <div className="h-32" /> {/* Spacer for absolute content */}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Feature Showcase & Activity */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
            <CardHeader className="bg-muted/30 border-none px-6 py-4">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Featured Showcase</CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-3xl font-black text-primary">{totalTasks}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Tasks Done</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-orange-500">{user?.streak || 0}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Max Streak</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-purple-500">{(user?.level || 1) * 5}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Rewards</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-teal-500">84%</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Consistency</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
            <CardHeader className="bg-muted/30 border-none px-6 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Activity</CardTitle>
              <History className="h-4 w-4 text-muted-foreground/30" />
            </CardHeader>
            <CardContent className="p-0">
               {stats?.length > 0 ? (
                 <div className="divide-y divide-border/40">
                   {stats.slice(0, 5).reverse().map((day: any) => (
                     <div key={day.date} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                       <div className="flex items-center gap-4">
                         <div className="p-2 bg-primary/5 rounded-xl">
                            <Layout className="h-4 w-4 text-primary" />
                         </div>
                         <div>
                           <p className="text-sm font-bold">Completed {day.tasksCompleted} tasks</p>
                           <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{day.date}</p>
                         </div>
                       </div>
                       <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">+{day.xpEarned} XP</Badge>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="p-12 text-center text-muted-foreground text-sm italic font-medium">No activity recorded yet. Start today!</div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Badges & Mini Stats */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
            <CardHeader className="bg-muted/30 border-none px-6 py-4">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Badges</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center border border-primary/10 cursor-help"
                    title="Unlock more by completing tasks!"
                  >
                    <Trophy className="h-6 w-6 text-primary/40" />
                  </motion.div>
                ))}
                <div className="h-12 w-12 rounded-xl bg-muted/50 border border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-muted-foreground/30" />
                </div>
              </div>
              <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary p-0 mt-6 h-auto">View All Inventory</Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
            <CardHeader className="bg-muted/30 border-none px-6 py-4">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Stats Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total XP</span>
                <span className="text-sm font-black">{user?.xp || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Efficiency</span>
                <span className="text-sm font-black">9.2/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Deep Work</span>
                <span className="text-sm font-black">12h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
