import React from 'react'
import { useParams, Link } from 'react-router-dom';

const ProjectPage = ({ projectList, handleDelete }) => {
    const { id } = useParams();
    const project = projectList.find(project => (project.id).toString() === id);
    return (
        <main className="ProjectPage">
            <article className="project">
                {project &&
                    <>
                        <h2>{project.projectNumber}</h2>
                        <p className="projectCustomer"><b>Customer:</b> {project.customer}</p>
                        <p className="projectDescription"><b>Description:</b> {project.description}</p>
                        <p className="projectInvoice"><b>Invoice #:</b> {project.invoiceNumber}</p>
                        <p className="projectstartDate"><b>Start Date:</b> {project.startDate}</p>
                        <p className="projectendDate"><b>End Date:</b> {project.endDate}</p>
                        <br></br>
                        <Link to={"/sqft/"} state={{ linkedNumber:project.projectNumber }}><ul>Square Foot File</ul></Link>
                        <Link to={"/estimate/"} state={{ linkedNumber:project.projectNumber }}><ul>Estimate File</ul></Link>
                        <Link to={"/invoice/"} state={{ linkedNumber:project.projectNumber }}><ul>Invoice File</ul></Link>

                        <Link to={`/projects/edit/${project.id}`}><button className='editButton'>
                            Edit Project
                        </button></Link>

                        <button className='deleteButton' onClick={() => handleDelete(project.id)}>
                            Delete Project
                        </button>
                    </>
                }
                {!project &&
                    <>
                        <h2>Project Not Found</h2>
                        <p>Oops</p>
                        <p>
                            <Link to='/'>Go Back To The Projects Page</Link>
                        </p>
                    </>
                }
            </article>
        </main>
  )
}

export default ProjectPage