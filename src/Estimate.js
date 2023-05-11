import { useState } from 'react'
//import logo from './USLogo.jpg'

const Estimate = ( { sqFtData, descriptionList, projectList, customerList }) => {
  const [projectNumber, setProjectNumber] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [date, setDate] = useState('');

  const [inputFields, setInputFields] = useState([
    {description: '', qty: '', unitPrice: '', amount: ''}
  ])

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
          setDate(proj.startDate)
        })
      }
    })

    // if( !checkSqFtData(e) ) {
    //   setInputFields([{description: '', length: '', width: '', total: ''}]);
    //   setGrandTotal('0');
    // } else {
    //   sqFtData?.forEach((proj) => {
    //     if (proj.projectNumber === e.target.value){
    //       setInputFields(proj.inputFields);
    //       setGrandTotal(proj.grandTotal);
    //     }
    //   })
    // }
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
        <h4>Description &emsp;&emsp;&emsp; Qty &emsp;&emsp;&emsp; Unit Price &emsp;&emsp;&emsp; Amount</h4>

      </div>
    </main>
  )
}

export default Estimate