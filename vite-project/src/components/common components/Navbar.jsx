import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">ResearchHub</div>
      <ul className="nav-links">
        <li>
          <a href="/author-home">Home</a>
        </li>
        <li>
          <a href="/submit">Submit Paper</a>
        </li>
        <li>
          <a href="/paperstatus">Paper Status</a>
        </li>
        <li>
          <a href="/publishedpapers">Published Papers</a>
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
