import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <main className='Footer'>
      Created 2023
      <Link to={'/descriptionListEditor'}><button>Description List Editor</button></Link>
    </main>
  )
}

export default Footer