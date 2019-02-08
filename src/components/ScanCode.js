import React from 'react';
import QrReader from 'react-qr-scanner'
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
        <QrReader
          delay={100}
          className={styles.reader}
          onError={handleError}
          onScan={handleScan}
        />
        <p>hola!</p>
    </div>
);

export default ScanCode;