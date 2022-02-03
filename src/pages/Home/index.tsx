import { useState } from 'react';
import useMount from '../../hooks/useMount';
import { Link, RouteComponentProps } from '@reach/router';

import Layout from '../../components/UI/Layout';
import Search from '../../components/Search';
import CountryCard from '../../components/CountryCard';
import Select from '../../components/Select';

import { useCountriesContext } from '../../context';
import { http } from '../../api';

import { CountryInfo } from '../../util/types';

import styles from './style.module.scss';

interface ApiError {
  message: string;
}

export const filterByCountryName = (countries: CountryInfo[], searchValue: string) => {
  return countries.filter((ctr) =>
    ctr.name.common.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
export const filterByRegion = (countries: CountryInfo[], region: string) => {
  return region === 'All' ? countries : countries.filter((ctr) => ctr.region === region);
};

const Home = (_: RouteComponentProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [error, setError] = useState('');

  const { countries, setCountries } = useCountriesContext();
  const displayedCountries = searchValue ? filterByCountryName(countries, searchValue) : countries;
  useMount(() => {
    if (typeof localStorage === undefined || !localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
    const fetchCountries = async () => {
      const isApiError = (error: any): error is ApiError => {
        return typeof error.message === 'string';
      };

      try {
        const data = await http<CountryInfo[]>('https://restcountries.com/v3.1/all');
        setCountries(data);
      } catch (error) {
        if (isApiError(error)) {
          // Thanks to the type guard, TypeScript knows know what "error" is
          setError(error.message);
        }
      }
    };
    fetchCountries();
  });

  const handleInput = (input: string) => {
    setSearchValue(input);
  };

  const setRegion = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <Layout>
      <main className={styles.pageLayout}>
        {!error ? (
          <>
            <div className={styles.actionBar}>
              <Search placeholder="Search for a country..." callback={handleInput} />
              <Select
                defaultText="Filter by region"
                optionsList={['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania']}
                callback={setRegion}
                selected={selectedRegion}
              />
            </div>
            <div className={styles.gridContainer}>
              {displayedCountries.length > 0 &&
                filterByRegion(displayedCountries, selectedRegion)
                  .sort((a: CountryInfo, b: CountryInfo) =>
                    a.name.common.localeCompare(b.name.common),
                  )
                  .map((ctr) => (
                    <Link
                      to={`/${ctr.name.common.toLowerCase().replaceAll(' ', '-')}`}
                      key={ctr.name.common}
                      state={ctr}>
                      <CountryCard
                        flag={ctr.flags.svg}
                        name={ctr.name.common}
                        population={ctr.population}
                        region={ctr.region}
                        capital={ctr.capital && ctr.capital[0]}
                      />
                    </Link>
                  ))}
            </div>
          </>
        ) : (
          <div className={styles.errorContainer}>{error}</div>
        )}
      </main>
    </Layout>
  );
};

export default Home;
