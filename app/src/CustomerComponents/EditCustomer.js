import { useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';

const EditCustomer = ({ customerList, handleEdit, editName, setEditName, editAddress, setEditAddress, editPhone, setEditPhone, editEmail, setEditEmail }) => {
  const { id } = useParams();
  const customer = customerList.find(customer => (customer._id) === id);

  useEffect(() => {
      if (customer) {
        setEditName(customer.name);
        setEditAddress(customer.address);
        setEditPhone(customer.phone);
        setEditEmail(customer.email);
      }
  }, [customer, setEditName, setEditAddress, setEditPhone, setEditEmail])

  const handleChange = (index, e) => {
    let data = [...editAddress];
    data[index][e.target.name] = e.target.value;
    setEditAddress(data);
  }

  const addAddressField = (e) => {
    e.preventDefault();
    let newAddressField = {address: ''};
    setEditAddress([...editAddress, newAddressField])
  }

  const removeAddressField = (index) => {
    let data = [...editAddress];
    data.splice(index,1);
    setEditAddress(data);
  }

  return (
    <main className="Customers">
        {editName &&
            <>
                <h2>Edit Customer</h2>
                <form className='CustomersForm' onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor='CustomerName'>Name:</label>
                  <input
                    id='CustomerName'
                    type='text'
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <label htmlFor='CustomerAddress'>Address:</label>
                  {editAddress.map((input, index) => {
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
                    value={editPhone}
                    onValueChange={value => setEditPhone(value.formattedValue)}
                    required
                  />
                  <label htmlFor='CustomerEmail'>Email:</label>
                  <input
                  id='CustomerEmail'
                  type='text'
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  />
                  <button className='saveButton' type="button" onClick={() => handleEdit(customer._id)}>Submit</button>
                </form>
            </>
        }
        {!editName &&
            <>
                <h2>Customer Not Found</h2>
                <p>
                    <Link to='/customers'>Go Back to Customer Page</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditCustomer