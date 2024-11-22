import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>
          Your central hub for managing and publishing theses. Browse topics,
          explore resources, and manage your account effortlessly.
        </p>
        <p>
          Access sections like <strong>About Us</strong>,{" "}
          <strong>Support</strong>, <strong>FAQ</strong>, and use the search bar
          for seamless navigation.
        </p>
        <p>
          Please log in to access your account and start exploring the
          repository!
        </p>
        <a href="/login" className="cta-button">
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
