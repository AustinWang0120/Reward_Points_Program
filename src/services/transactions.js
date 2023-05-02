import axios from "axios"

const API_URL = "http://localhost:3001/transactions"

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const addTransaction = async (newTransaction) => {
  try {
    const parsedTransaction = {
      ...newTransaction,
      id: parseInt(newTransaction.id),
      customerID: parseInt(newTransaction.customerID),
      transactionAmount: parseInt(newTransaction.transactionAmount),
    }
    const response = await axios.post(API_URL, parsedTransaction)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
