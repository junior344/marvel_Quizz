import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header';
import Landing from '../landing';
import Footer from '../footer';
import Welcome from '../welcome';
import Login from '../login';
import SignUp from '../signUp';
import ErrorPage from '../errorPage';
import ForgetPassword from '../forgetPassword';
import { IconContext } from 'react-icons';
function App() {
    return (_jsxs(Router, { children: [_jsxs(IconContext.Provider, { value: { style: { verticalAlign: 'middle' } }, children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/welcome', element: _jsx(Welcome, {}) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: '/signup', element: _jsx(SignUp, {}) }), _jsx(Route, { exact: true, path: '/', element: _jsx(Landing, {}) }), _jsx(Route, { path: '/forgetpassword', element: _jsx(ForgetPassword, {}) }), _jsx(Route, { path: '*', element: _jsx(ErrorPage, {}) })] }), _jsx(Footer, {})] }), _jsx(ToastContainer, {})] }));
}
export default App;
