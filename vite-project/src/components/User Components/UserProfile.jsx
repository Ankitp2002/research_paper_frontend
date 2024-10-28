import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import { apiRequest } from "../RequestModul/requests";
import { USEREndPoint } from "../RequestModul/Endpoint";

export default function Basic() {
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const openForgotPasswordModal = () => setForgotPasswordOpen(true);
  const closeForgotPasswordModal = () => setForgotPasswordOpen(false);
  const openChangePasswordModal = () => setChangePasswordOpen(true);
  const closeChangePasswordModal = () => setChangePasswordOpen(false);

  const token = sessionStorage.getItem("authToken");
  const sendForgotPasswordEmail = () => {
    console.log(`Sending reset password email to ${email}`);
    closeForgotPasswordModal();
  };

  const updatePassword = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const response = await apiRequest(
          USEREndPoint,
          "PUT",

          JSON.stringify({
            currentPassword,
            newPassword,
          }),
          {
            Authorization: `Bearer ${token}`,
            // Include any additional headers, like authorization, if necessary
          }
        );
        if (response.user || response.email) {
          window.alert("Password updated successfully");
          // Optionally, reset password state fields if needed
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          closeChangePasswordModal();
        } else {
          window.alert("Failed to update password. Please try again.");
          // Handle error (show message to user)
        }
      } catch (error) {
        window.alert(`Failed to update password ${error.response.data.error}`);
        console.error("Error occurred while updating password:", error);
        // Handle error (show message to user)
      }
      closeChangePasswordModal();
    } else {
      console.log("Passwords do not match");
    }
  };
  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiRequest(
          USEREndPoint,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        ); // Update with your API URL
        if (!response) {
          throw new Error("Network response was not ok");
        }
        setName(response.username); // Assuming your API returns a name field
        setEmail(response.email); // Assuming your API returns an email field
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="user-home-page">
      <NavbarUser />
      <div className="submit-container">
        <h2>Profile Page</h2>
        <br />
        <div className="profile-info">
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name} // Bind state here
              style={{ color: "black" }}
              readOnly
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email} // Bind state here
              style={{
                color: "black",
                backgroundColor: "#d3d3d3",
                borderColor: "#d3d3d3",
              }}
              readOnly
            />
          </form>
          <div className="info-group change-password">
            <button
              onClick={openChangePasswordModal}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Change Password
            </button>
          </div>

          {/* Uncomment if needed */}
          {/* <div className="info-group forgot-password">
      <a href="#" onClick={openForgotPasswordModal}>
        Forgot Password?
      </a>
    </div> */}
        </div>

        {/* Forgot Password Modal */}
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

        {/* Change Password Modal */}
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
                <button
                  type="submit"
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
                  Update Password
                </button>
                <button
                  className="close-btn"
                  onClick={closeChangePasswordModal}
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
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
