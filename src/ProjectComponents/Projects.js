import { Link } from "react-router-dom";
import ProjectFeed from "./ProjectFeed";
import Papa from "papaparse";
import template from "./CSVTemplate.csv"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'

const Projects = ({ projectList, setBankData, bankData }) => {

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

  const exportBankStatementsExcel = () => {
    if (!bankData || bankData.length === 0) {
      errorNotify('No bank data available to export');
      return;
    }
    try {
      toast.info('Generating Excel...',{ position: 'bottom-center', autoClose: 1000, theme: 'dark' })
    } catch (err) {
      console.log('Toast error', err);
    }
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const recordsByYear = bankData.reduce((acc, record) => {
      if (!record?.date) return acc;
      const year = new Date(record.date).getFullYear();
      if (Number.isNaN(year)) return acc;
      if (!acc[year]) acc[year] = [];
      acc[year].push(record);
      return acc;
    }, {});

    const workbook = XLSX.utils.book_new();

    Object.keys(recordsByYear).sort().forEach((year) => {
      const records = recordsByYear[year];
      const projects = [...new Set(records.map(r => r.projectNumber))].sort();
      const categories = [...new Set(records.map(r => r.category))].sort();

      // summary calculations
      const totalSalesMonthly = new Array(13).fill(0);
      const costOfSalesMonthly = new Array(13).fill(0);
      const totalExpensesMonthly = new Array(13).fill(0);
      records.forEach((rec) => {
        const d = new Date(rec.date);
        const mi = d.getMonth();
        const amt = Number(rec.amount) || 0;
        if (rec.debitCredit === 'Credit') {
          totalSalesMonthly[mi] += amt;
          totalSalesMonthly[12] += amt;
        } else if (rec.debitCredit === 'Debit') {
          totalExpensesMonthly[mi] += amt;
          totalExpensesMonthly[12] += amt;
        }
        // try to detect cost of sales by category name containing 'cost'
        if (rec.category && String(rec.category).toLowerCase().includes('cost')) {
          costOfSalesMonthly[mi] += amt;
          costOfSalesMonthly[12] += amt;
        }
      });

      const grossProfitMonthly = totalSalesMonthly.map((v,i) => v - costOfSalesMonthly[i]);
      const netProfitMonthly = grossProfitMonthly.map((v,i) => v - totalExpensesMonthly[i]);

      const profitRows = [['Project Number', ...monthNames, 'YTD']];
      projects.forEach((projNum) => {
        const monthly = new Array(13).fill(0);
        records.forEach((rec) => {
          if (rec.projectNumber !== projNum || rec.debitCredit !== 'Credit') return;
          const d = new Date(rec.date);
          const mi = d.getMonth();
          const amt = Number(rec.amount) || 0;
          monthly[mi] += amt;
          monthly[12] += amt;
        });
        profitRows.push([projNum, ...monthly.map(v => (v === 0 ? '' : v))]);
      });

      const expenseRows = [['Category', ...monthNames, 'YTD']];
      categories.forEach((cat) => {
        const monthly = new Array(13).fill(0);
        records.forEach((rec) => {
          if (rec.category !== cat || rec.debitCredit !== 'Debit') return;
          const d = new Date(rec.date);
          const mi = d.getMonth();
          const amt = Number(rec.amount) || 0;
          monthly[mi] += amt;
          monthly[12] += amt;
        });
        expenseRows.push([cat, ...monthly.map(v => (v === 0 ? '' : v))]);
      });

      const totalSalesRow = ['Total Sales', ...totalSalesMonthly.map(v => (v === 0 ? '' : v))];
      const costOfSalesRow = ['Cost of Sales', ...costOfSalesMonthly.map(v => (v === 0 ? '' : v))];
      const grossProfitRow = ['Gross Profit', ...grossProfitMonthly.map(v => (v === 0 ? '' : v))];

      const totalExpensesRow = ['Total Expenses', ...totalExpensesMonthly.map(v => (v === 0 ? '' : v))];
      const netProfitRow = ['Net Profit/Loss', ...netProfitMonthly.map(v => (v === 0 ? '' : v))];

      const sheet = [
        [`Profit and Loss - Year ${year}`],
        [],
        ...profitRows,
        [],
        totalSalesRow,
        costOfSalesRow,
        grossProfitRow,
        [],
        ['Expenses'],
        ...expenseRows,
        [],
        totalExpensesRow,
        netProfitRow
      ];

      const ws = XLSX.utils.aoa_to_sheet(sheet);
      ws['!cols'] = [{ wch: 20 }, ...new Array(12).fill({ wch: 12 }), { wch: 14 }];
      XLSX.utils.book_append_sheet(workbook, ws, `${year}`);
    });

    try {
      XLSX.writeFile(workbook, 'BankStatements_By_Year.xlsx');
      toast.success('Export complete', { position: 'bottom-center', autoClose: 2000, theme: 'dark' });
    } catch (err) {
      errorNotify(err.message || 'Export failed');
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
      <button className='fileButton' onClick={exportBankStatementsExcel} style={{ marginLeft: '1rem' }}>Export Bank Statements (All Projects)</button>

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