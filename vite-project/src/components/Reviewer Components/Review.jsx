import React, { useState } from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./Review.css";

const ReviewPage = () => {
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Paper Title 1",
      author: "Author Name 1",
      status: "Pending",
      link: "https://www.nber.org/system/files/working_papers/w24449/w24449.pdf", // Link to the research paper
    },
    {
      id: 2,
      title: "Paper Title 2",
      author: "Author Name 2",
      status: "Pending",
      link: "https://www.nber.org/system/files/working_papers/w24449/w24449.pdf",
    },
    // Add more papers as needed
  ]);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [comments, setComments] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  const handleReview = (paper) => {
    setSelectedPaper(paper);
    setIsReviewed(false);
    setComments("");
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const submitReview = (action) => {
    const updatedPapers = papers.map((paper) =>
      paper.id === selectedPaper.id
        ? {
            ...paper,
            status:
              action === "approve"
                ? "Approved"
                : action === "requestChanges"
                ? "Changes Required"
                : "Rejected",
          }
        : paper
    );

    setPapers(updatedPapers); // Update the papers state with the new status
    setIsReviewed(true); // Set the review status
    setSelectedPaper(null); // Clear the selected paper after review
    setComments(""); // Clear the comments
  };

  return (
    <div className="review-page">
      <ReviewerNavbar />
      <div className="review-page-container">
        <h1>Review Papers</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
              <th>View Paper</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper.author}</td>
                <td>{paper.status}</td>
                <td>
                  <button onClick={() => handleReview(paper)}>Review</button>
                </td>
                <td>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
              <button onClick={() => submitReview("approve")}>
                Approve Paper
              </button>
              <button onClick={() => submitReview("requestChanges")}>
                Request Changes
              </button>
              <button onClick={() => submitReview("reject")}>
                Reject Paper
              </button>
            </div>
          </div>
        )}

        {isReviewed && (
          <div className="review-status">
            <h3>
              {selectedPaper && selectedPaper.status === "Approved"
                ? "The paper has been approved."
                : selectedPaper && selectedPaper.status === "Changes Required"
                ? "Changes are required for the paper."
                : selectedPaper && selectedPaper.status === "Rejected"
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
