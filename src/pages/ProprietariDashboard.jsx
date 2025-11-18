import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import styles from './ProprietariDashboard.module.scss';

function ProprietariDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/proprietari/dashboard')
      .then(({ data: response }) => setData(response))
      .catch((err) => setError(err.response?.data?.message || 'Errore nel caricamento'));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Caricamento...</p>;

  return (
    <section className={styles.dashboard}>
      <div className={styles.kpiGrid}>
        <div className={styles.kpi}>
          <p>Occupancy</p>
          <strong>{Math.round(data.kpi.occupancy * 100)}%</strong>
        </div>
        <div className={styles.kpi}>
          <p>ADR</p>
          <strong>€{data.kpi.adr}</strong>
        </div>
        <div className={styles.kpi}>
          <p>RevPAR</p>
          <strong>€{data.kpi.revpar}</strong>
        </div>
        <div className={styles.kpi}>
          <p>Ricavo mensile</p>
          <strong>€{data.kpi.monthlyRevenue}</strong>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div>Codice</div>
          <div>Nome</div>
          <div>Occupancy</div>
          <div>ADR</div>
        </div>
        {data.properties.map((property) => (
          <div key={property.id} className={styles.tableRow}>
            <div>{property.id}</div>
            <div>{property.name}</div>
            <div>{Math.round(property.occupancy * 100)}%</div>
            <div>€{property.adr}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProprietariDashboard;
