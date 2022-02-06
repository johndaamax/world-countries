import { ReactElement } from 'react';
import { useThemeContext } from '../../context';
import styles from './style.module.scss';

interface SearchProps {
  type?: string;
  placeholder: string;
  callback: (value: string) => void;
}

export default function Search({ type = 'text', placeholder, callback }: SearchProps): ReactElement {
  const { theme } = useThemeContext();
  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        title={placeholder}
        className={`${styles.input} ${theme}-secondary`}
        onChange={(e): void => callback(e.target.value)}
      />
      <i className="fas fa-search" />
    </div>
  );
}
