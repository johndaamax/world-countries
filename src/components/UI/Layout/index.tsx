import { ReactElement } from 'react';
import { useThemeContext } from '../../../context';
import { Theme } from '../../../util/types';

import Header from '../Header';

import styles from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { theme, setTheme } = useThemeContext();
  const themeToggleCallback = (): void => {
    if (localStorage.getItem('theme') === Theme.Dark) {
      localStorage.setItem('theme', Theme.Light);
      setTheme(Theme.Light);
    } else {
      localStorage.setItem('theme', Theme.Dark);
      setTheme(Theme.Dark);
    }
  };

  return (
    <div className={`${styles.Wrapper} ${theme}`}>
      <Header themeToggleCallback={themeToggleCallback} />
      {children}
    </div>
  );
}
