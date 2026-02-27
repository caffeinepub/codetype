import { CheckCircle2, RotateCcw, Save, Zap, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubmitTestResult } from '@/hooks/useQueries';
import { TestMode } from '@/backend';
import { toast } from 'sonner';

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  duration: number;
  language: string;
  difficulty: string;
  testMode: TestMode;
  onReset: () => void;
}

export function TestResults({ wpm, accuracy, duration, language, difficulty, testMode, onReset }: TestResultsProps) {
  const submitMutation = useSubmitTestResult();

  const handleSave = async () => {
    try {
      await submitMutation.mutateAsync({ wpm, accuracy, testMode, language, difficulty, duration });
      toast.success('Result saved successfully!');
    } catch {
      toast.error('Failed to save result. Please try again.');
    }
  };

  const getGrade = () => {
    if (wpm >= 80 && accuracy >= 95) return { label: 'Excellent!', color: 'text-neon-green' };
    if (wpm >= 60 && accuracy >= 90) return { label: 'Great!', color: 'text-chart-2' };
    if (wpm >= 40 && accuracy >= 85) return { label: 'Good', color: 'text-chart-3' };
    return { label: 'Keep Practicing', color: 'text-muted-foreground' };
  };

  const grade = getGrade();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <CheckCircle2 className="mx-auto mb-3 text-primary" size={48} />
        <h2 className="text-2xl font-bold mb-1">Test Complete!</h2>
        <p className={`text-lg font-semibold ${grade.color}`}>{grade.label}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border text-center">
          <CardContent className="pt-4 pb-4">
            <Zap className="mx-auto mb-2 text-primary" size={24} />
            <div className="text-3xl font-bold text-primary">{wpm}</div>
            <div className="text-xs text-muted-foreground mt-1">WPM</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-center">
          <CardContent className="pt-4 pb-4">
            <Target className="mx-auto mb-2 text-chart-2" size={24} />
            <div className="text-3xl font-bold text-chart-2">{accuracy}%</div>
            <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-center">
          <CardContent className="pt-4 pb-4">
            <Clock className="mx-auto mb-2 text-chart-3" size={24} />
            <div className="text-3xl font-bold text-chart-3">{duration}s</div>
            <div className="text-xs text-muted-foreground mt-1">Time</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={submitMutation.isPending || submitMutation.isSuccess}
          className="flex-1 gap-2"
        >
          <Save size={16} />
          {submitMutation.isPending ? 'Saving...' : submitMutation.isSuccess ? 'Saved!' : 'Save Result'}
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1 gap-2">
          <RotateCcw size={16} />
          Try Again
        </Button>
      </div>
    </div>
  );
}
