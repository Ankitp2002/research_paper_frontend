import React, { useState } from "react";
import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUserId, setEditUserId] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: Date.now(), ...newUser }]);
      setNewUser({ name: "", email: "" }); // Clear input fields
    }
  };

  const handleUpdateUser = () => {
    if (editUserId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editUserId ? { ...user, ...newUser } : user
        )
      );
      setEditUserId(null);
      setNewUser({ name: "", email: "" }); // Clear input fields
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setNewUser({ name: user.name, email: user.email });
  };

  return (
    <div className="user-management">
      <AdminNavbar />

      <h2>User Management</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
