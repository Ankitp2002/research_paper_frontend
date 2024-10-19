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
          The Admin Role Oversees And Manages The Entire Platform. This Role
          Includes The Ability To Monitor Users, Authors, And Reviewers, And
          Make Decisions Regarding Content Approval, Statistics, And Platform
          Updates.
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
