import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
//import logo from './USLogo.jpg'

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

    if( !checkEstimateData(e) ) {
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
    if( !checkEstimateDataLoad(projNumber) ) {
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

  const saveEstimate = (e) => {
    e.preventDefault();
    if( checkEstimateData(e) ) {
      estimateData?.forEach((est) => {
          est.date = date
          est.inputFields = inputFields;
          est.subTotal = subTotal;
          est.tax = tax;
          est.total = total;
          est.deposit = deposit;
          est.balance = balance
      })
    } else {
      const newEstimateData = { projectNumber: projectNumber, date: date, inputFields: inputFields, 
        subTotal: subTotal, tax: tax, total: total, deposit: deposit, balance: balance};
      const allEstimateData = [...estimateData, newEstimateData];
      setEstimateData(allEstimateData);
    }
  }

  const checkEstimateData = (e) => {
    if( estimateData.find(proj => proj.projectNumber === e.target.value )) 
      return true;
    else
      return false;
  }

  const checkEstimateDataLoad = (e) => {
    if( estimateData.find(proj => proj.projectNumber === e )) {
      return true;
    } else {
      return false;
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
      <div className='EstimateHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <span class="leftTitle">Beta Granite Solutions</span> <span class="rightTitle"> Estimate </span> 
        <br></br>
        <span class="leftSubTitle">Phone: (281)900-3285 / (346)0446-8884</span> <span class="rightSubTitle">Date:&ensp;
          <input className='rightSubTitle'
            id='EstimateDate'
            type='date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /></span> 
        <span class="rightSubTitle">Project: &ensp;
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
        </table>
        <button className='saveButton' onClick={saveEstimate}>Save Estimate</button>
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
    </main>
  )
}

export default Estimate