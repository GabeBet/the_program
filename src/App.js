import Projects from "./Projects";
import Customers from "./Customers";
import SqFt from "./SqFt";
import Estimate from "./Estimate";
import Invoice from "./Invoice";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import AddCustomers from "./AddCustomers";
import CustomerPage from "./CustomerPage";
import EditCustomer from "./EditCustomer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const navigation = useNavigate();

  const [customerList, setCustomerList] = useState([
    {
      id: 1,
      name: "Gabriel Betancourt",
      address: "3511 Maverly Crest Ct Katy,TX 77494",
      phone: "281-889-2800",
      email: "gabe.bet@hotmail.com"
    },
    {
      id: 2,
      name: "Patricia Betancourt",
      address: "3511 Maverly Crest Ct Katy,TX 77494",
      phone: "281-900-3285",
      email: "pbeta45@hotmail.com"
    },
    {
      id: 3,
      name: "Edgar Betancourt",
      address: "3511 Maverly Crest Ct Katy,TX 77494",
      phone: "346-446-8884",
      email: "embm65@hotmail.com"
    },
    {
      id: 4,
      name: "Jonathan Betancourt",
      address: "3511 Maverly Crest Ct Katy,TX 77494",
      phone: "281-900-3278",
      email: "jonathan.betancourt@outlook.com"
    }
  ])

  const handleSubmitCustomer = (e) => {
    e.preventDefault();
    const id = customerList.length ? customerList[customerList.length - 1].id + 1 : 1;
    const newCustomer = { id, name: name, address: address, phone: phone, email: email};
    const allCustomers = [...customerList, newCustomer];
    setCustomerList(allCustomers);
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
    navigation('/customers');
  }

  const handleDeleteCustomer = (id) => {
    const filteredCustomerList = customerList.filter(customer => customer.id !== id);
    setCustomerList(filteredCustomerList);
    navigation('/customers')
  }

  // const handleEditCustomer = async (id) => {
  //   const updatedPost = { id, name: editName, address: editAddress, phone: editPhone, email: editEmail };
  //   try {
  //     const response = await api.put(`/posts/${id}`, updatedPost);
  //     setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
  //     setEditTitle('');
  //     setEditBody('');
  //     history.push('/');
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // }

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Projects />} />
        <Route path="customers">
          <Route index element={<Customers customerList={customerList}/>} />
        </Route>
        <Route path="add-customers">
          <Route index element={<AddCustomers 
            handleSubmitCustomer={handleSubmitCustomer}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            />} />
        </Route>
        <Route path="customers/:id">
          <Route index element={<CustomerPage 
            customerList={customerList}
            handleDelete={handleDeleteCustomer}
            // handleEdit={handleEditCustomer}
            />} />
        </Route>
        <Route path="customers/edit/:id">
          <Route index element={<EditCustomer 
            customerList={customerList}
            // handleEdit={handleEditCustomer}
            editName={editName}
            setEditName={setEditName}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
            editPhone={editPhone}
            setEditPhone={setEditPhone}
            editEmail={editEmail}
            setEditEmail={setEditEmail}
            />} />
        </Route>
        <Route path="sqft">
          <Route index element={<SqFt />} />
        </Route>
        <Route path="estimate">
          <Route index element={<Estimate />} />
        </Route>
        <Route path="invoice">
          <Route index element={<Invoice />} />
        </Route>
          <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
