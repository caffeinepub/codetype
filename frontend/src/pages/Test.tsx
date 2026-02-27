import { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { TypingArea } from '@/components/TypingArea';
import { TestResults } from '@/components/TestResults';
import { getRandomSnippet } from '@/utils/codeSnippets';
import { calculateWPM, calculateAccuracy, formatTime } from '@/utils/typingMetrics';
import { TestMode } from '@/backend';
import { Clock, Zap, Target, Edit3, RotateCcw } from 'lucide-react';

const TIMED_DURATIONS = [15, 30, 60, 120];

interface TypingTestState {
  typedText: string;
  isComplete: boolean;
  isActive: boolean;
  startTime: number | null;
  elapsed: number;
  wpm: number;
  accuracy: number;
}

function useTypingTest(snippet: string) {
  const [typedText, setTypedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setTypedText('');
    setIsComplete(false);
    setIsActive(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const complete = useCallback((text: string, start: number) => {
    setIsComplete(true);
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const secs = (Date.now() - start) / 1000;
    const correctCount = text.split('').filter((c, i) => c === snippet[i]).length;
    setElapsed(Math.round(secs));
    setWpm(calculateWPM(correctCount, secs));
    setAccuracy(calculateAccuracy(text.length, correctCount));
  }, [snippet]);

  const handleType = useCallback((text: string) => {
    setTypedText(text);
    if (text.length === snippet.length && startTime) {
      complete(text, startTime);
    }
  }, [snippet.length, startTime, complete]);

  const handleStart = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      const secs = (Date.now() - now) / 1000;
      setElapsed(Math.round(secs));
      setTypedText(prev => {
        const correctCount = prev.split('').filter((c, i) => c === snippet[i]).length;
        setWpm(calculateWPM(correctCount, secs));
        setAccuracy(calculateAccuracy(prev.length, correctCount));
        return prev;
      });
    }, 300);
  }, [snippet]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return { typedText, isComplete, isActive, elapsed, wpm, accuracy, handleType, handleStart, reset };
}

// Timed Test
function TimedTest() {
  const [duration, setDuration] = useState(60);
  const [snippet] = useState(() => getRandomSnippet('python', 'medium').code);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isComplete, setIsComplete] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setTypedText('');
    setIsComplete(false);
    setIsActive(false);
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    startTimeRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [duration]);

  useEffect(() => { setTimeLeft(duration); }, [duration]);

  const handleStart = useCallback(() => {
    const now = Date.now();
    startTimeRef.current = now;
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - now) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(Math.ceil(remaining));
      setTypedText(prev => {
        const correctCount = prev.split('').filter((c, i) => c === snippet[i]).length;
        setWpm(calculateWPM(correctCount, elapsed));
        setAccuracy(calculateAccuracy(prev.length, correctCount));
        return prev;
      });
      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        setIsComplete(true);
        setIsActive(false);
      }
    }, 200);
  }, [duration, snippet]);

  const handleType = (text: string) => {
    setTypedText(text);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  if (isComplete) {
    return <TestResults wpm={wpm} accuracy={accuracy} duration={duration} language="python" difficulty="medium" testMode={TestMode.words} onReset={reset} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Duration:</span>
        {TIMED_DURATIONS.map(d => (
          <Button
            key={d}
            variant={duration === d ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setDuration(d); reset(); }}
            disabled={isActive}
          >
            {d}s
          </Button>
        ))}
        <div className="ml-auto">
          <Badge variant={timeLeft <= 10 ? 'destructive' : 'secondary'} className="text-lg px-3 py-1 font-mono">
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-chart-2">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      <TypingArea
        snippet={snippet}
        typedText={typedText}
        onType={handleType}
        isActive={!isComplete}
        onStart={handleStart}
      />

      <Button variant="outline" onClick={reset} className="gap-2">
        <RotateCcw size={14} />
        Reset
      </Button>
    </div>
  );
}

// Speed Test
function SpeedTest() {
  const [snippetObj] = useState(() => getRandomSnippet('java', 'medium'));
  const { typedText, isComplete, elapsed, wpm, accuracy, handleType, handleStart, reset } = useTypingTest(snippetObj.code);

  if (isComplete) {
    return <TestResults wpm={wpm} accuracy={accuracy} duration={elapsed} language="java" difficulty="medium" testMode={TestMode.words} onReset={reset} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Type the snippet as fast as possible. Timer starts on first keystroke.</p>
        <Badge variant="secondary" className="font-mono">{elapsed}s</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-chart-2">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      <TypingArea
        snippet={snippetObj.code}
        typedText={typedText}
        onType={handleType}
        isActive={!isComplete}
        onStart={handleStart}
      />

      <Button variant="outline" onClick={reset} className="gap-2">
        <RotateCcw size={14} />
        Reset
      </Button>
    </div>
  );
}

// Accuracy Test
function AccuracyTest() {
  const TARGET_ACCURACY = 95;
  const [snippetObj] = useState(() => getRandomSnippet('python', 'easy'));
  const { typedText, isComplete, isActive, elapsed, wpm, accuracy, handleType, handleStart, reset } = useTypingTest(snippetObj.code);
  const failed = isActive && typedText.length > 10 && accuracy < TARGET_ACCURACY;

  if (isComplete) {
    return <TestResults wpm={wpm} accuracy={accuracy} duration={elapsed} language="python" difficulty="easy" testMode={TestMode.words} onReset={reset} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          Maintain at least <span className="text-primary font-semibold">{TARGET_ACCURACY}%</span> accuracy throughout.
        </p>
        {failed && (
          <Badge variant="destructive" className="animate-pulse">Below target accuracy!</Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </CardContent>
        </Card>
        <Card className={`border text-center ${accuracy >= TARGET_ACCURACY ? 'bg-card border-border' : 'bg-destructive/10 border-destructive/30'}`}>
          <CardContent className="py-3">
            <div className={`text-2xl font-bold ${accuracy >= TARGET_ACCURACY ? 'text-chart-2' : 'text-destructive'}`}>{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy (target: {TARGET_ACCURACY}%)</div>
          </CardContent>
        </Card>
      </div>

      <TypingArea
        snippet={snippetObj.code}
        typedText={typedText}
        onType={handleType}
        isActive={!isComplete}
        onStart={handleStart}
      />

      <Button variant="outline" onClick={reset} className="gap-2">
        <RotateCcw size={14} />
        Reset
      </Button>
    </div>
  );
}

// Custom Test
function CustomTest() {
  const [customCode, setCustomCode] = useState('');
  const [activeSnippet, setActiveSnippet] = useState('');
  const { typedText, isComplete, elapsed, wpm, accuracy, handleType, handleStart, reset } = useTypingTest(activeSnippet);

  const startCustom = () => {
    if (customCode.trim()) {
      setActiveSnippet(customCode.trim());
      reset();
    }
  };

  if (isComplete) {
    return (
      <TestResults
        wpm={wpm}
        accuracy={accuracy}
        duration={elapsed}
        language="custom"
        difficulty="custom"
        testMode={TestMode.custom}
        onReset={() => { reset(); setActiveSnippet(''); }}
      />
    );
  }

  if (!activeSnippet) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Paste your own code snippet below to create a custom typing test.</p>
        <Textarea
          placeholder="Paste your code here..."
          value={customCode}
          onChange={e => setCustomCode(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
        <Button onClick={startCustom} disabled={!customCode.trim()} className="gap-2">
          <Edit3 size={14} />
          Start Custom Test
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Custom snippet — type it as accurately as possible.</p>
        <Badge variant="secondary" className="font-mono">{elapsed}s</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-center">
          <CardContent className="py-3">
            <div className="text-2xl font-bold text-chart-2">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      <TypingArea
        snippet={activeSnippet}
        typedText={typedText}
        onType={handleType}
        isActive={!isComplete}
        onStart={handleStart}
      />

      <Button variant="outline" onClick={() => { reset(); setActiveSnippet(''); }} className="gap-2">
        <RotateCcw size={14} />
        Change Snippet
      </Button>
    </div>
  );
}

export function Test() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Test</h1>
        <p className="text-muted-foreground text-sm">Choose a test mode and challenge yourself.</p>
      </div>

      <Tabs defaultValue="timed">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full mb-6 h-auto">
          <TabsTrigger value="timed" className="gap-1.5 py-2.5 text-xs sm:text-sm">
            <Clock size={14} />
            Timed
          </TabsTrigger>
          <TabsTrigger value="speed" className="gap-1.5 py-2.5 text-xs sm:text-sm">
            <Zap size={14} />
            Speed
          </TabsTrigger>
          <TabsTrigger value="accuracy" className="gap-1.5 py-2.5 text-xs sm:text-sm">
            <Target size={14} />
            Accuracy
          </TabsTrigger>
          <TabsTrigger value="custom" className="gap-1.5 py-2.5 text-xs sm:text-sm">
            <Edit3 size={14} />
            Custom
          </TabsTrigger>
        </TabsList>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <TabsContent value="timed" className="mt-0">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  Timed Test
                </CardTitle>
                <CardDescription>Type as much code as possible within the time limit.</CardDescription>
              </CardHeader>
              <TimedTest />
            </TabsContent>

            <TabsContent value="speed" className="mt-0">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap size={16} className="text-primary" />
                  Speed Test
                </CardTitle>
                <CardDescription>Complete the snippet as fast as possible.</CardDescription>
              </CardHeader>
              <SpeedTest />
            </TabsContent>

            <TabsContent value="accuracy" className="mt-0">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  Accuracy Test
                </CardTitle>
                <CardDescription>Maintain 95%+ accuracy throughout the test.</CardDescription>
              </CardHeader>
              <AccuracyTest />
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Edit3 size={16} className="text-primary" />
                  Custom Test
                </CardTitle>
                <CardDescription>Paste your own code snippet to practice.</CardDescription>
              </CardHeader>
              <CustomTest />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
