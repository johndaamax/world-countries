import { ReactElement, ReactNode } from 'react';

import styles from './style.module.scss';

interface ButtonProps {
  className?: string;
  onClickCallback: () => void;
  children?: ReactNode;
}

export default function Button({ className, onClickCallback, children, ...rest }: ButtonProps): ReactElement {
  const classes = className ? `${styles.button} ${className}` : `${styles.button}`;

  return (
    <button type="button" className={classes} onClick={onClickCallback} {...rest}>
      {children}
    </button>
  );
}
