import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
