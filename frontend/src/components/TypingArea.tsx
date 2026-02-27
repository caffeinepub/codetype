import { useRef, useEffect, useCallback } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

interface TypingAreaProps {
  snippet: string;
  typedText: string;
  onType: (text: string) => void;
  isActive: boolean;
  onStart?: () => void;
}

export function TypingArea({ snippet, typedText, onType, isActive, onStart }: TypingAreaProps) {
  const { backspaceAllowed, fontStyle } = useSettings();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !backspaceAllowed) {
      e.preventDefault();
    }
  }, [backspaceAllowed]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= snippet.length) {
      if (val.length === 1 && typedText.length === 0 && onStart) {
        onStart();
      }
      onType(val);
    }
  }, [snippet.length, typedText.length, onStart, onType]);

  const fontFamilyMap: Record<string, string> = {
    'fira-code': "'Fira Code', monospace",
    'jetbrains-mono': "'JetBrains Mono', monospace",
    'source-code-pro': "'Source Code Pro', monospace",
    'roboto-mono': "'Roboto Mono', monospace",
    'ubuntu-mono': "'Ubuntu Mono', monospace",
  };

  const fontFamily = fontFamilyMap[fontStyle] || "'Fira Code', monospace";

  return (
    <div
      className="relative cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden input to capture keystrokes */}
      <input
        ref={inputRef}
        value={typedText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Typing input"
      />

      {/* Visual display */}
      <div
        className="typing-area p-4 sm:p-6 rounded-xl border border-border bg-card/50 leading-relaxed whitespace-pre-wrap break-all focus-within:border-primary/50 focus-within:shadow-neon-sm transition-all duration-200 min-h-[120px] select-none"
        style={{ fontFamily }}
      >
        {snippet.split('').map((char, i) => {
          let charClass = 'pending';
          if (i < typedText.length) {
            charClass = typedText[i] === char ? 'correct' : 'incorrect';
          } else if (i === typedText.length) {
            charClass = 'current';
          }

          return (
            <span
              key={i}
              className={cn('code-char', charClass)}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
