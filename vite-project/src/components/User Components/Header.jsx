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
        <p>You’re already logged in. Start exploring now!</p>
        <a href="/user-published-thesis" className="cta-button">
          Explore Repository
        </a>
      </div>
    </header>
  );
};

export default Header;
