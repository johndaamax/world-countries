export interface CountryInfo {
  cca3: string;
  name: {
    common: string;
    official?: string;
    nativeName: {
      [key: string]: { common: string; official?: string };
    };
  };
  flags: {
    svg: string;
    png?: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital?: Array<string>;
  tld: Array<string>;
  currencies?: {
    [key: string]: { name: string; symbol: string };
  };
  languages: {
    [key: string]: string;
  };
  borders?: Array<string>;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
