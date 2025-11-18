import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import styles from './OspitiDashboard.module.scss';

function OspitiDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/ospiti/dashboard')
      .then(({ data: response }) => setData(response))
      .catch((err) => setError(err.response?.data?.message || 'Errore nel caricamento'));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Caricamento...</p>;

  return (
    <section className={styles.dashboard}>
      <h2>Le tue prenotazioni</h2>
      <div className={styles.stays}>
        {data.stays.map((stay) => (
          <article key={stay.id} className={styles.stayCard}>
            <div>
              <p className={styles.kicker}>{stay.id}</p>
              <h3>{stay.property}</h3>
              <p className={styles.description}>Check-in {stay.checkIn} · {stay.nights} notti</p>
            </div>
            <span className={styles.badge}>Ospite: {stay.guest}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OspitiDashboard;
