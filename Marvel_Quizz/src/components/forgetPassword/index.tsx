import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Auth } from '../firebase/firebaseConfig'

function ForgetPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(Auth, email)
            setEmail('')
            setSuccess(`Email de récupération envoyé à ${email}`)
            setTimeout(() => navigate('/login'), 5000)
        } catch (error: any) {
            setError(error.message)
            console.error(error)
        }
    }

    const disable = email === '' ? true : false

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {error !== '' && <span>{error}</span>}
                        {success !== '' && <span style={{
                            border: "1px solid green",
                            background: "#a1e9c5",
                            color: "green",
                            padding: "10px",
                            display: "block",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            textAlign: "center",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            letterSpacing: "1px"
                        }}>{success}</span>}
                        <h2>Mot de passe oublié</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disable}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/Login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword