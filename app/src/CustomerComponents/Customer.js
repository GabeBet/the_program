import { Link } from 'react-router-dom'

const Customer = ({ customer }) => {
  return (
    <article className="customer">
            <Link to={`/customers/${customer._id}`}>
                <h2>{customer.name}</h2>
                <p className="customerAddress"><b>Address:</b> {customer.address}</p>
                <p className="customerPhone"><b>Phone:</b> {customer.phone}</p>
                <p className="customerEmail"><b>Email:</b> {customer.email}</p>
              </Link>
    </article>
  )
}

export default Customer