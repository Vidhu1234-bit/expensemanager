import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post(
      "https://expensemanager-backend-2nhr.onrender.com/login",
      {
        email,
        password
      }
    );

    localStorage.setItem("token", res.data.token);

    alert("Login Success");
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>

      <p><Link to="/">Go to Register</Link></p>
    </div>
  );
}

export default Login;