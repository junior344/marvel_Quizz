import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Fragment, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth, user } from '../firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logout from '../logout';
import Quizz from '../quizz';
function Welcome() {
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({ pseudo: '' });
    const navigate = useNavigate();
    useEffect(() => {
        const listener = onAuthStateChanged(Auth, user => {
            if (user) {
                setUserSession(user);
            }
            else {
                navigate('/');
            }
        });
        if (userSession) {
            const callRef = user(userSession.uid);
            try {
                getDoc(callRef)
                    .then(doc => {
                    if (doc.exists()) {
                        const docData = doc.data();
                        setUserData(docData);
                    }
                    else {
                        navigate('/signup');
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        return () => listener(); // Nettoyage de l'écouteur
    }, [userSession, navigate]);
    if (userSession === null) {
        return (_jsxs(Fragment, { children: [_jsx("div", { className: "loader" }), _jsx("div", { className: "loaderText", children: "Loading...." })] }));
    }
    return (_jsx("div", { className: 'quiz-bg', children: _jsxs("div", { className: "container", children: [_jsx(Logout, {}), _jsx(Quizz, { userData: userData })] }) }));
}
export default Welcome;
