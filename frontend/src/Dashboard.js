import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  const loadData = () => {
   axios.get("https://expensemanager-backend-2nhr.onrender.com/expenses", ... {
      headers: { token }
    }).then((res) => setExpenses(res.data));
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const addExpense = async () => {
    await axios.post("https://expensemanager-backend-2nhr.onrender.com/expense", ...
      { title, amount, category },
      { headers: { token } }
    );

    loadData();
  };

  return (
  <div className="container">
    <h1>Expense Dashboard</h1>

    <div className="form">
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>
    </div>

    {expenses.map((item, index) => (
      <div className="card" key={index}>
        <h3>{item.title}</h3>
        <p>💰 Amount: {item.amount}</p>
        <p>📂 Category: {item.category}</p>
      </div>
    ))}
  </div>
);
}

export default Dashboard;