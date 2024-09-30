import React from "react";
import "./AdminNavbar.css";

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
          <a href="/admin/reviewermanagement">Reviewer Management</a>
        </li>
        <li>
          <a href="/admin/managepublishedpapers">Manage Published Papers</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
