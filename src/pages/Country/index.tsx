import { useEffect } from 'react'
import { Link, RouteComponentProps, useNavigate } from '@reach/router'
import Layout from '../../components/UI/Layout'
import Button from '../../components/Button'

import { formatToThousands } from '../../util/helpers'
import { CountryInfo } from '../../util/types'

import styles from './style.module.scss'
import { useCountriesContext, useThemeContext } from '../../context'

const Country = ({ location }: RouteComponentProps) => {
    const countryInfo = location?.state as CountryInfo;
    const { theme } = useThemeContext();
    const { countries } = useCountriesContext();
    console.log(countryInfo)
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
                    <Button className={`${theme}-secondary ${theme}-hover-secondary`} onClickCallback={() => navigate('../')}>
                        <i className={`fas fa-chevron-left ${styles.icon}`}></i>
                        Back
                    </Button>
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
                                <div className={styles.PrimaryDetails}><strong>Capital: </strong>{countryInfo.capital || '-'}</div>
                            </div>
                            <div className={styles.SecondaryInformation}>
                                <div className={styles.PrimaryDetails}><strong>Top Level Domain: </strong>{countryInfo.topLevelDomain[0]}</div>
                                {countryInfo.currencies &&
                                    <div className={styles.PrimaryDetails}>
                                        <strong>Currencies: </strong>
                                        {countryInfo.currencies.map(curr => `${curr.name} `)}
                                    </div>
                                }
                                <div className={styles.PrimaryDetails}>
                                    <strong>Languages: </strong>
                                    {countryInfo.languages
                                        .reduce((acc: string[], curr) => {
                                            acc.push(curr.name)
                                            return acc
                                        }, [])
                                        .join(', ')}
                                </div>
                            </div>
                        </div>
                        {
                            countryInfo.borders &&
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
