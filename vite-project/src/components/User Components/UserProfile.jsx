import React, { useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
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
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
                maxWidth: "90%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  marginBottom: "15px",
                  fontSize: "22px",
                  color: "#333",
                }}
              >
                Forgot Password
              </h2>
              <p>Enter your email to reset your password</p>
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                onClick={sendForgotPasswordEmail}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                Send Reset Link
              </button>
              <button
                className="close-btn"
                onClick={closeForgotPasswordModal}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isChangePasswordOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
                maxWidth: "90%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  marginBottom: "15px",
                  fontSize: "22px",
                  color: "#333",
                }}
              >
                Change Password
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePassword();
                }}
              >
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Current Password:
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="update-btn"
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Update Password
                  </button>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={closeChangePasswordModal}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
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
