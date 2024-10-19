import React, { useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";

export default function Basic() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const openForgotPasswordModal = () => {
    setIsForgotPasswordOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <div className="user-home-page">
      <NavbarUser />
      <div className="home-container">
        <h2>Profile Page</h2>
        <div className="profile-info">
          {/* Name Display */}
          <div className="info-group">
            <label>Name:</label>
            <p>Parth</p>
          </div>

          {/* Number Display */}
          <div className="info-group">
            <label>Phone Number:</label>
            <p>987654321</p>
          </div>

          {/* Forgot Password */}
          <div className="info-group forgot-password">
            <a href="#" onClick={openForgotPasswordModal}>
              Forgot Password?
            </a>
          </div>
        </div>
        {/* Forgot Password Modal */}
        {isForgotPasswordOpen && (
          <div className="modal-overlay">
            <div className="forgot-password-modal">
              <h2>Forgot Password</h2>
              <p
                style={{
                  fontSize: "20px", // Increase the font size for better readability
                }}
              >
                Enter your email to reset your password
              </p>
              <label>Email: </label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "300px", // Adjust the width as needed
                  padding: "10px", // Padding for a better look
                  fontSize: "16px", // Increase the font size for better readability
                  borderRadius: "5px", // Rounded corners for aesthetic
                  border: "1px solid #ccc", // Light border
                  backgroundColor: "white", // Background color
                  color: "black",
                }}
              />
              <br></br>
              <button
                className="reset-btn"
                style={{ marginTop: 5, height: 35 }}
              >
                Reset Password
              </button>
              <br></br>
              <button
                className="close-btn"
                onClick={closeForgotPasswordModal}
                style={{ marginTop: 10, height: 35 }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
