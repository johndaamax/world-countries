import { RouteComponentProps } from '@reach/router'
import Layout from '../../components/UI/Layout'

import { useNavigate } from "@reach/router"

import styles from './style.module.scss'
import { useAppContext } from '../../context'

interface CountryInfo {
    name: string,
    flag: string,
    nativeName: string,
    population: number,
    region: string,
    subregion: string,
    capital: string,
    topLevelDomain: string,
    currencies: Array<{
        code: string,
        name: string,
        symbol: string
    }>
    languages: Array<{ name: string }>
    borders: Array<string>
}

const Country = ({ location }: RouteComponentProps) => {
    const countryInfo = location?.state as CountryInfo;

    const { theme } = useAppContext()
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.PageLayout}>
                <div className={styles.ButtonBar}>
                    <button className={`${theme}-secondary`} title='Go back' onClick={() => navigate('../')}>Back</button>
                </div>
                <div className={styles.Content}>
                    <div className={styles.FlagContainer}>
                        <img src={countryInfo.flag} alt={`${countryInfo.name} Flag`} />
                    </div>
                    <div className={styles.InformationContainer}>
                        <div className={styles.CountryName}><strong>{countryInfo.name}</strong></div>
                        <div className={styles.InfoBox}>
                            <div className={styles.MainInformation}>
                                <div><strong>Native Name: </strong>{countryInfo.nativeName}</div>
                                <div><strong>Population: </strong>{countryInfo.population}</div>
                                <div><strong>Region: </strong>{countryInfo.region}</div>
                                <div><strong>Sub Region: </strong>{countryInfo.subregion}</div>
                                <div><strong>Capital: </strong>{countryInfo.capital}</div>
                            </div>
                            <div className={styles.SecondaryInformation}>
                                <div><strong>Top Level Domain: </strong>{countryInfo.topLevelDomain}</div>
                                <div><strong>Currencies: </strong>{countryInfo.currencies.map(curr => `${curr.name} `)}</div>
                                <div><strong>Languages: </strong>{countryInfo.languages.map(lang => `${lang.name} `)}</div>
                            </div>
                        </div>


                        <div><strong>Border Countries: </strong>{countryInfo.borders.map(ctr => <div className={`${styles.BorderCountry} ${theme}-secondary`}>{ctr}</div>)}</div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Country
