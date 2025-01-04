import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../header/index'
import Landing from '../landing'
import Footer from '../footer'
import Welcome from '../welcome'
import Login from '../login'
import SignUp from '../signUp'
import ErrorPage from '../errorPage'
import ForgetPassword from '../forgetPassword'
import { IconContext } from 'react-icons'

function App() {
    return (
        <Router>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <Header />
            <Routes>
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route exact path='/' element={<Landing />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
            <Footer />
            </IconContext.Provider>
            <ToastContainer />
        </Router>
    )
}

export default App