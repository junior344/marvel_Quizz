import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Levels from '../levels';
import ProgressBar from '../progessBar';
import { QuizMarvel } from '../quizzMarvel';
import QuizOver from '../quizOver';
import { FaChevronRight } from 'react-icons/fa';
function Quizz(Data) {
    const [state, setState] = useState({
        leveName: ['debutant', 'confirme', 'expert'],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showToast: false,
        quizEnd: false,
        percent: 0
    });
    const storeDataRef = useRef();
    const loadQuestions = (level) => {
        const fetchArray = QuizMarvel[0].quizz[level];
        if (fetchArray.length >= 10) {
            storeDataRef.current = fetchArray;
            const newArray = fetchArray.map(({ answer, ...keepRest }) => keepRest);
            setState(prevState => ({ ...prevState, storedQuestions: newArray }));
        }
        else {
            console.log('Pas assez de questions');
        }
    };
    useEffect(() => {
        loadQuestions(state.leveName[state.quizLevel]);
    }, [state.quizLevel]);
    useEffect(() => {
        if (state.storedQuestions.length > 0) {
            setState(prevState => ({
                ...prevState,
                question: state.storedQuestions[state.idQuestion].question,
                options: state.storedQuestions[state.idQuestion].options
            }));
        }
        if (Data.userData.pseudo) {
            showWelcome(Data.userData.pseudo);
        }
    }, [state.storedQuestions, state.idQuestion, state.maxQuestions, state.score]);
    const showWelcome = (pseudo) => {
        if (!state.showToast) {
            setState(prevState => ({
                ...prevState,
                showToast: true
            }));
            toast.info(`Bienvenue ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const submitAnswer = (optionsSelect) => {
        setState(prevState => ({
            ...prevState,
            userAnswer: optionsSelect,
            btnDisabled: false
        }));
    };
    const nextQuestion = () => {
        const goodAnswer = storeDataRef.current[state.idQuestion].answer;
        let newScore = state.score;
        if (state.userAnswer === goodAnswer) {
            newScore += 1;
            toast.success(`Bravo +1`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toastify-color'
            });
        }
        else {
            toast.error(`Dommage! La bonne réponse était ${goodAnswer}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toastify-color'
            });
        }
        if (state.idQuestion === state.maxQuestions - 1) {
            gameOver(newScore);
        }
        else {
            setState(prevState => ({
                ...prevState,
                idQuestion: state.idQuestion + 1,
                btnDisabled: true,
                userAnswer: null,
                score: newScore
            }));
        }
    };
    const getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
    const gameOver = (newScore) => {
        const gradePercent = getPercentage(state.maxQuestions, newScore);
        setState(prevState => ({
            ...prevState,
            score: newScore,
            percent: gradePercent,
            quizEnd: true
        }));
    };
    const isLastQuestion = state.idQuestion === state.maxQuestions - 1;
    const loadLevelQuestions = (param) => {
        setState(prevState => ({
            ...prevState,
            quizLevel: param,
            idQuestion: 0,
            score: 0,
            userAnswer: null,
            percent: 0,
            quizEnd: false
        }));
    };
    return (state.quizEnd ? (_jsx(QuizOver, { ref: storeDataRef, levelName: state.leveName, score: state.score, maxQuestions: state.maxQuestions, quizLevel: state.quizLevel, percent: state.percent, loadLevelQuestions: loadLevelQuestions })) : (_jsxs("div", { children: [_jsx(Levels, { levelName: state.leveName, quizLevel: state.quizLevel }), _jsx(ProgressBar, { idQuestion: state.idQuestion, maxQuestions: state.maxQuestions }), _jsx("h2", { children: state.question }), state.options.map(option => (_jsxs("p", { className: `answerOptions ${state.userAnswer === option ? "selected" : null}`, onClick: () => submitAnswer(option), children: [_jsx(FaChevronRight, {}), option] }, option))), _jsx("button", { disabled: state.btnDisabled, className: "btnSubmit", onClick: nextQuestion, children: isLastQuestion ? "Terminer" : "Suivant" }), _jsx(ToastContainer, {})] })));
}
export default Quizz;
