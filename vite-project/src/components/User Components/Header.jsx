import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome To User Dashboard</h1>
        <p style={{ color: "#666666", textAlign: "center" }}>
          This Is Your Central Hub For Managing And Publishing Your Theses.
          Explore The Repository, Browse Various Topics, And Discover Valuable
          Resources.
        </p>
        <p style={{ color: "#666666", textAlign: "center" }}>
          You Can Access Sections Such As About Us, Support, FAQ, And A Search
          Bar To Easily Navigate The Content.
        </p>
        <p style={{ color: "#666666", textAlign: "center" }}>
          You Are Already Logged In. Feel Free To Explore The Thesis Repository!
          Please Log In To Access Your Account And Start Exploring The
          Repository!
        </p>
        <div style={{ borderTop: "1px solid #ccc", margin: "20px 0" }}></div>
        <p style={{ color: "#666666", textAlign: "center" }}>Intro</p>
      </div>
    </header>
  );
};

export default Header;
