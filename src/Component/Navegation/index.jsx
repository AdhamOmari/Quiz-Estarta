import React, { useEffect } from 'react'
import styles from './style.module.css'
import logo from '../../assets/Logo_Quiz.avif'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../../redux/Action'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClearData } from '../../redux/Subject/subjectAction'
import { RemoveData } from '../../redux/Score/ScoreAction'

const Navbar = () => {
  const { language } = useSelector(state => state.languageReducer)
  const dispatch = useDispatch()
  const location = useLocation()
  const nav = useNavigate()

  const toggleLanguage = () => {
    dispatch(setLanguage(language === 'ar' ? 'en' : 'ar'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  const handelBack = () => {
    console.log('datano')
    nav('/')
    dispatch(ClearData())
    dispatch(RemoveData())
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt='Logo' width={100} />
      </div>

      <div className={styles.language}>
        {location.pathname === '/' ? null : (
          <button onClick={() => handelBack()} className={styles.goBackLink}>
            {language === 'ar' ? 'العودة' : 'Back'}
          </button>
        )}
        <button onClick={toggleLanguage}>
          {language === 'ar' ? 'العربية' : 'English'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
