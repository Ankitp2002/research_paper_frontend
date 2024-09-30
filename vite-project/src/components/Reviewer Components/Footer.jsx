import React from "react";
import "./Footer.css";

const ReviewerFooter = () => {
  return (
    <footer className="reviewer-footer">
      <p>&copy; 2024 ResearchHub. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
    </footer>
  );
};

export default ReviewerFooter;
