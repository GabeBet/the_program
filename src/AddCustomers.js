import React from 'react'
// import { Link } from 'react-router-dom';

const AddCustomers = ( { handleSubmit, name, setName, address, setAddress, phone, setPhone, email, setEmail }) => {

    return (
        <main className='Customers'>
        <h2>Add New Customer</h2>
        <form className='CustomersForm' onSubmit={handleSubmit}>
            <label htmlFor='CustomerName'>Name:</label>
            <input
            id='CustomerName'
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='CustomerAddress'>Address:</label>
            <input
            id='CustomerAddress'
            type='text'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor='CustomerPhone'>Phone:</label>
            <input
            id='CustomerPhone'
            type='text'
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor='CustomerEmail'>Email:</label>
            <input
            id='CustomerEmail'
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        </main>
    )
}

export default AddCustomers