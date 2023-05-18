import { useState } from "react"
import { useLocation } from "react-router-dom";
import api from './api/projects'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SqFt = ({ sqFtData, setSqFtData, descriptionList, projectList }) => {
  
  const [loaded, setLoaded] = useState(false);

  const [inputFields, setInputFields] = useState([
    {description: '', length: '', width: '', total: ''}
  ])
  const [projectNumber, setProjectNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [grandTotal, setGrandTotal] = useState('');

  const saveNotify = () => toast.success("Square Footage Saved", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const updateNotify = () => toast.success("Square Footage Updated!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

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

    if( !sqFtData.find(proj => proj.projectNumber === e.target.value ) ) {
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
    if( !sqFtData.find(proj => proj.projectNumber === projNumber ) ) {
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

  const addFields = (e) => {
    e.preventDefault();
    let newField = {description: '', length: '', width: '', total: ''}
    setInputFields([...inputFields, newField])
  }

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index,1);
    setInputFields(data);
    calculate();
  }

  const saveSqFt = async (e) => {
    e.preventDefault();
    saveNotify();
    const id = sqFtData.length ? sqFtData[sqFtData.length - 1].id + 1 : 1;
    const newSqFtData = { id, projectNumber: projectNumber, inputFields: inputFields, grandTotal: grandTotal};
    try {
      const response = await api.post('/sqFtData', newSqFtData);
      const allSqFtData = [...sqFtData, response.data];
      setSqFtData(allSqFtData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const updateSqFt = async (id) => {
    updateNotify();
    const updatedSqFt = { id, projectNumber: projectNumber, inputFields: inputFields, grandTotal: grandTotal };
    try {
      const response = await api.put(`/sqFtData/${id}`, updatedSqFt);
      setSqFtData(sqFtData.map(sqft => sqft.id === id ? { ...response.data } : sqft));
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
          
      <form>
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
              <button className="deleteButton" onClick={() => removeFields(index)}>Remove Row</button>
            </div>
          )
        })}
        <button className="addButton" onClick={addFields}>Add New Row...</button>
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
      {!(sqFtData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveSqFt(e)}>Save Square Footage</button> 
        : sqFtData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj.id} onClick={() => updateSqFt(proj.id)}>Update Square Footage</button> : "")}
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
  )
}

export default SqFt