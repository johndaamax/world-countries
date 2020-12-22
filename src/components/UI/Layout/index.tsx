import { ReactChild } from 'react'
import { useAppContext } from '../../../context'

import Header from '../Header'

import styles from './style.module.scss'

type ChildrenProps = {
    children: ReactChild | ReactChild[]
}

const Layout = ({ children }: ChildrenProps) => {
    const { theme, setTheme } = useAppContext();
    const themeToggleCallback = () => {
        if (localStorage.getItem('theme') === 'dark')
            localStorage.setItem('theme', 'light')
        else
            localStorage.setItem('theme', 'dark')
        setTheme(localStorage.getItem('theme')!);
    }

    return (
        <div className={`${styles.Wrapper} ${theme}`}>
            <Header themeToggleCallback={themeToggleCallback} />
            {children}
        </div>
    )
}

export default Layout
