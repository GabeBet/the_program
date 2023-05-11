import { useState } from "react"
import { useLocation } from "react-router-dom";

const SqFt = ({ sqFtData, setSqFtData, descriptionList, projectList }) => {
  
  const [loaded, setLoaded] = useState(false);

  const [inputFields, setInputFields] = useState([
    {description: '', length: '', width: '', total: ''}
  ])
  const [projectNumber, setProjectNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [grandTotal, setGrandTotal] = useState('');

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
    })

    if( !checkSqFtData(e) ) {
      setInputFields([{description: '', length: '', width: '', total: ''}]);
      setGrandTotal('0');
    } else {
      sqFtData?.forEach((proj) => {
        if (proj.projectNumber === e.target.value){
          setInputFields(proj.inputFields);
          setGrandTotal(proj.grandTotal);
        }
      })
    }
  }

  const handleProjectLoad = (projNumber) => {
    projectList?.forEach((proj) => {
      if (proj.projectNumber === projNumber){
        setCustomerName(proj.customer);
      }
    })
    if( !checkSqFtDataLoad(projNumber) ) {
      setInputFields([{description: '', length: '', width: '', total: ''}]);
      setGrandTotal('0');
    } else {
      sqFtData?.forEach((proj) => {
        if (proj.projectNumber === projNumber){
          setInputFields(proj.inputFields);
          setGrandTotal(proj.grandTotal);
        }
      })
    }
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

  const saveSqFt = (e) => {
    e.preventDefault();
    if( checkSqFtData(e) ) {
      sqFtData?.forEach((sf) => {
          sf.inputFields = inputFields;
          sf.grandTotal = grandTotal;
      })
    } else {
      const newSqFtData = { projectNumber: projectNumber, inputFields: inputFields, grandTotal: grandTotal};
      const allSqFtData = [...sqFtData, newSqFtData];
      setSqFtData(allSqFtData);
    }
    console.log(sqFtData)
  }

  const checkSqFtData = (e) => {
    if( sqFtData.find(proj => proj.projectNumber === e.target.value )) {
      return true;
    } else {
      return false;
    }
  }

  const checkSqFtDataLoad = (e) => {
    if( sqFtData.find(proj => proj.projectNumber === e )) {
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
      <h4>Customer: {customerName}</h4>
          
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
      </form>
      <button onClick={saveSqFt}>Save Square Footage</button>
    </div>
  )
}

export default SqFt