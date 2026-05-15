'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tasks');
      return data.data;
    },
  });

  const selectedDateTasks = tasks?.filter((t: any) => {
    if (!t.dueDate && !t.createdAt) return false;
    const taskDate = new Date(t.dueDate || t.createdAt);
    return format(taskDate, 'yyyy-MM-dd') === (date ? format(date, 'yyyy-MM-dd') : '');
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">Visualize your tasks on a timeline.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-1 border-none shadow-md bg-card/50 backdrop-blur h-fit">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2 border-none shadow-md bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>{date ? format(date, 'PPPP') : 'Select a date'}</CardTitle>
            <CardDescription>
              {selectedDateTasks?.length || 0} tasks scheduled for this day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateTasks?.length > 0 ? (
                selectedDateTasks.map((task: any) => (
                  <div key={task._id} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'High' ? 'bg-red-500' : 
                        task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <p className="font-medium">{task.title}</p>
                    </div>
                    <Badge variant="secondary">{task.category}</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-muted-foreground italic">
                  No tasks found for this date.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
