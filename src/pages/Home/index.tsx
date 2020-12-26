import { useState, useEffect, useCallback } from 'react';
import { Link, RouteComponentProps } from '@reach/router'

import Layout from '../../components/UI/Layout'
import Search from '../../components/Search';
import CountryCard from '../../components/CountryCard';
import Select from '../../components/Select'

import { useCountriesContext } from '../../context'

import '../../styles/test.scss';
import styles from './style.module.scss';

const Home = (props: RouteComponentProps) => {
    // const [countries, setCountries] = useState<CountryInfo[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');

    const { countries, setCountries } = useCountriesContext()
    const displayedCountries = searchValue ? countries.filter(ctr => ctr.name.toLowerCase().includes(searchValue.toLowerCase())) : countries;

    const fetchCountries = useCallback(async () => {
        try {
            const data = await (await fetch('https://restcountries.eu/rest/v2/all')).json();
            setCountries(data);
        } catch (err) {
            console.error(err)
        }
    }, [setCountries])

    useEffect(() => {
        //initialize theme
        if (localStorage.getItem('theme') === undefined) {
            localStorage.setItem('theme', 'dark');
        }
        fetchCountries();
    }, [])

    const handleInput = (input: string) => {
        setSearchValue(input)
    }

    const getRegion = (option: string) => {
        setSelectedRegion(option)
    }

    return (
        <Layout>
            <main>
                <div className={styles.actionBar}>
                    <Search placeholder='Search for a country...' callback={handleInput} />
                    <Select
                        defaultText='Filter by region'
                        optionsList={['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania']}
                        getRegion={getRegion}
                        selected={selectedRegion} />
                </div>
                <div className={styles.gridContainer}>
                    {displayedCountries.length > 0 && displayedCountries
                        .filter(ctr => ctr.region === selectedRegion || selectedRegion === 'All')
                        .map(ctr =>
                            <Link to={`/${ctr.name}`} key={ctr.name} state={ctr}>
                                <CountryCard
                                    flag={ctr.flag}
                                    name={ctr.name}
                                    population={ctr.population}
                                    region={ctr.region}
                                    capital={ctr.capital}
                                />
                            </Link>)}
                </div>
            </main>
        </Layout>
    );
}

export default Home;