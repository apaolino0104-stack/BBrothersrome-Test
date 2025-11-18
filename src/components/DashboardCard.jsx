import React from 'react';
import styles from './DashboardCard.module.scss';

function DashboardCard({ title, description, meta, cta }) {
  return (
    <article className={styles.card}>
      <div>
        <p className={styles.kicker}>{meta}</p>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      {cta}
    </article>
  );
}

export default DashboardCard;
