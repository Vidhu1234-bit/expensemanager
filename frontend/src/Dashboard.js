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
    axios
      .get("https://expensemanager-backend-2nhr.onrender.com/expenses", {
        headers: { token }
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addExpense = async () => {
    try {
      await axios.post(
        "https://expensemanager-backend-2nhr.onrender.com/expense",
        { title, amount, category },
        { headers: { token } }
      );

      setTitle("");
      setAmount("");
      setCategory("");

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Expense Dashboard</h1>

      <div className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
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