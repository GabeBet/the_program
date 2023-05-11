import { useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const EditProject = ({ projectList, customerList, descriptionList, handleEdit, editDescription, setEditDescription, 
    editProjCustomer, setEditProjCustomer, editProjectNumber, setEditProjectNumber, 
    editInvoiceNumber, setEditInvoiceNumber, editStartDate, setEditStartDate, editEndDate, setEditEndDate }) => {

  const { id } = useParams();
  const project = projectList.find(project => (project.id).toString() === id);

  useEffect(() => {
      if (project) {
        setEditDescription(project.description);
        setEditProjectNumber(project.projectNumber);
        setEditInvoiceNumber(project.invoiceNumber);
        setEditStartDate(project.startDate);
        setEditEndDate(project.endDate);
        setEditProjCustomer(project.customer)
      }
  }, [project, setEditDescription, setEditProjectNumber, setEditInvoiceNumber, setEditStartDate, setEditEndDate, setEditProjCustomer])

  return (
    <main className="Projects">
        {editProjectNumber &&
            <>
                <h2>Edit Project</h2>
                <form className='ProjectForm' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='ProjectNumber'>Project Number:</label>
                    <input
                        id='ProjectNumber'
                        type='text'
                        required
                        value={editProjectNumber}
                        onChange={(e) => setEditProjectNumber(e.target.value)}
                    />

                    <label htmlFor='ProjectDescription'>Description:</label>
                    <select 
                        id='ProjectDescription'
                        type='text'
                        required
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}>
                        <option value="" disabled defaultValue={""}>Select Project Description...</option>
                        {descriptionList.map(item => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>

                    <label htmlFor='ProjectCustomer'>Customer:</label>
                    <select 
                        id='ProjectCustomer'
                        type='text'
                        required
                        value={editProjCustomer}
                        onChange={(e) => setEditProjCustomer(e.target.value)}>
                            {customerList.map(customer => (
                                <option key={customer.id} value={customer.name}>{customer.name}</option>
                            ))}
                    </select>

                    <label htmlFor='ProjectInvoice'>Invoice #:</label>
                    <input
                        id='ProjectInvoice'
                        type='text'
                        required
                        value={editInvoiceNumber}
                        onChange={(e) => setEditInvoiceNumber(e.target.value)}
                    />

                    <label htmlFor='ProjectStartDate'>Start Date:</label>
                    <input
                        id='ProjectStartDate'
                        type='date'
                        required
                        value={editStartDate}
                        onChange={(e) => setEditStartDate(e.target.value)}
                    />

                    <label htmlFor='ProjectEndDate'>End Date:</label>
                    <input
                        id='ProjectEndDate'
                        type='date'
                        required
                        value={editEndDate}
                        onChange={(e) => setEditEndDate(e.target.value)}
                    />
                    <button type="button" onClick={() => handleEdit(project.id)}>Submit</button>
                </form>
            </>
        }
        {!editProjectNumber &&
            <>
                <h2>Project Not Found</h2>
                <p>Sorry Mama</p>
                <p>
                    <Link to='/'>Go Back to Project Page</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditProject