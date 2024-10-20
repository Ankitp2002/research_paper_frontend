import React, { useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./UserProfile.css";
export default function Basic() {
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const openForgotPasswordModal = () => setForgotPasswordOpen(true);
  const closeForgotPasswordModal = () => setForgotPasswordOpen(false);
  const openChangePasswordModal = () => setChangePasswordOpen(true);
  const closeChangePasswordModal = () => setChangePasswordOpen(false);

  const sendForgotPasswordEmail = () => {
    console.log(`Sending reset password email to ${email}`);
    closeForgotPasswordModal();
  };

  const updatePassword = () => {
    if (newPassword === confirmNewPassword) {
      console.log("Password updated successfully");
      closeChangePasswordModal();
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="user-home-page">
      <NavbarUser />
      <div className="home-container">
        <h2>Profile Page</h2>
        <div className="profile-info">
          <label>Name:</label>
          <p>Parth</p>

          <label>Email:</label>
          <p>parth@example.com</p>

          <label>Phone Number:</label>
          <p>987654321</p>

          <div className="info-group change-password">
            <a href="#" onClick={openChangePasswordModal}>
              Change Password
            </a>
          </div>

          <div className="info-group forgot-password">
            <a href="#" onClick={openForgotPasswordModal}>
              Forgot Password?
            </a>
          </div>
        </div>

        {isForgotPasswordOpen && (
          <div className="modal-overlay">
            <div className="forgot-password-modal">
              <h2>Forgot Password</h2>
              <p>Enter your email to reset your password</p>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button onClick={sendForgotPasswordEmail}>Send Reset Link</button>
              <button className="close-btn" onClick={closeForgotPasswordModal}>
                Close
              </button>
            </div>
          </div>
        )}

        {isChangePasswordOpen && (
          <div className="modal-overlay">
            <div className="change-password-modal">
              <h2>Change Password</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePassword();
                }}
              >
                <div className="form-group">
                  <label>Current Password:</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button className="update-btn" type="submit">
                    Update Password
                  </button>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={closeChangePasswordModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
