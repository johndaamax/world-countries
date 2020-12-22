import { useState, useContext, createContext, ReactChild } from 'react'

const ThemeContext = createContext({ theme: '', setTheme: (newTheme: string) => { } })

type Props = {
    children?: ReactChild | ReactChild[]
}

const AppContext = ({ children }: Props) => {
    const [themeState, setThemeState] = useState(localStorage.getItem('theme') || 'dark')

    const handleTheme = (newTheme: string) => {
        setThemeState(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme: themeState, setTheme: handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default AppContext

export const useAppContext = () => useContext(ThemeContext)