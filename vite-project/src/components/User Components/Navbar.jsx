import React from "react";
import "./Navbar.css"; // Create a CSS file for user navbar styles

const NavbarUser = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">User Panel</div>
      <ul className="navbar-links">
        <li>
          <a href="/user-home">Home</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
