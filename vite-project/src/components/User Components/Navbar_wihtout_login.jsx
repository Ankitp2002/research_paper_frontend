import React, { useState } from "react";
import "./Navbar.css";

const NavbarWithOutLogin = ({ searchTerm, setSearchTerm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>User Panel</h1>
      <div
        className="navbar-toggle"
        onClick={() => setMenuOpen((prevState) => !prevState)}
      >
        {menuOpen ? "✖" : "☰"} {/* Toggle between hamburger and close icon */}
      </div>
      <ul className={menuOpen ? "active" : ""}>
        <li>
          <a href="/user-home">Home</a>
        </li>
        <li>
          <a href="/">Publish Thesis</a>
        </li>
        <li>
          <a href="/without_login_contact_us">Contact Us</a>
        </li>
        <li>
          <a href="/without_login_about_us">About Us</a>
        </li>
        <li>
          <a href="https://mxk3702.uta.cloud/blog/">Blog</a>
        </li>
        <li>
          <a href="/without_login_FAQ">FAQ</a>
        </li>
        <li>
          <a href="/without_login_support">Support</a>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "3px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "180px",
              color: "black",
            }}
          />
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarWithOutLogin;
