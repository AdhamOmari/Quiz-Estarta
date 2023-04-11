import React, { useState, useCallback, useRef } from 'react'
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
  const { questionData } = useSelector(state => state.SubjectReducer)

  const data = language === 'ar' ? arData : enData
  const dispatch = useDispatch()
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [timeIsUp, setTimeIsUp] = useState(false)

  const [hintVisible, setHintVisible] = useState(false)

  const handleHintClick = () => {
    setHintVisible(!hintVisible)
  }

  const handleTimeUp = useCallback(() => {
    setTimeIsUp(true)
  }, [])

  const handleSelectAnswer = option => {
    setSelectedAnswer(option)
  }

  const handleNextQuestionClick = () => {
    const currentQuestion =
      currentCategory.questions[currentQuestionIndex].answer

    if (selectedAnswer && selectedAnswer.charAt(0) === currentQuestion) {
      dispatch(incrementScore())
    }

    if (
      currentQuestionIndex === currentCategory.questions.length - 1 ||
      timeIsUp
    ) {
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

  const currentCategory = questionData?.[0]

  return (
    <div className={styles.quizContainer}>
      {questionData?.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <img
            className={styles.categoryImage}
            src={category.image}
            alt={category.name}
          />

          <div className={styles.cardWrap}>
            {category.questions?.map(
              (question, questionIndex) =>
                questionIndex === currentQuestionIndex && (
                  <div key={questionIndex} className={styles.questionContainer}>
                    <p className={styles.questionText}>{question.question}</p>
                    {question.options.map(option => (
                      <Option
                        key={option}
                        option={option}
                        question={question}
                        selectedAnswer={selectedAnswer}
                        handleSelectAnswer={handleSelectAnswer}
                        className={styles.option}
                      />
                    ))}
                    <button
                      disabled={!selectedAnswer}
                      onClick={handleNextQuestionClick}
                      className={styles.nextButton}
                    >
                      {currentQuestionIndex ===
                      currentCategory.questions.length - 1
                        ? 'Finish'
                        : 'Next'}
                    </button>
                    <div className={styles.button_hint_Wrap}>
                      <button
                        onClick={handleHintClick}
                        className={styles.hintButton}
                      >
                        Hint
                      </button>
                      <p className={styles.hintText}>{question.hint}</p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
      {showScoreModal && (
        <div className={styles.scoreModal}>
          <p className={styles.scoreText}>Your Score: {score}</p>
          <button
            onClick={handleStartAgainClick}
            className={styles.playAgainButton}
          >
            Play Again
          </button>
          <Link
            to={`/category/${questionData.name}`}
            className={styles.backButtonLink}
          ></Link>

          <Link to='/' className={styles.backButton}>
            Back to Category
          </Link>
        </div>
      )}
      {!showScoreModal && (
        <Countdown
          date={Date.now() + 30000}
          onComplete={handleTimeUp}
          renderer={({ seconds }) => (
            <p className={styles.timerText}>{seconds} 's</p>
          )}
        />
      )}
      {timeIsUp && (
        <div className={styles.timeUpModal}>
          <p className={styles.timeUpText}>Time is up!</p>
          <p className={styles.scoreText}>Your Score: {score}</p>
          <button
            onClick={handleStartAgainClick}
            className={styles.playAgainButton}
          >
            Play Again
          </button>
          <Link
            to={`/category/${questionData.name}`}
            className={styles.backButtonLink}
          ></Link>
          <Link to='/' className={styles.backButton}>
            Back to Category
          </Link>
        </div>
      )}
    </div>
  )
}

export default Quiz
