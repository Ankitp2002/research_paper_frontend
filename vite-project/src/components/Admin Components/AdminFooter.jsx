import React from "react";
import "./AdminFooter.css";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <p>© 2024 ResearchHub Admin. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </footer>
  );
};

export default AdminFooter;
