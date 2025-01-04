import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
function Landing() {
    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);
    useEffect(() => {
        if (refWolverine.current !== null) {
            refWolverine.current.classList.add("startingImg");
            setTimeout(() => {
                if (refWolverine.current !== null) {
                    refWolverine.current.classList.remove("startingImg");
                    setBtn(true);
                }
            }, 1500);
        }
    }, []);
    const setleftImage = () => {
        if (refWolverine.current !== null) {
            refWolverine.current.classList.add("leftImg");
        }
    };
    const setrigthImage = () => {
        if (refWolverine.current !== null) {
            refWolverine.current.classList.add("rightImg");
        }
    };
    const clearImg = () => {
        if (refWolverine.current !== null) {
            refWolverine.current.classList.remove("leftImg");
            refWolverine.current.classList.remove("rightImg");
        }
    };
    const displayBtn = btn && (_jsxs(Fragment, { children: [_jsx("div", { onMouseOver: setleftImage, onMouseOut: clearImg, className: "leftBox", children: _jsx(Link, { className: "btn-welcome", to: "/signUp", children: "Inscription" }) }), _jsx("div", { onMouseOver: setrigthImage, onMouseOut: clearImg, className: "rightBox", children: _jsx(Link, { className: "btn-welcome", to: "/login", children: "Connexion" }) })] }));
    return (_jsx("main", { ref: refWolverine, className: "welcomePage", children: displayBtn }));
}
export default Landing;
