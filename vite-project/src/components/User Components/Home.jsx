import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
import { AUTHOREndPoint } from "../RequestModul/Endpoint";
const UserPublishPaperPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPaperTitle, setCurrentPaperTitle] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentComments([]);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCurrentComments([...currentComments, newComment]);
      setNewComment(""); // Clear input field after adding comment
    }
  };
  const [publishPaper, setPublishedPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const paperData = await fetchPaper();
      if (typeof paperData === "object" && paperData !== null) {
        setPublishedPapers(paperData);
      } else {
        setError(paperData); // paperData here could be an error message
      }
    };
    fetchData();
  }, []);
  const handleViewThesis = async (documentPath, paperId) => {
    try {
      // First, call the API to increase the view count
      const response = await fetch(`${AUTHOREndPoint}?for=view_count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div className="user-home-page">
      <NavbarWithOutLogin />
      <div className="home-container">
        <h2>Published Thesis</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <div className="papers-grid">
            {publishPaper.map((paper) => (
              <div className="paper-card" key={paper.id}>
                <h3 className="paper-title">{paper.title}</h3>
                <p className="paper-abstract">
                  {" "}
                  <strong>Abstract:</strong>
                  {paper.abstract}
                </p>
                <p className="paper-contributor">
                  <strong>Contributor Authors:</strong>{" "}
                  {paper.contributorAuthors}
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
              </div>
            ))}
          </div>

          {/* Modal Component */}
          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button" onClick={closeModal}>
                  X
                </button>
                <h2>Comments for {currentPaperTitle}</h2>
                <ul>
                  {currentComments.length > 0 ? (
                    currentComments.map((comment, i) => (
                      <li key={i}>
                        <strong>User:</strong> {comment}
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
                  <button onClick={handleAddComment}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPublishPaperPage;
