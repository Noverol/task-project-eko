'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, CheckCircle2, Circle, Briefcase, User, AlertTriangle } from 'lucide-react';
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons: any = {
  Work: Briefcase,
  Personal: User,
  Urgent: AlertTriangle,
};

export default function TasksPage() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tasks');
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/tasks?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success("Task deleted.");
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      await axios.patch('/api/tasks', { id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 pt-10">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground font-medium">You have {tasks?.filter((t: any) => t.status !== 'Done').length} pending tasks.</p>
        </div>
        <CreateTaskDialog>
          <Button className="rounded-xl px-8 py-6 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:translate-y-0">
            <Plus className="mr-2 h-5 w-5 stroke-[3]" /> Create Task
          </Button>
        </CreateTaskDialog>
      </header>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks?.map((task: any) => {
            const Icon = categoryIcons[task.category] || Circle;
            const isDone = task.status === 'Done';
            
            return (
              <motion.div
                key={task._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group"
              >
                <Card className={`border-none bg-white dark:bg-zinc-900 card-shadow transition-all ${isDone ? 'opacity-50' : 'hover:ring-1 hover:ring-primary/20'}`}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => toggleMutation.mutate({ 
                          id: task._id, 
                          status: isDone ? 'Todo' : 'Done' 
                        })}
                        className="transition-all transform active:scale-90 hover:scale-110"
                      >
                        {isDone ? (
                          <div className="p-1 bg-primary/10 rounded-full">
                            <CheckCircle2 className="h-7 w-7 text-primary fill-primary/10" />
                          </div>
                        ) : (
                          <Circle className="h-7 w-7 text-muted-foreground/30 hover:text-primary transition-colors" />
                        )}
                      </button>
                      <div className="space-y-1.5">
                        <h3 className={`text-lg font-bold tracking-tight transition-all ${isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <Icon className="h-3 w-3" />
                            {task.category}
                          </div>
                          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                            task.priority === 'High' ? 'bg-red-500/5 text-red-500' : 
                            task.priority === 'Medium' ? 'bg-amber-500/5 text-amber-500' : 'bg-emerald-500/5 text-emerald-500'
                          }`}>
                            {task.priority} Priority
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {!isDone && (
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">Potential</span>
                          <span className="text-sm font-black text-foreground">+{task.xpValue} XP</span>
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/5 hover:text-destructive"
                        onClick={() => deleteMutation.mutate(task._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {tasks?.length === 0 && (
          <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl w-fit mx-auto card-shadow mb-4">
              <Plus className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold">Your inbox is empty</h3>
            <p className="text-muted-foreground font-medium mt-1">Start your day by creating a new task.</p>
          </div>
        )}
      </div>
    </div>
  );
}
