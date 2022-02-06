import { ReactElement } from 'react';
import { useThemeContext } from '../../../context';

import Header from '../Header';

import styles from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { theme, setTheme } = useThemeContext();
  const themeToggleCallback = (): void => {
    if (localStorage.getItem('theme') === 'dark') localStorage.setItem('theme', 'light');
    else localStorage.setItem('theme', 'dark');
    setTheme(localStorage.getItem('theme')!);
  };

  return (
    <div className={`${styles.Wrapper} ${theme}`}>
      <Header themeToggleCallback={themeToggleCallback} />
      {children}
    </div>
  );
}
