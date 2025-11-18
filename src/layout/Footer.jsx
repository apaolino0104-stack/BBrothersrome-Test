import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h4>Contatti</h4>
        <p>Email: info@bbrothersrome.com</p>
        <p>Telefono: +39 06 1234567</p>
      </div>
      <div>
        <h4>Indirizzo</h4>
        <p>Via delle Magnolie 21</p>
        <p>00100 Roma (RM)</p>
      </div>
      <div>
        <h4>Community</h4>
        <p>Follow us e resta aggiornato sulle novità.</p>
      </div>
    </footer>
  );
}

export default Footer;
