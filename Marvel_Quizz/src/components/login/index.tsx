import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'  
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Auth } from '../firebase/firebaseConfig'

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = loginData
      try{
         await signInWithEmailAndPassword(Auth, email, password)
          setError('')
          setLoginData({
            email: '',
            password: ''
          })
        navigate('/welcome', { replace: true })
      }catch(error: any){
        setError(error.message)
        console.error(error)
      }
  }
  const { email, password } = loginData
  const btn = email === '' || password === '' ? <button disabled>Connexion</button> : <button>Connexion</button>
  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
          <div className="formBoxLeftLogin">
                    
            </div>
                  <div className="formBoxRight">
                     <div className="formContent">
                            {error !== '' && <span>{error}</span>}
                        <h2>Connexion</h2>
                            <form onSubmit={handleSubmit} >
                                <div className="inputBox">
                                    <input onChange={handleChange} value={email}  type="email" id="email" autoComplete="off" required />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                    <label htmlFor="password">Mot de passe</label>
                                </div>
                                {btn}
                            </form>
                            <div className="linkContainer">
                                <Link className="simpleLink" to="/signUp">Déja inscrit? Connect-vous.</Link> <br />
                                <Link className="simpleLink" to="/forgetPassword">Mot de passe oublié ? Recuperez le ici.</Link>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
  )
}

export default Login