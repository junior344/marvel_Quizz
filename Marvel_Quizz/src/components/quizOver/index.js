import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useEffect, useState } from 'react';
import { GiTrophyCup } from "react-icons/gi";
import axios from 'axios';
import Modal from '../modale';
const config = {
    apiKeyPublic: import.meta.env.VITE_REACT_APP_KEY_PUBLIC,
    apiKeyPrivate: import.meta.env.VITE_REACT_APP_KEY_PRIVATE,
    hash: import.meta.env.VITE_REACT_APP_HASH
};
const QuizOver = React.forwardRef(({ storeDataRef, levelName, score, maxQuestions, quizLevel, percent, loadLevelQuestions }, ref) => {
    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterData, setCharacterData] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        setAsked(ref.current);
        if (localStorage.getItem('modalData')) {
            const date = localStorage.getItem('modalData');
            checkData(date);
        }
    }, [ref]);
    const checkData = (date) => {
        const modalTime = Date.now() - parseInt(date);
        const days = modalTime / (1000 * 3600 * 24);
        if (days >= 15) {
            localStorage.clear();
            localStorage.setItem('modalData', Date.now());
        }
    };
    const showModal = (id) => {
        setOpenModal(true);
        if (localStorage.getItem(id)) {
            setCharacterData(JSON.parse(localStorage.getItem(id)));
            console.log('data from local storage', characterData);
            setLoading(false);
        }
        else {
            axios
                .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${config.apiKeyPublic}&hash=${config.hash}`)
                .then(response => {
                setCharacterData(response.data);
                setLoading(false);
                localStorage.setItem(id, JSON.stringify(response.data));
                if (!localStorage.getItem('modalData')) {
                    localStorage.setItem('modalData', Date.now());
                }
            })
                .catch(error => console.error(error));
        }
    };
    const capitalizerFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const closeModal = () => {
        setOpenModal(false);
        setLoading(true);
    };
    const average = maxQuestions / 2;
    const decision = score >= average ? (_jsxs(Fragment, { children: [_jsx("div", { className: "stepsBtnContainer", children: quizLevel < levelName.length - 1 ? (_jsxs(Fragment, { children: [_jsx("p", { className: "successMsg", children: "Bravo, vous avez r\u00E9ussi ! passez au niveau suivant" }), _jsx("button", { onClick: () => loadLevelQuestions(quizLevel + 1), className: "btnResult success", children: "Niveau Suivant" })] })) : (_jsxs(Fragment, { children: [_jsxs("p", { className: "successMsg", children: [_jsx(GiTrophyCup, { size: '50px' }), "Bravo, vous avez r\u00E9ussi ! vous \u00EAtes un expert"] }), _jsx("button", { onClick: () => loadLevelQuestions(0), className: "btnResult gameOver", children: "Accueil" })] })) }), _jsxs("div", { className: "percentage", children: [_jsxs("div", { className: "progressPercent", children: ["R\u00E9ussite: ", percent, "%"] }), _jsxs("div", { className: "progressPercent", children: ["Note: ", score, "/", maxQuestions] })] })] })) : (_jsxs(Fragment, { children: [_jsxs("div", { className: "stepsBtnContainer", children: [_jsx("p", { className: "failureMsg", children: "Vous avez \u00E9chou\u00E9 !" }), _jsx("button", { onClick: () => loadLevelQuestions(quizLevel), className: "btnResult gameOver", children: "Essayez \u00E0 nouveau" })] }), _jsxs("div", { className: "percentage", children: [_jsxs("div", { className: "progressPercent", children: ["R\u00E9ussite: ", percent, "%"] }), _jsxs("div", { className: "progressPercent", children: ["Note: ", score, "/", maxQuestions] })] })] }));
    const questionAnswer = score >= average ? (asked.map(question => (_jsxs("tr", { children: [_jsx("td", { children: question.question }), _jsx("td", { children: question.answer }), _jsx("td", { children: _jsx("button", { onClick: () => showModal(question.heroId), className: "btnInfo", children: "Infos" }) })] }, question.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: "3", children: _jsx("p", { style: { textAlign: "center", color: "red" }, children: "Pas de r\u00E9ponses !!!" }) }) }));
    const resultInModal = !Loading ? (_jsxs(Fragment, { children: [_jsx("div", { className: "modalHeader", children: _jsx("h2", { children: characterData.data.results[0].name }) }), _jsxs("div", { className: "modalBody", children: [_jsxs("div", { className: "comicImage", children: [_jsx("img", { src: characterData.data.results[0].thumbnail.path + '.' + characterData.data.results[0].thumbnail.extension, alt: characterData.name }), _jsx("p", { children: characterData.attributionText })] }), _jsxs("div", { className: "comicDetails", children: [_jsx("h3", { children: "Description" }), characterData.data.results[0].description ?
                                _jsx("p", { children: characterData.data.results[0].description })
                                : _jsx("p", { children: "Description indisponible..." }), _jsx("h3", { children: "Plus d'infos" }), characterData.data.results[0].urls.map((url, index) => (_jsx("a", { href: url.url, target: "_blank", rel: "noreferrer", children: capitalizerFirstLetter(url.type) }, index)))] })] }), _jsx("div", { className: "modalFooter", children: _jsx("button", { className: "modalBtn", onClick: closeModal, children: "Fermer" }) })] })) : (_jsxs(Fragment, { children: [_jsx("div", { className: "modalHeader", children: _jsx("h2", { children: "R\u00E9ponse de Marvel..." }) }), _jsx("div", { className: "modalBody", children: _jsx("div", { className: "comicImage", children: _jsx("img", { src: "/images/loader.gif", alt: "loader" }) }) })] }));
    return (_jsxs(Fragment, { children: [decision, _jsx("hr", {}), _jsx("p", { children: "Les r\u00E9ponses aux questions : " }), _jsx("div", { className: "answerContainer", children: _jsxs("table", { className: "answers", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Questions" }), _jsx("th", { children: "R\u00E9ponses" }), _jsx("th", { children: "info" })] }) }), _jsx("tbody", { children: questionAnswer })] }) }), _jsx(Modal, { showModal: openModal, closeModal: closeModal, children: resultInModal })] }));
});
export default React.memo(QuizOver);
