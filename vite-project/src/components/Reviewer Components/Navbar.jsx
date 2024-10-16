import React from "react";
import "./Navbar.css";

const ReviewerNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">Reviewer Dashboard</div>
      <ul className="navbar-links">
        <li>
          <a href="/reviewer-home">Home</a>
        </li>
        <li>
          <a href="/review">Review Papers</a>
        </li>
        <li>
          <a href="/approved">Approved Papers</a>
        </li>
        <li>
          <a href="/rejected">Rejected Papers</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default ReviewerNavbar;
