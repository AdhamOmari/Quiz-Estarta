import React, { useState, useEffect } from 'react'
import styles from './style.module.css'

const Option = ({ option, answer, handleSelectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [rightAnswer, setRightAnswer] = useState(false)

  useEffect(() => {
    setRightAnswer(selectedAnswer === answer)
  }, [selectedAnswer, answer])

  const handleOptionSelect = option => {
    setSelectedAnswer(option)
    handleSelectAnswer(option)
  }

  return (
    <li className={styles.optionItem}>
      <label className={styles.optionLabel}>
        <input
          type='radio'
          name='option'
          required
          value={option}
          checked={selectedAnswer === option}
          onChange={() => handleOptionSelect(option)}
          className={styles.optionInput}
        />
        <span className={styles.optionText}>{option}</span>
      </label>
    </li>
  )
}

export default Option
