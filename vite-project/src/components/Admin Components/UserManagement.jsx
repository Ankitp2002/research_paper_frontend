import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { USEREndPoint, RegisterEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import deleteIcon from "../../favIcon/delete.png";
import editIcon from "../../favIcon/icons8-edit-50.png";
const UserManagement = () => {
  //give dummy data for users
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
        const response = await apiRequest(`${USEREndPoint}?role=user`, "GET"); // Fetch users
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
        name: newUser.name,
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
        if (response) {
          setUsers([...users, { id: response.id, ...userToAdd }]);
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
      const response = await apiRequest(`${USEREndPoint}?id=${id}`, "DELETE");
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
        name: newUser.name,
        email: newUser.email,
        password: newUser.password, // Include password if updating it
      };

      try {
        const response = await apiRequest(
          `${USEREndPoint}?id=${editUserId}`,
          "PUT",
          JSON.stringify(updatedUser)
        );

        if (response) {
          setUsers(
            users.map((user) =>
              user.id === editUserId
                ? {
                    ...user,
                    name: newUser.name,
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
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className="user-page">
      <AdminNavbar />
      <div className="user-container">
        <h2>User Management</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

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
                  {user.name}
                </td>
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {user.email}
                </td>
                <td style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleEdit(user)}
                      style={{
                        backgroundColor: "#3498DB", // Changed to a blue color for Edit
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={editIcon} // Add your edit icon source here
                        alt="edit_icon"
                        style={{ height: 20, marginRight: "8px" }}
                      />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{
                        backgroundColor: "#E74C3C", // Red background
                        color: "#fff", // White text
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={deleteIcon} // Add your delete icon source here
                        alt="delete_icon"
                        style={{
                          height: 20,
                          marginRight: "8px",
                          filter: "brightness(0) invert(1)",
                        }} // Makes the icon white
                      />
                      Delete
                    </button>
                  </div>
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
