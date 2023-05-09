import Select from 'react-select';

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
            <Select
                id='ProjectDescription'
                type='text'
                required
                defaultValue={{label:"Select Project Description...", value:""}}
                options={descriptionList}
                onChange={(e) => {
                    setDescription( e.value );
                }}
            />

            <label htmlFor='ProejctCustomer'>Customer:</label>
            <select 
                id='ProjectCustomer'
                type='text'
                required
                value={projCustomer}
                onChange={(e) => setProjCustomer(e.target.value)}>
                    <option value="" disabled defaultValue={""}>Select a Customer...</option>
                    {customerList.map(customer => (
                        <option key={customer.id} value={customer.name}>{customer.name}</option>
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
            <button type="submit">Submit</button>
        </form>
        </main>
    )
}

export default AddProject