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
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    setIsNavigating(true);

    // Simulate brief timeout to allow component to load
    setTimeout(() => {
      const path = {
        admin: "/admin-home",
        reviewer: "/reviewer-home",
        author: "/author-home",
        user: "/user-home-page",
      }[role];

      if (path) {
        window.location.href = path;
      } else {
        setError("Invalid role");
      }

      setIsNavigating(false);
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading || isNavigating) return;
    setError("");
    setIsLoading(true);

    try {
      const params = { username, password };
      const response = await apiRequest(LoginEndPoint, "POST", params, {});

      if (!response) {
        setError("Failed to receive server response.");
        setIsLoading(false);
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
      setError(
        error.response?.data.message || "Please Check Your Credentials......"
      );
    } finally {
      setIsLoading(false);
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
          <button type="submit" disabled={isLoading || isNavigating}>
            {isLoading || isNavigating ? "Loading..." : "Login"}
          </button>
        </form>
      </div>

      {isNavigating && (
        <div className="loading-overlay">
          <p>Navigating, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default Login;
