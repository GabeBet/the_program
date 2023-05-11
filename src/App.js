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

  const [customerList, setCustomerList] = useState([
    {
      id: 1,
      name: "Gabriel Betancourt",
      address: "3511 Maverly Crest Ct Katy, TX 77494",
      phone: "281-889-2800",
      email: "gabe.bet@hotmail.com"
    },
    {
      id: 2,
      name: "Patricia Betancourt",
      address: "3511 Maverly Crest Ct Katy, TX 77494",
      phone: "281-900-3285",
      email: "pbeta45@hotmail.com"
    },
    {
      id: 3,
      name: "Edgar Betancourt",
      address: "3511 Maverly Crest Ct Katy, TX 77494",
      phone: "346-446-8884",
      email: "embm65@hotmail.com"
    },
    {
      id: 4,
      name: "Jonathan Betancourt",
      address: "3511 Maverly Crest Ct Katy, TX 77494",
      phone: "281-900-3278",
      email: "jonathan.betancourt@outlook.com"
    }
  ])

  const [projectList, setProjectList] = useState([
    {
      id: 1,
      customer: "Gabriel Betancourt",
      description: "Kitchen Top",
      invoiceNumber: "23-100",
      projectNumber: "PRY-100",
      startDate: "2023-05-08",
      endDate: "2023-08-05"
    },
    {
      id: 2,
      customer: "Patricia Betancourt",
      description: "Vanity",
      invoiceNumber: "23-101",
      projectNumber: "PRY-101",
      startDate: "2023-05-09",
      endDate: "2023-09-05"
    },
    {
      id: 3,
      customer: "Edgar Betancourt",
      description: "Bathroom",
      invoiceNumber: "23-102",
      projectNumber: "PRY-102",
      startDate: "2023-05-10",
      endDate: "2023-10-05"
    },
    {
      id: 4,
      customer: "Jonathan Betancourt",
      description: "Outdoor",
      invoiceNumber: "23-103",
      projectNumber: "PRY-103",
      startDate: "2023-05-11",
      endDate: "2023-11-05"
    }
  ])

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
  ])

  const [sqFtData, setSqFtData] = useState([
    {
      projectNumber: "PRY-100",
      inputFields: [{description: 'Closet Top', length: '43', width: '23', total: '7'}, {description: 'Decking', length: '61', width: '23', total: '10'}],
      grandTotal: '17',
    },
    {
      projectNumber: "PRY-101",
      inputFields: [{description: 'Coffee Table', length: '38', width: '13', total: '4'}, {description: 'Decking', length: '62', width: '34', total: '15'}],
      grandTotal: '19',
    },
    {
      projectNumber: "PRY-102",
      inputFields: [{description: 'Trip Charge', length: '144', width: '10', total: '10'}, {description: 'Decking', length: '62', width: '34', total: '15'}],
      grandTotal: '25',
    },
    {
      projectNumber: "PRY-103",
      inputFields: [{description: 'Vanity', length: '144', width: '15', total: '15'}, {description: 'Decking', length: '62', width: '34', total: '15'}],
      grandTotal: '30',
    }
  ]);

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

  const handleEditCustomer = (id) => {
    const updatedCustomer = { id, name: editName, address: editAddress, phone: editPhone, email: editEmail };
    setCustomerList(customerList.map(customer => customer.id === id ? {...updatedCustomer } : customer));
    setEditName('');
    setEditAddress('');
    setEditPhone('');
    setEditEmail('');
    navigation('/customers');
  }

  const handleSubmitProject = (e) => {
    e.preventDefault();
    const id = projectList.length ? projectList[projectList.length - 1].id + 1 : 1;
    const newProject = { id, description: description, customer: projCustomer, projectNumber: projectNumber, invoiceNumber: invoiceNumber, startDate: startDate, endDate: endDate};
    const allProjects = [...projectList, newProject];
    setProjectList(allProjects);
    setProjectNumber('');
    setDescription('');
    setInvoiceNumber('');
    setStartDate('');
    setEndDate('');
    navigation('/');
  }

  const handleDeleteProject = (id) => {
    const filteredProjectList = projectList.filter(project => project.id !== id);
    setProjectList(filteredProjectList);
    navigation('/')
  }

  const handleEditProject = (id) => {
    const updatedProject = { id, description: editDescription, customer: editProjCustomer, projectNumber: editProjectNumber, invoiceNumber: editInvoiceNumber, startDate: editStartDate, endDate: editEndDate};
    setProjectList(projectList.map(project => project.id === id ? {...updatedProject } : project));
    setEditProjectNumber('');
    setEditDescription('');
    setEditInvoiceNumber('');
    setEditStartDate('');
    setEditEndDate('');
    navigation('/');
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
            sqFtData={sqFtData}
            descriptionList={descriptionList}
            projectList={projectList}
            customerList={customerList}
          />} />
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
