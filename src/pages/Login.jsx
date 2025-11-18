import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import styles from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      const redirectTo = location.state?.from?.pathname || '/proprietari';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Credenziali non valide');
    }
  };

  return (
    <section className={styles.auth}>
      <div className={styles.card}>
        <h2>Accedi</h2>
        <p>Gestisci proprietà, ospiti e servizi dal tuo account.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn">
            Entra
          </button>
        </form>
        <p>
          Non hai un account? <Link to="/register">Registrati</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
