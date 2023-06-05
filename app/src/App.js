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
import BankStatements from "./ProjectComponents/BankStatements";
import { toast } from 'react-toastify';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState([{address: ''}]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState([{address: ''}]);
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

  const [bankData, setBankData] = useState([]);

  // fetch all data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/projects',{});
        let data = await response.json();
        setProjectList(data);
      } catch (err) {
        if (err.response) {
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
        const response = await fetch('http://localhost:4000/customers');
        let data = await response.json();
        setCustomerList(data);
      } catch (err) {
        if (err.response) {
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
        const response = await fetch('http://localhost:4000/squarefootage',{});
        let data = await response.json();
        setSqFtData(data);
      } catch (err) {
        if (err.response) {
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
        const response = await fetch('http://localhost:4000/estimate',{});
        let data = await response.json();
        setEstimateData(data);
      } catch (err) {
        if (err.response) {
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
        const response = await fetch('http://localhost:4000/invoice',{});
        let data = await response.json();
        setInvoiceData(data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchBankData = async () => {
      try {
        const response = await fetch('http://localhost:4000/bankstatement',{});
        let data = await response.json();
        setBankData(data);
      } catch (err) {
        if (err.response) {
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
    fetchBankData();
  }, [])

  const errorNotify = (message) => toast.error(`Project Not Saved: ${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();
    try {
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, 
          address: address, 
          phone: phone, 
          email: email
        })
      };
      const res = await fetch('http://localhost:4000/customers', req);
      const data = await res.json();
      setCustomerList((prevCustomers) => [...prevCustomers,data])
      setName('');
      setAddress([{address: ''}]);
      setPhone('');
      setEmail('');
      navigation('/customers');
    } catch (err) {
      errorNotify(err);
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      await fetch(`http://localhost:4000/customers/${id}`, {method: 'DELETE'});
      const filteredCustomerList = customerList.filter(customer => customer._id !== id);
      setCustomerList(filteredCustomerList);
      navigation('/customers')
    } catch (err) {
      errorNotify(err);
    }
  }

  const handleEditCustomer = async (id) => {
    try {
      const req = { 
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName, 
          address: editAddress, 
          phone: editPhone, 
          email: editEmail
        })
      };
      await fetch(`http://localhost:4000/customers/${id}`, req);

      const updatedCustomer = { _id: id, name: editName, address: editAddress, phone: editPhone, email: editEmail };

      setCustomerList(customerList.map(customer => customer._id === id ? {...updatedCustomer } : customer));
      setEditName('');
      setEditAddress([{address: ''}]);
      setEditPhone('');
      setEditEmail('');
      navigation('/customers');
    } catch (err) {
      errorNotify(err);
    }
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      projectList?.forEach((proj) => {
        if(proj.projectNumber === projectNumber){
          throw new Error('Project Number Already In Use')
        }
      })
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description, 
          customerName: projCustomer, 
          projectNumber: projectNumber, 
          invoiceNumber: invoiceNumber, 
          startDate: startDate, 
          endDate: endDate
        })
      };
      const res = await fetch('http://localhost:4000/projects', req);
      const data = await res.json();
      setProjectList((prevPosts) => [...prevPosts,data])
      setProjectNumber('');
      setDescription('');
      setProjCustomer('');
      setInvoiceNumber('');
      setStartDate('');
      setEndDate('');
      navigation('/');
    } catch (err) {
      errorNotify(err);
    }
  }

  const handleDeleteProject = async (id) => {
    let projNumber = '';
    projectList?.forEach((proj) => {
      if(proj._id === id)
        projNumber = proj.projectNumber;
    })

    try{
      await fetch(`http://localhost:4000/projects/${id}`, {method: 'DELETE'});
      const filteredProjectList = projectList.filter(project => project._id !== id);
      setProjectList(filteredProjectList);
      navigation('/')
    } catch (err) {
      errorNotify(err);
    }
    
    estimateData?.forEach( async (est) => {
      if (est.projectNumber === projNumber){
        try {
          await fetch(`http://localhost:4000/estimate/${est._id}`, {method: 'DELETE'});
          const filteredEstimateData = estimateData.filter(project => project._id !== id);
          setEstimateData(filteredEstimateData);
        } catch (err) {
          errorNotify(err);
        }
      }
    })
    invoiceData?.forEach( async (inv) => {
      if (inv.projectNumber === projNumber){
        try {
          await fetch(`http://localhost:4000/invoice/${inv._id}`, {method: 'DELETE'});
          const filteredInvoiceData = invoiceData.filter(project => project._id !== id);
          setInvoiceData(filteredInvoiceData);
        } catch (err) {
          errorNotify(err);
        }
      }
    })
  }

  const handleEditProject = async (id) => {
    try {
      const req = { 
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: editDescription, 
          customerName: editProjCustomer, 
          projectNumber: editProjectNumber, 
          invoiceNumber: editInvoiceNumber, 
          startDate: editStartDate, 
          endDate: editEndDate
        })
      };
      await fetch(`http://localhost:4000/projects/${id}`, req);

      const updatedProject = { _id: id, description: editDescription, 
        customerName: editProjCustomer, 
        projectNumber: editProjectNumber, 
        invoiceNumber: editInvoiceNumber, 
        startDate: editStartDate, 
        endDate: editEndDate 
      };

      setProjectList(projectList.map(project => project._id === id ? {...updatedProject } : project));
      setEditProjectNumber('');
      setEditDescription('');
      setEditProjCustomer('');
      setEditInvoiceNumber('');
      setEditStartDate('');
      setEditEndDate('');
      navigation('/');
    } catch (err) {
      errorNotify(err);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Projects 
          projectList={projectList}
          bankData={bankData}
          setBankData={setAddress}
        />} />
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
        <Route path="projects/:id/edit">
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
        <Route path="projects/:id/bank">
          <Route index element={<BankStatements
            bankData={bankData}
            setBankData={setBankData}
            projectList={projectList}
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
        <Route path="sqft/">
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
            sqFtData={sqFtData}
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
            setProjectList={setProjectList}
            customerList={customerList}
          />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
