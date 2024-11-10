import React, { useEffect, useState } from "react";
import "./Navbar.css";
import notificaionIcon from "../../favIcon/notification.png";
import NotificationModal from "../notificationModel";
import { notificationUser } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    // Simulate fetching notification count from an API
    const fetchNotificationCount = async () => {
      const response = await apiRequest(
        notificationUser,
        "GET",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setNotificationCount(response.length);
      const titles = response.map((data) => {
        return {
          id: data.notification.id, // Notification ID
          title: data.notification.title, // Notification Title
        }; // Return the title
      });
      setNotifications(titles);
    };

    fetchNotificationCount();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearNotifications = () => setNotifications([]);

  const removeNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };
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
          <a style={{ position: "relative", display: "inline-block" }}>
            <img
              src={notificaionIcon}
              alt="Notification"
              onClick={openModal}
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
          {/* Notification Modal */}
          {isModalOpen && (
            <NotificationModal
              notifications={notifications}
              onClose={closeModal}
              onClear={clearNotifications}
              onRemove={removeNotification}
            />
          )}
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
