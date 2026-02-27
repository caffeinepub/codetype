import { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TypingArea } from '@/components/TypingArea';
import { getRandomSnippet, LANGUAGE_LABELS, DIFFICULTY_LABELS, type Language, type Difficulty } from '@/utils/codeSnippets';
import { calculateWPM, calculateAccuracy } from '@/utils/typingMetrics';

export function Practice() {
  const [language, setLanguage] = useState<Language>('python');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [snippet, setSnippet] = useState(() => getRandomSnippet('python', 'easy'));
  const [typedText, setTypedText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadNewSnippet = useCallback(() => {
    setSnippet(getRandomSnippet(language, difficulty));
    setTypedText('');
    setIsActive(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setCompleted(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [language, difficulty]);

  useEffect(() => {
    loadNewSnippet();
  }, [language, difficulty]);

  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const secs = (now - startTime) / 1000;
        setElapsed(Math.floor(secs));
        const correctCount = typedText.split('').filter((c, i) => c === snippet.code[i]).length;
        setWpm(calculateWPM(correctCount, secs));
        setAccuracy(calculateAccuracy(typedText.length, correctCount));
      }, 300);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, startTime, typedText, snippet.code]);

  const handleType = useCallback((text: string) => {
    setTypedText(text);
    if (text.length === snippet.code.length) {
      setIsActive(false);
      setCompleted(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      const secs = startTime ? (Date.now() - startTime) / 1000 : 1;
      const correctCount = text.split('').filter((c, i) => c === snippet.code[i]).length;
      setWpm(calculateWPM(correctCount, secs));
      setAccuracy(calculateAccuracy(text.length, correctCount));
    }
  }, [snippet.code, startTime]);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setStartTime(Date.now());
  }, []);

  const correctChars = typedText.split('').filter((c, i) => c === snippet.code[i]).length;
  const progress = snippet.code.length > 0 ? (typedText.length / snippet.code.length) * 100 : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Practice</h1>
        <p className="text-muted-foreground text-sm">Select a language and difficulty, then start typing!</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={language} onValueChange={v => setLanguage(v as Language)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(LANGUAGE_LABELS) as Language[]).map(lang => (
              <SelectItem key={lang} value={lang}>{LANGUAGE_LABELS[lang]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={v => setDifficulty(v as Difficulty)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map(d => (
              <SelectItem key={d} value={d}>{DIFFICULTY_LABELS[d]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={loadNewSnippet} className="gap-2">
          <RefreshCw size={15} />
          New Snippet
        </Button>

        <div className="flex items-center gap-2 ml-auto">
          <Badge variant={difficulty === 'easy' ? 'secondary' : difficulty === 'medium' ? 'default' : 'destructive'}>
            {DIFFICULTY_LABELS[difficulty]}
          </Badge>
          <Badge variant="outline">{LANGUAGE_LABELS[language]}</Badge>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'WPM', value: wpm, color: 'text-primary' },
          { label: 'Accuracy', value: `${accuracy}%`, color: 'text-chart-2' },
          { label: 'Time', value: `${elapsed}s`, color: 'text-chart-3' },
          { label: 'Progress', value: `${Math.round(progress)}%`, color: 'text-chart-4' },
        ].map(m => (
          <Card key={m.label} className="bg-card border-border">
            <CardContent className="py-3 px-4 text-center">
              <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Snippet info */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{snippet.title}</span>
        {!isActive && !completed && typedText.length === 0 && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Play size={12} />
            Click below and start typing
          </span>
        )}
        {isActive && (
          <span className="text-xs text-primary flex items-center gap-1">
            <Pause size={12} />
            Typing...
          </span>
        )}
      </div>

      {/* Typing area */}
      <TypingArea
        snippet={snippet.code}
        typedText={typedText}
        onType={handleType}
        isActive={isActive || (!completed && typedText.length === 0)}
        onStart={handleStart}
      />

      {/* Completion message */}
      {completed && (
        <Card className="mt-4 bg-primary/10 border-primary/30 animate-fade-in">
          <CardContent className="py-4 px-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-primary">🎉 Snippet Complete!</p>
                <p className="text-sm text-muted-foreground">
                  {wpm} WPM · {accuracy}% accuracy · {elapsed}s · {correctChars}/{snippet.code.length} correct
                </p>
              </div>
              <Button onClick={loadNewSnippet} size="sm" className="gap-2">
                <RefreshCw size={14} />
                Next Snippet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
