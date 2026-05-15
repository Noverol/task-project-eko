'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Calendar, Timer, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Inbox', href: '/tasks', icon: CheckSquare },
  { label: 'Schedule', href: '/calendar', icon: Calendar },
  { label: 'Deep Focus', href: '/focus', icon: Timer },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="bg-primary p-1 rounded-lg shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground fill-primary-foreground/20" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">Astra</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-md hover:bg-muted/50",
                  pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground/70"
                )}
              >
                <item.icon className={cn("h-3.5 w-3.5", pathname === item.href ? "stroke-[3px]" : "stroke-[2px]")} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center p-[1px] shadow-lg shadow-primary/10">
            <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <span className="text-[10px] font-black text-primary">AD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
