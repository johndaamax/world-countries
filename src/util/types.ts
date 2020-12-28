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