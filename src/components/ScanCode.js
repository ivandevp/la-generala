import React, { useReducer } from 'react';
import QrReader from 'react-qr-scanner'
import logo from '../logo.png';
import styles from './ScanCode.module.css';


const API_ROOT = 'http://localhost:9000/api/v1';

const API_ENDPOINTS = {
    ATTENDANCE: `${API_ROOT}/attendance`
};

const actionTypes = {
    CHECK_ATTENDANCE_IN_PROGRESS: 'organa/attendance/CHECK_ATTENDANCE_IN_PROGRESS',
    CHECK_ATTENDANCE_ERROR: 'organa/attendance/CHECK_ATTENDANCE_ERROR',
    CHECK_ATTENDANCE_SUCCESS: 'organa/attendance/CHECK_ATTENDANCE_SUCCESS',
};

const handleScan = (dispatch, cohort) => (email) => {
    if (email) {
        dispatch({ type: actionTypes.CHECK_ATTENDANCE_IN_PROGRESS });
        fetch(API_ENDPOINTS.ATTENDANCE, {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json',
                'CONTENT-TYPE': 'application/json',
            },
            body: JSON.stringify({
                email,
                cohort,
                attendanceDate: new Date(),
            }),
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }

                throw new Error(resp.body);
            })
            .then(attendance => dispatch({
                type: actionTypes.CHECK_ATTENDANCE_SUCCESS,
                payload: attendance,
            }))
            .catch(err => console.log(err) || dispatch({
                type: actionTypes.CHECK_ATTENDANCE_ERROR,
                payload: err,
            }));

    }
};

const handleError = (err) => {
    console.error('error :( ', err);
};

const ScanCode = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case actionTypes.CHECK_ATTENDANCE_IN_PROGRESS:
                return {
                    ...state,
                    isCheckingAttendance: true,
                };
            case actionTypes.CHECK_ATTENDANCE_ERROR:
                return {
                    ...state,
                    isCheckingAttendance: false,
                    checkAttendanceResult: null,
                    checkAttendanceError: action.payload,
                };
            case actionTypes.CHECK_ATTENDANCE_SUCCESS:
                return {
                    ...state,
                    isCheckingAttendance: false,
                    checkAttendanceError: null,
                    checkAttendanceResult: action.payload,
                };
            default:
                return state;
        }
    }, {
        isCheckingAttendance: false,
        checkAttendanceResult: null,
        checkAttendanceError: null,
    });

    return (
        <div className={styles.container}>
            <figure className={styles.logo}>
                <img src={logo} alt="Laboratoria" />
            </figure>
            <h1>¡Bienvenida! {!state.isCheckingAttendance && (
                <span>{(state.checkAttendanceResult || {}).name}</span>
            )}</h1>
            {state.isCheckingAttendance ? (
                <p>Registrando tu asistencia...</p>
            ) : (
                <>
                    <QrReader
                        delay={100}
                        className={styles.reader}
                        onError={handleError}
                        onScan={handleScan(dispatch, props.cohortid)}
                    />
                    <h3>Acerca tu código QR a la cámara</h3>
                </>
            )}
            <button onClick={() =>
                handleScan(dispatch, props.cohortid)('ivan@laboratoria.la')
            }>Test</button>
        </div>
    );
};

export default ScanCode;