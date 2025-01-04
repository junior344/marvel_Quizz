import React,{useEffect,useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelName,quizLevel}) => {

  const [quizSteps, setQuizSteps] = useState([])

  useEffect(() => {
    const quizSteps = levelName.map(level => (
      {title: level.toUpperCase()}
    ))
    setQuizSteps(quizSteps)
    console.log(quizSteps)
  }, [quizLevel, levelName])

  return (
    <div className="levelsContainer" style={{background: 'transparent'}}>
        <Stepper 
          steps={
            quizSteps
             }
             activeStep={ quizLevel }
              circleTop={0}
              activeTitleColor={'#d31017'}
              activeColor={'#d31017'}
              completeTitleColor={'#E0E0E0'}
              completeColor={'#E0E0E0'}
              defaultTitleColor={'#E0E0E0'}
              defaultColor={'#E0E0E0'}
              completeBarColor={'#E0E0E0'}
              barStyle={'dashed'}
              size={45}
              circleFontSize={20}
              titleFontSize={20}
         />
    </div>
  )
}

export default React.memo(Levels) 