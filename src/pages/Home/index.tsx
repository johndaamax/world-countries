import { useState } from 'react';
import useMount from '../../hooks/useMount';
import { Link, RouteComponentProps } from '@reach/router';
import { CountryInfo } from '../Country';

import Layout from '../../components/UI/Layout';
import Search from '../../components/Search';
import CountryCard from '../../components/CountryCard';
import Select from '../../components/Select';

import { useCountriesContext } from '../../context';
import { http, HttpResponse } from '../../api';

import styles from './style.module.scss';

export const filterByCountryName = (countries: CountryInfo[], searchValue: string) => {
    return countries.filter(ctr => ctr.name.toLowerCase().includes(searchValue.toLowerCase()))
}
export const filterByRegion = (countries: CountryInfo[], region: string) => {
    return countries.filter(ctr => ctr.region === region || region === 'All')
}

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
            let response: HttpResponse<CountryInfo[]>;
            try {
                response = await http<CountryInfo[]>('https://restcountries.eu/rest/v2/all');
                setCountries(response.parsedBody!);
                if (error)
                    setError('');
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCountries();
    })

    const handleInput = (input: string) => {
        setSearchValue(input)
    }

    const setRegion = (region: string) => {
        setSelectedRegion(region)
    }

    return (
        <Layout>
            <main className={styles.pageLayout}>
                {!error ?
                    <>
                        <div className={styles.actionBar}>
                            <Search placeholder='Search for a country...' callback={handleInput} />
                            <Select
                                defaultText='Filter by region'
                                optionsList={['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania']}
                                callback={setRegion}
                                selected={selectedRegion} />
                        </div>
                        <div className={styles.gridContainer}>
                            {displayedCountries.length > 0 && filterByRegion(displayedCountries, selectedRegion)
                                .map(ctr =>
                                    <Link to={`/${ctr.name}`} key={ctr.name} state={ctr}>
                                        <CountryCard
                                            flag={ctr.flag}
                                            name={ctr.name}
                                            population={ctr.population}
                                            region={ctr.region}
                                            capital={ctr.capital}
                                        />
                                    </Link>
                                )
                            }
                        </div>
                    </> :
                    <div className={styles.errorContainer}>
                        {error}
                    </div>}
            </main>
        </Layout>
    );
}

export default Home;