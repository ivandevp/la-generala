import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import UserCohorts from '../components/UserCohorts';

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
    const { value: user, removeValue: removeUser } = useStorage('user');

    if (typeof user !== 'string' && !user) {
        navigate('login');
        return null;
    }

    return (
        <>
            <h1>Welcome to dashbaord {user.name}</h1>
            <UserCohorts cohorts={user.cohorts} />
            <button onClick={() => removeUser()}>
                Logout
            </button>
        </>
    );
};

export default Dashboard;