import { ReactElement, use } from 'react';
import { ThemeContext } from '../../../context';
import { Theme } from '../../../util/types';

import Header from '../Header';

import styles from './style.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { theme, setTheme } = use(ThemeContext);

  const themeToggleCallback = (): void => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
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
