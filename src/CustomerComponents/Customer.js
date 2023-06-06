import { Link } from 'react-router-dom'

const Customer = ({ customer }) => {
  return (
    <article className="customer">
            <Link to={`/customers/${customer._id}`}>
                <h2>{customer.name}</h2>
                <p><b>Address(es):</b></p>
                {customer.address.map((add) => {
                  return <p className="customerAddress">&ensp;{add.address}</p>
                })}
                <p className="customerPhone"><b>Phone:</b> {customer.phone}</p>
                <p className="customerEmail"><b>Email:</b> {customer.email}</p>
              </Link>
    </article>
  )
}

export default Customer