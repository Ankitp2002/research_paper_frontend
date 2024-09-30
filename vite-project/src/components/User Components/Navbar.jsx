import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Create a CSS file for user navbar styles

const NavbarUser = () => {
  return (
    <nav className="navbar">
      <h1>User Panel</h1>
      <ul>
        <li>
          <Link to="/user-home">Home</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
