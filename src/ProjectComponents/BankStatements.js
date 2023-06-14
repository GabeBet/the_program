import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BankStatements = ({ bankData, setBankData, projectList }) => {
  const { id } = useParams();
  const proj = projectList.find(proj => (proj._id) === id);
  
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [debitCredit, setDebitCredit] = useState('');
  const [category, setCategory] = useState('');
  
  const [categoryList] = useState([
    "Deposit",
    "EZTag",
    "Fabrication",
    "Food",
    "Gas",
    "Helper",
    "Installation",
    "Materials",
    "Misc",
    "Office Supplies",
    "Tools"
  ]);

  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    setExpenses(0);
    setIncome(0);
    setProfit(0);

    setExpenses(bankData.reduce((acc, val) => {
      if(val.debitCredit === "Debit")
        acc = acc + val.amount;
      return acc;
    },0));

    setIncome(bankData.reduce((acc, val) => {
      if(val.debitCredit === "Credit")
        acc = acc + val.amount;
      return acc;
    },0));

    setProfit(bankData.reduce((acc, val) => {
      if(val.debitCredit === "Debit")
        acc = acc - val.amount;
      else if(val.debitCredit === "Credit")
        acc = acc + val.amount;
      return acc;
    },0));

  },[bankData]);

  if (!proj) {
    return "Loading..."
  }

  const handleAddBank = async (e) => {
    e.preventDefault();
    try {
      const req = { 
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: date,
          description: description, 
          amount: amount, 
          debitCredit: debitCredit, 
          category: category, 
          projectNumber: proj.projectNumber
        })
      };
      const res = await fetch('http://localhost:4000/bankstatement', req);
      const data = await res.json();
      setBankData((prevBD) => [...prevBD,data].sort((a, b) => a.date < b.date ? 1 : -1))
      setDate('');
      setDescription('');
      setAmount('');
      setDebitCredit('');
      setCategory('');
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleRemoveBank = async (id) => {
    try{
      await fetch(`http://localhost:4000/bankstatement/${id}`, {method: 'DELETE'});
      const filtedBankData = bankData.filter(bank => bank._id !== id);
      setBankData(filtedBankData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className='BankStatements'>
      <div className='BankTable'>
        <h1>{proj.projectNumber} / INV# {proj.invoiceNumber}</h1>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Debit/Credit</th>
              <th>Category</th>
            </tr>
            {bankData.map((bank) => {
              return (
              <tr key={bank._id} style={bank.debitCredit === "Debit" ? {backgroundColor:"#ffcccb"} : {backgroundColor:"#ddeedc"}}>
                {(bank.projectNumber === proj.projectNumber) ?
                  <>
                    <td>{bank.date}</td>
                    <td>{bank.description}</td> 
                    <td>{`$${(Math.round(bank.amount * 100) / 100).toFixed(2)}`}</td> 
                    <td>{bank.debitCredit}</td> 
                    <td>{bank.category}</td>
                    <td><button onClick={() => handleRemoveBank(bank._id)} className='deleteButton'>Remove Bank Statement</button></td>
                  </>
                  : <></> }
              </tr>
              )
            })}
            <tr>
              <td style={{border:"none"}}></td>
              <td style={{textAlign:"left", padding:"0.5rem", backgroundColor:"#ff726f"}}>Expenses: {`$${(Math.round(expenses * 100) / 100).toFixed(2)}`}</td>
              <td style={{textAlign:"left", padding:"0.5rem", backgroundColor:"#a1d09e"}}>Income: {`$${(Math.round(income * 100) / 100).toFixed(2)}`}</td>
              <td style={profit < 0 ? {backgroundColor:"#ff726f", textAlign:"left", padding:"0.5rem"} : 
                {backgroundColor:"#a1d09e", textAlign:"left", padding:"0.5rem"}}>Profit: {profit < 0 ? `-$${(Math.round(Math.abs(profit) * 100) / 100).toFixed(2)}`: 
                  `$${(Math.round(profit * 100) / 100).toFixed(2)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br></br>
      <form className='addBankStatements' onSubmit={handleAddBank}>
      <label htmlFor='BankDate'>Date: </label>
        <input
          name='date'
          type="date"
          placeholder="Date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor='BankDescription'>Description: </label>
        <input
          name='description'
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <label htmlFor='BankAmount'>Amount: </label>
        <input
          name='amount'
          type="number"
          placeholder="Amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor='BankType'>Debit or Credit?: </label>
        <select 
          name='debit/credit'
          type='text'
          value={debitCredit}
          required
          onChange={(e) => setDebitCredit(e.target.value)}>
            <option value="" disabled defaultValue={""}>Debit or Credit</option>
            <option>Credit</option>
            <option>Debit</option>
        </select>

        <label htmlFor='BankCategory'>Category: </label>
        <select 
          name='category'
          type='text'
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled defaultValue={""}>Category</option>
            {categoryList.map(item => (
              <option key={item}>{item}</option>
            ))
          }
        </select>

        <button type="submit" className='addButton'>Add Bank Statement</button>
        
      </form>
    </main>
  )
}

export default BankStatements