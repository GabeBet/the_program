import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className='ErrorPage'>
      <h2>Page not Found</h2>
      <p>
        <Link to="/">Click here to go back to the Projects page</Link>
      </p>
    </main>
  )
}

export default ErrorPage