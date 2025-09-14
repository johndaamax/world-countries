import { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/UI/Layout';
import Search from '@/components/Search';
import CountryCard from '@/components/CountryCard';
import SkeletonCard from '@/components/CountryCard/SkeletonCard';
import Select from '@/components/Select';

import { http } from '../../api';

import { CountryInfo } from '@/util/types';
import { formatCountryLink } from '@/util/helpers';

import styles from './style.module.css';

export const filterByCountryName = (countries: CountryInfo[], searchValue: string): CountryInfo[] => {
  return countries.filter((ctr) => ctr.name.common.toLowerCase().includes(searchValue.toLowerCase()));
};

export const filterByRegion = (countries: CountryInfo[], region: string): CountryInfo[] => {
  return region === 'All' ? countries : countries.filter((ctr) => ctr.region === region);
};

function Home(): ReactElement {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [errors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof localStorage === undefined || !localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const { data: countries, isLoading } = useQuery<CountryInfo[]>({
    queryKey: ['countries'],
    queryFn: () =>
      http<CountryInfo[]>(
        'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,currencies,languages,borders,cca3,tld',
      ),
    staleTime: 60 * 60 * 24 * 1000,
    retry: 2,
  });

  const displayedCountries = searchValue ? filterByCountryName(countries || [], searchValue) : countries || [];

  const handleInput = (input: string): void => {
    setSearchValue(input);
  };

  const setRegion = (region: string): void => {
    setSelectedRegion(region);
  };

  return (
    <Layout>
      <main className={styles.pageLayout}>
        {!errors ? (
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
              {isLoading
                ? Array(16)
                    .fill(0)
                    .map((_, index) => <SkeletonCard key={index} />)
                : displayedCountries?.length > 0 &&
                  filterByRegion(displayedCountries, selectedRegion)
                    .sort((a: CountryInfo, b: CountryInfo) => a.name.common.localeCompare(b.name.common))
                    .map((ctr) => (
                      <CountryCard
                        key={ctr.name.common}
                        onClick={() => navigate(`/${formatCountryLink(ctr.name.common)}`, { state: ctr })}
                        flag={ctr.flags.svg}
                        name={ctr.name.common}
                        population={ctr.population}
                        region={ctr.region}
                        capital={ctr.capital && ctr.capital[0]}
                      />
                    ))}
            </div>
          </>
        ) : (
          <div className={styles.errorContainer}>{errors}</div>
        )}
      </main>
    </Layout>
  );
}

export default Home;
