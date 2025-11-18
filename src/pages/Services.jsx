import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import styles from './Services.module.scss';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('/services').then(({ data }) => setServices(data));
  }, []);

  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <h2>Servizi Extra</h2>
        <p>Trasferimenti, esperienze e pulizie aggiuntive prenotabili in autonomia.</p>
      </div>
      <div className={styles.list}>
        {services.map((service) => (
          <article key={service.id} className={styles.card}>
            <div>
              <p className={styles.category}>{service.category}</p>
              <h3>{service.name}</h3>
              <p className={styles.description}>{service.description}</p>
            </div>
            <div className={styles.price}>{service.price}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
