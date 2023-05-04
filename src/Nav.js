import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='Nav'>
      <ul>
        <li><Link to="/">Projects</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/sqft">Square Foot Calculator</Link></li>
        <li><Link to="/estimate">Estimate Form</Link></li>
        <li><Link to="/invoice">Invoice Form</Link></li>
      </ul>
    </nav>
  )
}

export default Nav