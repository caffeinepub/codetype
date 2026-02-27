import { useState } from 'react';
import { User, Edit2, Check, X, Zap, Target, Award, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  useAllTestResults,
  useBestWPM,
  useAverageAccuracy,
  useTotalTests,
  useDailyStreaks,
} from '@/hooks/useQueries';
import type { TestResult } from '@/backend';

const DISPLAY_NAME_KEY = 'codetype-display-name';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CT';
}

export function Profile() {
  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem(DISPLAY_NAME_KEY) || 'Coder'
  );
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(displayName);

  const { data: results, isLoading: resultsLoading } = useAllTestResults();
  const { data: bestWPM, isLoading: bestLoading } = useBestWPM();
  const { data: avgAccuracy, isLoading: accLoading } = useAverageAccuracy();
  const { data: totalTests, isLoading: totalLoading } = useTotalTests();
  const { data: streak, isLoading: streakLoading } = useDailyStreaks();

  const handleSaveName = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      setDisplayName(trimmed);
      localStorage.setItem(DISPLAY_NAME_KEY, trimmed);
    }
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(displayName);
    setEditing(false);
  };

  const recentResults = results ? [...results].reverse().slice(0, 10) : [];

  const testModeLabel = (mode: TestResult['testMode']): string => {
    if (typeof mode === 'object') {
      const key = Object.keys(mode)[0];
      return key || 'unknown';
    }
    return String(mode);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground text-sm">Your coding journey at a glance.</p>
      </div>

      {/* Profile Header */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="w-20 h-20 border-2 border-primary/30">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              {editing ? (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="max-w-xs h-9 text-lg font-bold"
                    onKeyDown={e => { if (e.key === 'Enter') handleSaveName(); if (e.key === 'Escape') handleCancelEdit(); }}
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" className="h-9 w-9 text-primary" onClick={handleSaveName}>
                    <Check size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground" onClick={handleCancelEdit}>
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h2 className="text-2xl font-bold">{displayName}</h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => { setEditValue(displayName); setEditing(true); }}
                  >
                    <Edit2 size={14} />
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-1">Coding Typist</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Badge variant="secondary" className="text-xs">
                  <Zap size={10} className="mr-1" />
                  Active Coder
                </Badge>
                {streak != null && Number(streak) >= 3 && (
                  <Badge variant="outline" className="text-xs border-chart-5/30 text-chart-5">
                    🔥 {Number(streak)} Day Streak
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifetime Stats */}
      <div>
        <h2 className="text-lg font-bold mb-4">Lifetime Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Award,
              label: 'Total Tests',
              value: totalLoading ? null : totalTests != null ? String(Number(totalTests)) : '0',
              colorClass: 'text-chart-4',
              bgClass: 'bg-chart-4/10',
            },
            {
              icon: Zap,
              label: 'Best WPM',
              value: bestLoading ? null : bestWPM != null ? String(Number(bestWPM)) : '—',
              colorClass: 'text-primary',
              bgClass: 'bg-primary/10',
            },
            {
              icon: Target,
              label: 'Avg Accuracy',
              value: accLoading ? null : avgAccuracy != null ? `${Math.round(avgAccuracy)}%` : '—',
              colorClass: 'text-chart-2',
              bgClass: 'bg-chart-2/10',
            },
            {
              icon: Flame,
              label: 'Best Streak',
              value: streakLoading ? null : streak != null ? `${Number(streak)}d` : '0d',
              colorClass: 'text-chart-5',
              bgClass: 'bg-chart-5/10',
            },
          ].map(stat => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${stat.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon size={18} className={stat.colorClass} />
                  </div>
                  <div>
                    {stat.value === null ? (
                      <Skeleton className="h-6 w-12 mb-1" />
                    ) : (
                      <div className="text-xl font-bold">{stat.value}</div>
                    )}
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            {resultsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : recentResults.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <User size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No tests completed yet.</p>
                <p className="text-xs mt-1">Complete a test to see your activity here!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-xs">
                      <th className="text-left py-2 pr-4">Date</th>
                      <th className="text-left py-2 pr-4">WPM</th>
                      <th className="text-left py-2 pr-4">Accuracy</th>
                      <th className="text-left py-2 pr-4">Mode</th>
                      <th className="text-left py-2">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((r: TestResult, i: number) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-2.5 pr-4 text-muted-foreground text-xs">
                          {new Date(Number(r.timestamp) / 1_000_000).toLocaleDateString()}
                        </td>
                        <td className="py-2.5 pr-4 font-semibold text-primary">{String(Number(r.wpm))}</td>
                        <td className="py-2.5 pr-4 text-chart-2">{Math.round(r.accuracy)}%</td>
                        <td className="py-2.5 pr-4">
                          <Badge variant="outline" className="text-xs capitalize">{testModeLabel(r.testMode)}</Badge>
                        </td>
                        <td className="py-2.5 text-muted-foreground capitalize text-xs">{r.language}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
