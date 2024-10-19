import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">Author Dashboard</div>
      <ul className="nav-links">
        <li>
          <a href="/author-home">Home</a>
        </li>
        <li>
          <a href="/submit">Submit Thesis</a>
        </li>
        <li>
          <a href="/paperstatus">Thesis Status</a>
        </li>
        <li>
          <a href="/publishedpapers">Published Thesis</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
