import { ReactElement, use } from 'react';
import { ThemeContext } from '../../context';

import styles from './style.module.css';

interface SearchProps {
  type?: string;
  placeholder: string;
  callback: (value: string) => void;
}

export default function Search({ type = 'text', placeholder, callback }: SearchProps): ReactElement {
  const { theme } = use(ThemeContext);
  return (
    <div className={styles.wrapper}>
      <input
        id="country-search"
        type={type}
        placeholder={placeholder}
        title={placeholder}
        className={`${styles.input} ${theme}-secondary`}
        onChange={(e) => callback(e.target.value)}
      />
      <i className="fas fa-search" />
    </div>
  );
}
