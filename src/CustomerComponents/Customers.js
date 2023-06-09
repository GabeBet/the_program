import React from 'react'
import { Link } from 'react-router-dom';
import CustomerFeed from './CustomerFeed';

const Customers = ( { customerList }) => {

  return (
    <main className='Customers'>
      <h2>Customers</h2> 
      <Link to={'/add-customers'}><button className="addButton">Add Customers</button></Link>

      {customerList.length ? (
        <CustomerFeed customerList={customerList} />
      ) : (
        <p style={{ marginTop: "2rem"}}>
          No Customers Yet
        </p>
      )}
    </main>
  )
}

export default Customers