import React from 'react'
import { Link } from 'react-router-dom'

const Customer = ( { customer }) => {
  return (
    <div className="customer">
            <Link to={`/customers/${customer.id}`}>
                <h2>{customer.name}</h2>
                <p className="customerAddress">{customer.address}</p>
                <p className="customerPhone">{customer.phone}</p>
                <p className="customerEmail">{customer.email}</p>
            </Link>
    </div>
  )
}

export default Customer