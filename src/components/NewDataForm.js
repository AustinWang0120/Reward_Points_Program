import { useState } from "react"
import "../styles/NewDataForm.css"

const NewDataForm = ({ addTransaction, transactions, setTransactions }) => {
  const [formData, setFormData] = useState({
    customerID: "",
    customerName: "",
    transactionDate: "",
    transactionAmount: "",
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newTransaction = await addTransaction({
      ...formData,
      id: Date.now().toString(),
    })
    setTransactions([...transactions, newTransaction])
    setFormData({
      customerID: "",
      customerName: "",
      transactionDate: "",
      transactionAmount: "",
    })
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerID">Customer ID:</label>
        <input
          type="text"
          id="customerID"
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="transactionDate">Transaction Date:</label>
        <input
          type="text"
          id="transactionDate"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="transactionAmount">Transaction Amount:</label>
        <input
          type="text"
          id="transactionAmount"
          name="transactionAmount"
          value={formData.transactionAmount}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="add-transaction-btn">
        Add Transaction
      </button>
    </form>
  )
}

export default NewDataForm
