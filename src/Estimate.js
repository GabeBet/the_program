import { useState } from 'react'
//import logo from './USLogo.jpg'

const Estimate = ( { sqFtData, descriptionList, projectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [projectDescription, setProjectDescription] = useState('');
  const [date, setDate] = useState('');

  const [subTotal, setSubTotal] = useState('');
  const [tax, setTax] = useState('');
  const [total, setTotal] = useState('');

  const [inputFields, setInputFields] = useState([
    {description: '', qty: '', unitPrice: '', amount: ''}
  ])

  const [estimateData, setEstimateData] = useState([
    {
      projectNumber: 'PRY-100', 
      inputFields: [{description: 'Closet Top', qty: '17', unitPrice: '26', amount: '442'}], 
      subTotal: '422',
      tax: '34.82',
      total: '456.82'
    }
  ])

  const calculate = () => {
    inputFields?.forEach((row) => {
      row.amount = (Math.ceil(row.qty * row.unitPrice))
    })
    setSubTotal((inputFields.reduce((a,v) => a = a + v.amount, 0)))
    setTotal(subTotal+tax)
  }

  const handleChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
    calculate();
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
          setDate(proj.startDate);
          setProjectDescription(proj.description);
        })
      }
    })

    if( !checkEstimateData(e) ) {
      setInputFields([{description: '', qty: '', unitPrice: '', amount: ''}]);
      setSubTotal('0');
      setTax('0')
      setTotal('0')
    } else {
      estimateData?.forEach((proj) => {
        if (proj.projectNumber === e.target.value){
          setInputFields(proj.inputFields);
          setSubTotal(proj.subTotal);
          setTax(proj.tax);
          setTotal(proj.total);
        }
      })
    }
  }

  const handleTaxChange = (e) => {
    setTax(e.target.value);
    calculate();
  }

  const saveEstimate = (e) => {
    e.preventDefault();
    if( checkEstimateData(e) ) {
      estimateData?.forEach((est) => {
          est.inputFields = inputFields;
          est.subTotal = subTotal;
          est.tax = tax;
          est.total = total;
      })
    } else {
      const newEstimateData = { projectNumber: projectNumber, inputFields: inputFields, subTotal: subTotal, tax: tax, total: total};
      const allEstimateData = [...estimateData, newEstimateData];
      setEstimateData(allEstimateData);
    }
  }

  const checkEstimateData = (e) => {
    if( estimateData.find(proj => proj.projectNumber === e.target.value )) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <main className='Estimate'>
      <div className='EstimateHeading'>
        {/* <img src={logo} className="CompanyLogo" alt="logo" /> */}
        <h2>Beta Granite Solutions &emsp;&emsp;&emsp; Estimate </h2>
        <h5>Phone: (281)-900-3285 / (346)-0446-8884 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Date: {`${date}`}</h5>
        <h5>Project: &ensp;
          <select className="SqFt-ProjectNumber"
            name='projectNumber'
            value={projectNumber}
            onChange={(e) => handleProjectChange(e)}>
            <option value="" disabled>Select Project...</option>
              {projectList.map(project => (
                  <option key={project.id} value={project.value}>{project.projectNumber}</option>
              ))}
          </select>
        </h5>
      </div>

      <br></br>

      <div className='EstimateCustomer'>
        {`Customer: ${name}`} <br></br>
        {`Address: ${address}`} <br></br>
        {`Phone: ${phone}`} <br></br>
        {`Email: ${email}`}
      </div>
      
      <br></br>

      <div className='EstimateTable'>
        <h4>{projectDescription}</h4>
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
                    <option value="" disabled defaultValue={""}>Select Project Description...</option>
                    {descriptionList.map(item => (
                      <option key={item}>{item}</option>
                    ))
                  }
                </select></td>
                <td><input
                  name='qty'
                  type="number"
                  placeholder="Qty"
                  value={input.qty}
                  onChange={(e) => handleChange(index, e)}
                /></td>
                <td><input
                  name='unitPrice'
                  type="number"
                  placeholder="Unit Price"
                  value={input.unitPrice}
                  onChange={(e) => handleChange(index, e)}
                /></td>
                <td><input
                  name='amount'
                  type="display"
                  placeholder="Amount"
                  value={input.amount}
                  readOnly
                /></td>
              </tr>
            )
          })}
        </table>
        <button onClick={saveEstimate}>Save Estimate</button>
      </div>

      <br></br>

      <div className='EstimateFooter'>
          <p>
            <input
              name='subTotal'
              type="display"
              placeholder="Sub Total"
              value={subTotal}
              readOnly
            /><br></br>
            <input
              name='tax'
              type="number"
              placeholder="Tax"
              value={tax}
              onChange={(e) => handleTaxChange(e)}
            /><br></br>
            <input
              name='total'
              type="display"
              placeholder="Total"
              value={total}
              readOnly
            />
          </p>
      </div>
    </main>
  )
}

export default Estimate