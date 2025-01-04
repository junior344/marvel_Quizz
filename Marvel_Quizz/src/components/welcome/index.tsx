import { useState, Fragment, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Auth, user } from '../firebase/firebaseConfig'
import { getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Logout from '../logout'
import Quizz from '../quizz'

function Welcome() {
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState<object>({})
  const navigate = useNavigate()

  useEffect(() => {
    const listener = onAuthStateChanged(Auth, user => {
      if (user) {
        setUserSession(user)
      } else {
        navigate('/')
      }
    })

    if (userSession) {
      const callRef = user(userSession.uid)
      try {
        getDoc(callRef)
          .then(doc => {
            if (doc.exists()) {
              const docData = doc.data()
              setUserData(docData)
            } else {
              navigate('/signup')
            }
          })
      } catch (error) {
        console.error(error)
      }
    }

    return () => listener() // Nettoyage de l'écouteur
  }, [userSession, navigate])

  if (userSession === null) {
    return (
      <Fragment>
        <div className="loader"></div>
        <div className="loaderText">Loading....</div>
      </Fragment>
    )
  }

  return (
    <div className='quiz-bg'>
      <div className="container">
        <Logout />
        <Quizz userData={userData} />
      </div>
    </div>
  )
}

export default Welcome