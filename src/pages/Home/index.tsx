import { useState, useEffect } from 'react';

import Layout from '../../components/UI/Layout'
import Search from '../../components/Search';
import CountryCard from '../../components/CountryCard';

import { CountryCardProps } from '../../components/CountryCard'
import { Link, RouteComponentProps } from '@reach/router'

import '../../styles/test.scss';
import styles from './style.module.scss';

const Home = (props: RouteComponentProps) => {
    // const [themeClass, setThemeClass] = useState(localStorage.getItem('theme') || 'dark');
    const [countries, setCountries] = useState<CountryCardProps[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const displayedCountries = searchValue ? countries.filter(ctr => ctr.name.toLowerCase().includes(searchValue.toLowerCase())) : countries;

    console.log(countries)
    useEffect(() => {
        //initialize theme
        if (localStorage.getItem('theme') === undefined) {
            localStorage.setItem('theme', 'dark');
        }
        fetchCountries();
    }, [])

    const fetchCountries = async () => {
        try {
            const data = await (await fetch('https://restcountries.eu/rest/v2/regionalbloc/eu')).json();
            setCountries(data);
        } catch (err) {
            console.error(err)
        }
    }

    const handleInput = (input: string) => {
        setSearchValue(input)
    }

    return (
        <Layout>
            <main>
                <div className={styles.actionBar}>
                    <Search placeholder='&#xf002; Search for a country...' callback={handleInput} />
                </div>
                <div className={styles.gridContainer}>
                    {displayedCountries.length > 0 && displayedCountries.map(ctr =>
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