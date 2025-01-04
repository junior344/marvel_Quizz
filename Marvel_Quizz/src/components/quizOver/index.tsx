import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from "react-icons/gi"
import axios from 'axios'
import Modal from '../modale'

const config = {
    apiKeyPublic: import.meta.env.VITE_REACT_APP_KEY_PUBLIC,
    apiKeyPrivate: import.meta.env.VITE_REACT_APP_KEY_PRIVATE,
    hash: import.meta.env.VITE_REACT_APP_HASH
}
interface QuizOverProps {
    storeDataRef: React.RefObject<any>;
    levelName: string[];
    score: number;
    maxQuestions: number;
    quizLevel: number;
    percent: number;
    loadLevelQuestions: (param: number) => void;
}
const QuizOver = React.forwardRef<unknown, QuizOverProps>((props, ref)=> {
    const { storeDataRef, levelName, score, maxQuestions, quizLevel, percent, loadLevelQuestions } = props;
    const [asked, setAsked] = useState<any[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [characterData, setCharacterData] = useState<any[]>([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        if (ref && 'current' in ref && ref.current) {
            setAsked(ref.current)
        }
        if (localStorage.getItem('modalData')) {
            const date = localStorage.getItem('modalData')
            checkData(date)
        }
    }, [ref])

    const checkData = (date: string | null) => {
        if (date) {
            const modalTime = Date.now() - parseInt(date)
            const days = modalTime / (1000 * 3600 * 24)
            if (days >= 15) {
                localStorage.clear()
                localStorage.setItem('modalData', Date.now().toString())
            }
        }
    }

    const showModal = (id: number) => {
        setOpenModal(true)

        if (localStorage.getItem(id.toString())) {
            setCharacterData(JSON.parse(localStorage.getItem(id.toString())!))
            console.log('data from local storage', characterData)
            setLoading(false)
        } else {
            axios
                .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${config.apiKeyPublic}&hash=${config.hash}`)
                .then(response => {
                    setCharacterData(response.data)
                    setLoading(false)
                    localStorage.setItem(id.toString(), JSON.stringify(response.data))
                    if (!localStorage.getItem('modalData')) {
                        localStorage.setItem('modalData', Date.now().toString())
                    }
                })
                .catch(error => console.error(error))
        }
    }

    const capitalizerFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const closeModal = () => {
        setOpenModal(false)
        setLoading(true)
    }

    const average = maxQuestions / 2

    const decision = score >= average ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelName.length - 1 ? (
                        <Fragment>
                            <p className="successMsg">Bravo, vous avez réussi ! passez au niveau suivant</p>
                            <button
                                onClick={() => loadLevelQuestions(quizLevel + 1)}
                                className="btnResult success">Niveau Suivant</button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg">
                                <GiTrophyCup size='50px' />
                                Bravo, vous avez réussi ! vous êtes un expert</p>
                            <button
                                onClick={() => loadLevelQuestions(0)}
                                className="btnResult gameOver">Accueil</button>
                        </Fragment>
                    )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Vous avez échoué !</p>
                <button
                    onClick={() => loadLevelQuestions(quizLevel)}
                    className="btnResult gameOver">
                    Essayez à nouveau
                </button>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

    const questionAnswer = score >= average ? (
        asked.map(question => (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                    <button
                        onClick={() => showModal(question.heroId)}
                        className="btnInfo">Infos
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={3}>
                <p style={{ textAlign: "center", color: "red" }}>
                    Pas de réponses !!!
                </p>
            </td>
        </tr>
    )

    const resultInModal = !Loading ? (
        <Fragment>
            <div className="modalHeader">
                <h2>{characterData.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img src={characterData.data.results[0].thumbnail.path + '.' + characterData.data.results[0].thumbnail.extension} alt={characterData.name}
                    />
                    <p>{characterData.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {characterData.data.results[0].description ?
                        <p>{characterData.data.results[0].description}</p>
                        : <p>Description indisponible...</p>
                    }
                    <h3>Plus d'infos</h3>
                    {characterData.data.results[0].urls.map((url: any, index: number) => (
                        <a
                            key={index}
                            href={url.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {capitalizerFirstLetter(url.type)}
                        </a>
                    ))}
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={closeModal}>Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="modalHeader">
                <h2>Réponse de Marvel...</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img src="/images/loader.gif" alt="loader" />
                </div>
            </div>
        </Fragment>
    )

    return (
        <Fragment>
            {decision}

            <hr />

            <p>Les réponses aux questions : </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal} closeModal={closeModal}>
                {resultInModal}
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver)