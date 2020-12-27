import { ReactNode } from "react"

import styles from './style.module.scss'

interface ButtonProps {
    className?: string
    onClickCallback: () => void
    children?: ReactNode
}

const Button = ({ className, onClickCallback, children, ...rest }: ButtonProps) => {
    const classes = className ? `${styles.button} ${className}` : `${styles.button}`;

    return (
        <button className={classes} onClick={onClickCallback} {...rest}>
            {children}
        </button>
    )
}

export default Button
