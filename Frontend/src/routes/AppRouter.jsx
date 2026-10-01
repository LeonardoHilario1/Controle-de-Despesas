import React from 'react'
import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import Dash from '../pages/Dash'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Resume from '../pages/Resume'

function AppRouter() {
  return (
    <>
    <Routes>
        <Route path='/' index element={<SignUp/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Resume' element={<Resume/>}></Route>
        <Route path='/Dash' element={<Dash/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter