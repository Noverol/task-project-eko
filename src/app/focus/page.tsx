'use client';

import { usePomodoro } from '@/lib/hooks/use-pomodoro';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FocusPage() {
  const { timeLeft, isActive, mode, toggleTimer, resetTimer, formatTime, progress } = usePomodoro();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter">Deep Focus</h1>
        <p className="text-muted-foreground">Boost your productivity with the Pomodoro technique.</p>
      </header>

      <motion.div
        animate={{ 
          scale: isActive ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Card className="w-[350px] border-none shadow-2xl bg-card/50 backdrop-blur relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1 ${mode === 'work' ? 'bg-primary' : 'bg-green-500'}`} />
          <CardHeader className="text-center pb-0">
            <div className="flex justify-center mb-4">
              {mode === 'work' ? (
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Briefcase className="h-8 w-8" />
                </div>
              ) : (
                <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                  <Coffee className="h-8 w-8" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl uppercase tracking-widest font-light">
              {mode === 'work' ? 'Work Session' : 'Short Break'}
            </CardTitle>
            <CardDescription>
              {mode === 'work' ? 'Stay focused on your task.' : 'Take a breath and recharge.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10 space-y-8">
            <div className="text-7xl font-bold tabular-nums tracking-tight">
              {formatTime(timeLeft)}
            </div>
            
            <div className="w-full space-y-2">
              <Progress value={progress} className={`h-2 ${mode === 'work' ? '' : '[&>div]:bg-green-500'}`} />
              <p className="text-xs text-center text-muted-foreground">{Math.round(progress)}% completed</p>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={resetTimer}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                className={`rounded-full h-16 w-16 shadow-xl ${mode === 'work' ? 'bg-primary' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={toggleTimer}
              >
                {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4 w-[350px]">
        <Card className="p-4 text-center bg-muted/20 border-none">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Sessions Today</p>
          <p className="text-xl font-bold">4</p>
        </Card>
        <Card className="p-4 text-center bg-muted/20 border-none">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">XP Earned</p>
          <p className="text-xl font-bold">+80</p>
        </Card>
      </div>
    </div>
  );
}
