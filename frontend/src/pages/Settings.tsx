import { Moon, Sun, Type, Palette, Keyboard, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useSettings, type FontSize, type FontStyle } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const fontSizeOptions: { value: FontSize; label: string; preview: string }[] = [
  { value: 'sm', label: 'Small', preview: 'Aa' },
  { value: 'md', label: 'Medium', preview: 'Aa' },
  { value: 'lg', label: 'Large', preview: 'Aa' },
  { value: 'xl', label: 'X-Large', preview: 'Aa' },
];

const fontStyleOptions: { value: FontStyle; label: string; family: string }[] = [
  { value: 'fira-code', label: 'Fira Code', family: "'Fira Code', monospace" },
  { value: 'jetbrains-mono', label: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
  { value: 'source-code-pro', label: 'Source Code Pro', family: "'Source Code Pro', monospace" },
  { value: 'roboto-mono', label: 'Roboto Mono', family: "'Roboto Mono', monospace" },
  { value: 'ubuntu-mono', label: 'Ubuntu Mono', family: "'Ubuntu Mono', monospace" },
];

export function Settings() {
  const {
    theme,
    fontSize,
    fontStyle,
    backspaceAllowed,
    setTheme,
    setFontSize,
    setFontStyle,
    setBackspaceAllowed,
  } = useSettings();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your CodeType experience.</p>
      </div>

      {/* Appearance */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette size={16} className="text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-chart-3" />}
              <div>
                <Label className="text-sm font-medium">Theme</Label>
                <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Light</span>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
              />
              <span className="text-xs text-muted-foreground">Dark</span>
            </div>
          </div>

          <Separator />

          {/* Theme preview cards */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'relative rounded-lg border-2 p-3 text-left transition-all',
                theme === 'light' ? 'border-primary' : 'border-border hover:border-border/80'
              )}
            >
              <div className="bg-white rounded p-2 mb-2">
                <div className="h-2 w-12 bg-gray-200 rounded mb-1" />
                <div className="h-2 w-8 bg-gray-100 rounded" />
              </div>
              <span className="text-xs font-medium">Light</span>
              {theme === 'light' && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check size={10} className="text-primary-foreground" />
                </div>
              )}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'relative rounded-lg border-2 p-3 text-left transition-all',
                theme === 'dark' ? 'border-primary' : 'border-border hover:border-border/80'
              )}
            >
              <div className="bg-gray-900 rounded p-2 mb-2">
                <div className="h-2 w-12 bg-gray-700 rounded mb-1" />
                <div className="h-2 w-8 bg-gray-800 rounded" />
              </div>
              <span className="text-xs font-medium">Dark</span>
              {theme === 'dark' && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check size={10} className="text-primary-foreground" />
                </div>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Type size={16} className="text-chart-2" />
            Typography
          </CardTitle>
          <CardDescription>Adjust font size and style for the typing area.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Font Size</Label>
            <div className="grid grid-cols-4 gap-2">
              {fontSizeOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFontSize(opt.value)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all',
                    fontSize === opt.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border/80 bg-card'
                  )}
                >
                  <span
                    className="font-mono font-bold leading-none"
                    style={{
                      fontSize: opt.value === 'sm' ? '14px' : opt.value === 'md' ? '16px' : opt.value === 'lg' ? '20px' : '24px'
                    }}
                  >
                    {opt.preview}
                  </span>
                  <span className="text-xs text-muted-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Font Style */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Font Style</Label>
            <Select value={fontStyle} onValueChange={v => setFontStyle(v as FontStyle)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontStyleOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <span style={{ fontFamily: opt.family }}>{opt.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Font preview */}
            <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Preview:</p>
              <p
                className="text-sm"
                style={{ fontFamily: fontStyleOptions.find(f => f.value === fontStyle)?.family }}
              >
                const hello = "world"; // {fontStyleOptions.find(f => f.value === fontStyle)?.label}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typing Behavior */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Keyboard size={16} className="text-chart-3" />
            Typing Behavior
          </CardTitle>
          <CardDescription>Control how the typing tests behave.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Allow Backspace</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                When disabled, the Backspace key is blocked during typing tests.
              </p>
            </div>
            <Switch
              checked={backspaceAllowed}
              onCheckedChange={setBackspaceAllowed}
            />
          </div>

          <div className={cn(
            'mt-3 p-3 rounded-lg text-xs',
            backspaceAllowed
              ? 'bg-primary/5 border border-primary/20 text-primary'
              : 'bg-destructive/5 border border-destructive/20 text-destructive'
          )}>
            {backspaceAllowed
              ? '✓ Backspace is enabled — you can correct mistakes while typing.'
              : '✗ Backspace is disabled — train yourself to type accurately without corrections.'}
          </div>
        </CardContent>
      </Card>

      {/* Reset */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Reset Settings</CardTitle>
          <CardDescription>Restore all settings to their default values.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => {
              setTheme('dark');
              setFontSize('md');
              setFontStyle('fira-code');
              setBackspaceAllowed(true);
            }}
          >
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
