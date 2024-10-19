import React from "react";
import "./Footer.css";

const ReviewerFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-content">
        <p>© 2024 ReviewerHub. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default ReviewerFooter;
