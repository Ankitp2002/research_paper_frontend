import React, { useState, useEffect } from "react";
import "./ReviewerManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { USEREndPoint, RegisterEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const ReviewerManagement = () => {
  const data = [
    {
      id: 1,
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  ];
  const [reviewers, setReviewers] = useState(data);
  const [error, setError] = useState("");
  const [newReviewer, setNewReviewer] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [editReviewerId, setEditReviewerId] = useState(null);

  // Fetch reviewers when component mounts
  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await apiRequest(`${USEREndPoint}/reviewer`, "GET"); // Fetch reviewers
        if (response && response.length > 0) {
          setReviewers(response); // Update state with fetched reviewers
        } else if (response.error) {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        setError("Error: " + error.message);
      }
    };

    fetchReviewers();
  }, []);

  // Add a new reviewer
  const handleAddReviewer = async () => {
    if (newReviewer.name && newReviewer.email) {
      const reviewerToAdd = {
        username: newReviewer.name,
        password: newReviewer.password,
        email: newReviewer.email,
        role: "reviewer",
      };

      try {
        const response = await apiRequest(
          RegisterEndPoint,
          "POST",
          JSON.stringify(reviewerToAdd)
        );

        if (response.user) {
          setReviewers([
            ...reviewers,
            { id: response.user.id, ...reviewerToAdd },
          ]);
          setNewReviewer({ id: "", name: "", email: "", password: "" }); // Clear input fields
        } else {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("Error adding reviewer.");
      }
    }
  };

  // Delete a reviewer
  const handleDelete = async (id) => {
    try {
      const response = await apiRequest(`${USEREndPoint}/${id}`, "DELETE");
      if (response) {
        setReviewers(reviewers.filter((reviewer) => reviewer.id !== id)); // Update state after delete
      } else {
        console.error("Error deleting reviewer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting reviewer:", error.message);
    }
  };

  // Update reviewer (called when "Update" button is clicked)
  const handleUpdateReviewer = async () => {
    if (editReviewerId !== null) {
      const updatedReviewer = {
        username: newReviewer.name,
        email: newReviewer.email,
        password: newReviewer.password,
      };

      try {
        const response = await apiRequest(
          `${USEREndPoint}/${editReviewerId}`,
          "PUT",
          JSON.stringify(updatedReviewer)
        );

        if (response.user) {
          setReviewers(
            reviewers.map((reviewer) =>
              reviewer.id === editReviewerId
                ? {
                    ...reviewer,
                    username: newReviewer.name,
                    email: newReviewer.email,
                    password: newReviewer.password,
                  }
                : reviewer
            )
          );
          setEditReviewerId(null);
          setNewReviewer({ id: "", name: "", email: "", password: "" }); // Clear input fields
        } else {
          console.error("Error updating reviewer:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  // Edit a reviewer (called when "Edit" button is clicked)
  const handleEdit = (reviewer) => {
    setEditReviewerId(reviewer.id);
    setNewReviewer({
      name: reviewer.username,
      email: reviewer.email,
      password: reviewer.password,
    });
  };

  return (
    <div className="reviewer-page">
      <AdminNavbar />
      <div className="reviewer-container">
        <h2>Reviewer Management</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="add-paper-form">
          <input
            type="text"
            placeholder="Name"
            value={newReviewer.name}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewReviewer({ ...newReviewer, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newReviewer.email}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewReviewer({ ...newReviewer, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={newReviewer.password}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewReviewer({ ...newReviewer, password: e.target.value })
            }
          />
          {/* Conditionally show Add or Update buttons */}
          {editReviewerId ? (
            <>
              <button onClick={handleUpdateReviewer}>Update Reviewer</button>
              <button onClick={() => setEditReviewerId(null)}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAddReviewer}>Add Reviewer</button>
          )}
        </div>

        <table className="reviewer-table">
          <thead>
            <tr>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                ID
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Name
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Email
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviewers.map((reviewer) => (
              <tr
                key={reviewer.id}
                style={{ color: "#666666", textAlign: "center" }}
              >
                <td style={{ textAlign: "center" }}>{reviewer.id}</td>
                <td style={{ textAlign: "center" }}>{reviewer.username}</td>
                <td style={{ textAlign: "center" }}>{reviewer.email}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(reviewer)}
                    style={{
                      backgroundColor: "#3498DB",
                      color: "#fff",
                      marginRight: "10px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => window.alert("delete Author")}
                    // onClick={() => handleDelete(reviewer.id)}
                    style={{
                      backgroundColor: "#E74C3C",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
};

export default ReviewerManagement;
