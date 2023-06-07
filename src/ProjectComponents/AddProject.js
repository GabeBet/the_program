import { ToastContainer } from "react-toastify"

const AddProject = ( { customerList, descriptionList, handleSubmit, description, setDescription, 
    projCustomer, setProjCustomer, invoiceNumber, setInvoiceNumber, projectNumber, 
    setProjectNumber, startDate, setStartDate, endDate, setEndDate }) => {

    return (
        <main className='Projects'>
        <h2>Add New Project</h2>
        <form className='ProjectForm' onSubmit={handleSubmit}>
            <label htmlFor='ProjectNumber'>Project Number:</label>
            <input
                id='ProjectNumber'
                type='text'
                required
                value={projectNumber}
                onChange={(e) => setProjectNumber(e.target.value)}
            />
            <label htmlFor='ProjectDescription'>Description:</label>
            <select 
                id='ProjectDescription'
                type='text'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
                    <option value="" disabled defaultValue={""}>Select Project Description...</option>
                    {descriptionList.map(item => (
                        <option key={item._id}>{item.description}</option>
                    ))}
            </select>
            <label htmlFor='ProjectCustomer'>Customer:</label>
            <select 
                id='ProjectCustomer'
                type='text'
                required
                value={projCustomer}
                onChange={(e) => setProjCustomer(e.target.value)}>
                    <option value="" disabled defaultValue={""}>Select a Customer...</option>
                    {customerList.map(customer => (
                        <option key={customer._id} value={customer.name}>{customer.name}</option>
                    ))}
            </select>

            <label htmlFor='ProjectInvoice'>Invoice #:</label>
            <input
                id='ProjectInvoice'
                type='text'
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
            />

            <label htmlFor='ProjectStartDate'>Start Date:</label>
            <input
                id='ProjectStartDate'
                type='date'
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor='ProjectEndDate'>End Date:</label>
            <input
                id='ProjectEndDate'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="addButton" type="submit">Submit</button>
        </form>

        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        </main>
    )
}

export default AddProject