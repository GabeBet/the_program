import Projects from "./ProjectComponents/Projects";
import Customers from "./CustomerComponents/Customers";
import SqFt from "./SqFt";
import Estimate from "./Estimate";
import Invoice from "./Invoice";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import AddCustomers from "./CustomerComponents/AddCustomers";
import CustomerPage from "./CustomerComponents/CustomerPage";
import EditCustomer from "./CustomerComponents/EditCustomer";
import AddProject from "./ProjectComponents/AddProject";
import ProjectPage from "./ProjectComponents/ProjectPage";
import EditProject from "./ProjectComponents/EditProject";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from './api/projects';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [description, setDescription] = useState('');
  const [projCustomer, setProjCustomer] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [editDescription, setEditDescription] = useState('');
  const [editProjCustomer, setEditProjCustomer] = useState('');
  const [editInvoiceNumber, setEditInvoiceNumber] = useState('');
  const [editProjectNumber, setEditProjectNumber] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  const navigation = useNavigate();

  const [customerList, setCustomerList] = useState([]);

  const [projectList, setProjectList] = useState([]);

  const [descriptionList] = useState([
    "Bath Tub Cut Out",
    "Console Table",
    "Bathroom Countertop", 
    "Built in Cabinet",
    "Closet Top",
    "Coffee Table",
    "Conference Table",
    "Cook Top Cut-Out",
    "Cost of Material",
    "Countertops",
    "Decking",
    "Drop in Sink (D.I.S.)",
    "Dry Bar Countertop",
    "Fabrication / Installation",
    "Fabrication / Installation - Ogee Edge",
    "Fabrication / Installation Shower Wall Straight",
    "Fabrication / Installation -Straight Edge",
    "Fabrication/Installation - Miter Edge",
    "Fabrication/Installation - Other Edge",
    "Fabrication/Installation/Material",
    "Farm Sink Cut-Out",
    "Fireplace",
    "Kitchen & Vanity Countertops",
    "Kitchen / Bathroom",
    "Kitchen / Full B.S",
    "Kitchen Island",
    "Kitchen Pantry",
    "Outdoor Kitchen",
    "Pool Bar",
    "Master Bathroom",
    "Kitchen Countertops",
    "Kitchen Sink",
    "Waterfall",
    "Labor Cut and Polish Countertop",
    "Labor Cut -Out and Polish Outdoor Grill",
    "Material Pick Up",
    "MATERIAL TO BE USED",
    "Outdoor Grill Cut-Out",
    "Outlets Cut-Out",
    "Oval Table",
    "Oversize Pieces",
    "Plumbing",
    "Powder Room",
    "Sealer Aplication",
    "Stainless Steel Kitchen Sink- Double Bowl",
    "Stainless Steel Kitchen Sink- Single Bowl",
    "Tear Out Existing Back Splash",
    "Tear Out Existing Countertops",
    "Tile Backsplash",
    "Trip Charge",
    "Undermount Cut-Out Bar Sink",
    "Undermount Cut-Out Island Sink",
    "Undermount Cut-Out Kitchen Sink", 
    "Undermount Cut-Out Utility Sink",
    "Undermount Cut-Out Vanity Sink",
    "Utility Top",
    "Vanity Sink - Cut-Out",
    "Vanity Sink - Oval",
    "Vanity Sink Rectangle"
  ]);

  const [sqFtData, setSqFtData] = useState([]);

  const [estimateData, setEstimateData] = useState([]);

  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projectList');
        setProjectList(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customerList');
        setCustomerList(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchSqFtData = async () => {
      try {
        const response = await api.get('/sqFtData');
        setSqFtData(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchEstimateData = async () => {
      try {
        const response = await api.get('/estimateData');
        setEstimateData(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchInvoiceData = async () => {
      try {
        const response = await api.get('/invoiceData');
        setInvoiceData(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchProjects();
    fetchCustomers();
    fetchSqFtData();
    fetchEstimateData();
    fetchInvoiceData();
  }, [])

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();
    const id = customerList.length ? customerList[customerList.length - 1].id + 1 : 1;
    const newCustomer = { id, name: name, address: address, phone: phone, email: email};
    try {
      const response = await api.post('/customerList', newCustomer)
      const allCustomers = [...customerList, response.data];
      setCustomerList(allCustomers);
      setName('');
      setAddress('');
      setPhone('');
      setEmail('');
      navigation('/customers');
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      await api.delete(`/customerList/${id}`);
      const filteredCustomerList = customerList.filter(customer => customer.id !== id);
      setCustomerList(filteredCustomerList);
      navigation('/customers')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEditCustomer = async (id) => {
    const updatedCustomer = { id, name: editName, address: editAddress, phone: editPhone, email: editEmail };
    try {
      const response = await api.put(`/customerList/${id}`, updatedCustomer);
      setCustomerList(customerList.map(customer => customer.id === id ? {...response.data } : customer));
      setEditName('');
      setEditAddress('');
      setEditPhone('');
      setEditEmail('');
      navigation('/customers');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const id = projectList.length ? projectList[projectList.length - 1].id + 1 : 1;
    const newProject = { id, description: description, customer: projCustomer, projectNumber: projectNumber, invoiceNumber: invoiceNumber, startDate: startDate, endDate: endDate};
    try {
      const response = await api.post('/projectList', newProject);
      const allProjects = [...projectList, response.data];
      setProjectList(allProjects);
      setProjectNumber('');
      setDescription('');
      setInvoiceNumber('');
      setStartDate('');
      setEndDate('');
      navigation('/');
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projectList/${id}`);
      const filteredProjectList = projectList.filter(project => project.id !== id);
      setProjectList(filteredProjectList);
      navigation('/')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEditProject = async (id) => {
    const updatedProject = { id, description: editDescription, customer: editProjCustomer, projectNumber: editProjectNumber, invoiceNumber: editInvoiceNumber, startDate: editStartDate, endDate: editEndDate};
    try {
      const response = await api.put(`projectList/${id}`, updatedProject)
      setProjectList(projectList.map(project => project.id === id ? {...response.data } : project));
      setEditProjectNumber('');
      setEditDescription('');
      setEditInvoiceNumber('');
      setEditStartDate('');
      setEditEndDate('');
      navigation('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Projects projectList={projectList}/>} />
        <Route path="add-project">
          <Route index element={<AddProject
            customerList={customerList}
            descriptionList={descriptionList}
            handleSubmit={handleSubmitProject}
            description={description}
            setDescription={setDescription}
            projCustomer={projCustomer}
            setProjCustomer={setProjCustomer}
            projectNumber={projectNumber}
            setProjectNumber={setProjectNumber}
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            />} />
        </Route>
        <Route path="/projects/:id">
          <Route index element={<ProjectPage 
            projectList={projectList}
            handleDelete={handleDeleteProject}
            />} />
        </Route>
        <Route path="projects/edit/:id">
          <Route index element={<EditProject 
            projectList={projectList}
            customerList={customerList}
            descriptionList={descriptionList}
            handleEdit={handleEditProject}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editProjCustomer={editProjCustomer}
            setEditProjCustomer={setEditProjCustomer}
            editProjectNumber={editProjectNumber}
            setEditProjectNumber={setEditProjectNumber}
            editInvoiceNumber={editInvoiceNumber}
            setEditInvoiceNumber={setEditInvoiceNumber}
            editStartDate={editStartDate}
            setEditStartDate={setEditStartDate}
            editEndDate={editEndDate}
            setEditEndDate={setEditEndDate}
            />} />
        </Route>
        <Route path="customers">
          <Route index element={<Customers customerList={customerList}/>} />
        </Route>
        <Route path="add-customers">
          <Route index element={<AddCustomers 
            handleSubmit={handleSubmitCustomer}
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
            projectList={projectList}
            handleDelete={handleDeleteCustomer}
            />} />
        </Route>
        <Route path="customers/edit/:id">
          <Route index element={<EditCustomer 
            customerList={customerList}
            handleEdit={handleEditCustomer}
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
          <Route index element={<SqFt
            sqFtData={sqFtData}
            setSqFtData={setSqFtData}
            descriptionList={descriptionList}
            projectList={projectList}
            />} />
        </Route>
        <Route path="estimate">
          <Route index element={<Estimate 
            estimateData={estimateData}
            setEstimateData={setEstimateData}
            descriptionList={descriptionList}
            projectList={projectList}
            customerList={customerList}
          />} />
        </Route>
        <Route path="invoice">
          <Route index element={<Invoice
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            estimateData={estimateData}
            descriptionList={descriptionList}
            projectList={projectList}
            customerList={customerList}
          />} />
        </Route>
          <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
