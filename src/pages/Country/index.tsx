import { ReactElement, use, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/UI/Layout';
import Button from '../../components/Button';

import { formatCountryLink, formatToThousands } from '../../util/helpers';
import { CountryInfo } from '../../util/types';

import { useQueryClient } from '@tanstack/react-query';
import { ThemeContext } from '@/context';
import styles from './style.module.css';

function Country(): ReactElement {
  const { theme } = use(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const countryInfo = location.state as CountryInfo;
  const countries = queryClient.getQueryData<CountryInfo[]>(['countries']) || [];

  const { flags, name, population, region, subregion, capital, tld, currencies, languages, borders } = countryInfo;
  const { common, nativeName } = name;

  useEffect(() => {
    if (!countryInfo) navigate('/');
  }, [countryInfo, navigate]);

  const findCountryNameFromAlpha3Code = (countryList: CountryInfo[], code: string): CountryInfo | undefined => {
    return countryList.find((country) => country.cca3 === code);
  };

  return (
    <Layout>
      <div className={styles.PageLayout}>
        <div className={styles.ButtonBar}>
          <Button className={`${theme}-secondary ${theme}-hover-secondary`} onClickCallback={(): void => navigate(-1)}>
            <i className={`fas fa-chevron-left ${styles.icon}`} />
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
                  <strong>Native Name(s): </strong>
                  {Object.entries(nativeName).length > 0
                    ? Object.entries(nativeName).map(([key, value]) => {
                        return <div key={key}>{`${countryInfo.languages[key]}: (${value.common})`}</div>;
                      })
                    : '-'}
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
                    <Link to={`/${formatCountryLink(country.name.common)}`} key={ctrCode} state={country}>
                      <div className={`${styles.BorderCountry} ${theme}-secondary ${theme}-hover-secondary`}>
                        {country.name.common}
                      </div>
                    </Link>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Country;
