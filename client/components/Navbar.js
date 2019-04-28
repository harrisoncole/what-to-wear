import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="link" to="/" activeClassName="selected">
        Current
      </NavLink>
      <NavLink to="/hourly" className="link" activeClassName="selected">
        {' '}
        Hourly
      </NavLink>
      <NavLink to="/user" className="link" activeClassName="selected">
        {' '}
        Profile
      </NavLink>
    </nav>
  )
}

export default Navbar
