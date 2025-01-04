import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { Auth } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function Logout() {
    const [checked, setChecked] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        if (checked) {
            try {
                signOut(Auth)
                setTimeout(() => navigate('/'), 1000)
            } catch (error) {
                console.error(error)
            }
        }
        console.log(checked)
    }, [checked, navigate])

    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input type="checkbox" onChange={() => setChecked(!checked)}
                    checked={checked}
                />
                <span className="slider round" data-tooltip-id="logout-tooltip" data-tooltip-content="Déconnexion"></span>
            </label>
            <Tooltip id="logout-tooltip" place="left" type="dark" effect="solid" />
        </div>
    )
}

export default Logout