import { useEffect } from 'react'
import { Link, RouteComponentProps, useNavigate } from '@reach/router'
import Layout from '../../components/UI/Layout'

import { formatToThousands } from '../../util/helpers'

import styles from './style.module.scss'
import { useCountriesContext, useThemeContext } from '../../context'

export interface CountryInfo {
    alpha3Code: string,
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
    const { theme } = useThemeContext();
    const { countries } = useCountriesContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (countries.length === 0)
            navigate('/');
    })

    const findCountryNameFromAlpha3Code = (countryList: CountryInfo[], code: string) => {
        return countryList.find(country => country.alpha3Code === code)
    }

    return (
        <Layout>
            <div className={styles.PageLayout}>
                <div className={styles.ButtonBar}>
                    <button className={`${theme}-secondary ${theme}-hover-secondary`} title='Go back' onClick={() => navigate('../')}>Back</button>
                </div>
                <div className={styles.Content}>
                    <div className={styles.FlagContainer}>
                        <img src={countryInfo.flag} alt={`${countryInfo.name} Flag`} />
                    </div>
                    <div className={styles.InformationContainer}>
                        <div className={styles.CountryName}><strong>{countryInfo.name}</strong></div>
                        <div className={styles.InfoBox}>
                            <div className={styles.MainInformation}>
                                <div className={styles.PrimaryDetails}><strong>Native Name: </strong>{countryInfo.nativeName}</div>
                                <div className={styles.PrimaryDetails}><strong>Population: </strong>{formatToThousands(countryInfo.population)}</div>
                                <div className={styles.PrimaryDetails}><strong>Region: </strong>{countryInfo.region}</div>
                                <div className={styles.PrimaryDetails}><strong>Sub Region: </strong>{countryInfo.subregion}</div>
                                <div className={styles.PrimaryDetails}><strong>Capital: </strong>{countryInfo.capital}</div>
                            </div>
                            <div className={styles.SecondaryInformation}>
                                <div className={styles.PrimaryDetails}><strong>Top Level Domain: </strong>{countryInfo.topLevelDomain}</div>
                                <div className={styles.PrimaryDetails}><strong>Currencies: </strong>{countryInfo.currencies.map(curr => `${curr.name} `)}</div>
                                <div className={styles.PrimaryDetails}><strong>Languages: </strong>{countryInfo.languages.map(lang => `${lang.name} `)}</div>
                            </div>
                        </div>
                        {countries.length && countryInfo.borders.length > 0 &&
                            <div>
                                <strong>Border Countries: </strong>
                                {countryInfo.borders
                                    .map(ctr => {
                                        const country = findCountryNameFromAlpha3Code(countries, ctr)!
                                        return (
                                            <Link to={`/${country.name}`} key={ctr} state={country}>
                                                <div
                                                    className={`${styles.BorderCountry} ${theme}-secondary ${theme}-hover-secondary`}
                                                >
                                                    {country.name}
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country
