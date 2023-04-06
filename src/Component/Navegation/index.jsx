import React, { useEffect } from 'react'
import styles from './style.module.css'
import logo from '../../assets/Logo_Quiz.avif'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../../redux/Action'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { language } = useSelector(state => state.languageReducer)
  const dispatch = useDispatch()
  const location = useLocation()

  const toggleLanguage = () => {
    dispatch(setLanguage(language === 'ar' ? 'en' : 'ar'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt='Logo' width={100} />
      </div>

      <div className={styles.language}>
        {location.pathname === '/' ? null : (
          <Link to='/' className={styles.goBackLink}>
            {language === 'ar' ? 'العودة' : 'Back'}
          </Link>
        )}
        <button onClick={toggleLanguage}>
          {language === 'ar' ? 'العربية' : 'English'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
