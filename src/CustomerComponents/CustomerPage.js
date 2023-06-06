import React from 'react'
import { useParams, Link } from 'react-router-dom';

const CustomerPage = ({ customerList, projectList, handleDelete }) => {
    const { id } = useParams();
    const customer = customerList.find(customer => (customer._id) === id);
    return (
        <main className="CustomerPage">
            <article className="customer">
                {customer &&
                    <>
                        <h2>{customer.name}</h2>
                        <b>Address(es):</b>
                            {customer.address.map((add) => {
                                return <p className="customerAddress">&ensp;{add.address}</p>
                            })}
                        <p className="customerPhone"><b>Phone:</b> {customer.phone}</p>
                        <p className="customerEmail"><b>Email:</b> {customer.email}</p>

                        <p className="customerProjects"><b>Projects: </b></p>
                        {projectList.map(project => (
                            <Link key={project._id} to={`/projects/${project._id}`} >{(project.customerName === customer.name ? 
                                <><button className='fileButton'>{project.projectNumber} - {project.description}</button> <br></br></> : "")}</Link>
                        ))}

                        <Link to={`/customers/edit/${customer._id}`}><button className='editButton'>
                            Edit Customer
                        </button></Link>

                        <button className='deleteButton' onClick={() => {
                            if (window.confirm("Want to delete Customer?")) {
                                handleDelete(customer._id)
                            }
                        }}>
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