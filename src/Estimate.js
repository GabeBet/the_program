import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
//import logo from './USLogo.jpg'
import api from './api/projects'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@progress/kendo-theme-default/dist/all.css';

const Estimate = ( { estimateData, setEstimateData, descriptionList, projectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');
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

  const { PDFExport } = require('@progress/kendo-react-pdf');
  const pdfExportComponent = useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

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

  const saveNotify = () => toast.success("Estimate Saved", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const updateNotify = () => toast.success("Estimate Updated!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

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

    if( !estimateData.find(proj => proj.projectNumber === e.target.value ) ) {
      setInputFields([{description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'}]);
      setDate('');
      setSubTotal('');
      setTax('')
      setTotal('')
      setDeposit('')
      setBalance('')
    } else {
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
          setDate(proj.startDate);
          setProjectDescription(proj.description);
        })
      }
    })
    if( !estimateData.find(proj => proj.projectNumber === projNumber ) ) {
      setInputFields([{description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'},
      {description: '', qty: '', unitPrice: '', amount: '0'}]);
      setDate('');
      setSubTotal('0');
      setTax('0')
      setTotal('0')
      setDeposit('0')
      setBalance('0')
    } else {
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
    }
  }

  const saveEstimate = async (e) => {
    e.preventDefault();
    saveNotify();
    const id = estimateData.length ? estimateData[estimateData.length - 1].id + 1 : 1;
    const newEstimateData = { id, projectNumber: projectNumber, date: date, inputFields: inputFields, 
      subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};
    try {
      const response = await api.post('/estimateData', newEstimateData);
      const allEstimateData = [...estimateData, response.data];
      setEstimateData(allEstimateData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const updateEstimate = async (id) => {
    updateNotify();
    const updatedEstimate = { id, projectNumber: projectNumber, date: date, inputFields: inputFields, 
      subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};
    try {
      const response = await api.put(`/estimateData/${id}`, updatedEstimate);
      setEstimateData(estimateData.map(est => est.id === id ? { ...response.data } : est));
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
    <main className='Estimate'>
      <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={exportPDFWithComponent}
        >
          Export to PDF
      </button>
      <PDFExport ref={pdfExportComponent} 
        paperSize="Letter" 
        fileName={`${projectNumber} Estimate`}
        margin={20}>
      
      <div className='EstimateHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <span className="leftTitle">Beta Granite Solutions</span> <span className="rightTitle"> Estimate </span> 
        <br></br>
        <span className="leftSubTitle">Phone: (281)900-3285 / (346)0446-8884</span> <span className="rightSubTitle">Date:&ensp;
          <input className='rightSubTitle'
            id='EstimateDate'
            type='date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /></span> 
        <span className="rightSubTitle">Project: &ensp;
          <select className="rightSubTitle"
            name='projectNumber'
            value={projectNumber}
            onChange={(e) => handleProjectChange(e)}>
            <option value="" disabled>Select Project...</option>
              {projectList.map(project => (
                  <option key={project.id} value={project.value}>{project.projectNumber}</option>
              ))}
          </select>
        </span>
      </div>

      <br></br><br></br>

      <div className='EstimateCustomer'>
        <b>Customer: </b> {`${name}`} <br></br>
        <b>Address:</b> {`${address}`} <br></br>
        <b>Phone:</b> {`${phone}`} <br></br>
        <b>Email:</b> {`${email}`}
      </div>
      
      <br></br> <h2 className='EstimateDescription'>Project: {projectDescription}</h2> <br></br>
          
      <div className='EstimateTable'>
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
        {!(estimateData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveEstimate(e)}>Save Estimate</button> 
        : estimateData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj.id} onClick={() => updateEstimate(proj.id)}>Update Estimate</button> : "")}
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

      <div className='EstimateFooter'>
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
        6. Additional trips will incure extra charges <br></br>
        <b>*This is only an estimate, price and material needed subject to change after final template*</b><br></br><br></br>
        <div className='centerFooter'>
          Make all checks payable to <b>Beta Granite Solutions</b> <br></br> 3511 Maverly Crest Ct Katy, TX 77494 <br></br>
          If you have any questions about this estimate, please contact <br></br> 
          Patricia Betancourt - Phone: (281)900-3285 * Email: patricia.betancourt@live.com <br></br>
          <b>Thank You For Your Business!</b>
        </div>
      </div>
      </PDFExport>
    </main>
    
  )
}

export default Estimate