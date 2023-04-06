import React, { useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import enData from '../../../DB/data.json'
import arData from '../../../DB/dataEnglish.json'
import styles from './style.module.css'
import Option from './Option'
import { incrementScore, RemoveData } from '../../redux/Score/ScoreAction'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'

const Quiz = () => {
  const { language } = useSelector(state => state.languageReducer)
  const { score } = useSelector(state => state.ScoreReducer)
  const { categoryName } = useParams()
  const data = language === 'ar' ? arData : enData
  const dispatch = useDispatch()
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // add useRef to prevent the rerender for the all componant state
  const showHint = useRef(false)

  const [showScoreModal, setShowScoreModal] = useState(false)
  const [timeIsUp, setTimeIsUp] = useState(false)

  const handleTimeUp = useCallback(() => {
    setTimeIsUp(true)
    setShowScoreModal(true)
  }, [])
  const handleHintClick = useCallback(() => {
    showHint.current = !showHint.current
  }, [])

  const handleSelectAnswer = option => {
    setSelectedAnswer(option)
  }

  const handleNextQuestionClick = () => {
    const currentQuestion =
      currentCategory.questions[currentQuestionIndex].answer

    if (selectedAnswer.charAt(0) === currentQuestion) {
      dispatch(incrementScore())
    } else {
    }

    if (currentQuestionIndex === currentCategory.questions.length - 1) {
      setShowScoreModal(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
    }
  }

  const handleStartAgainClick = () => {
    setSelectedAnswer(null)
    setCurrentQuestionIndex(0)
    setShowScoreModal(false)
    dispatch(RemoveData())
    setTimeIsUp(false)
  }

  const currentCategory = data.categories.find(
    category => category.name === categoryName
  )
  const currentQuestion = currentCategory?.questions[currentQuestionIndex]

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.categoryTitle}>{categoryName}</h2>
      <div className={styles.countdownContainer}>
        {timeIsUp ? (
          <p className={styles.timeUpText}>Time's up!</p>
        ) : (
          <Countdown
            date={Date.now() + 5000}
            onComplete={handleTimeUp}
            renderer={({ seconds }) => (
              <span className={styles.countdownText}>{seconds}</span>
            )}
          />
        )}
      </div>
      {showScoreModal ? (
        <div className={styles.scoreContainer}>
          <h3 className={styles.scoreTitle}>Your Score:</h3>
          <p className={styles.scoreText}>{score}</p>
          <button
            onClick={handleStartAgainClick}
            className={styles.restartButton}
          >
            Start Again
          </button>
          <Link to='/' className={styles.gohomeButtonLink}>
            <button className={styles.homeButton}>Go to Home</button>
          </Link>
        </div>
      ) : currentQuestion ? (
        <div key={currentQuestion.id} className={styles.questionContainer}>
          <div className={styles.hintContainer}>
            <button onClick={handleHintClick} className={styles.hintButton}>
              Hint
            </button>
            {showHint && (
              <p className={styles.hintText}>{currentQuestion.hint}</p>
            )}
          </div>
          <h3 className={styles.questionTitle}>{currentQuestion.question}</h3>
          <ul className={styles.optionsList}>
            {currentQuestion.options.map(option => (
              <Option
                key={option}
                option={option}
                selectedAnswer={selectedAnswer}
                answer={currentQuestion.answer}
                handleSelectAnswer={handleSelectAnswer}
              />
            ))}
          </ul>
          <button
            onClick={handleNextQuestionClick}
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      ) : (
        <div className={styles.scoreContainer}></div>
      )}
    </div>
  )
}

export default Quiz
