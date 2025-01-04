import { jsx as _jsx } from "react/jsx-runtime";
const Modal = ({ showModal, children }) => {
    return (showModal && (_jsx("div", { className: "modalBackground", children: _jsx("div", { className: "modalContainer", children: children }) })));
};
export default Modal;
