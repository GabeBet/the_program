import { Link } from 'react-router-dom'

const Project = ({ project }) => {

  const projStartDate = new Date(project.startDate);
  const projEndDate = new Date(project.endDate);
  return (
    <article className="project">
            <Link to={`/projects/${project._id}`}>
                <h2>{project.projectNumber}</h2>
                <p className="projectCustomer"><b>Customer:</b> {project.customerName}</p>
                <p className="projectDescription"><b>Description:</b> {project.description}</p>
                <p className="projectInvoice"><b>Invoice #:</b> {project.invoiceNumber}</p>
                <p className="projectstartDate"><b>Start Date:</b> {projStartDate.getMonth()}-{projStartDate.getDate()}-{projStartDate.getFullYear()}</p>
                <p className="projectendDate"><b>End Date:</b> {projEndDate.getMonth()}-{projEndDate.getDate()}-{projEndDate.getFullYear()}</p>
              </Link>
    </article>
  )
}

export default Project