import React from 'react';
import { PatternFormat } from 'react-number-format';

const AddCustomers = ( { handleSubmit, name, setName, address, setAddress, phone, setPhone, email, setEmail }) => {

    const handleChange = (index, e) => {
        let data = [...address];
        data[index][e.target.name] = e.target.value;
        setAddress(data);
    }

    const addAddressField = (e) => {
        e.preventDefault();
        let newAddressField = {address: ''};
        setAddress([...address, newAddressField])
    }

    const removeAddressField = (index) => {
        let data = [...address];
        data.splice(index,1);
        setAddress(data);
    }

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
            {address.map((input, index) => {
                return (
                    <div key={index}>
                    <input
                        name='address'
                        type='text'
                        required
                        value={input.address}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <button className="deleteButton" onClick={() => removeAddressField(index)}>Remove Address</button>
                    </div>
                )
            })}
            <button className="addButton" onClick={addAddressField}>Add New Address...</button>
            <label htmlFor='CustomerPhone'>Phone:</label>
            <PatternFormat
                type="text"
                format="(###) ###-####"
                mask="_" 
                value={phone}
                onValueChange={value => setPhone(value.formattedValue)}
                required
            />
            <label htmlFor='CustomerEmail'>Email:</label>
            <input
                id='CustomerEmail'
                type='text'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="addButton" type="submit">Submit</button>
        </form>
        </main>
    )
}

export default AddCustomers