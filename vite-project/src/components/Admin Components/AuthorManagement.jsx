import React, { useState, useEffect } from "react";
import "./AuthorManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { USEREndPoint, RegisterEndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const AuthorManagement = () => {
  const [reviewers, setAuthors] = useState([]);
  const [error, setError] = useState("");
  const [newAuthor, setNewAuthor] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [editAuthorId, setEditAuthorId] = useState(null);

  // Fetch reviewers when component mounts
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await apiRequest(`${USEREndPoint}/author`, "GET"); // Fetch reviewers
        if (response && response.length > 0) {
          setAuthors(response); // Update state with fetched reviewers
        } else if (response.error) {
          setError(`Error: ${response.error?.parent?.sqlMessage}`);
        }
      } catch (error) {
        setError("Error: " + error.message);
      }
    };

    fetchAuthors();
  }, []);

  // Add a new reviewer
  const handleAddAuthor = async () => {
    if (newAuthor.name && newAuthor.email) {
      const reviewerToAdd = {
        username: newAuthor.name,
        password: newAuthor.password,
        email: newAuthor.email,
        role: "author",
      };

      try {
        const response = await apiRequest(
          RegisterEndPoint,
          "POST",
          JSON.stringify(reviewerToAdd)
        );

        if (response.user) {
          setAuthors([
            ...reviewers,
            { id: response.user.id, ...reviewerToAdd },
          ]);
          setNewAuthor({ id: "", name: "", email: "", password: "" }); // Clear input fields
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
        setAuthors(reviewers.filter((reviewer) => reviewer.id !== id)); // Update state after delete
      } else {
        console.error("Error deleting reviewer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting reviewer:", error.message);
    }
  };

  // Update reviewer (called when "Update" button is clicked)
  const handleUpdateAuthor = async () => {
    if (editAuthorId !== null) {
      const updatedAuthor = {
        username: newAuthor.name,
        email: newAuthor.email,
        password: newAuthor.password,
      };

      try {
        const response = await apiRequest(
          `${USEREndPoint}/${editAuthorId}`,
          "PUT",
          JSON.stringify(updatedAuthor)
        );

        if (response.user) {
          setAuthors(
            reviewers.map((reviewer) =>
              reviewer.id === editAuthorId
                ? {
                    ...reviewer,
                    username: newAuthor.name,
                    email: newAuthor.email,
                    password: newAuthor.password,
                  }
                : reviewer
            )
          );
          setEditAuthorId(null);
          setNewAuthor({ id: "", name: "", email: "", password: "" }); // Clear input fields
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
    setEditAuthorId(reviewer.id);
    setNewAuthor({
      name: reviewer.username,
      email: reviewer.email,
      password: reviewer.password,
    });
  };

  return (
    <div className="author-page">
      <AdminNavbar />
      <div className="author-container">
        <h2>Author Management</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="add-paper-form">
          <input
            type="text"
            placeholder="Name"
            value={newAuthor.name}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewAuthor({ ...newAuthor, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newAuthor.email}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewAuthor({ ...newAuthor, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={newAuthor.password}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={(e) =>
              setNewAuthor({ ...newAuthor, password: e.target.value })
            }
          />
          {/* Conditionally show Add or Update buttons */}
          {editAuthorId ? (
            <>
              <button onClick={handleUpdateAuthor}>Update Author</button>
              <button onClick={() => setEditAuthorId(null)}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAddAuthor}>Add Author</button>
          )}
        </div>

        <table className="author-table">
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
                    onClick={() => handleDelete(reviewer.id)}
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

export default AuthorManagement;
