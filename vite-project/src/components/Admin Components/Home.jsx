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
        <p>
          As an admin, you can manage users, review submitted papers, and
          monitor the status of published papers.
        </p>
        <div className="admin-home-actions">
          <h2>Quick Actions</h2>
          <ul>
            <li>
              <a href="/admin/usermanagement">Manage Users</a>
            </li>
            <li>
              <a href="/review-papers">Review Submitted Papers</a>
            </li>
            <li>
              <a href="/published-papers">View Published Papers</a>
            </li>
            <li>
              <a href="/rejected-papers">View Rejected Papers</a>
            </li>
          </ul>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminHomePage;
