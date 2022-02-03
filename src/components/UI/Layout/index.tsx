import { useThemeContext } from '../../../context';

import Header from '../Header';

import styles from './style.module.scss';

const Layout: React.FC = ({ children }) => {
  const { theme, setTheme } = useThemeContext();
  const themeToggleCallback = () => {
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
};

export default Layout;
