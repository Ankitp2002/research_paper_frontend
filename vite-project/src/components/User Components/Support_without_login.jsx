import React from "react";
import NavbarUser from "./Navbar_wihtout_login";
import Footer from "./Footer";
const Support_without_login = () => {
  return (
    <div className="submit-page">
      <NavbarUser />
      <div className="submit-container">
        <h2>Support Details</h2>
        <p>
          If you have any further questions, please reach out to our support
          team at <a href="mailto:support@example.com">support@example.com</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Support_without_login;
