import React, { useState } from 'react';
import { QRCode } from 'react-qr-svg';

const GenerateCode = () => {
    let emailRef = React.createRef();
    const [ qrCodeValues, setQrCodeValues ] = useState([]);

    const createQRCode = event => {
        event.preventDefault();
        setQrCodeValues([
            ...qrCodeValues,
            { email: emailRef.current.value },
        ]);
    };

    return [
        <form onSubmit={createQRCode} key="form">
            <input type="email" ref={emailRef} />
            <button type="submit">Generate</button>
        </form>,
      <div key="codes" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
            <h2>Códigos QR</h2>
            {qrCodeValues.map(value => (
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={JSON.stringify(value)}
                    key={value.email}
                />
            ))}
        </div>
    ];
};

export default GenerateCode;
