import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../firebase/firebaseConfig';
function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        try {
            await signInWithEmailAndPassword(Auth, email, password);
            setError('');
            setLoginData({
                email: '',
                password: ''
            });
            navigate('/welcome', { replace: true });
        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
    };
    const { email, password } = loginData;
    const btn = email === '' || password === '' ? _jsx("button", { disabled: true, children: "Connexion" }) : _jsx("button", { children: "Connexion" });
    return (_jsx("div", { className: 'signUpLoginBox', children: _jsxs("div", { className: 'slContainer', children: [_jsx("div", { className: "formBoxLeftLogin" }), _jsx("div", { className: "formBoxRight", children: _jsxs("div", { className: "formContent", children: [error !== '' && _jsx("span", { children: error }), _jsx("h2", { children: "Connexion" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: email, type: "email", id: "email", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "email", children: "Email" })] }), _jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: password, type: "password", id: "password", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "password", children: "Mot de passe" })] }), btn] }), _jsxs("div", { className: "linkContainer", children: [_jsx(Link, { className: "simpleLink", to: "/signUp", children: "D\u00E9ja inscrit? Connect-vous." }), " ", _jsx("br", {}), _jsx(Link, { className: "simpleLink", to: "/forgetPassword", children: "Mot de passe oubli\u00E9 ? Recuperez le ici." })] })] }) })] }) }));
}
export default Login;
