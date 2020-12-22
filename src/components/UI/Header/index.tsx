import { useAppContext } from '../../../context';
import styles from './style.module.scss';

type HeaderProps = {
    themeToggleCallback: () => void,
}

const Header = ({ themeToggleCallback }: HeaderProps) => {
    const { theme } = useAppContext();
    const buttonText = theme === 'dark' ? 'Light mode' : 'Dark mode';

    return (
        <header className={`${styles.header} ${theme}-secondary`}>
            <h4>Where in the world?</h4>
            <button className={`${styles.button} ${theme}-secondary`} onClick={themeToggleCallback}>{buttonText}</button>
        </header>
    )
}

export default Header
