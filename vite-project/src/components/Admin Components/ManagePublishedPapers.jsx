import React, { useState, useEffect, useRef } from "react"; // Import useRef
import NavbarAdmin from "./AdminNavbar";
import Footer from "./AdminFooter";
import "./ManagePublishedPapers.css";
import { apiRequest } from "../RequestModul/requests";
import {
  AuthorPaperEndPoint,
  CreateAuthorPaperEndPoint,
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
  const initialThesisData = [
    {
      title: "Energy Efficient Cloud Computing",
      abstract:
        "This thesis focuses on reducing energy consumption in data centers...",
      contributorAuthors: "John Doe, Alice Smith",
      references: "Paper A, Paper B, Paper C",
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
      references: "Paper X, Paper Y",
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
  const [thesisData, setThesisData] = useState(initialThesisData);
  const [commentView, setCommentView] = useState(null); // Track which row is showing comments
  // const [newComment, setNewComment] = useState(""); // Track new comment input

  // Function to toggle comment view
  const toggleComments = (index) => {
    setCommentView(commentView === index ? null : index);
    setNewComment(""); // Reset the comment input when switching rows
  };

  // // Function to handle adding a new comment
  // const handleAddComment = (index) => {
  //   if (newComment.trim()) {
  //     const updatedThesisData = [...thesisData];
  //     updatedThesisData[index].comments.push(newComment);
  //     setThesisData(updatedThesisData);
  //     setNewComment(""); // Clear the input after adding the comment
  //   }
  // };

  const [publishedPapers, setPublishedPapers] = useState([]);
  const [newPaper, setNewPaper] = useState({
    title: "",
    file: null,
    authorId: "",
    abstract: "",
    other_authors: "",
    references: "",
  });
  const [authors, setAuthors] = useState([]);
  const [authorMap, setAuthorMap] = useState({});
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Create a ref for the file input

  useEffect(() => {
    const fetchData = async () => {
      // First, wait for authors data to be collected
      const [authorDetails, authorMapDetails] = await fetchAuthors();
      if (authorMapDetails !== null && authorDetails !== null) {
        setAuthorMap(authorMapDetails); // Set author map data
        setAuthors(authorDetails); // Set author details
      } else {
        setError(authorDetails); // Handle error case
      }

      // After the first fetch is completed, wait for papers data to be collected
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

  const handleInputChange = (e) => {
    setNewPaper({ ...newPaper, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setNewPaper({ ...newPaper, file });
    } else {
      console.warn("No file selected");
    }
  };

  const handleAddPaper = async (event) => {
    event.preventDefault();
    const { title, file, authorId, abstract, other_authors, references } =
      newPaper;

    if (!title || !file || !authorId) {
      let errorMessage = "Please fill in all required fields.";
      if (!authorId) {
        errorMessage += " Select an author.";
      }
      setError(errorMessage);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("other_authors", other_authors);
    formData.append("referace", references);
    formData.append("file", file);
    formData.append("author_id", authorId);
    formData.append("submission_date", new Date().toISOString());
    formData.append("status", "published");

    try {
      const response = await fetch(CreateAuthorPaperEndPoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const paperData = await response.json();
        console.log(paperData);
        setPublishedPapers((prevPapers) => [
          ...prevPapers,
          {
            id: paperData.id,
            title: paperData.title,
            abstract: paperData.abstract,
            other_authors: paperData.other_authors,
            referace: paperData.referace,
            link: paperData.file_path,
            status: paperData.status,
            authorId: paperData.author_id,
            authorName: authorMap[paperData.author_id] || "",
          },
        ]);

        // Clear the form
        setNewPaper({ title: "", file: null, authorId: "" });
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input using ref
        }
        setError("");
      } else {
        setError("Error uploading paper: " + response.statusText);
      }
    } catch (error) {
      setError("An error occurred while uploading the paper.");
      console.error("Error:", error.message);
    }
  };

  const handleDeletePaper = async (id) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this paper?"
    // );
    // if (!confirmDelete) return;
    console.log(id);

    try {
      const response = await apiRequest(
        `${AuthorPaperEndPoint}/${id}`,
        "DELETE"
      );
      console.log(response);

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

  return (
    <div className="management-page">
      <NavbarAdmin />
      <div className="management-container">
        <h2>Manage Published Papers</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {/* <div className="add-paper-form">
          <input
            type="text"
            name="title"
            placeholder="Paper Title"
            value={newPaper.title}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="abstract"
            placeholder="Abstract"
            value={newPaper?.abstract}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="other_authors"
            placeholder="Other Authors"
            value={newPaper?.other_authors}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="references"
            placeholder="References"
            value={newPaper?.references}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="file"
            accept=".pdf" //,.doc,.docx,.txt"
            onChange={handleFileChange}
            ref={fileInputRef} // Attach the ref to the file input
          />
          <select
            name="authorId"
            value={newPaper.authorId}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.username}
              </option>
            ))}
          </select>
          <button onClick={handleAddPaper}>Add Paper</button>
        </div> */}
        <div className="papers-grid">
          {thesisData.map((paper) => (
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
              >
                {paper.document}
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
                    onClick={() => window.alert("Delete Thessis...")}
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
                    onClick={() => openModal(paper.comments, paper.title)}
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
                  <span>Views (123)</span> {/* Dummy count for views */}
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
      <Footer />
    </div>
  );
};

export default PublishedPapersManagement;
