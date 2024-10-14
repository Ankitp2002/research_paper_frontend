import React, { useState } from "react";
import { LoginEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure this imports the updated CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setRole] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response;
      try {
        const params = { username, password };
        response = await apiRequest(LoginEndPoint, "POST", params, {});
        console.log("Login successful:", response);
        // Handle successful login (e.g., store token, redirect, etc.)
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login error (e.g., show error message)
      }
      const { role, token } = response;

      if (role == selectedRole) {
        if (token) {
          sessionStorage.setItem("authToken", token);
          setToken(token); // Store token in state as well (optional)
        }

        // Navigate to different home pages based on role
        switch (role) {
          case "admin":
            navigate("/admin-home");
            break;
          case "reviewer":
            debugger;
            navigate("/reviewer-home");
            break;
          case "author":
            navigate("/author-home");
            break;
          case "user":
            navigate("/user-home");
            break;
          default:
            setError("Invalid role");
        }
      }
      setError("Invalid Selected Role");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Please Check Your Credentials......");
      }
      console.log("Error", error);
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
