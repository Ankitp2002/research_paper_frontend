import React, { useState, useEffect } from "react";

const ChatComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Store the current message being typed

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
    { id: 4, name: "John Doe" },
    { id: 5, name: "Jane Smith" },
    { id: 6, name: "Alex Johnson" },
    { id: 7, name: "John Doe" },
    { id: 8, name: "Jane Smith" },
    { id: 9, name: "Alex Johnson" },
    { id: 10, name: "Ankit Johnson" },
  ];

  useEffect(() => {
    let interval;

    // Fetch new messages every 2 seconds if there's a selected user
    if (selectedUser) {
      interval = setInterval(() => {
        fetchNewMessages(selectedUser.id);
      }, 5000);
    }

    // Clear interval when modal is closed or user is unselected
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedUser]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setMessages([]); // Clear chat history when closing modal
  };
  const backToUserList = () => {
    setSelectedUser(null); // Deselect the current user and show the user list
  };
  const selectUser = (user) => {
    setSelectedUser(user);
    fetchChatHistory(user.id); // Fetch existing chat history for the user
  };

  // Simulating chat history fetch with dummy data
  const fetchChatHistory = async (userId) => {
    console.log("Fetching chat history for user:", userId);
    // Use dummy data for now
    const dummyMessages = [
      { sender: "John Doe", text: "Hello, how are you?" },
      { sender: "You", text: "I'm good, thanks! How about you?" },
    ];
    setMessages(dummyMessages); // Set dummy data as the message history
  };

  // Simulating fetching new messages with dummy data
  const fetchNewMessages = async (userId) => {
    console.log("Fetching new messages for user:", userId);
    // Simulate new message data
    const newMessageData = [
      { sender: "John Doe", text: "Did you get my last message?" },
    ];
    if (newMessageData.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...newMessageData]);
    }
  };

  // Simulating sending a message with dummy data
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Simulate sending message without API call
    const newSentMessage = { sender: "You", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, newSentMessage]);
    setNewMessage(""); // Clear input field
    console.log("Message sent:", newSentMessage);
    // Here, you would make the API call in the future
    // Example: await axios.post("/api/chats", newSentMessage);
  };

  // Handle Enter key press to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (new line)
      sendMessage(); // Send the message
    }
  };

  return (
    <div>
      {/* Chat Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "91px",
          right: "43px",
          backgroundColor: "#8dbef2",
          color: "white",
          borderRadius: "50%",
          width: "55px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={openModal}
      >
        💬
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: "999",
            }}
            onClick={closeModal}
          ></div>

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              maxWidth: "600px",
              maxHeight: "80vh",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              zIndex: "1000",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                borderBottom: "1px solid #ddd",
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Back Button */}
              {selectedUser && (
                <button
                  onClick={backToUserList}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#007bff",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                  onMouseLeave={(e) => (e.target.style.color = "#007bff")}
                >
                  ← Back
                </button>
              )}
              <div
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                Chat
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#999",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#333")}
                onMouseLeave={(e) => (e.target.style.color = "#999")}
              >
                &times;
              </button>
            </div>

            <div
              style={{
                padding: "10px",
                flex: "1",
                overflowY: "auto",
              }}
            >
              {!selectedUser ? (
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {users.map((user, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => selectUser(user)}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <h3>Connected with {selectedUser.name}</h3>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px",
                      height: "300px",
                      overflowY: "auto",
                      marginBottom: "10px",
                    }}
                  >
                    {messages.map((msg, index) => (
                      <p key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                      </p>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown} // Handle Enter key press
                    />
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={sendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
