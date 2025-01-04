import React from 'react'
import { Link } from 'react-router-dom' 

function Footer() {
  return (
    <footer>
        <div className="footer-container">
            <p>© 2024 Marvel Quizz</p>
           <Link to="https://github.com/junior344"><p>projet réalisé par Josias Mbogle</p></Link> 
            <p>Les icones Wolverine, Iron-man, Spider-Man, batman sont prises sur iconFinder.com</p>
        </div>
    </footer>
  )
}

export default Footer