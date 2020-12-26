import { useThemeContext } from '../../context'
import styles from './style.module.scss'

type SearchProps = {
    type?: string,
    placeholder: string,
    callback: (value: string) => void
}

const Search = ({ type = 'text', placeholder, callback }: SearchProps) => {
    const { theme } = useThemeContext();
    return (
        <div className={styles.wrapper}>
            <input type={type} placeholder={placeholder} className={`${styles.input} ${theme}-secondary`} onChange={(e) => callback(e.target.value)} />
        </div>
    )
}

export default Search
