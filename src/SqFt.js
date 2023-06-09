import { useState } from "react"
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SqFt = ({ sqFtData, setSqFtData, descriptionList, projectList }) => {
  
  const [loaded, setLoaded] = useState(false);

  const [inputFields, setInputFields] = useState([
    {description: '', length: '', width: '', length2: '', width2: '', length3: '', width3: '', total: ''}
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
  const errorNotify = (message) => toast.error(`Error Saving Square Footage: ${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
  const errorUpdateNotify = (message) => toast.error(`Error Updating Square Footage: ${message}`, {
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
      row.total = Math.ceil(row.length * row.width / 144) + Math.ceil(row.length2 * row.width2 / 144) + Math.ceil(row.length3 * row.width3 /144 )
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
        setCustomerName(proj.customerName);
      }
    })

    if( !sqFtData.find(proj => proj.projectNumber === e.target.value ) ) {
      setInputFields([{description: '', length: '', width: '', length2: '', width2: '',length3: '', width3: '', total: ''}]);
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
        setCustomerName(proj.customerName);
      }
    })
    if( !sqFtData.find(proj => proj.projectNumber === projNumber ) ) {
      setInputFields([{description: '', length: '', width: '', length2: '', width2: '',length3: '', width3: '', total: ''}]);
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
    let newField = {description: '', length: '', width: '', length2: '', width2: '',length3: '', width3: '', total: ''}
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
    try {
      if (projectNumber === '') {
        throw new Error('Must have Project Number')
      }
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber, 
          inputFields: inputFields, 
          grandTotal: grandTotal
        })
      };
      const res = await fetch('http://localhost:4000/squarefootage', req);
      const data = await res.json();
      setSqFtData((prevSqFt) => [...prevSqFt,data])
      saveNotify();
    } catch (err) {
      errorNotify(err);
    }
  }

  const updateSqFt = async (id) => {
    try {
      if (projectNumber === ''){
        throw new Error('Must have Project Number')
      }
      const req = { 
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: projectNumber, 
          inputFields: inputFields, 
          grandTotal: grandTotal
        })
      };
      await fetch(`http://localhost:4000/squarefootage/${id}`, req);

      const updatedSqFt = { _id: id, projectNumber: projectNumber, inputFields: inputFields, grandTotal: grandTotal };

      setSqFtData(sqFtData.map(sqft => sqft._id === id ? { ...updatedSqFt } : sqft));
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
    <div className='SqFt'>
      <select className="SqFt-ProjectNumber"
        name='projectNumber'
        value={projectNumber}
        onChange={(e) => handleProjectChange(e)}>
        <option value="" disabled>Select Project...</option>
          {projectList.map(project => (
              <option key={project._id}>{project.projectNumber}</option>
          ))}
      </select>
      <br></br><br></br>
      <h4>Customer: {customerName}</h4>
          
      <table>
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
                    <option key={item._id}>{item.description}</option>
                  ))
                }
              </select></td>
              <td><input
                name='length'
                type="number"
                placeholder="Length"
                value={input.length}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='width'
                type="number"
                placeholder="Width"
                value={input.width}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='length2'
                type="number"
                placeholder="Length2"
                value={input.length2}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='width2'
                type="number"
                placeholder="Width2"
                value={input.width2}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='length3'
                type="number"
                placeholder="Length3"
                value={input.length3}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='width3'
                type="number"
                placeholder="Width3"
                value={input.width3}
                onChange={(e) => handleChange(index, e)}
              /></td>
              <td><input
                name='total'
                type="display"
                placeholder="Total"
                value={input.total}
                readOnly
              /></td>
              <button className="deleteButton" onClick={() => removeFields(index)}>Remove Row</button>
            </tr>
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
      </table>
      {!(sqFtData.find(proj => proj.projectNumber === projectNumber)) 
        ? <button className="saveButton" onClick={(e) => saveSqFt(e)}>Save Square Footage</button> 
        : sqFtData.map(proj => (proj.projectNumber === projectNumber) ?
        <button className="editButton" key={proj._id} onClick={() => updateSqFt(proj._id)}>Update Square Footage</button> : "")}
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