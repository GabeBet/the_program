import { useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const EditCustomer = ({ customerList, handleEdit, editName, setEditName, editAddress, setEditAddress, editPhone, setEditPhone, editEmail, setEditEmail }) => {
  const { id } = useParams();
  const customer = customerList.find(customer => (customer.id).toString() === id);

  useEffect(() => {
      if (customer) {
        setEditName(customer.name);
        setEditAddress(customer.address);
        setEditPhone(customer.phone);
        setEditEmail(customer.email);
      }
  }, [customer, setEditName, setEditAddress, setEditPhone, setEditEmail])

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
                  <input
                  id='CustomerAddress'
                  type='text'
                  required
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  />
                  <label htmlFor='CustomerPhone'>Phone:</label>
                  <input
                  id='CustomerPhone'
                  type='text'
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  />
                  <label htmlFor='CustomerEmail'>Email:</label>
                  <input
                  id='CustomerEmail'
                  type='text'
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  />
                  <button className='saveButton' type="button" onClick={() => handleEdit(customer.id)}>Submit</button>
                </form>
            </>
        }
        {!editName &&
            <>
                <h2>Customer Not Found</h2>
                <p>Sorry Mama</p>
                <p>
                    <Link to='/customers'>Go Back to Customer Page</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditCustomer