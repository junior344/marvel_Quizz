import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import batman from '../../../public/images/batman.png';
const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
};
const centerImg = {
    display: 'block',
    margin: '40px auto'
};
function ErrorPage() {
    return (_jsx("div", { className: 'quiz-bg', children: _jsxs("div", { className: 'container', children: [_jsx("h2", { style: centerH2, children: "Oups, cette page n'existe pas" }), _jsx("img", { src: batman, alt: "logo batman", style: centerImg })] }) }));
}
export default ErrorPage;
