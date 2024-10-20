import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { USEREndPoint, RegisterEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const UserManagement = () => {
  //give dummy data for users
  const data = [
    {
      id: 1,
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  ];
  const [users, setUsers] = useState(data);
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
    <div className="user-page">
      <AdminNavbar />
      <div className="user-container">
        <h2>User Management</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="add-paper-form">
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
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
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
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                ID
              </th>
              <th
                style={{
                  color: "#666666",
                  backgroundColor: "#fdfffe",
                  textAlign: "center",
                }}
              >
                Name
              </th>
              <th
                style={{
                  color: "#666666",
                  backgroundColor: "#fdfffe",
                  textAlign: "center",
                }}
              >
                Email
              </th>
              <th
                style={{
                  color: "#666666",
                  backgroundColor: "#fdfffe",
                  textAlign: "center",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{ color: "#666666", textAlign: "center" }}
              >
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {user.id}
                </td>
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {user.username}
                </td>
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {user.email}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      backgroundColor: "#3498DB",
                      color: "#fff",
                      marginRight: "10px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => window.alert("delete user.")}
                    // onClick={() => handleDelete(user.id)}
                    style={{
                      backgroundColor: "#E74C3C",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
};

export default UserManagement;
