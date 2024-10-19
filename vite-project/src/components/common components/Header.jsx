import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome To Author Dashboard</h1>
        <p style={{ color: "#666666", textAlign: "center" }}>
          Manage Your Theses And Submissions With Ease.
        </p>
        <p style={{ color: "#666666", textAlign: "center" }}>
          Authors Play A Key Role In Submitting Theses And Managing Their
          Personal Content.
        </p>
        <a href="/submit" className="cta-button">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
