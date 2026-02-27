import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Trophy, Calendar, Star, Clock, Target, Zap, ChevronRight, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dailyChallenges, weeklyChallenges, levelChallenges, type Challenge } from '@/utils/challenges';

function ChallengeCard({ challenge, onStart }: { challenge: Challenge; onStart: (c: Challenge) => void }) {
  const difficultyColor: Record<string, string> = {
    easy: 'bg-primary/10 text-primary border-primary/20',
    medium: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
    hard: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-200 hover:shadow-neon-sm group">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{challenge.badge}</span>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{challenge.title}</h3>
              {challenge.resetDate && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock size={10} />
                  Resets {challenge.resetDate}
                </p>
              )}
            </div>
          </div>
          <Badge className={`text-xs border ${difficultyColor[challenge.difficulty] || 'bg-muted text-muted-foreground'}`} variant="outline">
            {challenge.difficulty}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{challenge.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded">
            <Zap size={10} className="text-primary" />
            <span>{challenge.targetWPM}+ WPM</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded">
            <Target size={10} className="text-chart-2" />
            <span>{challenge.targetAccuracy}% accuracy</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded">
            <Clock size={10} className="text-chart-3" />
            <span>{challenge.duration}s</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded capitalize">
            <span>{challenge.language}</span>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full gap-2 group-hover:shadow-neon-sm transition-all"
          onClick={() => onStart(challenge)}
        >
          Start Challenge
          <ChevronRight size={14} />
        </Button>
      </CardContent>
    </Card>
  );
}

function LevelCard({ challenge, index }: { challenge: Challenge; index: number }) {
  const navigate = useNavigate();
  const isUnlocked = index < 3; // First 3 always unlocked for demo

  return (
    <Card className={`border transition-all duration-200 ${isUnlocked ? 'bg-card border-border hover:border-primary/30 hover:shadow-neon-sm' : 'bg-muted/20 border-border/50 opacity-60'}`}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isUnlocked ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground'}`}>
            {isUnlocked ? challenge.level : <Lock size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-sm">{challenge.title}</span>
              <span className="text-base">{challenge.badge}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{challenge.description}</p>
            <div className="flex gap-2 mt-1.5">
              <span className="text-xs text-muted-foreground">{challenge.targetWPM}+ WPM</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{challenge.targetAccuracy}% acc</span>
            </div>
          </div>
          {isUnlocked && (
            <Button
              size="sm"
              variant="outline"
              className="flex-shrink-0 gap-1 text-xs"
              onClick={() => navigate({ to: '/test' })}
            >
              Start
              <ChevronRight size={12} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function Challenges() {
  const navigate = useNavigate();

  const handleStartChallenge = (_challenge: Challenge) => {
    navigate({ to: '/test' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Challenges</h1>
        <p className="text-muted-foreground text-sm">Push your limits with daily, weekly, and level-based challenges.</p>
      </div>

      {/* Daily Challenges */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Daily Challenges</h2>
            <p className="text-sm text-muted-foreground">Fresh challenges every day — reset at midnight</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dailyChallenges.map(c => (
            <ChallengeCard key={c.id} challenge={c} onStart={handleStartChallenge} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Weekly Challenges */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <Trophy size={18} className="text-chart-3" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Weekly Challenges</h2>
            <p className="text-sm text-muted-foreground">Harder challenges that reset every Monday</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeklyChallenges.map(c => (
            <ChallengeCard key={c.id} challenge={c} onStart={handleStartChallenge} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Level-Based Challenges */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
            <Star size={18} className="text-chart-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Level-Based Challenges</h2>
            <p className="text-sm text-muted-foreground">Progress from beginner to grandmaster — Level 1 to 10</p>
          </div>
        </div>
        <div className="space-y-3">
          {levelChallenges.map((c, i) => (
            <LevelCard key={c.id} challenge={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
