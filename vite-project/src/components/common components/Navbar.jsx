import React, { useState } from "react";
import "./Navbar.css";
import notificaionIcon from "../../favIcon/notification.png";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(1);
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">Author Dashboard</div>
      <ul className="nav-links">
        <li>
          <a href="/author-home">Home</a>
        </li>
        <li>
          <a href="/submit">Submit Thesis</a>
        </li>
        <li>
          <a href="/paperstatus">Thesis Status</a>
        </li>
        <li>
          <a href="/publishedpapers">Published Thesis</a>
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
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
