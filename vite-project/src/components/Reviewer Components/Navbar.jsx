import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const ReviewerNavbar = () => {
  return (
    <nav className="reviewer-navbar">
      <div className="nav-logo">
        <h1>
          <Link to="/reviewer-home">Reviewer Dashboard</Link>
        </h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/review">Review Papers</Link>
        </li>
        <li>
          <Link to="/approved">Approved Papers</Link>
        </li>
        <li>
          <Link to="/rejected">Rejected Papers</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ReviewerNavbar;
