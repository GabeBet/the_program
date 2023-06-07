import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@progress/kendo-theme-default/dist/all.css';

const Estimate = ( { estimateData, setEstimateData, sqFtData, descriptionList, projectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState([{address: ''}]);
  const [actualAddress, setActualAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [projectDescription, setProjectDescription] = useState('');
  const [date, setDate] = useState('');

  const [subTotal, setSubTotal] = useState('');
  const [tax, setTax] = useState('0');
  const [total, setTotal] = useState('');
  const [deposit, setDeposit] = useState('0');
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
    {description: '', qty: '', unitPrice: '', amount: ''}
  ])

  const [freeInputFields, setFreeInputFields] = useState([ {freeText: ''},
    {freeText: ''},
    {freeText: ''}
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
  const errorNotify = (message) => toast.error(`Error Saving Estimate: ${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const errorUpdateNotify = (message) => toast.error(`Error Updating Estimate: ${message}`, {
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

  const handleFreeChange = (index, e) => {
    let data = [...freeInputFields];
    data[index][e.target.name] = e.target.value;
    setFreeInputFields(data);
  }

  const handleProjectChange = (e) => {
    setProjectNumber(e.target.value);
    let description = '';
    projectList?.forEach((proj) => {
      if (proj.projectNumber === e.target.value){
        customerList?.forEach((cust) => {
          if(proj.customerName === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          description = proj.description;
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
      {description: '', qty: '', unitPrice: '', amount: '0'}]);
      setFreeInputFields([{freeText: ''},
      {freeText: ''},
      {freeText: ''}]);
      setDate('');
      setSubTotal('');
      setTax('0')
      setTotal('')
      setDeposit('0')
      setBalance('')
      sqFtData?.forEach((sqft) => {
        if (sqft.projectNumber === e.target.value){
          setInputFields([{description: `${description}`, qty: `${sqft.grandTotal}`, unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'}]);
        }
      })
    } else {
      estimateData?.forEach((est) => {
        if (est.projectNumber === e.target.value){
          setActualAddress(est.address);
          setDate(est.date);
          setInputFields(est.inputFields);
          setFreeInputFields(est.freeInputFields);
          setSubTotal(est.subTotal);
          setTax(est.tax);
          setTotal(est.total);
          setDeposit(est.deposit);
          setBalance(est.balance);
        }
      })
    }
  }

  const handleProjectLoad = (projNumber) => {
    let description = '';
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projNumber){
        customerList?.forEach((cust) => {
          if(proj.customerName === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          setDate(proj.startDate);
          description = proj.description;
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
      {description: '', qty: '', unitPrice: '', amount: '0'}]);
      setFreeInputFields([{freeText: ''},
      {freeText: ''},
      {freeText: ''}]);
      setDate('');
      setSubTotal('0');
      setTax('0')
      setTotal('0')
      setDeposit('0')
      setBalance('0')
      sqFtData?.forEach((sqft) => {
        if (sqft.projectNumber === projNumber){
          setInputFields([{description: `${description}`, qty: `${sqft.grandTotal}`, unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'},
            {description: '', qty: '', unitPrice: '', amount: '0'}]);
        }
      })
    } else {
      estimateData?.forEach((est) => {
        if (est.projectNumber === projNumber){
          setActualAddress(est.address);
          setDate(est.date);
          setInputFields(est.inputFields);
          setFreeInputFields(est.freeInputFields);
          setSubTotal(est.subTotal);
          setTax(est.tax);
          setTotal(est.total);
          setDeposit(est.deposit);
          setBalance(est.balance);
        }
      })
    }
  }

  const saveEstimate = async (e) => {
    e.preventDefault();
    try {
      if (projectNumber === '') {
        throw new Error('Must have Project Number')
      }
      if (date === '') {
        throw new Error('Must have Date')
      }
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber,
          address: actualAddress,
          date: date, 
          inputFields: inputFields,
          freeInputFields: freeInputFields,
          subTotal: subTotal, 
          tax: tax,
          total: total, 
          deposit: deposit,
          balance: balance
        })
      };
      const res = await fetch('http://localhost:4000/estimate', req);
      const data = await res.json();
      setEstimateData((prevEst) => [...prevEst,data])
      saveNotify();
    } catch (err) {
      errorNotify(err);
    }
  }

  const updateEstimate = async (id) => {
    try {
      if (projectNumber === '') {
        throw new Error('Must have Project Number')
      }
      if (date === '') {
        throw new Error('Must have Date')
      }
      const req = { 
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber,
          address: actualAddress,
          date: date, 
          inputFields: inputFields,
          freeInputFields: freeInputFields,
          subTotal: subTotal, 
          tax: tax,
          total: total, 
          deposit: deposit,
          balance: balance
        })
      };
      await fetch(`http://localhost:4000/estimate/${id}`, req);

      const updatedEstimate = { _id: id, projectNumber: projectNumber, date: date, inputFields: inputFields, 
        freeInputFields: freeInputFields, subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};

      setEstimateData(estimateData.map(est => est._id === id ? { ...updatedEstimate } : est));
      updateNotify();
    } catch (err) {
      errorUpdateNotify(err.message);
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
        scale={.65}
        margin={20}>
      
      <div className='EstimateHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <span className="leftTitle">Beta Granite Solutions</span>
        <span className="rightTitle"> Estimate </span> <br></br>
        <span className="leftSubTitle">Phone: (281) 900-3285 / (346) 446-8884</span>
        <span className="rightSubTitle">
          <label>Date: </label>
          <input
            id='EstimateDate'
            type='date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}/>
        </span> <br></br>
        <span className='rightSubTitle'>
          <label>Project: </label>
          <select
            name='projectNumber'
            value={projectNumber}
            onChange={(e) => handleProjectChange(e)}>
            <option value="" disabled>Select Project...</option>
              {projectList.map(project => (
                  <option key={project._id} value={project.value}>{project.projectNumber}</option>
              ))}
          </select>
        </span>
      </div>

      <br></br><br></br>

      <div className='EstimateCustomer'>
        <b>Customer: </b> {`${name}`} <br></br>
        <b>Address: </b> 
        <select
          name='Address'
          value={actualAddress}
          onChange={(e) => setActualAddress(e.target.value)}>
            {address.map(add => (
                <option value={add.address}>{add.address}</option>
            ))}
        </select><br></br>
        <b>Phone: </b> {`${phone}`} <br></br>
        <b>Email: </b> {`${email}`}
      </div>

      <br></br>
      
      <h2 className='EstimateDescription'> Project: {projectDescription}</h2>

      <br></br>
          
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
                        <option key={item._id}>{item.description}</option>
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
            {freeInputFields.map((input, index) => {
            return (
              <tr>
                <td colspan="4">
                  <input key={index}
                    name='freeText'
                    type='text'
                    value={input.freeText}
                    onChange={(e) => handleFreeChange(index, e)}>
                  </input>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {!(estimateData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveEstimate(e)}>Save Estimate</button> 
        : estimateData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj._id} onClick={() => updateEstimate(proj._id)}>Update Estimate</button> : "")}
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