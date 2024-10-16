import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome to ResearchHub</h1>
        <p style={{ color: "#666666", textAlign: "center" }}>
          Submit and publish your papers with ease
        </p>
        <a href="/submit" className="cta-button">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
