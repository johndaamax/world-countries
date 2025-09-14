import { useState, createContext, ReactElement, useMemo, useCallback } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (newTheme: string) => void;
}
interface AppProviderProps {
  children: React.ReactNode;
}

const defaultThemeState: ThemeContextProps = {
  theme: 'dark',
  setTheme: (): void => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultThemeState);

export function AppProvider({ children }: AppProviderProps): ReactElement {
  const [themeState, setThemeState] = useState(() => {
    const stored = localStorage.getItem('theme');
    console.log('Initial theme from localStorage:', stored);
    return stored || 'dark';
  });

  const handleTheme = useCallback((newTheme: string): void => {
    console.log('Context handleTheme called with:', newTheme);
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const themeContextValue = useMemo(() => {
    console.log('Context value updated - theme:', themeState, 'type:', typeof themeState);
    return { theme: themeState, setTheme: handleTheme };
  }, [themeState, handleTheme]);

  return <ThemeContext value={themeContextValue}>{children}</ThemeContext>;
}
