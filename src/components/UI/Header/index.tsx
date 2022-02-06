import { ReactElement } from 'react';
import { useThemeContext } from '../../../context';
import Button from '../../Button';

import styles from './style.module.scss';

interface HeaderProps {
  themeToggleCallback: () => void;
}

export default function Header({ themeToggleCallback }: HeaderProps): ReactElement {
  const { theme } = useThemeContext();
  const buttonText = theme === 'dark' ? 'Light mode' : 'Dark mode';

  const moonIcon =
    theme === 'dark' ? <i className={`fas fa-moon ${styles.icon}`} /> : <i className={`far fa-moon ${styles.icon}`} />;
  return (
    <header className={`${styles.header} ${theme}-secondary`}>
      <h3 className={styles.title}>Where in the world?</h3>
      <Button className={`${theme}-secondary ${theme}-hover-secondary`} onClickCallback={themeToggleCallback}>
        {moonIcon}
        {buttonText}
      </Button>
    </header>
  );
}
