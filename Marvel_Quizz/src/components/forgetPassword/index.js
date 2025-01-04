import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Auth } from '../firebase/firebaseConfig';
function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(Auth, email);
            setEmail('');
            setSuccess(`Email de récupération envoyé à ${email}`);
            setTimeout(() => navigate('/login'), 5000);
        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
    };
    const disable = email === '' ? true : false;
    return (_jsx("div", { className: 'signUpLoginBox', children: _jsxs("div", { className: 'slContainer', children: [_jsx("div", { className: "formBoxLeftForget" }), _jsx("div", { className: "formBoxRight", children: _jsxs("div", { className: "formContent", children: [error !== '' && _jsx("span", { children: error }), success !== '' && _jsx("span", { style: {
                                    border: "1px solid green",
                                    background: "#a1e9c5",
                                    color: "green",
                                    padding: "10px",
                                    display: "block",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    letterSpacing: "1px"
                                }, children: success }), _jsx("h2", { children: "Mot de passe oubli\u00E9" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "inputBox", children: [_jsx("input", { onChange: e => setEmail(e.target.value), value: email, type: "email", id: "email", autoComplete: "off", required: true }), _jsx("label", { htmlFor: "email", children: "Email" })] }), _jsx("button", { disabled: disable, children: "R\u00E9cup\u00E9rer" })] }), _jsx("div", { className: "linkContainer", children: _jsx(Link, { className: "simpleLink", to: "/Login", children: "D\u00E9ja inscrit? Connect-vous." }) })] }) })] }) }));
}
export default ForgetPassword;
