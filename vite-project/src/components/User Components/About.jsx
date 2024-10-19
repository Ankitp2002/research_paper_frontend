import React from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
const AboutUs = () => {
  return (
    <div className="submit-page">
      <NavbarUser />
      <div className="submit-container">
        <h2>About Us</h2>
        <div>
          <p>
            <strong>Mission Statement:</strong> Our Mission Is To Provide a
            Comprehensive Repository For Academic Theses, Facilitating Access To
            Knowledge And Fostering Collaboration Among Researchers.
          </p>
          <p>
            <strong>Team Member Profiles:</strong>
          </p>
          <ul>
            <li>
              <strong>Sard1:</strong> Project Manager - Responsible For
              Overseeing The Project And Ensuring Its Successful Implementation.
            </li>
            <li>
              <strong>Sard2:</strong> Lead Developer - Focused On Developing The
              platform And Ensuring a Smooth User Experience.
            </li>
            <li>
              <strong>Sard3:</strong> Content Manager - Manages The Content Of
              The Repository And Engages With Authors.
            </li>
          </ul>
          <p>
            <strong>History and Development:</strong> The repository was
            established in 2023 to meet the growing demand for a centralized
            platform for academic theses. Since its launch, it has grown to
            include thousands of submissions from various disciplines.
          </p>
          <p>
            <strong>Contact Information:</strong> For any inquiries, please
            reach out to us at{" "}
            <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
