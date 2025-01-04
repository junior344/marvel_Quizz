import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const ProgressBar = ({ idQuestion, maxQuestions }) => {
    const getPercent = (maxQuestions, idQuestion) => {
        return (100 / maxQuestions) * idQuestion;
    };
    const currentQuestion = idQuestion + 1;
    const progress = getPercent(maxQuestions, currentQuestion);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'percentage', children: [_jsx("div", { className: "progressPercent", children: `Question: ${currentQuestion} / ${maxQuestions}` }), _jsx("div", { className: "progressPercent", children: `Progression: ${progress}%` })] }), _jsx("div", { className: "progressBar", children: _jsx("div", { className: "progressBarChange", style: { width: `${progress}%` } }) })] }));
};
export default ProgressBar;
