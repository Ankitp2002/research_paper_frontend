import React from "react";
import "./Navbar.css"; // Create a CSS file for user navbar styles

const NavbarUser = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">User Panel</div>
      <ul className="navbar-links">
        <li>
          <a href="/user-home-page">Home</a>
        </li>
        <li>
          <a href="/user-published-thesis">Publish Thesis</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/support">Support</a>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "3px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "180px",
              marginTop: "0px",
              color: "black",
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
