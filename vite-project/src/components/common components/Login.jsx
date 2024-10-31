import React, { useState } from "react";
import { LoginEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    if (role === "admin") {
      navigate("/admin-home");
    } else if (role === "reviewer") {
      navigate("/reviewer-home");
    } else if (role === "author") {
      navigate("/author-home");
    } else if (role === "user") {
      navigate("/user-home-page");
    } else {
      setError("Invalid role");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state on each login attempt
    try {
      const params = { username, password };
      const response = await apiRequest(LoginEndPoint, "POST", params, {});

      if (!response) {
        setError("Failed to receive server response.");
        return;
      }

      const { role, token } = response;

      if (role && role === selectedRole) {
        sessionStorage.setItem("authToken", token);
        handleNavigation(role);
      } else {
        setError("Invalid Selected Role");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Please Check Your Credentials......");
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Role:</label>
            <select
              value={selectedRole}
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
