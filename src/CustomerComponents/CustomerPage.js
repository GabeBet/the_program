import React from 'react'
import { useParams, Link } from 'react-router-dom';

const CustomerPage = ({ customerList, handleDelete }) => {
    const { id } = useParams();
    const customer = customerList.find(customer => (customer.id).toString() === id);
    return (
        <main className="CustomerPage">
            <article className="customer">
                {customer &&
                    <>
                        <h2>{customer.name}</h2>
                        <p className="customerAddress"><b>Address:</b> {customer.address}</p>
                        <p className="customerPhone"><b>Phone:</b> {customer.phone}</p>
                        <p className="customerEmail"><b>Email:</b> {customer.email}</p>
                        
                        {/*Add in all projects belonging to this customer*/}

                        <Link to={`/customers/edit/${customer.id}`}><button className='editButton'>
                            Edit Customer
                        </button></Link>

                        <button className='deleteButton' onClick={() => handleDelete(customer.id)}>
                            Delete Customer
                        </button>
                    </>
                }
                {!customer &&
                    <>
                        <h2>Customer Not Found</h2>
                        <p>Oops</p>
                        <p>
                            <Link to='/customers'>Go Back To The Customer Page</Link>
                        </p>
                    </>
                }
            </article>
        </main>
  )
}

export default CustomerPage