import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome to Author Dashboard</h1>
        <p style={{ color: "#666666", textAlign: "center" }}>
          Manage your theses and submissions with ease.
        </p>
        <p style={{ color: "#666666", textAlign: "center" }}>
          Authors play a key role in submitting theses and managing their
          personal content.
        </p>
        <a href="/submit" className="cta-button">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
