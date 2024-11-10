import React, { useState } from "react";
import "./Navbar.css";
import notificaionIcon from "../../favIcon/notification.png";

const ReviewerNavbar = () => {
  const [notificationCount, setNotificationCount] = useState(1);
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">Reviewer Dashboard</div>
      <ul className="navbar-links">
        <li>
          <a href="/reviewer-home">Home</a>
        </li>
        <li>
          <a href="/review">Review Thesis</a>
        </li>
        <li>
          <a href="/approved">Approved Thesis</a>
        </li>
        <li>
          <a href="/rejected">Rejected Thesis</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
        <li>
          <a href="#" style={{ position: "relative", display: "inline-block" }}>
            <img
              src={notificaionIcon}
              alt="Notification"
              style={{
                height: 22,
                filter: "brightness(0) invert(1)",
              }}
            />
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                }}
              >
                {notificationCount}
              </span>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ReviewerNavbar;
