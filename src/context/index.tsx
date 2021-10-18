import { useState, useContext, createContext } from 'react'

import { CountryInfo } from '../util/types'

interface CountryContextProps {
    countries: CountryInfo[],
    setCountries: (countries: CountryInfo[]) => void
}

const ThemeContext = createContext({ theme: '', setTheme: (newTheme: string) => { } })
const CountriesContext = createContext<CountryContextProps>({ countries: [], setCountries: (countries) => { } })

export const AppProvider: React.FC = ({ children }) => {
    const [themeState, setThemeState] = useState(localStorage.getItem('theme') || 'dark');
    const [countriesState, setCountriesState] = useState<CountryInfo[]>([]);

    const handleTheme = (newTheme: string) => {
        setThemeState(newTheme)
    }

    const setCountries = (newCountries: CountryInfo[]) => {
        setCountriesState(newCountries)
    }

    return (
        <ThemeContext.Provider value={{ theme: themeState, setTheme: handleTheme }}>
            <CountriesContext.Provider value={{ countries: countriesState, setCountries: setCountries }}>
                {children}
            </CountriesContext.Provider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useThemeContext must be used within an AppProvider')
    }
    return context
}

export const useCountriesContext = () => {
    const context = useContext(CountriesContext)
    if (context === undefined) {
        throw new Error('useCountriesContext must be used within an AppProvider')
    }
    return context
}