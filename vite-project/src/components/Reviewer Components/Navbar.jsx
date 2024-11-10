import React, { useEffect, useState } from "react";
import "./Navbar.css";
import notificaionIcon from "../../favIcon/notification.png";
import NotificationModal from "../notificationModel";
import { apiRequest } from "../RequestModul/requests";
import { notificationUser } from "../RequestModul/Endpoint";

const ReviewerNavbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
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
          auditId: data.id, // Notification audit ID
        }; // Return the title
      });
      setNotifications(titles);
    };

    fetchNotificationCount();
    const intervalId = setInterval(fetchNotificationCount, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearNotifications = async () => {
    const notificationIds = notifications.map((notification) => {
      return notification.auditId;
    });
    try {
      const response = await apiRequest(
        notificationUser,
        "DELETE",
        {
          ids: notificationIds,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response) {
        setNotifications([]);
        setNotificationCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeNotification = async (notificationId) => {
    const response = await apiRequest(
      notificationUser,
      "DELETE",
      {
        ids: [notificationId],
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response) {
      const updatedNotifications = notifications.filter(
        (notification) => notification.auditId !== notificationId
      );
      setNotifications(updatedNotifications);
      setNotificationCount(updatedNotifications.length);
    }
  };

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
    </nav>
  );
};

export default ReviewerNavbar;
