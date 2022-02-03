import { CountryInfo } from '../util/types';

export const mockCountries: CountryInfo[] = [
  {
    cca3: 'BEL',
    name: {
      common: 'Belgium',
      nativeName: {
        bel: {
          common: 'Belgique',
        },
      },
    },
    flags: {
      svg: 'http://path_to_a_flag.svg',
    },
    population: 11330441,
    region: 'Europe',
    subregion: 'Western Europe',
    capital: ['Brussels'],
    tld: ['.be'],
    currencies: {
      EUR: {
        name: 'Euro',
        symbol: '€',
      },
    },
    languages: { fra: 'French', name: 'Dutch' },
    borders: ['FRA', 'NLD', 'LUX', 'DEU'],
  },
  {
    cca3: 'CAN',
    name: {
      common: 'Canada',
      nativeName: {
        can: {
          common: 'Canada',
        },
      },
    },
    flags: {
      svg: 'http://path_to_a_flag.svg',
    },
    population: 36155000,
    region: 'America',
    subregion: 'North America',
    capital: ['Ottawa'],
    tld: ['.ca'],
    currencies: {
      CAD: {
        name: 'Canadian dollar',
        symbol: '$',
      },
    },
    languages: { fra: 'French', eng: 'English' },
    borders: ['USA'],
  },
  {
    cca3: 'BRA',
    name: {
      common: 'Brazil',
      nativeName: {
        bra: {
          common: 'Brasil',
        },
      },
    },
    flags: {
      svg: 'http://path_to_a_flag.svg',
    },
    population: 206444123,
    region: 'Americas',
    subregion: 'South America',
    capital: ['Brasília'],
    tld: ['.br'],
    currencies: {
      BRL: {
        name: 'Brazilian real',
        symbol: 'R$',
      },
    },
    languages: { por: 'Portuguese' },
    borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
  },
  {
    cca3: 'GRC',
    name: {
      common: 'Greece',
      nativeName: {
        ell: {
          common: 'Ελλάδα',
        },
      },
    },
    flags: {
      svg: 'http://path_to_a_flag.svg',
    },
    population: 10567415,
    region: 'Europe',
    subregion: 'Eastern Europe',
    capital: ['Athens'],
    tld: ['.gr'],
    currencies: {
      EUR: {
        name: 'Euro',
        symbol: '€',
      },
    },
    languages: { ell: 'Greek' },
    borders: ['ALB', 'BGR', 'TUR', 'MKD'],
  },
  {
    cca3: 'SGP',
    name: {
      common: 'Singapore',
      nativeName: {
        sin: {
          common: 'Singapore',
        },
      },
    },
    flags: {
      svg: 'http://path_to_a_flag.svg',
    },
    population: 5535000,
    region: 'Asia',
    subregion: 'Southeast Asia',
    capital: ['Singapore'],
    tld: ['.sg'],
    currencies: {
      BND: {
        name: 'Brunei dollar',
        symbol: '$',
      },
      SGD: {
        name: 'Singapore dollar',
        symbol: '$',
      },
    },
    languages: {
      eng: 'English',
      mal: 'Malay',
      tam: 'Tamil',
      chn: 'Chinese',
    },
    borders: ['FRA', 'NLD', 'LUX', 'GER'],
  },
];
