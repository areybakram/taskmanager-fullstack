
import { useState } from "react";
import axios from "axios";

function Register({ onSwitch }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!username || !email || !password) return alert("All fields required");

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Registered successfully. Please login.");
      onSwitch();
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
            <img
        src="/public/cloud.jpg"
        alt="Logo"
        style={{ width: "60px", height:"40", position: "absolute", top: "20px", left: "20px" }}/>
      <div className="branding">ExpertsCloud</div>

      <div className="subtitle">Create your account to start managing tasks</div>
      <h2>Register</h2>

      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <div className="link-switch">
        Already have an account? <button onClick={onSwitch}>Login</button>
      </div>
    </div>
  );
}

export default Register;