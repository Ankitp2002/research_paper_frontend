import React from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
const FAQ = () => {
  return (
    <div className="submit-page">
      <NavbarUser />
      <div className="submit-container">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>Q:</strong> How do I submit my thesis?
          </li>
          <li>
            <strong>A:</strong> You can submit your thesis through the
            submission form available on the dashboard.
          </li>
          <li>
            <strong>Q:</strong> Who can access the repository?
          </li>
          <li>
            <strong>A:</strong> The repository is open to all users. Please log
            in to access full features.
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
