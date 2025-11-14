import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMock } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    const ok = loginMock(username.trim(), password);
    if (ok) {
      navigate("/placements");
    } else {
      setErr("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "30px auto" }}>
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          {err && <div style={{ color: "red", marginBottom: 10 }}>{err}</div>}
          <button className="btn btn-primary" type="submit">Login</button>
          <div style={{ marginTop: 10 }}>
            <small>Note: this is a mock login. Replace with backend auth when available.</small>
          </div>
        </form>
      </div>
    </div>
  );
}
