import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure this imports the updated CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication logic (replace with real authentication)
    if (role === "admin" && username === "admin" && password === "admin") {
      navigate("/admin-home");
    } else if (
      role === "reviewer" &&
      username === "reviewer" &&
      password === "reviewer"
    ) {
      navigate("/reviewer-home");
    } else if (
      role === "author" &&
      username === "author" &&
      password === "author"
    ) {
      navigate("/author-home");
    } else if (role === "user" && username === "user" && password === "user") {
      navigate("/user-home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="admin">Admin</option>
              <option value="reviewer">Reviewer</option>
              <option value="author">Author</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
