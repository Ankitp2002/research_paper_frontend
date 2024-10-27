import React, { useEffect, useState } from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./Review.css";
import { useNavigate } from "react-router";
import {
  AuthorPaperEndPoint,
  USEREndPoint,
  ReviewAuthorPaper,
} from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import { handleGetPaperB64 } from "../../utils/handleAuthor";
import reviewIcon from "../../favIcon/feedback.png";

const ReviewPage = () => {
  const [commentView, setCommentView] = useState(null); // Track which row is showing comments
  const [newComment, setNewComment] = useState(""); // Track new comment input

  // Function to toggle comment view
  const toggleComments = (index) => {
    setCommentView(commentView === index ? null : index);
    setNewComment(""); // Reset the comment input when switching rows
  };
  const cancelReview = () => {
    setSelectedPaper(null); // This will hide the review form
    setComments(""); // Clear any entered comments
    setIsReviewed(false); // Reset review state if necessary
  };

  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [comments, setComments] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the paper status data when the component mounts
    const fetchPapers = async () => {
      try {
        const response = await apiRequest(
          `${AuthorPaperEndPoint}?status=excluded`,
          "GET"
        ); // Adjust the endpoint URL as necessary
        if (Array.isArray(response) && response.length > 0) {
          setPapers(response); // Set the paper data to state
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchPapers();
  }, [navigate]);

  const handleReview = (paper) => {
    setSelectedPaper(paper);
    setIsReviewed(false);
    setComments("");
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const submitReview = async (action, id, comment) => {
    const token = sessionStorage.getItem("authToken");
    const response = await apiRequest(
      `${ReviewAuthorPaper}?id=${id}`,
      "PUT",
      JSON.stringify({ status: action, comment: comment }),
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.message == "Review status updated successfully") {
      const updatedPapers = papers.map((paper) =>
        paper.id === selectedPaper.id
          ? {
              ...paper,
              status:
                action === "published"
                  ? "Approved"
                  : action === "reviewed"
                  ? "Changes Required"
                  : "Rejected",
            }
          : paper
      );
      setPapers(updatedPapers); // Update the papers state with the new status
      setIsReviewed(true); // Set the review status
      setSelectedPaper(null); // Clear the selected paper after review
      setComments(""); // Clear the comments
      setError(null);
      window.location.reload();
    } else {
      setError(`Error: ${response.error}`);
    }
  };

  return (
    <div className="review-page">
      <ReviewerNavbar />
      <div className="review-container">
        <h2>Review Thesis</h2>
        <table className="review-table">
          <thead>
            <tr>
              <th style={{ color: "#666666", textAlign: "center" }}>Title</th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Abstract
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Contributor Authors
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                References
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>Keyword</th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Document
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td style={{ textAlign: "center" }}>{paper.title}</td>
                <td style={{ textAlign: "center" }}>{paper.abstract}</td>
                <td style={{ textAlign: "center" }}>
                  {paper.contributorAuthors}
                </td>
                <td style={{ textAlign: "center" }}>{paper.references}</td>
                <td style={{ textAlign: "center" }}>{paper.keyword}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                    style={{ color: "#3498DB" }}
                  >
                    View Thesis
                  </a>
                </td>
                <td
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => handleReview(paper)}
                    style={{
                      backgroundColor: "#3498DB", // Changed to a blue color for Edit
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
                      src={reviewIcon} // Add your edit icon source here
                      alt="review_icon"
                      style={{ height: 20, marginRight: "8px" }}
                    />
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPaper && !isReviewed && (
          <div className="review-form">
            <h2>Reviewing: {selectedPaper.title}</h2>
            <label>
              Comments:
              <textarea
                value={comments}
                onChange={handleCommentChange}
                placeholder="Add your comments here"
              ></textarea>
            </label>
            <div className="review-buttons">
              <button
                onClick={() =>
                  submitReview("published", selectedPaper.id, comments)
                }
                style={{
                  backgroundColor: "#2ECC71",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                Approve Thesis
              </button>
              <button
                onClick={() =>
                  submitReview("reviewed", selectedPaper.id, comments)
                }
                style={{
                  backgroundColor: "#F1C40F",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                Request Changes
              </button>
              <button
                onClick={() =>
                  submitReview("rejected", selectedPaper.id, comments)
                }
                style={{
                  backgroundColor: "#E74C3C",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Reject Thesis
              </button>
              <button
                onClick={() => cancelReview()} // This function will close the popup
                style={{
                  backgroundColor: "#95A5A6",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isReviewed && (
          <div className="review-status">
            <h3>
              {selectedPaper && selectedPaper.status === "published"
                ? "The paper has been approved."
                : selectedPaper && selectedPaper.status === "reviewed"
                ? "Changes are required for the paper."
                : selectedPaper && selectedPaper.status === "rejected"
                ? "The paper has been rejected."
                : ""}
            </h3>
          </div>
        )}
      </div>
      <ReviewerFooter />
    </div>
  );
};

export default ReviewPage;
