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
      startDate: "5/8/23",
      endDate: "8/5/23"
    },
    {
      id: 2,
      customer: "Patricia Betancourt",
      description: "Vanity",
      invoiceNumber: "23-101",
      projectNumber: "PRY-101",
      startDate: "5/9/23",
      endDate: "9/5/23"
    },
    {
      id: 3,
      customer: "Edgar Betancourt",
      description: "Bathroom",
      invoiceNumber: "23-102",
      projectNumber: "PRY-102",
      startDate: "5/10/23",
      endDate: "10/5/23"
    },
    {
      id: 4,
      customer: "Jonathan Betancourt",
      description: "Outdoor",
      invoiceNumber: "23-103",
      projectNumber: "PRY-103",
      startDate: "5/11/23",
      endDate: "11/5/23"
    }
  ])

  const [descriptionList] = useState([
    {value:"Bath Tub Cut Out", label:"Bath Tub Cut Out"},
    {value:"Console Table", label:"Console Table"},
    {value:"Bathroom Countertop", label:"Bathroom Countertop"}, 
    {value:"Built in Cabinet", label:"Built in Cabinet"},
    {value:"Closet Top", label:"Closet Top"},
    {value:"Coffee Table", label:"Coffee Table"},
    {value:"Conference Table", label:"Conference Table"},
    {value:"Cook Top Cut-Out", label:"Cook Top Cut-Out"},
    {value:"Cost of Material", label:"Cost of Material"},
    {value:"Countertops", label:"Countertops"},
    {value:"Decking", label:"Decking"},
    {value:"Drop in Sink (D.I.S.)", label:"Drop in Sink (D.I.S.)"},
    {value:"Dry Bar Countertop", label:"Dry Bar Countertop"},
    {value:"Fabrication / Installation", label:"Fabrication / Installation"},
    {value:"Fabrication / Installation - Ogee Edge", label:"Fabrication / Installation - Ogee Edge"},
    {value:"Fabrication / Installation Shower Wall Straight", label:"Fabrication / Installation Shower Wall Straight"},
    {value:"Fabrication / Installation -Straight Edge", label:"Fabrication / Installation -Straight Edge"},
    {value:"Fabrication/Installation - Miter Edge", label:"Fabrication/Installation - Miter Edge"},
    {value:"Fabrication/Installation - Other Edge", label:"Fabrication/Installation - Other Edge"},
    {value:"Fabrication/Installation/Material", label:"Fabrication/Installation/Material"},
    {value:"Farm Sink Cut-Out", label:"Farm Sink Cut-Out"},
    {value:"Fireplace", label:"Fireplace"},
    {value:"Kitchen & Vanity Countertops", label:"Kitchen & Vanity Countertops"},
    {value:"Kitchen / Bathroom", label:"Kitchen / Bathroom"},
    {value:"Kitchen / Full B.S", label:"Kitchen / Full B.S"},
    {value:"Kitchen Island", label:"Kitchen Island"},
    {value:"Kitchen Pantry", label:"Kitchen Pantry"},
    {value:"Outdoor Kitchen", label:"Outdoor Kitchen"},
    {value:"Pool Bar", label:"Pool Bar"},
    {value:"Master Bathroom", label:"Master Bathroom"},
    {value:"Kitchen Countertops", label:"Kitchen Countertops"},
    {value:"Kitchen Sink", label:"Kitchen Sink"},
    {value:"Waterfall", label:"Waterfall"},
    {value:"Labor Cut and Polish Countertop", label:"Labor Cut and Polish Countertop"},
    {value:"Labor Cut -Out and Polish Outdoor Grill", label:"Labor Cut -Out and Polish Outdoor Grill"},
    {value:"Material Pick Up", label:"Material Pick Up"},
    {value:"MATERIAL TO BE USED", label:"MATERIAL TO BE USED"},
    {value:"Outdoor Grill Cut-Out", label:"Outdoor Grill Cut-Out"},
    {value:"Outlets Cut-Out", label:"Outlets Cut-Out"},
    {value:"Oval Table", label:"Oval Table"},
    {value:"Oversize Pieces", label:"Oversize Pieces"},
    {value:"Plumbing", label:"Plumbing"},
    {value:"Powder Room", label:"Powder Room"},
    {value:"Sealer Aplication", label:"Sealer Aplication"},
    {value:"Stainless Steel Kitchen Sink- Double Bowl", label:"Stainless Steel Kitchen Sink- Double Bowl"},
    {value:"Stainless Steel Kitchen Sink- Single Bowl", label:"Stainless Steel Kitchen Sink- Single Bowl"},
    {value:"Tear Out Existing Back Splash", label:"Tear Out Existing Back Splash"},
    {value:"Tear Out Existing Countertops", label:"Tear Out Existing Countertops"},
    {value:"Tile Backsplash", label:"Tile Backsplash"},
    {value:"Trip Charge", label:"Trip Charge"},
    {value:"Undermount Cut-Out Bar Sink", label:"Undermount Cut-Out Bar Sink"},
    {value:"Undermount Cut-Out Island Sink", label:"Undermount Cut-Out Island Sink"},
    {value:"Undermount Cut-Out Kitchen Sink", label:"Undermount Cut-Out Kitchen Sink"}, 
    {value:"Undermount Cut-Out Utility Sink", label:"Undermount Cut-Out Utility Sink"},
    {value:"Undermount Cut-Out Vanity Sink", label:"Undermount Cut-Out Vanity Sink"},
    {value:"Utility Top", label:"Utility Top"},
    {value:"Vanity Sink - Cut-Out", label:"Vanity Sink - Cut-Out"},
    {value:"Vanity Sink - Oval", label:"Vanity Sink - Oval"},
    {value:"Vanity Sink Rectangle", label:"Vanity Sink Rectangle"}
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
