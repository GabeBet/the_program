import { Link } from "react-router-dom";
import ProjectFeed from "./ProjectFeed";
import Papa from "papaparse";
import template from "./CSVTemplate.csv"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Projects = ({ projectList, setBankData }) => {

  const uploadNotify = () => toast.success("File Successfully Uploaded!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const errorNotify = (message) => toast.error(`Error Uploading File: ${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });

  const clearWaitingQueue = () => {
    toast.clearWaitingQueue();
  }

  const handleFileUpload = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data.forEach((data) => {
          addBankData(data);
        })
      }
    });
    e.target.value = null;
  }

  const addBankData = async (data) => {
    try {
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: data.PostingDate, 
          description: data.Description, 
          amount: `$${(Math.round(data.Amount * 100) / 100).toFixed(2)}`, 
          debitCredit: data.Details, 
          category: data.Category, 
          projectNumber: data.ProjectNumber
        })
      };
      const res = await fetch('http://localhost:4000/bankstatement', req);
      const bData = await res.json();
      setBankData((prevBD) => [...prevBD,bData])
      uploadNotify();
      clearWaitingQueue();
    }catch (err) {
      errorNotify(err.message);
    }
  }

  return (
    <main className='Projects'>
      <h2>Projects</h2> 
      <Link to={'/add-project'}><button className="addButton">Add Project</button></Link>

      <br></br><br></br>

      <form>
        <label htmlFor="fileUpload">Bulk Bank Statment Upload: </label>
        <input
          type="file"
          id="fileUpload"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </form>
      <a href={template} download="CSVTemplate" rel="noreferrer" target="_blank">
        <button className="downloadButton">Download Template</button>
      </a>

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
        limit={1}
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