import React, { useEffect, useState } from "react";
import "./ReviewPaper.css";
import { useNavigate } from "react-router";
import {
  AuthorPaperEndPoint,
  ReviewAuthorPaper,
} from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import { handleGetPaperB64 } from "../../utils/handleAuthor";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const ReviewPage = () => {
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
          `${AuthorPaperEndPoint}/excluded`,
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
      ReviewAuthorPaper,
      "POST",
      JSON.stringify({ status: action, paper_id: id, comment: comment }),
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
      <AdminNavbar />
      <div className="review-container">
        <h2>Review Papers</h2>
        <table className="review-table">
          <thead>
            <tr>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Title
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Author
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Status
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                Action
              </th>
              <th
                style={{
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#fdfffe",
                }}
              >
                View Paper
              </th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td style={{ textAlign: "center" }}>{paper.title}</td>
                <td style={{ textAlign: "center" }}>{paper?.User?.username}</td>
                <td style={{ textAlign: "center" }}>{paper.status}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleReview(paper)}
                    style={{
                      backgroundColor: "#3498DB",
                      color: "#fff",
                      marginRight: "10px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Review
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                    style={{ color: "#3498DB" }}
                  >
                    View Paper
                  </a>
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
                Approve Paper
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
                Reject Paper
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
      <AdminFooter />
    </div>
  );
};

export default ReviewPage;
