import React, { useState, useEffect, useRef } from "react"; // Import useRef
import NavbarAdmin from "./AdminNavbar";
import Footer from "./AdminFooter";
import "./ManagePublishedPapers.css";
import { apiRequest } from "../RequestModul/requests";
import {
  AddComments,
  AUTHOREndPoint,
  AuthorPaperEndPoint,
  CreateAuthorPaperEndPoint,
  REVIEWEREndPoint,
} from "../RequestModul/Endpoint";
import {
  fetchAuthors,
  fetchPaper,
  handleGetPaperB64,
} from "../../utils/handleAuthor";

import deleteIcon from "../../favIcon/delete.png";
import commentIcon from "../../favIcon/comment.png";
import viewIcon from "../../favIcon/view.png";

const PublishedPapersManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentPaper, setCurrentPaper] = useState({});

  const openModal = (paper) => {
    setCurrentPaper(paper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const token = sessionStorage.getItem("authToken");
  const handleAddComment = async (thesis_id) => {
    if (newComment.trim()) {
      const response = await apiRequest(
        `${AddComments}`,
        "POST",
        { comment: newComment, thesisId: thesis_id },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response) {
        currentPaper.comments.push(response); // Add the new comment to the paper
        setCurrentPaper(currentPaper);
        setNewComment(""); // Clear input field after adding comment
      }
    }
  };

  const [publishedPapers, setPublishedPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const authorPublishPaper = await fetchPaper();

      if (
        typeof authorPublishPaper === "object" &&
        authorPublishPaper !== null
      ) {
        setPublishedPapers(authorPublishPaper); // Set published papers data
      } else {
        setError(authorPublishPaper); // Handle error case
      }
    };

    fetchData(); // Call the async function

    // Optionally return a cleanup function if necessary
  }, []); // Empty dependency array ensures this only runs on component mount

  const handleDeletePaper = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paper?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await apiRequest(
        `${AuthorPaperEndPoint}?id=${id}`,
        "DELETE"
      );
      if (response) {
        setPublishedPapers(publishedPapers.filter((paper) => paper.id !== id));
      } else {
        const errorData = await response.json();
        setError(`Error deleting paper: ${errorData.message}`);
      }
    } catch (error) { 
      console.error("Error deleting paper:", error);
      setError("Failed to delete the paper.");
    }
  };
  const handleViewThesis = async (documentPath, paperId) => {
    try {
      // First, call the API to increase the view count

      const response = await fetch(`${AUTHOREndPoint}?for=view_count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paperId }), // Pass paperId to the API
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to increase view count");
      }

      // Open the document link in a new tab
      window.open(
        `http://localhost:3000/${documentPath}`,
        "_blank",
        "noopener,noreferrer"
      );

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="management-page">
      <NavbarAdmin />
      <div className="management-container">
        <h2>Manage Published Papers</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="papers-grid">
          {publishedPapers.map((paper) => (
            <div className="paper-card" key={paper.id}>
              <h3 className="paper-title">{paper.title}</h3>
              <p className="paper-abstract">
                {" "}
                <strong>Abstract:</strong>
                {paper.abstract}
              </p>
              <p className="paper-contributor">
                <strong>Contributor Authors:</strong> {paper.contributorAuthors}
              </p>
              <p className="paper-references">
                <strong>References:</strong> {paper.references}
              </p>
              <p className="paper-year">
                <strong>Publish Year:</strong> {paper.publishYear}
              </p>
              <p className="paper-keyword">
                <strong>Keyword:</strong> {paper.keyword}
              </p>
              <a
                href={`/${paper.document}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  width: "100%",
                  color: "#3498DB", // Link color
                  textDecoration: "none", // Remove underline
                  overflow: "hidden", // Hide overflow content
                }}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link navigation
                  handleViewThesis(paper.document, paper.id); // Call the function with parameters
                }}
              >
                View-thesis
              </a>
              <div
                className="actions"
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleDeletePaper(paper.id)}
                    style={{
                      backgroundColor: "#F1C40F",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete_icon"
                      style={{ height: 20 }}
                    />
                  </button>

                  <button
                    onClick={() => openModal(paper)}
                    style={{
                      backgroundColor: "#F1C40F",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={commentIcon}
                      alt="comment_icon"
                      style={{ height: 20 }}
                    />
                  </button>
                </div>

                <button
                  onClick={() => openViewModal(paper.id)} // Replace with your view function
                  style={{
                    backgroundColor: "#3498DB",
                    color: "#fff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={viewIcon}
                    alt="view_icon"
                    style={{ height: 20, marginRight: "8px" }}
                  />
                  <span>Views ({paper.view_count ? paper.view_count : 0})</span>{" "}
                  {/* Dummy count for views */}
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                X
              </button>
              <h2>Comments for {currentPaper.title}</h2>
              <ul>
                {currentPaper.comments.length > 0 ? (
                  currentPaper.comments.map((comment, i) => (
                    <li key={i}>
                      <strong>{comment.userName}:</strong> {comment.comment}
                    </li>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </ul>

              {/* Add Comment Section */}
              <div className="add-comment-section">
                <textarea
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleAddComment(currentPaper.id)}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PublishedPapersManagement;
