'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ListTodo, ArrowRight, Briefcase, User, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const categoryIcons: any = {
  Work: Briefcase,
  Personal: User,
  Urgent: AlertTriangle,
};

export function MiniTasks() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tasks');
      return data.data.filter((t: any) => t.status !== 'Done').slice(0, 4);
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.patch('/api/tasks', { id, status: 'Done' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success("Task completed! +XP earned.");
    }
  });

  return (
    <Card className="h-full border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-bold tracking-tight">Active Focus</CardTitle>
          <CardDescription className="text-xs">Your top priorities for today.</CardDescription>
        </div>
        <Link href="/tasks">
          <div className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : tasks?.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task: any) => {
              const Icon = categoryIcons[task.category] || ListTodo;
              return (
                <div key={task._id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-all group">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      onCheckedChange={() => completeMutation.mutate(task._id)}
                      className="h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors leading-none">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                          <Icon className="h-3 w-3" />
                          {task.category}
                        </div>
                        <span className="text-[10px] text-muted-foreground/30">•</span>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${
                          task.priority === 'High' ? 'text-red-400' : 
                          task.priority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {task.priority}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors">
                    +{task.xpValue}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <ListTodo className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">All tasks completed!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
