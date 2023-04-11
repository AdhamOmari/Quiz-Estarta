import React from 'react'
import enData from '../../../DB/data.json'
import arData from '../../../DB/dataEnglish.json'
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SaveData } from '../../redux/Subject/subjectAction'

const CardCategory = () => {
  const { language } = useSelector(state => state.languageReducer)
  console.log(language, 'CardCategory')
  const data = language === 'ar' ? arData : enData
  console.log(data)
  const dispatch = useDispatch()

  const handelClickSubject = data => {
    dispatch(SaveData(data))

    console.log(data, 'handelClickSubject')
  }

  return (
    <div className={style.container}>
      {data.categories.map(category => (
        <div key={category.name} className={style.card}>
          <img
            className={style.image}
            src={category.image}
            alt={category.name}
          />

          <p className={style.categoryName}>{category.name}</p>
          <Link to={`/quiz/${category.name}`} className={style.link}>
            <button
              className={style.button}
              onClick={() => handelClickSubject(category)}
            >
              {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CardCategory
