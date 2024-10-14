import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { USEREndPoint, RegisterEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [editUserId, setEditUserId] = useState(null);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest(`${USEREndPoint}/user`, "GET"); // Fetch users
        if (response && response.length > 0) {
          setUsers(response); // Update state with fetched users
        } else if (response.error) {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        setError("Error:", error.message);
      }
    };

    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    if (newUser.name && newUser.email && newUser.password) {
      const userToAdd = {
        username: newUser.name,
        password: newUser.password,
        email: newUser.email,
        role: "user", // Set role dynamically as fixed "user"
      };

      try {
        const response = await apiRequest(
          RegisterEndPoint,
          "POST",
          JSON.stringify(userToAdd)
        );

        if (response.user) {
          setUsers([...users, { id: response.user.id, ...userToAdd }]);
          setNewUser({ id: "", name: "", email: "", password: "" });
        } else {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("Error adding user.");
      }
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      const response = await apiRequest(`${USEREndPoint}/${id}`, "DELETE");
      if (response) {
        setUsers(users.filter((user) => user.id !== id)); // Update state after delete
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Update user (called when "Update" button is clicked)
  const handleUpdateUser = async () => {
    if (editUserId !== null) {
      const updatedUser = {
        username: newUser.name,
        email: newUser.email,
        password: newUser.password, // Include password if updating it
      };

      try {
        const response = await apiRequest(
          `${USEREndPoint}/${editUserId}`,
          "PUT",
          JSON.stringify(updatedUser)
        );

        if (response.user) {
          debugger;
          setUsers(
            users.map((user) =>
              user.id === editUserId
                ? {
                    ...user,
                    username: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                  }
                : user
            )
          );
          setEditUserId(null);
          setNewUser({ id: "", name: "", email: "", password: "" }); // Clear input fields
        } else {
          console.error("Error updating user:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  // Edit a user (called when "Edit" button is clicked)
  const handleEdit = (user) => {
    setEditUserId(user.id);
    setNewUser({
      name: user.username,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className="user-management">
      <AdminNavbar />

      <h2>User Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />

        {/* Conditionally show Add or Update buttons */}
        {editUserId ? (
          <>
            <button onClick={handleUpdateUser}>Update User</button>
            <button onClick={() => setEditUserId(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th style={{ color: "#666666" }}>ID</th>
            <th style={{ color: "#666666" }}>Name</th>
            <th style={{ color: "#666666" }}>Email</th>
            <th style={{ color: "#666666" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ color: "#666666" }}>
              <td style={{ color: "#666666" }}>{user.id}</td>
              <td style={{ color: "#666666" }}>{user.username}</td>
              <td style={{ color: "#666666" }}>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminFooter />
    </div>
  );
};

export default UserManagement;
