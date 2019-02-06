import React, { useState } from 'react';
import { QRCode } from 'react-qr-svg';
import styles from './GenerateCode.module.css';

const processData = (csv) => csv.split('\n').map(line => line.split(','));

const exportQRs = (qrs) => {
    const qrsSvg = document.querySelectorAll('.qrs svg');
    console.log(qrsSvg, qrs);
    qrsSvg.forEach(async (svg, idx) => {
        const svgXml = (new XMLSerializer()).serializeToString(svg);

        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(svgXml);
        await img.onload;

        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 300;
        const context  = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob);
        
            const request = new Request(`http://localhost:9000/api/qrcodes?name=${qrs[idx].name}`, {
                method: 'POST',
                mode: 'cors',
                body: formData,
            });
        
            fetch(request)
            .then((res) => console.log(res, res.json()))
            .catch(err => console.warn(err));
        }, 'image/png');
    });
};


const GenerateCode = () => {
    let emailRef = React.createRef();
    const [ qrCodeValues, setQrCodeValues ] = useState([]);
    const [ csvData, setCSVData ] = useState(null);

    const createQRCode = event => {
        event.preventDefault();
        setQrCodeValues([
            ...qrCodeValues,
            { email: emailRef.current.value },
        ]);
    };

    const loadFile = event => {
        const { files } = event.target;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setCSVData(processData(reader.result));
            };
            reader.readAsBinaryString(files[0]);
        }
    };

    const createMassiveQRCodes = () => {
        const data = csvData.slice(1).map(line => ({ email: line[0], name: line[1] }));
        setQrCodeValues([
            ...qrCodeValues,
            ...data,
        ]);
    };

    return [
        <form onSubmit={createQRCode} key="form" className={styles.noPrintable}>
            <input type="email" ref={emailRef} />
            <button type="submit">Generar</button>
            <div>
                Importar CSV
                <input type="file" accept=".csv" onChange={loadFile} />
                {csvData && (
                    <button type="button" onClick={createMassiveQRCodes}>
                        Generar QRs
                    </button>
                )}
                {csvData && qrCodeValues.length && (
                    <button type="button" onClick={() => exportQRs(qrCodeValues)}>
                        Export QRs
                    </button>
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        {csvData && csvData[0].map(header => (
                            <th key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {csvData && csvData.length && csvData.slice(1).map((line, idx) => (
                            <tr key={`line-${idx}`}>
                                {line.map((cell, index) => (
                                    <td key={`cell-${cell}-${index}`}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </form>,
      <div key="codes" className={styles.printable}>
            <h2>Códigos QR</h2>
            {qrCodeValues.map(value => (
                <div key={value.email} className="qrs">
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{ width: 256 }}
                        value={value.email}
                    />
                    <p>{value.email}</p>
                </div>
            ))}
        </div>
    ];
};

export default GenerateCode;
