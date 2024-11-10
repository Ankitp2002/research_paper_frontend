import React, { useState } from "react";
import "./Navbar.css";
import userIcon from "../../favIcon/icons8-user-16.png";
import notificaionIcon from "../../favIcon/notification.png";

const NavbarUser = ({ searchTerm, setSearchTerm }) => {
  const [notificationCount, setNotificationCount] = useState(1);
  return (
    <nav className="admin-navbar">
      <div className="navbar-title">User Panel</div>
      <ul className="navbar-links">
        <li>
          <a href="/user-home-page">Home</a>
        </li>
        <li>
          <a href="/user-published-thesis">Publish Thesis</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="https://mxk3702.uta.cloud/blog/">Blog</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/support">Support</a>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "3px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "180px",
              color: "black",
            }}
          />
        </li>
        <li>
          <a href="/user-profile">
            <img src={userIcon} alt="Profile" style={{ height: 26 }} />
          </a>
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
                marginTop: 2,
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

export default NavbarUser;
