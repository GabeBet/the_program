import { useState } from "react"

const SqFt = ({ descriptionList, projectList, customerList }) => {

  const [inputFields, setInputFields] = useState([
    {description: '', length: '', width: '', total: ''}
  ])
  const [projectNumber, setProjectNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [grandTotal, setGrandTotal] = useState('');

  const [sqFtData, setSqFtData] = useState([
    {
      projectNumber: "PRY-100",
      inputFields: [{description: 'Closet Top', length: '144', width: '25', total: '25'}, {description: 'Decking', length: '62', width: '34', total: '15'}],
      grandTotal: '40',
    },
    {
      projectNumber: "PRY-101",
      inputFields: [{description: 'Coffee Table', length: '144', width: '20', total: '20'}, {description: 'Decking', length: '62', width: '34', total: '15'}],
      grandTotal: '35',
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

  const calculate = () => {
    inputFields?.forEach((row) => {
      row.total = (Math.ceil(row.length * row.width / 144))
    })
    setGrandTotal((inputFields.reduce((a,v) => a = a + v.total, 0)))
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
        setCustomerName(proj.customer);
      }
      sqFtData?.forEach((proj) => {
          if (proj.projectNumber === e.target.value){
            setInputFields(proj.inputFields);
            setGrandTotal(proj.grandTotal);
          }
      })
    })
  }

  const addFields = () => {
    let newField = {description: '', length: '', width: '', total: ''}
    setInputFields([...inputFields, newField])
  }

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index,1);
    setInputFields(data);
    calculate();
  }

  // const saveSqFt = () => {
  //
  // }
  
  return (
    <div className='SqFt'>
      <select className="SqFt-ProjectNumber"
        name='projectNumber'
        value={projectNumber}
        onChange={(e) => handleProjectChange(e)}>
        <option value="" disabled>Select Project...</option>
          {projectList.map(project => (
              <option key={project.id} value={project.value}>{project.projectNumber}</option>
          ))}
      </select>

      <textarea 
        disabled
        value={customerName}
        placeholder="Customer...">
          {customerName}
      </textarea>

      <form onSubmit={(e) => e.preventDefault()}>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <select 
                name='description'
                type='text'
                value={input.description}
                onChange={(e) => handleChange(index, e)}>
                  <option value="" disabled defaultValue={""}>Select Project Description...</option>
                  {descriptionList.map(item => (
                    <option key={item}>{item}</option>
                  ))
                }
              </select>
              <input
                name='length'
                type="number"
                placeholder="Length"
                value={input.length}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                name='width'
                type="number"
                placeholder="Width"
                value={input.width}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                name='total'
                type="display"
                placeholder="Total"
                value={input.total}
                readOnly
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
        <button onClick={addFields}>Add New Row...</button>
        <p></p>
        <input
            name='grandTotal'
            type="display"
            placeholder="Grand Total"
            value={grandTotal}
            readOnly
        />
        <br></br>
        <button >Save Square Footage</button>
      </form>
    </div>
  )
}

export default SqFt