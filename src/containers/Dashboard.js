import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

const useStorage = (key = '') => {
    const [value, setValue] = useState('');
    let storedValue = null;

    useEffect(() => {
        try {
            storedValue = localStorage.getItem(key);
            setValue(JSON.parse(storedValue));
        } catch(exception) {
            setValue(storedValue);
        }
    }, [value]);

    const removeValue = () => {
        localStorage.removeItem(key);
        setValue(null);
    };

    return {
        value,
        setValue,
        removeValue,
    };
};

const Dashboard = () => {
    const user = useStorage('user');

    if (typeof user.value !== 'string' && !user.value) {
        navigate('login');
        return null;
    }

    return (
        <>
            <h1>Welcome to dashbaord {user.email}</h1>
            <button onClick={() => user.removeValue()}>
                Logout
            </button>
        </>
    );
};

export default Dashboard;