import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'

import Navbar from './Component/Navegation'
import { PropagateLoader } from 'react-spinners'

const CardCategory = lazy(() => import('./Component/CardCategory'))
const Quiz = lazy(() => import('./Page/AllQuiz'))
const Notfound = lazy(() => import('./Page/Notfound'))

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Suspense
        fallback={
          <PropagateLoader
            color='#00f9ae'
            size={40}
            className='PropagateLoader'
          />
        }
      >
        <Routes>
          <Route path='/' element={<CardCategory />} />
          <Route path='/quiz/:categoryName' element={<Quiz />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
