import React from 'react';
import styles from './Hero.module.scss';

function Hero({ title, subtitle, cta }) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <p className={styles.kicker}>Hospitality &amp; Property Management</p>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {cta}
      </div>
    </section>
  );
}

export default Hero;
