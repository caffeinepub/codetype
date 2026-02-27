import { useMemo } from 'react';
import { BarChart2, Zap, Target, Flame, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  useAllTestResults,
  useBestWPM,
  useAverageWPM,
  useAverageAccuracy,
  useTotalTests,
  useDailyStreaks,
  useStreakCalendar,
} from '@/hooks/useQueries';
import type { TestResult } from '@/backend';

function StatCard({
  icon: Icon,
  label,
  value,
  colorClass,
  bgClass,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass: string;
  bgClass: string;
  loading?: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={colorClass} />
          </div>
          <div>
            {loading ? (
              <Skeleton className="h-7 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{value}</div>
            )}
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StreakCalendar({ data }: { data: [bigint, boolean][] }) {
  const today = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const activeDays = useMemo(() => {
    const set = new Set<number>();
    data.forEach(([day]) => set.add(Number(day)));
    return set;
  }, [data]);

  // Show last 70 days (10 weeks)
  const days = useMemo(() => {
    const result: { day: number; active: boolean; date: Date }[] = [];
    for (let i = 69; i >= 0; i--) {
      const day = today - i;
      const date = new Date(day * 24 * 60 * 60 * 1000);
      result.push({ day, active: activeDays.has(day), date });
    }
    return result;
  }, [today, activeDays]);

  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((d, di) => (
            <div
              key={di}
              className={`streak-day ${d.active ? 'active' : 'inactive'}`}
              title={`${d.date.toLocaleDateString()} ${d.active ? '✓' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Progress() {
  const { data: results, isLoading: resultsLoading } = useAllTestResults();
  const { data: bestWPM, isLoading: bestLoading } = useBestWPM();
  const { data: avgWPM, isLoading: avgWPMLoading } = useAverageWPM();
  const { data: avgAccuracy, isLoading: avgAccLoading } = useAverageAccuracy();
  const { data: totalTests, isLoading: totalLoading } = useTotalTests();
  const { data: streak, isLoading: streakLoading } = useDailyStreaks();
  const { data: calendar } = useStreakCalendar();

  const wpmChartData = useMemo(() => {
    if (!results) return [];
    return results.slice(-20).map((r: TestResult, i: number) => ({
      session: i + 1,
      wpm: Number(r.wpm),
      date: new Date(Number(r.timestamp) / 1_000_000).toLocaleDateString(),
    }));
  }, [results]);

  const accuracyChartData = useMemo(() => {
    if (!results) return [];
    return results.slice(-20).map((r: TestResult, i: number) => ({
      session: i + 1,
      accuracy: Math.round(r.accuracy),
      date: new Date(Number(r.timestamp) / 1_000_000).toLocaleDateString(),
    }));
  }, [results]);

  const hasData = results && results.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Progress & Stats</h1>
        <p className="text-muted-foreground text-sm">Track your improvement over time.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Zap}
          label="Best WPM"
          value={bestWPM != null ? String(Number(bestWPM)) : '—'}
          colorClass="text-primary"
          bgClass="bg-primary/10"
          loading={bestLoading}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg WPM"
          value={avgWPM != null ? String(Math.round(avgWPM)) : '—'}
          colorClass="text-chart-2"
          bgClass="bg-chart-2/10"
          loading={avgWPMLoading}
        />
        <StatCard
          icon={Target}
          label="Avg Accuracy"
          value={avgAccuracy != null ? `${Math.round(avgAccuracy)}%` : '—'}
          colorClass="text-chart-3"
          bgClass="bg-chart-3/10"
          loading={avgAccLoading}
        />
        <StatCard
          icon={Award}
          label="Total Tests"
          value={totalTests != null ? String(Number(totalTests)) : '0'}
          colorClass="text-chart-4"
          bgClass="bg-chart-4/10"
          loading={totalLoading}
        />
      </div>

      {/* Streak */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Flame size={16} className="text-chart-5" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            {streakLoading ? (
              <Skeleton className="h-10 w-20" />
            ) : (
              <div className="text-4xl font-bold text-chart-5">
                {streak != null ? String(Number(streak)) : '0'}
                <span className="text-lg ml-1">🔥</span>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              {streak != null && Number(streak) > 0
                ? `${Number(streak)} day${Number(streak) !== 1 ? 's' : ''} in a row!`
                : 'Complete a test today to start your streak!'}
            </div>
          </div>
          {calendar && calendar.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Last 70 days activity</p>
              <StreakCalendar data={calendar} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* WPM History Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            WPM History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resultsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : !hasData ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Complete some tests to see your WPM history.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={wpmChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                <XAxis dataKey="session" tick={{ fontSize: 11 }} stroke="oklch(0.55 0.02 240)" label={{ value: 'Session', position: 'insideBottom', offset: -2, fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.55 0.02 240)" />
                <Tooltip
                  contentStyle={{ background: 'oklch(0.14 0.015 240)', border: '1px solid oklch(0.22 0.02 240)', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: number) => [`${val} WPM`, 'WPM']}
                  labelFormatter={(label) => `Session ${label}`}
                />
                <Line type="monotone" dataKey="wpm" stroke="oklch(0.72 0.22 145)" strokeWidth={2} dot={{ r: 3, fill: 'oklch(0.72 0.22 145)' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Accuracy Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target size={16} className="text-chart-2" />
            Accuracy History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resultsLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : !hasData ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Complete some tests to see your accuracy history.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={accuracyChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                <XAxis dataKey="session" tick={{ fontSize: 11 }} stroke="oklch(0.55 0.02 240)" label={{ value: 'Session', position: 'insideBottom', offset: -2, fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="oklch(0.55 0.02 240)" />
                <Tooltip
                  contentStyle={{ background: 'oklch(0.14 0.015 240)', border: '1px solid oklch(0.22 0.02 240)', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: number) => [`${val}%`, 'Accuracy']}
                  labelFormatter={(label) => `Session ${label}`}
                />
                <Bar dataKey="accuracy" fill="oklch(0.68 0.2 195)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Recent Results Table */}
      {hasData && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 size={16} className="text-chart-4" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-xs">
                    <th className="text-left py-2 pr-4">Date</th>
                    <th className="text-left py-2 pr-4">WPM</th>
                    <th className="text-left py-2 pr-4">Accuracy</th>
                    <th className="text-left py-2 pr-4">Language</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[...results].reverse().slice(0, 10).map((r: TestResult, i: number) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-2 pr-4 text-muted-foreground">
                        {new Date(Number(r.timestamp) / 1_000_000).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4 font-semibold text-primary">{String(Number(r.wpm))}</td>
                      <td className="py-2 pr-4 text-chart-2">{Math.round(r.accuracy)}%</td>
                      <td className="py-2 pr-4 capitalize text-muted-foreground">{r.language}</td>
                      <td className="py-2 text-muted-foreground">{String(Number(r.duration))}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
