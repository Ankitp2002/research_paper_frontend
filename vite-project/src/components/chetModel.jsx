import React, { useState, useEffect } from "react";
import { apiRequest } from "./RequestModul/requests";
import { GetchetHistory, USEREndPoint } from "./RequestModul/Endpoint";
import { Navigate } from "react-router";

const ChatComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Store the current message being typed
  const [error, setError] = useState(""); // Error handling
  const [currentUser, setCurrentUser] = useState([]); // Store current user data
  const [users, setUsers] = useState([]); // Store other users for chat selection
  const token = sessionStorage.getItem("authToken");
  const [isSending, setIsSending] = useState(false);
  useEffect(() => {
    let interval;
    const fetchChetUser = async () => {
      try {
        let response = await apiRequest(`${USEREndPoint}`, "GET"); // Fetch users
        const current_user = await apiRequest(
          USEREndPoint,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (!current_user) {
          Navigate("/");
        }
        if (response && response.length > 0) {
          response = response.filter(
            (user) => user.role !== "admin" && user.id !== current_user.user_id
          );
          setCurrentUser(current_user);
          setUsers(response); // Update state with fetched users
        } else if (response.error) {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        setError("Error: " + error.message);
      }
    };
    fetchChetUser();

    // Fetch new messages every 5 seconds if there's a selected user
    if (selectedUser) {
      interval = setInterval(() => {
        fetchNewMessages(selectedUser);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval); // Clear interval when modal is closed
    };
  }, [selectedUser, messages]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setMessages([]); // Clear chat history when closing modal
  };

  const backToUserList = () => {
    setSelectedUser(null); // Deselect user and show user list
    setMessages([]);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    fetchChatHistory(user); // Fetch existing chat history for selected user
  };

  const fetchChatHistory = async (selected_chet) => {
    try {
      const dummyMessages = await apiRequest(
        `${GetchetHistory}?current_user=${currentUser.user_id}&&receiver=${selected_chet.id}`,
        "GET"
      );
      if (!currentUser) {
        Navigate("/");
      }
      const updatedMessages = dummyMessages.map((data) => ({
        ...data.message,
        sender: data.sender.name, // Replace sender ID with name
        mesg_id: data.id, // Use message ID
      }));

      setMessages(updatedMessages); // Store the fetched chat history
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const fetchNewMessages = async (selected_chet) => {
    console.log("Fetching new messages for user:", selected_chet);
    try {
      const newMessageData = await apiRequest(
        `${GetchetHistory}?current_user=${currentUser.user_id}&&receiver=${selected_chet.id}`,
        "GET"
      );
      if (!currentUser) {
        Navigate("/");
      }
      let updatedMessages = newMessageData.map((data) => ({
        ...data.message,
        sender: data.sender.name,
        mesg_id: data.id, // Use message ID
      }));

      // Filter out only new messages (those not already in the existing messages state)
      updatedMessages = updatedMessages.filter(
        (msg) =>
          !messages.some((existingMsg) => existingMsg.mesg_id === msg.mesg_id)
      );
      if (updatedMessages.length > 0) {
        // Update messages only if there are new messages
        setMessages((prevMessages) => [...prevMessages, ...updatedMessages]);
      }
    } catch (error) {
      console.error("Error fetching new messages:", error);
    }
  };

  const sendMessage = async (selected_chet) => {
    if (isSending) return; // Prevent sending multiple messages at the same time
    if (!newMessage.trim()) return; // Don't send empty messages

    setIsSending(true);

    try {
      const newSentMessage = { sender: currentUser.username, text: newMessage };

      // First API call to send the message
      await apiRequest(`${GetchetHistory}`, "POST", {
        current_user: currentUser.user_id,
        selected_chet: selected_chet.id,
        messages: newMessage,
      });

      // Second API call to fetch the updated message history
      const updatedMessages = await apiRequest(
        `${GetchetHistory}?current_user=${currentUser.user_id}&&receiver=${selected_chet.id}`,
        "GET"
      );

      // Process and update messages after both API calls
      const processedMessages = updatedMessages.map((data) => ({
        ...data.message,
        sender: data.sender.name,
        mesg_id: data.id, // Use message ID
      }));

      setMessages(processedMessages); // Update state with the latest messages
      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending or fetching messages:", error);
    } finally {
      setIsSending(false); // Allow sending after the message is sent
    }
  };

  const handleKeyDown = (e, selectedUser) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior (new line)
      sendMessage(selectedUser); // Send the message when Enter is pressed
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
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ✖
              </button>
            </div>

            {/* Users List or Chat */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px 20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {selectedUser ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "15px",
                    }}
                  >
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "10px",
                            borderRadius: "5px",
                            backgroundColor:
                              message.sender === "You" ? "#e1f7d5" : "#f1f1f1",
                            marginBottom: "10px",
                          }}
                        >
                          <strong>{message.sender}:</strong> {message.text}
                        </div>
                      ))
                    ) : (
                      <div>No messages yet</div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, selectedUser)}
                      placeholder="Type your message..."
                      style={{
                        width: "100%",
                        height: "50px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                    <button
                      onClick={() => sendMessage(selectedUser)}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => selectUser(user)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {user.name} ({user.role})
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
