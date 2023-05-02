import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RewardPointsPage from "../RewardPointsPage"

const mockTransactions = [
  {
    id: 1,
    customerID: 1001,
    customerName: "John Doe",
    transactionDate: "2022-01-15",
    transactionAmount: 150,
  },
  {
    id: 2,
    customerID: 1002,
    customerName: "Jane Doe",
    transactionDate: "2022-02-15",
    transactionAmount: 75,
  },
  {
    id: 3,
    customerID: 1001,
    customerName: "John Doe",
    transactionDate: "2022-03-15",
    transactionAmount: 200,
  },
]

test("renders table with correct headings", () => {
  render(<RewardPointsPage transactions={mockTransactions} />)
  expect(screen.getByText("Customer ID")).toBeInTheDocument()
  expect(screen.getByText("Customer Name")).toBeInTheDocument()
  expect(screen.getByText("Monthly Points (January)")).toBeInTheDocument()
  expect(screen.getByText("Monthly Points (February)")).toBeInTheDocument()
  expect(screen.getByText("Monthly Points (March)")).toBeInTheDocument()
  expect(screen.getByText("Total Points")).toBeInTheDocument()
})

test("display correct reward points in the table", () => {
  render(<RewardPointsPage transactions={mockTransactions} />)
  expect(screen.getByText("1001")).toBeInTheDocument()
  expect(screen.getByText("John Doe")).toBeInTheDocument()

  expect(
    screen
      .getAllByTestId("january-points")
      .some((e) => e.textContent.includes("50"))
  ).toBe(true)
  expect(
    screen
      .getAllByTestId("february-points")
      .some((e) => e.textContent.includes("25"))
  ).toBe(true)
  expect(
    screen
      .getAllByTestId("march-points")
      .some((e) => e.textContent.includes("250"))
  ).toBe(true)
  expect(
    screen
      .getAllByTestId("total-points")
      .some((e) => e.textContent.includes("400"))
  ).toBe(true)
  expect(
    screen
      .getAllByTestId("total-points")
      .some((e) => e.textContent.includes("25"))
  ).toBe(true)
})

test("renders the correect number of rows", () => {
  render(<RewardPointsPage transactions={mockTransactions} />)
  const rows = screen.getAllByRole("row")
  expect(rows.length - 1).toBe(2)
})
