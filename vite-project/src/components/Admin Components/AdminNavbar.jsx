import React from "react";
import "./AdminNavbar.css";
import userIcon from "../../favIcon/icons8-user-16.png"

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">Admin Dashboard</div>
      <ul className="navbar-links">
        <li>
          <a href="/admin-home">Home</a>
        </li>
        <li>
          <a href="/admin/usermanagement">User Management</a>
        </li>
        <li>
          <a href="/admin/authormanagement">Auhor Management</a>
        </li>
        <li>
          <a href="/admin/reviewermanagement">Reviewer Management</a>
        </li>
        <li>
          <a href="/admin/managepublishedpapers">Manage Published Thesis</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
