import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import NewDataForm from "../NewDataForm"

test("renders all form fields correctly", () => {
  render(<NewDataForm />)
  expect(screen.getByLabelText("Customer ID:")).toBeInTheDocument()
  expect(screen.getByLabelText("Customer Name:")).toBeInTheDocument()
  expect(screen.getByLabelText("Transaction Date:")).toBeInTheDocument()
  expect(screen.getByLabelText("Transaction Amount:")).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /add transaction/i })
  ).toBeInTheDocument()
})

test("submits form data when the Add Transaction button is clicked", async () => {
  const addTransactionMock = jest.fn(() => Promise.resolve())
  const setTransactionsMock = jest.fn()
  render(
    <NewDataForm
      addTransaction={addTransactionMock}
      transactions={[]}
      setTransactions={setTransactionsMock}
    />
  )
  userEvent.type(screen.getByLabelText("Customer ID:"), "1234")
  userEvent.type(screen.getByLabelText("Customer Name:"), "John Doe")
  userEvent.type(screen.getByLabelText("Transaction Date:"), "2022-05-01")
  userEvent.type(screen.getByLabelText("Transaction Amount:"), "100")
  fireEvent.click(screen.getByRole("button", { name: /add transaction/i }))

  expect(addTransactionMock).toHaveBeenCalledWith({
    customerID: "1234",
    customerName: "John Doe",
    transactionDate: "2022-05-01",
    transactionAmount: "100",
    id: expect.any(String),
  })
})
