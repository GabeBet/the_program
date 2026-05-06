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

  const fetchBankData = async () => {
    try {
      const response = await fetch('http://localhost:4000/bankstatement', {});
      const data = await response.json();
      setBankData(data.sort((a, b) => a.date < b.date ? 1 : -1));
    } catch (err) {
      console.log(`Error fetching bank data: ${err.message}`);
    }
  }

  const handleFileUpload = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        try {
          for (const data of results.data) {
            await addBankData(data);
          }
          await fetchBankData();
          uploadNotify();
          clearWaitingQueue();
        } catch (err) {
          errorNotify(err.message);
        }
      }
    });
    e.target.value = null;
  }

  const addBankData = async (data) => {
    try {
      const parsedAmount = Number(String(data.Amount).replace(/[^0-9.-]+/g, ''));
      if (Number.isNaN(parsedAmount)) {
        throw new Error('Invalid amount value');
      }
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: data.PostingDate, 
          description: data.Description, 
          amount: Math.round(parsedAmount * 100) / 100,
          debitCredit: data.Details, 
          category: data.Category, 
          projectNumber: data.ProjectNumber
        })
      };
      await fetch('http://localhost:4000/bankstatement', req);
    }catch (err) {
      throw err;
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