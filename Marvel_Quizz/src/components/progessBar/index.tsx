import {React} from 'react'

const ProgressBar = ({idQuestion,maxQuestions}) => {
    
   const getPercent = (maxQuestions, idQuestion) => {
        return (100 / maxQuestions) * idQuestion
    }

    const currentQuestion = idQuestion + 1;

  const progress=   getPercent(maxQuestions, currentQuestion)

    return (
        <>
            <div className='percentage'>
                <div className="progressPercent">
                    {`Question: ${currentQuestion  } / ${maxQuestions}`}
                </div>
                <div className="progressPercent">
                    {`Progression: ${progress}%`}
                </div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${progress}%`}}></div>
            </div>
        </>
    )
}

export default ProgressBar