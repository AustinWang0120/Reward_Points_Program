import { useEffect, useState } from "react"
import "../styles/RewardPointsPage.css"

const RewardPointsPage = ({ transactions, setTransactions }) => {
  const [rewardPoints, setRewardPoints] = useState([])

  useEffect(() => {
    const calculateRewardPoints = () => {
      const rewardPointsMap = {}
      const months = ["January", "February", "March"]

      transactions.forEach((transaction) => {
        const { customerID, customerName, transactionDate, transactionAmount } =
          transaction
        const month = new Date(Date.parse(transactionDate)).getMonth()
        const points =
          transactionAmount >= 100
            ? (transactionAmount - 100) * 2 + 50
            : transactionAmount >= 50
            ? transactionAmount - 50
            : 0
        rewardPointsMap[customerID] = rewardPointsMap[customerID] || {
          customerID,
          customerName,
          total: 0,
          months: {},
        }
        rewardPointsMap[customerID].total += points
        rewardPointsMap[customerID].months[months[month]] =
          (rewardPointsMap[customerID].months[months[month]] || 0) + points
      })

      setRewardPoints(Object.values(rewardPointsMap))
    }
    calculateRewardPoints()
  }, [transactions])

  console.log("REWARD POINTS:", rewardPoints)

  return (
    <div className="reward-points-page">
      <h1>Reward Points</h1>
      <table className="reward-points-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Monthly Points (January)</th>
            <th>Monthly Points (February)</th>
            <th>Monthly Points (March)</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {rewardPoints.map((points) => (
            <tr key={points.customerID}>
              <td>{points.customerID}</td>
              <td>{points.customerName}</td>
              <td data-testid="january-points">
                {points.months["January"] || 0}
              </td>
              <td data-testid="february-points">
                {points.months["February"] || 0}
              </td>
              <td data-testid="march-points">{points.months["March"] || 0}</td>
              <td data-testid="total-points">{points.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RewardPointsPage
