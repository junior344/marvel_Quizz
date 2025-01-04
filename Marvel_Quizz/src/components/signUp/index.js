import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth, user } from '../firebase/firebaseConfig'; // Correction de l'importation
import { setDoc } from 'firebase/firestore';
const SignUp = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value // [e.target.id] permet de cibler l'input qui a été modifié
        });
        console.log(e.target.id, ` loginData `, loginData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        try {
            await createUserWithEmailAndPassword(Auth, email, password)
                .then(authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo: loginData.pseudo,
                    email: loginData.email,
                    createdAt: new Date()
                });
            });
            setError('');
            setLoginData({
                pseudo: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/welcome');
        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
    };
    const { pseudo, email, password, confirmPassword } = loginData; // Destructuring de loginData  pour pouvoir les utiliser directement
    const btn = pseudo === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword ? _jsx("button", { disabled: true, children: "Inscription" }) : _jsx("button", { children: "Inscription" });
    const errorMsg = error !== '' && _jsx("span", { children: error });
    return (_jsx("div", { className: "signUpLoginBox", children: _jsxs("div", { className: "slContainer", children: [_jsx("div", { className: "formBoxLeftSignup" }), _jsx("div", { className: "formBoxRight", children: _jsxs("div", { className: "formContent", children: [errorMsg, _jsx("h2", { children: "Inscription" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: pseudo, type: "text", id: "pseudo", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "pseudo", children: "Pseudo" })] }), _jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: email, type: "email", id: "email", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "email", children: "Email" })] }), _jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: password, type: "password", id: "password", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "password", children: "Mot de passe" })] }), _jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: handleChange, value: confirmPassword, type: "password", id: "confirmPassword", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "confirmPassword", children: "Confirmer le passe" })] }), btn] }), _jsx("div", { className: "linkContainer", children: _jsx(Link, { className: "simpleLink", to: "/login", children: "D\u00E9j\u00E0 inscrit? Connectez-vous." }) })] }) })] }) }));
};
export default SignUp;
