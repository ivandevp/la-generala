import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';


const useFormInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};

const Login = () => {
    const username = useFormInput('');
    const password = useFormInput('');

    return (
        <>
            <h1>Login</h1>
            <LoginForm
                username={username}
                password={password}
            />
        </>
    )
};

export default Login;