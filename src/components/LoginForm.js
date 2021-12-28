import React, { useReducer } from 'react';
import { navigate } from '@reach/router';

const API_ROOT = 'http://localhost:9000/api/v1';

const API_ENDPOINTS = {
    LOGIN: `${API_ROOT}/login`
};

const actionTypes = {
    LOGIN_IN_PROGRESS: 'organa/login/LOGIN_IN_PROGRESS',
    LOGIN_ERROR: 'organa/login/LOGIN_ERROR',
    LOGIN_SUCCESS: 'organa/login/LOGIN_SUCCESS',
};

const LoginForm = ({ username, password }) => {
    const user = localStorage.getItem('user');
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case actionTypes.LOGIN_IN_PROGRESS:
                return {
                    ...state,
                    isLoginInProgress: true,
                };
            case actionTypes.LOGIN_ERROR:
                return {
                    ...state,
                    isLoginInProgress: false,
                    loginResult: null,
                    loginError: action.payload,
                };
            case actionTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    isLoginInProgress: false,
                    loginError: null,
                    loginResult: action.payload,
                };
            default:
                return state;
        }
    }, {
        isLoginInProgress: false,
        loginResult: user ? JSON.parse(user) : user,
        loginError: null,
    });

    const login = (event) => {
        event.preventDefault();
        dispatch({ type: actionTypes.LOGIN_IN_PROGRESS });
        fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json',
                'CONTENT-TYPE': 'application/json',
            },
            body: JSON.stringify({
                email: username.value,
                password: password.value,
            }),
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }

                throw new Error(resp.body);
            })
            .then(user => dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: user,
            }))
            .catch(err => console.log(err) || dispatch({
                type: actionTypes.LOGIN_ERROR,
                payload: err,
            }));
    };

    if (!state.isLoginInProgress && state.loginResult) {
        localStorage.setItem('user', JSON.stringify(state.loginResult.user));
        navigate('/');
        return null;
    }

    return (
        <>
            {state.loginError && (
                <p>{state.loginError.message}</p>
            )}
            <form onSubmit={login}>
                <input type="text" placeholder="Correo electrónico" {...username} />
                <input type="password" placeholder="Contraseña" {...password} />
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    );
};

export default LoginForm;