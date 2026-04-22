import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:5000/register", {
      name,
      email,
      password
    });

    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div>
      <h1>Register</h1>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <br /><br />

      <button onClick={register}>Register</button>

      <p><Link to="/login">Go to Login</Link></p>
    </div>
  );
}

export default Register;