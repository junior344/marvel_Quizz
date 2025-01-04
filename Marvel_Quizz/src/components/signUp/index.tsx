import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Auth, user } from '../firebase/firebaseConfig' // Correction de l'importation
import { setDoc } from 'firebase/firestore'

const SignUp = () => {

    const navigate = useNavigate()
    
   const [loginData, setLoginData] = useState({
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value // [e.target.id] permet de cibler l'input qui a été modifié
        })
        console.log(e.target.id,` loginData `, loginData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = loginData
        try {
            await createUserWithEmailAndPassword(Auth, email, password)
            .then(authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo: loginData.pseudo,
                    email: loginData.email,
                    createdAt: new Date()
                })
            })
            setError('')
            setLoginData({
                pseudo: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            navigate('/welcome')
        } catch (error: any) {
            setError(error.message)
            console.error(error)
        }
    }

    const { pseudo, email, password, confirmPassword } = loginData; // Destructuring de loginData  pour pouvoir les utiliser directement

   const btn =  pseudo ==='' || email ==='' || password ==='' || confirmPassword ==='' || password !== confirmPassword ? <button  disabled>Inscription</button> : <button >Inscription</button>
   const errorMsg = error !== '' && <span>{error}</span>
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                    <h2>Inscription</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={email}  type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp