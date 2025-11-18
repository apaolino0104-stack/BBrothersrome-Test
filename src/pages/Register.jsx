import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import styles from './Login.module.scss';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', role: 'proprietario' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/proprietari', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registrazione non riuscita');
    }
  };

  return (
    <section className={styles.auth}>
      <div className={styles.card}>
        <h2>Crea account</h2>
        <p>Seleziona il profilo e accedi alle funzionalità dedicate.</p>
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
          <label>
            Profilo
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="proprietario">Proprietario</option>
              <option value="ospite">Ospite</option>
            </select>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn">
            Registrati
          </button>
        </form>
        <p>
          Hai già un account? <Link to="/login">Accedi</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
