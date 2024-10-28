import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
const UserPublishPaperPage = () => {
  // const initialThesisData = [
  //   {
  //     title: "Energy Efficient Cloud Computing",
  //     abstract:
  //       "This thesis focuses on reducing energy consumption in data centers...",
  //     contributorAuthors: "John Doe, Alice Smith",
  //     references: "Thesis A, Thesis B, Thesis C",
  //     publishYear: 2023,
  //     keyword: "Cloud Computing, Energy Efficiency",
  //     document: "View-Thesis.pdf",
  //     authorName: "Ankit Kumar",
  //     comments: ["Great thesis!", "Needs more data on VM migration."],
  //   },
  //   {
  //     title: "AI and Machine Learning in Healthcare",
  //     abstract: "An overview of the impact of AI in medical diagnostics...",
  //     contributorAuthors: "Emily Johnson, Mark Lee",
  //     references: "Thesis X, Thesis Y",
  //     publishYear: 2022,
  //     keyword: "AI, Healthcare",
  //     document: "View-Thesis.pdf",
  //     authorName: "Jane Doe",
  //     comments: ["Innovative approach.", "Consider additional case studies."],
  //   },
  // ];
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

  return (
    <div className="user-home-page">
      <NavbarWithOutLogin />
      <div className="home-container">
        <h2>Published Thesis</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
