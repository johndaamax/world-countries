import React, { ReactElement, use } from 'react';
import { ThemeContext } from '../../context';

import { formatToThousands } from '../../util/helpers';
import styles from './style.module.css';

type CountryCardProps = {
  flag: string;
  name: string;
  capital?: string;
  population: number;
  region: string;
  onClick: () => void;
};

export default function CountryCard({ flag, name, capital = '-', population, region, onClick }: CountryCardProps): ReactElement {
  const { theme } = use(ThemeContext);

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      tabIndex={0}
      role="link"
      className={`${styles.wrapper} ${theme}-secondary ${theme}-hover-secondary`}
      onClick={(): void => onClick()}
      onKeyUp={handleKeyPress}>
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
