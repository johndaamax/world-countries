import { ReactElement, use } from 'react';
import { ThemeContext } from '../../../context';
import Button from '../../Button';

import { Theme } from '@/util/types';
import styles from './style.module.css';

interface HeaderProps {
  themeToggleCallback: () => void;
}

export default function Header({ themeToggleCallback }: HeaderProps): ReactElement {
  const { theme } = use(ThemeContext);

  const isDark = theme === Theme.Dark;
  const buttonText = isDark ? 'Dark mode' : 'Light mode';

  return (
    <header className={`${styles.header} ${theme}-secondary`}>
      <h3 className={styles.title}>Where in the world?</h3>
      <Button className={`${theme}-secondary ${theme}-hover-secondary`} onClickCallback={themeToggleCallback}>
        <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
        {buttonText}
      </Button>
    </header>
  );
}
