import { useAppContext } from '../../context'
import styles from './style.module.scss'

export type CountryCardProps = {
    flag: string,
    name: string,
    capital: string,
    population: number,
    region: string
}

const CountryCard = ({ flag, name, capital, population, region }: CountryCardProps) => {

    const { theme } = useAppContext()
    const formatToThousands = (number: number, formatterChar: string = '.') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, formatterChar)
    }
    return (
        <div className={`${styles.wrapper} ${theme}-secondary`}>

            <img className={styles.countryFlag} src={flag} alt={`country-flag-${name}`} />
            <div className={styles.textDetails}>
                <span className={styles.countryName}><strong>{name}</strong></span>
                <span className={styles.extraDetails}><strong>Population: </strong>{formatToThousands(population)}</span>
                <span className={styles.extraDetails}><strong>Region: </strong>{region}</span>
                <span className={styles.extraDetails}><strong>Capital: </strong>{capital}</span>
            </div>
        </div>
    )
}

export default CountryCard
