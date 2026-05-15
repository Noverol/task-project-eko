'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Quote, Smile, Meh, Frown, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from 'framer-motion';

const quotes = [
  "Focus on being productive instead of busy.",
  "Your future is created by what you do today.",
  "Done is better than perfect.",
  "Effective work is deliberate work.",
  "Love the process, results will follow."
];

const moods = [
  { icon: Heart, label: 'Loved', value: 'great', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Smile, label: 'Happy', value: 'good', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Meh, label: 'Neutral', value: 'okay', color: 'text-slate-500', bg: 'bg-slate-50' },
  { icon: Frown, label: 'Tired', value: 'down', color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export function DailyBoost() {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    try {
      await axios.post('/api/mood', { mood });
      toast.success("Mood updated. Stay mindful!");
    } catch (error) {
      toast.error("Error saving mood.");
    }
  };

  return (
    <Card className="h-full border-none bg-white dark:bg-zinc-900 card-shadow overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-lg font-bold tracking-tight">Mindset</CardTitle>
            <CardDescription className="text-xs">Stay motivated and mindful.</CardDescription>
          </div>
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between py-6 space-y-8">
        <div className="relative group">
          <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/10 transition-colors group-hover:text-primary/20" />
          <p className="text-base font-semibold leading-relaxed text-foreground/80 pl-6 border-l-2 border-primary/20">
            {quote}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-muted-foreground">Current Mood</p>
          <div className="flex justify-between items-center px-2">
            {moods.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  selectedMood === mood.value 
                    ? `${mood.bg} ring-2 ring-primary/20` 
                    : 'hover:bg-muted'
                }`}
              >
                <mood.icon className={`h-6 w-6 ${mood.color}`} />
                <span className="text-[10px] font-bold text-muted-foreground">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
