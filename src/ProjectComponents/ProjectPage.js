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
                        <Link to={"/sqft/"} state={{ linkedNumber:project.projectNumber }}><button className='fileButton'>Square Foot File</button></Link> <br></br>
                        <Link to={"/estimate/"} state={{ linkedNumber:project.projectNumber }}><button className='fileButton'>Estimate File</button></Link> <br></br>
                        <Link to={"/invoice/"} state={{ linkedNumber:project.projectNumber }}><button className='fileButton'>Invoice File</button></Link> <br></br>

                        <Link to={`/projects/edit/${project.id}`}><button className='editButton'>
                            Edit Project
                        </button></Link>

                        <button className='deleteButton' onClick={() => {
                            if (window.confirm("Want to delete Project?")) {
                                handleDelete(project.id)
                            } 
                        }}>
                            Delete Project
                        </button>

                        <br></br>

                        <Link to={`/projects/${project.id}/bank`}><button className='goToButton'>
                            Go to Bank Statements
                        </button></Link>
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