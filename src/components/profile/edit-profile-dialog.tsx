'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const themeColors = [
  { name: 'Default Blue', value: '#0ea5e9' },
  { name: 'Steam Green', value: '#10b981' },
  { name: 'Valve Red', value: '#ef4444' },
  { name: 'Classic Gray', value: '#475569' },
  { name: 'Cyber Purple', value: '#a855f7' },
];

export function EditProfileDialog({ children, user }: { children: React.ReactNode, user: any }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [themeColor, setThemeColor] = useState(user?.themeColor || '#0ea5e9');
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (update: any) => {
      await axios.patch('/api/user', update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setOpen(false);
      toast.success("Profile updated successfully!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, bio, themeColor });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Display Name</label>
            <Input 
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/50 border-none focus-visible:ring-primary font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bio</label>
            <textarea 
              className="w-full min-h-[100px] rounded-xl bg-muted/50 border-none p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Profile Theme</label>
            <div className="flex gap-3">
              {themeColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setThemeColor(color.value)}
                  className={`h-8 w-8 rounded-full border-4 transition-all ${
                    themeColor === color.value ? 'border-primary scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest h-12 rounded-xl shadow-lg shadow-primary/20"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
