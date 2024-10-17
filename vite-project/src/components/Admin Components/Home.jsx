import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import "./Home.css";

const AdminHomePage = () => {
  return (
    <div className="admin-home-page">
      <AdminNavbar />
      <div className="admin-home-container">
        <h1>Welcome to the Admin Dashboard</h1>
        <h3 style={{ marginLeft: 50 }}>
          The Admin role oversees and manages the entire platform. This role
          includes the ability to monitor users, authors, and reviewers, and
          make decisions regarding content approval, statistics, and platform
          updates.
        </h3>
        <div className="admin-home-actions">
          <h2>Quick Actions</h2>
          <ul>
            <li>
              <a href="/admin/usermanagement">User Management</a>
            </li>
            <li>
              <a href="/admin/reviewpaper">Review Submitted Thesis</a>
            </li>
            <li>
              <a href="/admin/managepublishedpapers">View Published Thesis</a>
            </li>
            <li>
              <a href="/admin/rejectedpaper">View Rejected Thesis</a>
            </li>
          </ul>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminHomePage;
