import React,{useRef, useEffect, useState, Fragment} from 'react'
import {Link} from 'react-router-dom'

function Landing() {
    const [btn,setBtn] = useState(false)
 const refWolverine =  useRef<HTMLDivElement>(null)
 useEffect(() => {
    if(refWolverine.current !== null) {
        refWolverine.current.classList.add("startingImg")
        setTimeout(() => {
            if (refWolverine.current !== null) {
                refWolverine.current.classList.remove("startingImg");
                setBtn(true)
            }
        }, 1500)
    }
   
 }, [])
    const setleftImage = () => {
        if(refWolverine.current !== null) {
            refWolverine.current.classList.add("leftImg")
        }
    }

    const setrigthImage = () => {
        if(refWolverine.current !== null) {
            refWolverine.current.classList.add("rightImg")
        }
    }

    const clearImg = () => {
        if(refWolverine.current !== null) {
            refWolverine.current.classList.remove("leftImg")
            refWolverine.current.classList.remove("rightImg")
        }
    }
    const displayBtn = btn && (
       <Fragment>
             <div onMouseOver={setleftImage} onMouseOut={clearImg} className="leftBox">
                <Link className="btn-welcome" to="/signUp">Inscription</Link>
             </div>
            <div onMouseOver={setrigthImage} onMouseOut={clearImg} className="rightBox">
                <Link className="btn-welcome" to="/login">Connexion</Link>
             </div>
        </Fragment>
    )
  return (
    
    <main ref={refWolverine} className="welcomePage">
        {displayBtn}
    </main>
  )
}

export default Landing