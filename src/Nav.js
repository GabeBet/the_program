import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='Nav'>
      <ul>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
        <li><NavLink to="/customers" className={({ isActive }) => isActive ? 'active' : ''}>Customers</NavLink></li>
        <li><NavLink to="/sqft" className={({ isActive }) => isActive ? 'active' : ''}>Square Foot Calculator</NavLink></li>
        <li><NavLink to="/work-order" className={({ isActive }) => isActive ? 'active' : ''}>Work Order</NavLink></li>
        <li><NavLink to="/estimate" className={({ isActive }) => isActive ? 'active' : ''}>Estimate Form</NavLink></li>
        <li><NavLink to="/invoice" className={({ isActive }) => isActive ? 'active' : ''}>Invoice Form</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav