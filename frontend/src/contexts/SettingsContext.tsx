import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type FontStyle = 'fira-code' | 'jetbrains-mono' | 'source-code-pro' | 'roboto-mono' | 'ubuntu-mono';

interface Settings {
  theme: Theme;
  fontSize: FontSize;
  fontStyle: FontStyle;
  backspaceAllowed: boolean;
}

interface SettingsContextValue extends Settings {
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setFontStyle: (style: FontStyle) => void;
  setBackspaceAllowed: (allowed: boolean) => void;
  toggleTheme: () => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  fontSize: 'md',
  fontStyle: 'fira-code',
  backspaceAllowed: true,
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'codetype-settings';

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return defaultSettings;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
  }, [settings.theme]);

  // Apply font size class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');
    root.classList.add(`font-size-${settings.fontSize}`);
  }, [settings.fontSize]);

  // Apply font style class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      'font-fira-code',
      'font-jetbrains-mono',
      'font-source-code-pro',
      'font-roboto-mono',
      'font-ubuntu-mono'
    );
    root.classList.add(`font-${settings.fontStyle}`);
  }, [settings.fontStyle]);

  const setTheme = useCallback((theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  }, []);

  const setFontSize = useCallback((fontSize: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  }, []);

  const setFontStyle = useCallback((fontStyle: FontStyle) => {
    setSettings(prev => ({ ...prev, fontStyle }));
  }, []);

  const setBackspaceAllowed = useCallback((backspaceAllowed: boolean) => {
    setSettings(prev => ({ ...prev, backspaceAllowed }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setTheme,
        setFontSize,
        setFontStyle,
        setBackspaceAllowed,
        toggleTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
