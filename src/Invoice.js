import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
//import logo from './USLogo.jpg'
import api from './api/projects'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invoice = ( { invoiceData, setInvoiceData, estimateData, descriptionList, projectList, setProjectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [projectDescription, setProjectDescription] = useState('');
  const [date, setDate] = useState('');

  const [subTotal, setSubTotal] = useState('');
  const [tax, setTax] = useState('');
  const [total, setTotal] = useState('');
  const [deposit, setDeposit] = useState('');
  const [balance, setBalance] = useState('');

  const saveNotify = () => toast.success("Invoice Saved", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const updateNotify = () => toast.success("Invoice Updated!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const [inputFields, setInputFields] = useState([ {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''},
    {description: '', qty: '', unitPrice: '', amount: ''}
  ])

  useEffect(() => {
    inputFields?.forEach((row) => {
      row.amount = row.qty * row.unitPrice
    })
    setSubTotal((inputFields.reduce((a,v) => a = a + v.amount, 0)))
    setTotal((inputFields.reduce((a,v) => a = a + v.amount, +tax)))
    setBalance((inputFields.reduce((a,v) => a = a + v.amount, +tax - deposit)))
  }, [inputFields, tax, deposit])

  const handleChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  }

  const handleProjectChange = (e) => {
    setProjectNumber(e.target.value);
    projectList?.forEach((proj) => {
      if (proj.projectNumber === e.target.value){
        customerList?.forEach((cust) => {
          if(proj.customer === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          setProjectDescription(proj.description);
        })
      }
    })

    if( invoiceData.find(proj => proj.projectNumber === e.target.value ) ) {
      invoiceData?.forEach((proj) => {
        if (proj.projectNumber === e.target.value){
          setInvoiceNumber(proj.invoiceNumber);
          setDate(proj.date);
          setInputFields(proj.inputFields);
          setSubTotal(proj.subTotal);
          setTax(proj.tax);
          setTotal(proj.total);
          setDeposit(proj.deposit);
          setBalance(proj.balance);
        }
      })
    } else if ( estimateData.find(proj => proj.projectNumber === e.target.value ) ) {
      estimateData?.forEach((proj) => {
        if (proj.projectNumber === e.target.value){
          setDate(proj.date);
          setInputFields(proj.inputFields);
          setSubTotal(proj.subTotal);
          setTax(proj.tax);
          setTotal(proj.total);
          setDeposit(proj.deposit);
          setBalance(proj.balance);
        }
      })
    } else {
      setInputFields([{description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''}]);
      setInvoiceNumber('');
      setDate('');
      setSubTotal('');
      setTax('');
      setTotal('');
      setDeposit('');
      setBalance('');
    }
  }

  const handleProjectLoad = (projNumber) => {
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projNumber){
        customerList?.forEach((cust) => {
          if(proj.customer === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          setProjectDescription(proj.description);
        })
      }
    })
    if( invoiceData.find(proj => proj.projectNumber === projNumber ) ) {
      invoiceData?.forEach((proj) => {
        if (proj.projectNumber === projNumber){
          setInvoiceNumber(proj.invoiceNumber);
          setDate(proj.date);
          setInputFields(proj.inputFields);
          setSubTotal(proj.subTotal);
          setTax(proj.tax);
          setTotal(proj.total);
          setDeposit(proj.deposit);
          setBalance(proj.balance);
        }
      })
    } else if ( estimateData.find(proj => proj.projectNumber === projNumber ) ) {
      estimateData?.forEach((proj) => {
        if (proj.projectNumber === projNumber){
          setDate(proj.date);
          setInputFields(proj.inputFields);
          setSubTotal(proj.subTotal);
          setTax(proj.tax);
          setTotal(proj.total);
          setDeposit(proj.deposit);
          setBalance(proj.balance);
        }
      })
    } else {
      setInputFields([{description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''},
      {description: '', qty: '', unitPrice: '', amount: ''}]);
      setInvoiceNumber('');
      setDate('');
      setSubTotal('');
      setTax('');
      setTotal('');
      setDeposit('');
      setBalance('');
    }
  }

  const saveInvoice = async (e) => {
    e.preventDefault();
    saveNotify();
    let id = invoiceData.length ? invoiceData[invoiceData.length - 1].id + 1 : 1;
    const newInvoiceData = { id, invoiceNumber: invoiceNumber, projectNumber: projectNumber, date: date, inputFields: inputFields, 
      subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};
    try {
      const response = await api.post('/invoiceData', newInvoiceData);
      const allInvoiceData = [...invoiceData, response.data];
      setInvoiceData(allInvoiceData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    let updatedProject = {};
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projectNumber){
        id = proj.id;
        updatedProject = { id, description: proj.description, customer: proj.customer, projectNumber: proj.projectNumber, 
          invoiceNumber: invoiceNumber, startDate: proj.startDate, endDate: proj.endDate};
      }
    })

    try {
      console.log('invoice number updated')
      const response = await api.put(`/projectList/${id}`, updatedProject)
      setProjectList(projectList.map(project => project.id === id ? {...response.data } : project));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const updateInvoice = async (id) => {
    updateNotify();
    const updatedInvoice = { id, invoiceNumber: invoiceNumber, projectNumber: projectNumber, date: date, inputFields: inputFields, 
      subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};
    try {
      const response = await api.put(`/invoiceData/${id}`, updatedInvoice);
      setInvoiceData(invoiceData.map(inv => inv.id === id ? { ...response.data } : inv));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    let updatedProject = {};
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projectNumber){
        id = proj.id;
        updatedProject = { id, description: proj.description, customer: proj.customer, projectNumber: proj.projectNumber, 
          invoiceNumber: invoiceNumber, startDate: proj.startDate, endDate: proj.endDate};
      }
    })

    try {
      console.log('invoice number updated')
      const response = await api.put(`/projectList/${id}`, updatedProject)
      setProjectList(projectList.map(project => project.id === id ? {...response.data } : project));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  try { 
    const location = useLocation();
    const { linkedNumber } = location.state;
    if (!loaded){
      setProjectNumber(linkedNumber);
      setLoaded(true);
      handleProjectLoad(linkedNumber);
    }
  } catch (err) {

  }

  return (
    <main className='Invoice'>
      <div className='InvoiceHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <span className="leftTitle">Beta Granite Solutions</span> <span className="rightTitle"> Invoice </span> 
        <br></br>
        <span className="leftSubTitle">Phone: (281)900-3285 / (346)0446-8884</span> <span className="rightSubTitle">Date:&ensp;
          <input
            id='invoiceDate'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /></span> 
        <span className="rightSubTitle">Project: &ensp;
          <select
            name='projectNumber'
            value={projectNumber}
            onChange={(e) => handleProjectChange(e)}>
            <option value="" disabled>Select Project...</option>
              {projectList.map(project => (
                  <option key={project.id} value={project.value}>{project.projectNumber}</option>
              ))}
          </select>
        </span><br></br>
        <span className="rightSubTitle">Invoice #:&ensp;
          <input
            id='invoiceNumber'
            type='text'
            placeholder='Invoice Number'
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          /></span> 
      </div>

      <br></br><br></br>

      <div className='InvoiceCustomer'>
        <b>Customer: </b> {`${name}`} <br></br>
        <b>Address:</b> {`${address}`} <br></br>
        <b>Phone:</b> {`${phone}`} <br></br>
        <b>Email:</b> {`${email}`}
      </div>
      
      <br></br> <h2 className='InvoiceDescription'>Project: {projectDescription}</h2> <br></br>
          
      <div className='InvoiceTable'>
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
            {inputFields.map((input, index) => {
              return (
                <tr key={index}>
                  <td><select 
                    name='description'
                    type='text'
                    value={input.description}
                    onChange={(e) => handleChange(index, e)}>
                      <option value="" disabled defaultValue={""}></option>
                      {descriptionList.map(item => (
                        <option key={item}>{item}</option>
                      ))
                    }
                  </select></td>
                  <td><input
                    name='qty'
                    type="number"
                    value={input.qty}
                    onChange={(e) => handleChange(index, e)}
                  /></td>
                  <td><input
                    name='unitPrice'
                    type="number"
                    value={input.unitPrice}
                    onChange={(e) => handleChange(index, e)}
                  /></td>
                  <td><input
                    name='amount'
                    type="display"
                    value={input.amount}
                    readOnly
                  /></td>
                </tr>
                
              )
            })}
          </tbody>
        </table>
        {!(invoiceData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveInvoice(e)}>Save Invoice</button> 
        : invoiceData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj.id} onClick={() => updateInvoice(proj.id)}>Update Invoice</button> : "")}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      <br></br>

      <div className='invoiceFooter'>
        <span className='rightFooter'>
          <label> Subtotal: </label>
          <input
            name='subTotal'
            type="display"
            placeholder="Sub Total"
            value={subTotal}
            readOnly
          /><br></br>

          <label> Tax: </label>
          <input
            name='tax'
            type="number"
            placeholder="Tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          /><br></br>

          <label> Total: </label>
          <input
            name='total'
            type="display"
            placeholder="Total"
            value={total}
            readOnly
          /><br></br>

          <label> Deposit: </label>
          <input
            name='deposit'
            type="number"
            placeholder="Deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          /><br></br>

          <label> Balance: </label>
          <input
            name='balance'
            type="display"
            placeholder="Balance"
            value={balance}
            readOnly
          /><br></br>
        </span>

        1. Electrical will be done by customer <br></br>
        2. 50% Deposit due at time of agreement <br></br>
        3. Balance due at time of completion <br></br>
        4. Edge - Straight <br></br>
        5. Sink, Faucets, and other items to be mounted in the countertop need to be at job site at time of installation to make cutouts <br></br>
        6. Additional trips will incure extra charges <br></br><br></br>
        <div className='centerFooter'>
          Make all checks payable to <b>Beta Granite Solutions</b> <br></br> 3511 Maverly Crest Ct Katy, TX 77494 <br></br>
          If you have any questions about this invoice, please contact <br></br> 
          Patricia Betancourt - Phone: (281)900-3285 * Email: patricia.betancourt@live.com <br></br>
          <b>Thank You For Your Business!</b>
        </div>
      </div>
    </main>
  )
}

export default Invoice