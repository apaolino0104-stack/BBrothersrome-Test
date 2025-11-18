import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../context/useAuth';
import styles from './Navbar.module.scss';
import logo from '../assets/images/logo-bbrothers.png';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <Link to="/">
          <img src={logo} alt="BBrothersrome" />
        </Link>
        <span className={styles.title}>BBrothersrome</span>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/servizi">Servizi</NavLink>
        <NavLink to="/ospiti">Ospiti</NavLink>
        <NavLink to="/proprietari">Proprietari</NavLink>
        {user ? (
          <button type="button" className={styles.logout} onClick={logout}>
            Esci
          </button>
        ) : (
          <NavLink to="/login">Accedi</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
