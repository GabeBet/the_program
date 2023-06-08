import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import '@progress/kendo-theme-default/dist/all.css';

const Invoice = ( { invoiceData, setInvoiceData, estimateData, descriptionList, projectList, setProjectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

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
  const errorNotify = (message) => toast.error(`Error Saving Invoice: ${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const errorUpdateNotify = (message) => toast.error(`Error Updating Invoice: ${message}`, {
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
    {description: '', qty: '', unitPrice: '', amount: ''}
  ])

  const [freeInputFields, setFreeInputFields] = useState([ {freeText: ''},
    {freeText: ''},
    {freeText: ''}
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

  const handleFreeChange = (index, e) => {
    let data = [...freeInputFields];
    data[index][e.target.name] = e.target.value;
    setFreeInputFields(data);
  }

  const handleProjectChange = (e) => {
    setProjectNumber(e.target.value);
    projectList?.forEach((proj) => {
      if (proj.projectNumber === e.target.value){
        customerList?.forEach((cust) => {
          if(proj.customerName === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          setProjectDescription(proj.description);
        })
      }
    })

    if( invoiceData.find(inv => inv.projectNumber === e.target.value ) ) {
      invoiceData?.forEach((inv) => {
        if (inv.projectNumber === e.target.value){
          setInvoiceNumber(inv.invoiceNumber);
          setActualAddress(inv.address);
          setDate(inv.date);
          setInputFields(inv.inputFields);
          setFreeInputFields(inv.freeInputFields);
          setSubTotal(inv.subTotal);
          setTax(inv.tax);
          setTotal(inv.total);
          setDeposit(inv.deposit);
          setBalance(inv.balance);
        }
      })
    } else if ( estimateData.find(est => est.projectNumber === e.target.value ) ) {
      estimateData?.forEach((est) => {
        if (est.projectNumber === e.target.value){
          setInputFields(est.inputFields);
          setActualAddress(est.address);
          setSubTotal(est.subTotal);
          setTax(est.tax);
          setTotal(est.total);
          setDeposit(est.deposit);
          setBalance(est.balance);
        }
      })
    } else {
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
      setInvoiceNumber('');
      setActualAddress('');
      setDate('');
      setSubTotal('');
      setTax('0');
      setTotal('');
      setDeposit('0');
      setBalance('');
    }
  }

  const handleProjectLoad = (projNumber) => {
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projNumber){
        customerList?.forEach((cust) => {
          if(proj.customerName === cust.name){
            setName(cust.name);
            setAddress(cust.address);
            setPhone(cust.phone);
            setEmail(cust.email);
          }
          setProjectDescription(proj.description);
        })
      }
    })
    if( invoiceData.find(inv => inv.projectNumber === projNumber ) ) {
      invoiceData?.forEach((inv) => {
        if (inv.projectNumber === projNumber){
          setInvoiceNumber(inv.invoiceNumber);
          setActualAddress(inv.address);
          setDate(inv.date);
          setInputFields(inv.inputFields);
          setFreeInputFields(inv.freeInputFields);
          setSubTotal(inv.subTotal);
          setTax(inv.tax);
          setTotal(inv.total);
          setDeposit(inv.deposit);
          setBalance(inv.balance);
        }
      })
    } else if ( estimateData.find(est => est.projectNumber === projNumber ) ) {
      estimateData?.forEach((est) => {
        if (est.projectNumber === projNumber){
          setInputFields(est.inputFields);
          setFreeInputFields(est.freeInputFields);
          setActualAddress(est.address);
          setDate('');
          setSubTotal(est.subTotal);
          setTax(est.tax);
          setTotal(est.total);
          setDeposit(est.deposit);
          setBalance(est.balance);
        }
      })
    } else {
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
      setInvoiceNumber('');
      setActualAddress('');
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
    try {
      if (projectNumber === '') {
        throw new Error('Must have Project Number')
      }
      if (date === '') {
        throw new Error('Must have Date')
      }
      if (invoiceNumber === '') {
        throw new Error('Must have Invoice Number')
      }
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber,
          invoiceNumber: invoiceNumber,
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
      const res = await fetch('http://localhost:4000/invoice', req);
      const data = await res.json();
      setInvoiceData((prevInv) => [...prevInv,data])
      saveNotify();

      let id = '';
      let updatedProject = {};
      let reqProj = '';
      projectList?.forEach((proj) => {
        if (proj.projectNumber === projectNumber){
          id = proj._id;
          updatedProject = { _id: id, description: proj.description, customerName: proj.customerName, projectNumber: proj.projectNumber, 
            invoiceNumber: invoiceNumber, startDate: proj.startDate, endDate: proj.endDate};
          reqProj = { 
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: proj.description, 
              customerName: proj.customerName, 
              projectNumber: proj.projectNumber, 
              invoiceNumber: invoiceNumber, 
              startDate: proj.startDate, 
              endDate: proj.endDate
            })
          }
        }
      })
      await fetch(`http://localhost:4000/projects/${id}`, reqProj);
      setProjectList(projectList.map(project => project._id === id ? {...updatedProject } : project));
    } catch (err) {
      errorNotify(err);
    }
  }

  const updateInvoice = async (id) => {
    try {
      if (projectNumber === '') {
        throw new Error('Must have Project Number')
      }
      if (date === '') {
        throw new Error('Must have Date')
      }
      if (invoiceNumber === '') {
        throw new Error('Must have Invoice Number')
      }
      const req = { 
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber,
          invoiceNumber: invoiceNumber,
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
      await fetch(`http://localhost:4000/invoice/${id}`, req);

      const updatedInvoice = { _id: id, projectNumber: projectNumber, invoiceNumber: invoiceNumber, date: date, inputFields: inputFields, 
        freeInputFields: freeInputFields, subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};

      setInvoiceData(invoiceData.map(inv => inv._id === id ? { ...updatedInvoice } : inv));
      updateNotify();

      let updatedProject = {};
      let reqProj = '';
      projectList?.forEach((proj) => {
        if (proj.projectNumber === projectNumber){
          id = proj._id;
          updatedProject = { _id: id, description: proj.description, customerName: proj.customerName, projectNumber: proj.projectNumber, 
            invoiceNumber: invoiceNumber, startDate: proj.startDate, endDate: proj.endDate};
          reqProj = { 
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: proj.description, 
              customerName: proj.customerName, 
              projectNumber: proj.projectNumber, 
              invoiceNumber: invoiceNumber, 
              startDate: proj.startDate, 
              endDate: proj.endDate
            })
          }
        }
      })
      await fetch(`http://localhost:4000/projects/${id}`, reqProj);
      setProjectList(projectList.map(project => project._id === id ? {...updatedProject } : project));
    } catch (err) {
      errorUpdateNotify(err.message);
    }
  }

  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { 
      if (location !== null){
        const { linkedNumber } = location.state;
        if (!loaded){
          setProjectNumber(linkedNumber);
          setLoaded(true);
          handleProjectLoad(linkedNumber);
        }
      }
    } catch (err) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <main className='Invoice'>
      <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={exportPDFWithComponent}
        >
          Export to PDF
      </button>
      <PDFExport ref={pdfExportComponent} 
        paperSize="Letter" 
        fileName={`${projectNumber} Invoice`}
        scale={.65}
        margin={20}>

      <div className='InvoiceHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <span className="leftTitle">Beta Granite Solutions</span> <span className="rightTitle"> Invoice </span> 
        <br></br>
        <span className="leftSubTitle">Phone: (281) 900-3285 / (346) 446-8884</span> <span className="rightSubTitle">Date:&ensp;
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
                  <option key={project._id} value={project.value}>{project.projectNumber}</option>
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
        <b>Address:</b> 
        <select
          name='Address'
          value={actualAddress}
          onChange={(e) => setActualAddress(e.target.value)}>
            {address.map(add => (
                <option value={add.address} key={add.address}>{add.address}</option>
            ))}
        </select><br></br>
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
                  <td className='dollar'><input
                    name='unitPrice'
                    type="number"
                    value={input.unitPrice}
                    onChange={(e) => handleChange(index, e)}
                  /></td>
                  <td className='dollar'><input
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
              <tr key={index}>
                <td colSpan="4">
                  <input
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
        {!(invoiceData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveInvoice(e)}>Save Invoice</button> 
        : invoiceData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj._id} onClick={() => updateInvoice(proj._id)}>Update Invoice</button> : "")}
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

      <div className='InvoiceFooter'>
        <span className='rightFooter'>
          <label> Subtotal:&ensp;</label>
          $<input
            name='subTotal'
            type="display"
            placeholder="Sub Total"
            value={subTotal}
            readOnly
          /><br></br>

          <label> Tax:&ensp;</label>
          $<input
            name='tax'
            type="number"
            placeholder="Tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          /><br></br>

          <label> Total:&ensp;</label>
          $<input
            name='total'
            type="display"
            placeholder="Total"
            value={total}
            readOnly
          /><br></br>

          <label> Deposit:&ensp;</label>
          $<input
            name='deposit'
            type="number"
            placeholder="Deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          /><br></br>

          <label> Balance:&ensp;</label>
          $<input
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
        6. Additional trips will incure extra charges <br></br><br></br><br></br><br></br>
        <div className='centerFooter'>
          Make all checks payable to <b>Beta Granite Solutions</b> <br></br> 3511 Maverly Crest Ct Katy, TX 77494 <br></br>
          If you have any questions about this invoice, please contact <br></br> 
          Patricia Betancourt - Phone: (281)900-3285 * Email: patricia.betancourt@live.com <br></br>
          <b>Thank You For Your Business!</b>
        </div>
      </div>
      </PDFExport>
    </main>
  )
}

export default Invoice