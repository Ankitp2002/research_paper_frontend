import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
import commentIcon from "../../favIcon/comment.png";
import viewIcon from "../../favIcon/view.png";
const UserPublishPaperPage = () => {
  const initialThesisData = [
    {
      title: "Energy Efficient Cloud Computing",
      abstract:
        "This thesis focuses on reducing energy consumption in data centers...",
      contributorAuthors: "John Doe, Alice Smith",
      references: "Thesis A, Thesis B, Thesis C",
      publishYear: 2023,
      keyword: "Cloud Computing, Energy Efficiency",
      document: "View-Thesis.pdf",
      authorName: "Ankit Kumar",
      comments: ["Great thesis!", "Needs more data on VM migration."],
    },
    {
      title: "AI and Machine Learning in Healthcare",
      abstract: "An overview of the impact of AI in medical diagnostics...",
      contributorAuthors: "Emily Johnson, Mark Lee",
      references: "Thesis X, Thesis Y",
      publishYear: 2022,
      keyword: "AI, Healthcare",
      document: "View-Thesis.pdf",
      authorName: "Jane Doe",
      comments: ["Innovative approach.", "Consider additional case studies."],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPaperTitle, setCurrentPaperTitle] = useState("");

  const openModal = (comments, title) => {
    setCurrentComments(comments);
    setCurrentPaperTitle(title);
    setIsModalOpen(true);
  };

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
  const [commentView, setCommentView] = useState(null);
  const [publishPaper, setThesisData] = useState(initialThesisData);

  // const [publishPaper, setPublishedPapers] = useState([]);
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

  return (
    <div className="user-home-page">
      <NavbarUser />
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
                >
                  {paper.document}
                </a>
                <div
                  className="actions"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    onClick={() => openModal(paper.comments, paper.title)}
                    style={{
                      backgroundColor: "#F1C40F",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center", // Align icon and text
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
                    onClick={() => openViewModal(paper.id)} // Replace with your view function
                    style={{
                      backgroundColor: "#3498DB",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "1px solid #ccc", // Add border to match the design in the screenshot
                      borderRadius: "4px",
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center", // Align icon and text
                    }}
                  >
                    <img
                      src={viewIcon}
                      alt="view_icon"
                      style={{ height: 20, marginRight: "8px" }}
                    />
                    <span>Views (123)</span> {/* Dummy count for views */}
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
