import React from 'react'
import AppRouter from './routes/AppRouter'
import Home from './pages/Home'
import { Link } from "react-router"
import Header from './components/Header'


function App() {
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App