import { useThemeContext } from '../../context'
import styles from './style.module.scss'

interface SearchProps {
    type?: string,
    placeholder: string,
    callback: (value: string) => void
}

const Search = ({ type = 'text', placeholder, callback }: SearchProps) => {
    const { theme } = useThemeContext();
    return (
        <div className={styles.wrapper}>
            <input
                type={type}
                placeholder={placeholder}
                title={placeholder}
                className={`${styles.input} ${theme}-secondary`}
                onChange={(e) => callback(e.target.value)} />
            <i className="fas fa-search"></i>
        </div>
    )
}

export default Search
