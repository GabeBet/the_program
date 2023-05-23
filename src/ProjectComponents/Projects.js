import { Link } from "react-router-dom";
import ProjectFeed from "./ProjectFeed";
import Papa from "papaparse";
import api from "../api/projects"

const Projects = ({ projectList, bankData, setBankData }) => {

  const handleFileUpload = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data?.forEach((data) => {
          addBankData(data);
        })
      },
    });
  }

  const addBankData = async (data) => {
    const id = bankData.length ? bankData[bankData.length - 1].id + 1 : 1;
    const newBankData = { id, description: data.Description, amount: `$${(Math.round(data.Amount * 100) / 100).toFixed(2)}`, 
      debitCredit: data.DebitCredit, category: data.Category, projectNumber: data.ProjectNumber};
    try {
      const response = await api.post('/bankData', newBankData);
      const allBankData = [...bankData, response.data];
      setBankData(allBankData);
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <main className='Projects'>
      <h2>Projects</h2> 
      <Link to={'/add-project'}><button className="addButton">Add Project</button></Link>

      <br></br><br></br>

      <label htmlFor="fileUpload">Bulk Bank Statment Upload: </label>
      <input
        type="file"
        id="fileUpload"
        accept=".csv"
        onChange={handleFileUpload}
      />

      {projectList.length ? (
        <ProjectFeed projectList={projectList} />
      ) : (
        <p style={{ marginTop: "2rem"}}>
          No Projects Yet
        </p>
      )}
    </main>
  )
}

export default Projects