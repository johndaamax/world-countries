import React, { use } from 'react';
import { ThemeContext } from '../../context';
import styles from './style.module.css';

const SkeletonCard: React.FC = () => {
  const { theme } = use(ThemeContext);

  // Create skeleton placeholders for the card content
  const SkeletonText = ({ width = '100%' }: { width?: string }) => (
    <div className={`${styles.skeletonText} ${theme}-skeleton`} style={{ width }} />
  );

  return (
    <div className={`${styles.wrapper} ${theme}-secondary`}>
      <div className={`${styles.countryFlag} ${styles.skeletonFlag} ${theme}-skeleton`} />

      <div className={styles.textDetails}>
        {/* Country name placeholder */}
        <div className={styles.skeletonTextWrapper}>
          <SkeletonText width="70%" />
        </div>

        {/* Population placeholder */}
        <div className={styles.extraDetails}>
          <SkeletonText width="50%" />
        </div>

        {/* Region placeholder */}
        <div className={styles.extraDetails}>
          <SkeletonText width="50%" />
        </div>

        {/* Capital placeholder */}
        <div className={styles.extraDetails}>
          <SkeletonText width="50%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
