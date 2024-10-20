import React from "react";
import "./Footer.css"; // Create a CSS file for footer styles

const SimpleFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-content">
        <p>© 2024 ResearchHub. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
