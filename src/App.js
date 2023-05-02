import { useEffect, useState } from "react"
import RewardPointsPage from "./components/RewardPointsPage"
import { addTransaction, fetchTransactions } from "./services/transactions"
import NewDataForm from "./components/NewDataForm"

const App = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions()
      setTransactions(data)
    }
    getTransactions()
  }, [])

  return (
    <div className="App">
      <RewardPointsPage
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <NewDataForm
        addTransaction={addTransaction}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  )
}

export default App
