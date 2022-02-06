import { useState, useContext, createContext, ReactElement, useMemo } from 'react';

import { CountryInfo } from '../util/types';

interface ThemeContextProps {
  theme: string;
  setTheme: (newTheme: string) => void;
}
interface CountryContextProps {
  countries: CountryInfo[];
  setCountries: (countries: CountryInfo[]) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const defaultThemeState: ThemeContextProps = {
  theme: 'dark',
  setTheme: (): void => undefined,
};
const defaultCountriesState: CountryContextProps = {
  countries: [],
  setCountries: (): void => undefined,
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeState);
const CountriesContext = createContext<CountryContextProps>(defaultCountriesState);

export function AppProvider({ children }: AppProviderProps): ReactElement {
  const [themeState, setThemeState] = useState(localStorage.getItem('theme') || 'dark');
  const [countriesState, setCountriesState] = useState<CountryInfo[]>([]);

  const handleTheme = (newTheme: string): void => {
    setThemeState(newTheme);
  };

  const setCountries = (newCountries: CountryInfo[]): void => {
    setCountriesState(newCountries);
  };

  const themeContextValue = useMemo(() => {
    return { theme: themeState, setTheme: handleTheme };
  }, [themeState, handleTheme]);
  const countriesContextValue = useMemo(() => {
    return { countries: countriesState, setCountries };
  }, [countriesState, setCountries]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CountriesContext.Provider value={countriesContextValue}>{children}</CountriesContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an AppProvider');
  }
  return context;
};

export const useCountriesContext = (): CountryContextProps => {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error('useCountriesContext must be used within an AppProvider');
  }
  return context;
};
