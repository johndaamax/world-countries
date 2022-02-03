import { useEffect } from 'react';
import { Link, RouteComponentProps, useNavigate } from '@reach/router';
import Layout from '../../components/UI/Layout';
import Button from '../../components/Button';

import { formatToThousands } from '../../util/helpers';
import { CountryInfo } from '../../util/types';

import styles from './style.module.scss';
import { useCountriesContext, useThemeContext } from '../../context';

const Country = ({ location }: RouteComponentProps) => {
  const countryInfo = location?.state as CountryInfo;
  const { theme } = useThemeContext();
  const { countries } = useCountriesContext();
  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = countryInfo;
  const { common, nativeName } = name;
  const navigate = useNavigate();
  useEffect(() => {
    if (!countryInfo) navigate('/');
  }, []);

  const findCountryNameFromAlpha3Code = (countryList: CountryInfo[], code: string) => {
    return countryList.find((country) => country.cca3 === code);
  };

  return (
    <Layout>
      <div className={styles.PageLayout}>
        {countryInfo && (
          <>
            <div className={styles.ButtonBar}>
              <Button
                className={`${theme}-secondary ${theme}-hover-secondary`}
                onClickCallback={() => navigate('../')}>
                <i className={`fas fa-chevron-left ${styles.icon}`}></i>
                Back
              </Button>
            </div>
            <div className={styles.Content}>
              <div className={styles.FlagContainer}>
                <img src={flags.svg} alt={`${countryInfo.name} Flag`} />
              </div>
              <div className={styles.InformationContainer}>
                <div className={styles.CountryName}>
                  <strong>{common}</strong>
                </div>
                <div className={styles.InfoBox}>
                  <div className={styles.MainInformation}>
                    <div className={styles.PrimaryDetails}>
                      <strong>Native Name: </strong>
                      {Object.values(nativeName)[0].common}
                    </div>
                    <div className={styles.PrimaryDetails}>
                      <strong>Population: </strong>
                      {formatToThousands(population)}
                    </div>
                    <div className={styles.PrimaryDetails}>
                      <strong>Region: </strong>
                      {region}
                    </div>
                    <div className={styles.PrimaryDetails}>
                      <strong>Sub Region: </strong>
                      {subregion}
                    </div>
                    <div className={styles.PrimaryDetails}>
                      <strong>Capital: </strong>
                      {(capital?.length && capital[0]) || '-'}
                    </div>
                  </div>
                  <div className={styles.SecondaryInformation}>
                    <div className={styles.PrimaryDetails}>
                      <strong>Top Level Domain: </strong>
                      {tld[0]}
                    </div>
                    {countryInfo.currencies && (
                      <div className={styles.PrimaryDetails}>
                        <strong>Currencies: </strong>
                        {currencies &&
                          Object.entries(currencies)
                            .reduce((arr: string[], [_, value]) => {
                              arr.push(`${value.name} (${value.symbol})`);
                              return arr;
                            }, [])
                            .join(', ')}
                      </div>
                    )}
                    <div className={styles.PrimaryDetails}>
                      <strong>Languages: </strong>
                      {languages &&
                        Object.entries(languages)
                          .reduce((arr: string[], [_, value]) => {
                            arr.push(value);
                            return arr;
                          }, [])
                          .join(', ')}
                    </div>
                  </div>
                </div>
                {borders && borders.length > 0 && countries.length > 0 && (
                  <div>
                    <strong>Border Countries: </strong>
                    {borders.map((ctrCode) => {
                      const country = findCountryNameFromAlpha3Code(countries, ctrCode);
                      return country ? (
                        <Link to={`/${country.name.common}`} key={ctrCode} state={country}>
                          <div
                            className={`${styles.BorderCountry} ${theme}-secondary ${theme}-hover-secondary`}>
                            {country.name.common}
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Country;
