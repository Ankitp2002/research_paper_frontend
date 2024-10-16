import React from "react";
import "./Footer.css";

const ReviewerFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <p style={{ marginLeft: "55%" }}>
          © 2024 ResearchHub Admin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ReviewerFooter;
