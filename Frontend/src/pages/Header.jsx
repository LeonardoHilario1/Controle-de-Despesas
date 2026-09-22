import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
    <ul>
        <li><Link to={"/Home"}>Home</Link></li>
        <li><Link to={"/Dash"}>Dashboard</Link></li>
    </ul>
  )
}

export default Header