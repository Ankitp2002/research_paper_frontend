import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
const NotificationModal = ({ notifications, onClose, onClear, onRemove }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          X
        </button>
        <h2>Notifications</h2>

        <ul style={{ padding: "0px 10px", margin: "10px 0px" }}>
          {notifications.map((notification, index) => (
            <li
              key={notification.auditId}
              style={styles.notificationItem}
              onTouchEnd={() => onRemove(notification.auditId)}
            >
              <span>{notification.title}</span> {/* Display the title */}
              <div>
                <FaTrash
                  style={styles.trashIcon} // Style the trash icon
                  onClick={() => onRemove(notification.auditId)} // Optionally add click event for desktop devices
                />
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onClear} style={styles.clearButton}>
          Clear All
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: 8,
    width: "90%",
    maxWidth: 400,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    border: "none",
    fontSize: "16px",
    color: "black",
    cursor: "pointer",
  },
  clearButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    alignSelf: "flex-end",
    marginTop: "20px",
  },
  notificationList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    overflowY: "auto",
    maxHeight: "200px",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#ccc transparent", // Firefox
  },
  notificationItem: {
    backgroundColor: "#f1f1f1",
    padding: "10px 15px",
    borderRadius: 5,
    marginBottom: 10,
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  },
};

// Additional CSS for Chrome, Edge, and Safari scrollbars
const additionalStyles = `
  .notificationList::-webkit-scrollbar {
    width: 8px;
  }
  .notificationList::-webkit-scrollbar-track {
    background: transparent;
  }
  .notificationList::-webkit-scrollbar-thumb {
    background-color: #ccc; 
    border-radius: 10px;
  }
`;

// Inject additional styles into the document
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${additionalStyles}</style>`
);

export default NotificationModal;
