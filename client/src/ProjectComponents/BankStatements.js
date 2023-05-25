import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/projects'

const BankStatements = ({ bankData, setBankData, projectList }) => {
  const { id } = useParams();
  const proj = projectList.find(proj => (proj.id).toString() === id);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [debitCredit, setDebitCredit] = useState('');
  const [category, setCategory] = useState('');

  const [categoryList] = useState([
    "Food",
    "Helper",
    "Gas", 
    "Office Supplies",
    "Fabrication",
    "Materials",
    "Installation",
    "Misc",
    "EZTag",
    "Tools"
  ]);

  const handleAddBank = async (e) => {
    e.preventDefault();
    const id = bankData.length ? bankData[bankData.length - 1].id + 1 : 1;
    const newBankData = { id, description: description, amount: `$${(Math.round(amount * 100) / 100).toFixed(2)}`, debitCredit: debitCredit, category: category, projectNumber: proj.projectNumber};
    try {
      const response = await api.post('/bankData', newBankData);
      const allBankData = [...bankData, response.data];
      setBankData(allBankData);
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleRemoveBank = async (id) => {
    try {
      await api.delete(`/bankData/${id}`);
      const filtedBankData = bankData.filter(bank => bank.id !== id);
      setBankData(filtedBankData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className='BankStatements'>
      <div className='BankTable'>
        <table>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Debit/Credit</th>
              <th>Category</th>
            </tr>
            {bankData.map((bank) => {
              return (
              <tr key={bank.id}>
                {(bank.projectNumber === proj.projectNumber) ?
                  <>
                    <td>{bank.description}</td> 
                    <td>{bank.amount}</td> 
                    <td>{bank.debitCredit}</td> 
                    <td>{bank.category}</td>
                    <td><button onClick={() => handleRemoveBank(bank.id)} className='deleteButton'>Remove Bank Statement</button></td>
                  </>
                  : <td></td> }
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <br></br>
      <form className='addBankStatements' onSubmit={handleAddBank}>
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