import React from 'react';
import QrReader from 'react-qr-scanner'

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
    <React.Fragment>
        <QrReader
          delay={100}
          style={{
            height: 240,
            width: 320,
          }}
          onError={handleError}
          onScan={handleScan}
        />
        <p>hola!</p>
    </React.Fragment>
);

export default ScanCode;