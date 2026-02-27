import { BookOpen, Hand, AlertTriangle, Keyboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const typingTips = [
  { tip: 'Use the home row position', detail: 'Keep your fingers resting on A, S, D, F (left) and J, K, L, ; (right) as your base position.' },
  { tip: 'Practice bracket pairs together', detail: 'Train your fingers to type (), [], {}, <> as single units to speed up code typing.' },
  { tip: 'Learn common code patterns', detail: 'Memorize frequently used patterns like if/else, for loops, and function declarations.' },
  { tip: 'Don\'t look at the keyboard', detail: 'Force yourself to look at the screen. Use touch typing to build muscle memory.' },
  { tip: 'Slow down to speed up', detail: 'Accuracy first, speed second. Typing slowly with 100% accuracy builds better habits than fast with errors.' },
  { tip: 'Practice special characters', detail: 'Symbols like !, @, #, $, %, ^, &, *, (, ) are common in code — practice them daily.' },
  { tip: 'Use keyboard shortcuts', detail: 'Learn IDE shortcuts to reduce mouse usage and keep your hands on the keyboard.' },
  { tip: 'Take regular breaks', detail: 'Use the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds to reduce eye strain.' },
];

const commonMistakes = [
  { mistake: 'Bracket mismatch', example: 'if (x > 0 {', fix: 'Always close brackets immediately after opening them.' },
  { mistake: 'Missing semicolons', example: 'int x = 5', fix: 'In C/Java/JS, train yourself to add ; at the end of every statement.' },
  { mistake: 'Wrong indentation', example: 'def foo():\nreturn 1', fix: 'Use consistent 2 or 4 spaces; configure your editor to auto-indent.' },
  { mistake: 'Incorrect capitalization', example: 'Public class Main', fix: 'Learn language conventions: PascalCase for classes, camelCase for variables.' },
  { mistake: 'Typos in variable names', example: 'usrNmae vs userName', fix: 'Type slowly for identifiers; use autocomplete in your IDE.' },
  { mistake: 'Missing quotes', example: 'print(Hello)', fix: 'Always pair quotes immediately: type "" then move cursor inside.' },
  { mistake: 'Wrong operator', example: '= instead of ==', fix: 'Practice comparison operators separately to build muscle memory.' },
];

const shortcuts = [
  { category: 'VS Code', shortcut: 'Ctrl + P', description: 'Quick file open' },
  { category: 'VS Code', shortcut: 'Ctrl + Shift + P', description: 'Command palette' },
  { category: 'VS Code', shortcut: 'Ctrl + /', description: 'Toggle line comment' },
  { category: 'VS Code', shortcut: 'Alt + ↑/↓', description: 'Move line up/down' },
  { category: 'VS Code', shortcut: 'Ctrl + D', description: 'Select next occurrence' },
  { category: 'VS Code', shortcut: 'Ctrl + Shift + K', description: 'Delete line' },
  { category: 'VS Code', shortcut: 'Ctrl + B', description: 'Toggle sidebar' },
  { category: 'VS Code', shortcut: 'Ctrl + `', description: 'Open terminal' },
  { category: 'Terminal', shortcut: 'Ctrl + C', description: 'Cancel current command' },
  { category: 'Terminal', shortcut: 'Ctrl + L', description: 'Clear terminal' },
  { category: 'Terminal', shortcut: 'Ctrl + R', description: 'Search command history' },
  { category: 'Terminal', shortcut: 'Tab', description: 'Auto-complete path/command' },
  { category: 'General', shortcut: 'Ctrl + Z', description: 'Undo' },
  { category: 'General', shortcut: 'Ctrl + Shift + Z', description: 'Redo' },
  { category: 'General', shortcut: 'Ctrl + A', description: 'Select all' },
  { category: 'General', shortcut: 'Ctrl + F', description: 'Find in file' },
];

export function Learn() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Learn</h1>
        <p className="text-muted-foreground text-sm">Tips, guides, and references to help you type code faster.</p>
      </div>

      {/* Typing Tips */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Typing Tips for Programmers</h2>
            <p className="text-sm text-muted-foreground">Actionable advice to improve your coding speed</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {typingTips.map((item, i) => (
            <Card key={i} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="pt-4 pb-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.tip}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Finger Placement Guide */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-chart-2/10 flex items-center justify-center">
            <Hand size={18} className="text-chart-2" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Finger Placement Guide</h2>
            <p className="text-sm text-muted-foreground">Proper hand positioning for maximum efficiency</p>
          </div>
        </div>

        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-0">
            <img
              src="/assets/generated/finger-placement.dim_800x300.png"
              alt="Keyboard finger placement guide"
              className="w-full object-cover"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {[
            { hand: 'Left Hand', keys: 'A S D F', fingers: 'Pinky → Ring → Middle → Index', color: 'text-chart-2' },
            { hand: 'Right Hand', keys: 'J K L ;', fingers: 'Index → Middle → Ring → Pinky', color: 'text-chart-3' },
            { hand: 'Thumbs', keys: 'Space Bar', fingers: 'Either thumb for spacebar', color: 'text-chart-4' },
            { hand: 'Reach Keys', keys: 'T Y G H B N', fingers: 'Index fingers stretch to reach center keys', color: 'text-chart-5' },
          ].map(item => (
            <Card key={item.hand} className="bg-card border-border">
              <CardContent className="pt-4 pb-4">
                <p className={`font-semibold text-sm mb-1 ${item.color}`}>{item.hand}</p>
                <p className="font-mono text-sm bg-muted/50 px-2 py-1 rounded mb-2 inline-block">{item.keys}</p>
                <p className="text-xs text-muted-foreground">{item.fingers}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Common Coding Mistakes */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={18} className="text-destructive" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Common Coding Mistakes</h2>
            <p className="text-sm text-muted-foreground">Frequent typing errors and how to avoid them</p>
          </div>
        </div>
        <div className="space-y-3">
          {commonMistakes.map((item, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <Badge variant="destructive" className="self-start flex-shrink-0">{item.mistake}</Badge>
                  <div className="flex-1 min-w-0">
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono text-destructive block mb-2 overflow-x-auto">
                      ❌ {item.example}
                    </code>
                    <p className="text-xs text-muted-foreground">✅ {item.fix}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Keyboard Shortcuts */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
            <Keyboard size={18} className="text-chart-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
            <p className="text-sm text-muted-foreground">Essential shortcuts for VS Code, terminal, and general use</p>
          </div>
        </div>
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Category</TableHead>
                  <TableHead className="w-48">Shortcut</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortcuts.map((s, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{s.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">
                        {s.shortcut}
                      </kbd>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
}
