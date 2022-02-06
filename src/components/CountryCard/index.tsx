import { ReactElement } from 'react';
import { useThemeContext } from '../../context';

import { formatToThousands } from '../../util/helpers';
import styles from './style.module.scss';

type CountryCardProps = {
  flag: string;
  name: string;
  capital?: string;
  population: number;
  region: string;
};

export default function CountryCard({ flag, name, capital = '-', population, region }: CountryCardProps): ReactElement {
  const { theme } = useThemeContext();

  return (
    <div className={`${styles.wrapper} ${theme}-secondary ${theme}-hover-secondary`}>
      <img title={`National flag of ${name}`} className={styles.countryFlag} src={flag} alt={`country-flag-${name}`} />
      <div className={styles.textDetails}>
        <span className={styles.countryName}>
          <strong>{name}</strong>
        </span>
        <span className={styles.extraDetails}>
          <strong>Population: </strong>
          {formatToThousands(population)}
        </span>
        <span className={styles.extraDetails}>
          <strong>Region: </strong>
          {region}
        </span>
        <span className={styles.extraDetails}>
          <strong>Capital: </strong>
          {capital}
        </span>
      </div>
    </div>
  );
}
