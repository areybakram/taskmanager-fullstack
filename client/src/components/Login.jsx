import { useState } from "react";
import axios from "axios";
import { saveToken } from "../utils/auth";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    
    if (!email || !password) return alert("All fields required");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      saveToken(res.data.token);
      onLogin(res.data.user.username);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <img
        src="/public/cloud.jpg"
        alt="Logo"
        style={{ width: "60px", height:"40", position: "absolute", top: "20px", left: "20px" }}/>

      
      <div className="branding">ExpertsCloud</div>

      <div className="subtitle">Welcome to Cloud Experts Task Manager</div>

      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <div className="link-switch">
        Don’t have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
