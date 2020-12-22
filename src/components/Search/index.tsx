import { useAppContext } from '../../context'
import styles from './style.module.scss'

import { ReactComponent as SearchIcon } from '../../assets/search-outline.svg';

type SearchProps = {
    type?: string,
    placeholder: string,
    callback: (value: string) => void
}

const Search = ({ type = 'text', placeholder, callback }: SearchProps) => {
    const { theme } = useAppContext()
    return (
        <div className={styles.wrapper}>
            <input type={type} placeholder=' Search for a country...' className={`${styles.input} ${theme}-secondary`} onChange={(e) => callback(e.target.value)} />
        </div>
    )
}

export default Search
