import React, { useContext } from 'react'
import { Link } from "react-router"
import { UserContext } from '../context/UserContext'

function Header() {
  const{usuario}=useContext(UserContext)
  return (
    <>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/Dash">Dashboard</Link> 
        {usuario.name}
      </nav>
        

    </>
  )
}

export default Header