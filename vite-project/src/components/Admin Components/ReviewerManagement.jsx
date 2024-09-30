import React, { useState } from "react";
import "./ReviewerManagement.css";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

const ReviewerManagement = () => {
  const [reviewers, setReviewers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Brown", email: "bob@example.com" },
  ]);

  const [newReviewer, setNewReviewer] = useState({ name: "", email: "" });
  const [editReviewerId, setEditReviewerId] = useState(null);

  const handleAddReviewer = () => {
    if (newReviewer.name && newReviewer.email) {
      setReviewers([...reviewers, { id: Date.now(), ...newReviewer }]);
      setNewReviewer({ name: "", email: "" }); // Clear input fields
    }
  };

  const handleUpdateReviewer = () => {
    if (editReviewerId !== null) {
      setReviewers(
        reviewers.map((reviewer) =>
          reviewer.id === editReviewerId
            ? { ...reviewer, ...newReviewer }
            : reviewer
        )
      );
      setEditReviewerId(null);
      setNewReviewer({ name: "", email: "" }); // Clear input fields
    }
  };

  const handleDelete = (id) => {
    setReviewers(reviewers.filter((reviewer) => reviewer.id !== id));
  };

  const handleEdit = (reviewer) => {
    setEditReviewerId(reviewer.id);
    setNewReviewer({ name: reviewer.name, email: reviewer.email });
  };

  return (
    <div className="reviewer-management">
      <AdminNavbar />

      <h2>Reviewer Management</h2>
      <div className="reviewer-form">
        <input
          type="text"
          placeholder="Name"
          value={newReviewer.name}
          onChange={(e) =>
            setNewReviewer({ ...newReviewer, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newReviewer.email}
          onChange={(e) =>
            setNewReviewer({ ...newReviewer, email: e.target.value })
          }
        />
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviewers.map((reviewer) => (
            <tr key={reviewer.id}>
              <td>{reviewer.id}</td>
              <td>{reviewer.name}</td>
              <td>{reviewer.email}</td>
              <td>
                <button onClick={() => handleEdit(reviewer)}>Edit</button>
                <button onClick={() => handleDelete(reviewer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminFooter />
    </div>
  );
};

export default ReviewerManagement;
