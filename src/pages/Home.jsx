import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import styles from './Home.module.scss';
import DashboardCard from '../components/DashboardCard';

function Home() {
  return (
    <div className={styles.home}>
      <Hero
        title="Hospitality di nuova generazione"
        subtitle="Gestiamo appartamenti, ospiti e servizi extra con processi digitali e un team dedicato. Riduci la complessità e aumenta i ricavi di ogni soggiorno."
        cta={(
          <div className={styles.ctaRow}>
            <Link className="btn" to="/proprietari">
              Area Proprietari
            </Link>
            <Link className="btn ghost" to="/ospiti">
              Area Ospiti
            </Link>
          </div>
        )}
      />

      <section className={styles.grid}>
        <DashboardCard
          meta="Revenue"
          title="Redditività monitorata"
          description="Report dinamici su occupazione, ADR e RevPAR con esport CSV e alert automatici."
          cta={<Link to="/proprietari" className="link">Vedi dashboard</Link>}
        />
        <DashboardCard
          meta="Check-in"
          title="Flussi digitali per ospiti"
          description="Self check-in, document upload e pagamento city tax in un'unica esperienza mobile."
          cta={<Link to="/ospiti" className="link">Apri area ospiti</Link>}
        />
        <DashboardCard
          meta="Extra"
          title="Servizi aggiuntivi"
          description="Trasferimenti, esperienze e pulizie programmabili via API e back-office."
          cta={<Link to="/servizi" className="link">Scopri i servizi</Link>}
        />
      </section>
    </div>
  );
}

export default Home;
