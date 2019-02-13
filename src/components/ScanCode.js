import React from 'react';
import QrReader from 'react-qr-scanner'
import logo from '../logo.png';
import styles from './ScanCode.module.css';

const handleScan = (data) => {
    if (data) {
        const date = new Date();
        console.log('encontró!', data, date, date.getTime());
    }
};

const handleError = (err) => {
    console.error('error :( ', err);
};

const ScanCode = () => (
    <div className={styles.container}>
        <figure className={styles.logo}>
            <img src={logo} alt="Laboratoria" />
        </figure>
        <h1>¡Bienvenida!</h1>
        <QrReader
          delay={100}
          className={styles.reader}
          onError={handleError}
          onScan={handleScan}
        />
        <h3>Acerca tu código QR a la cámara</h3>
    </div>
);

export default ScanCode;