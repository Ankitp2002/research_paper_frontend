import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import commentIcon from "../../favIcon/comment.png";
import viewIcon from "../../favIcon/view.png";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
import { AUTHOREndPoint } from "../RequestModul/Endpoint";
const UserPublishPaperPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPaperTitle, setCurrentPaperTitle] = useState("");
  const [currentPaper, setCurrentPaper] = useState({});
  const openModal = (paper) => {
    setCurrentPaper(paper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                <div
                  className="actions"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    onClick={() => openModal(paper)}
                    style={{
                      backgroundColor: "#F1C40F",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={commentIcon}
                      alt="comment_icon"
                      style={{ height: 20, marginRight: "8px" }}
                    />
                    <span>Comments ({paper.comments.length || 0})</span>
                  </button>
                  <button
                    style={{
                      backgroundColor: "#3498DB",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={viewIcon}
                      alt="view_icon"
                      style={{ height: 20, marginRight: "8px" }}
                    />
                    <span>Views ({paper.view_count || 0})</span>
                  </button>
                </div>
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
                {/* <div className="add-comment-section">
                  <textarea
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(currentPaper.id)}>
                    Submit
                  </button>
                </div> */}
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
