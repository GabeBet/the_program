import { Link } from 'react-router-dom'

const Project = ({ project }) => {
  return (
    <article className="project">
            <Link to={`/projects/${project._id}`}>
                <h2>{project.projectNumber}</h2>
                <p className="projectCustomer"><b>Customer:</b> {project.customerName}</p>
                <p className="projectDescription"><b>Description:</b> {project.description}</p>
                <p className="projectInvoice"><b>Invoice #:</b> {project.invoiceNumber}</p>
                <p className="projectstartDate"><b>Start Date:</b> {project.startDate}</p>
                <p className="projectendDate"><b>End Date:</b> {project.endDate}</p>
              </Link>
    </article>
  )
}

export default Project