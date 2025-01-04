import React from 'react'
import batman from '../../../public/images/batman.png'


const centerH2 = {
  textAlign: 'center' as const,
  marginTop: '50px'
}

const centerImg = {
  display: 'block',
  margin: '40px auto'
}
function ErrorPage() {
  return (
    <div className='quiz-bg'>
        <div className='container'>
          <h2 style={centerH2}>Oups, cette page n'existe pas</h2>
          <img src={batman} alt="logo batman" style={centerImg}/>
        </div>
    </div>
  )
}

export default ErrorPage