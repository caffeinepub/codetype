import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Home, Code2, BookOpen, Target, BarChart2, Trophy, User, Settings, Menu, X, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/practice', label: 'Practice', icon: Code2 },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/test', label: 'Test', icon: Target },
  { path: '/progress', label: 'Progress', icon: BarChart2 },
  { path: '/challenges', label: 'Challenges', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

function NavLink({ path, label, icon: Icon, onClick }: { path: string; label: string; icon: React.ElementType; onClick?: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary/20 text-primary border border-primary/30 shadow-neon-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
      )}
    >
      <Icon size={18} className={isActive ? 'text-primary' : ''} />
      <span>{label}</span>
    </Link>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, theme } = useSettings();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-card border-r border-border fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Zap size={16} className="text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Code<span className="text-primary">Type</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.path} {...item} />
          ))}
        </nav>

        {/* Theme toggle at bottom */}
        <div className="px-3 py-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Zap size={14} className="text-primary" />
            </div>
            <span className="font-bold text-base tracking-tight">
              Code<span className="text-primary">Type</span>
            </span>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card p-0">
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <span className="font-bold text-base">
                  Code<span className="text-primary">Type</span>
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X size={16} />
                  </Button>
                </SheetClose>
              </div>
              <nav className="px-3 py-4 space-y-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    {...item}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
              <div className="px-3 py-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { toggleTheme(); setMobileOpen(false); }}
                  className="w-full justify-start gap-3 text-muted-foreground"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
