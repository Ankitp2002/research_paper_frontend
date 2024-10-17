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
      document: "Thesis1.pdf",
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
      document: "Thesis2.pdf",
      authorName: "Jane Doe",
      comments: ["Innovative approach.", "Consider additional case studies."],
    },
  ];

  const [thesisData, setThesisData] = useState(initialThesisData);
  const [commentView, setCommentView] = useState(null); // Track which row is showing comments
  const [newComment, setNewComment] = useState(""); // Track new comment input

  // Function to toggle comment view
  const toggleComments = (index) => {
    setCommentView(commentView === index ? null : index);
    setNewComment(""); // Reset the comment input when switching rows
  };

  // Function to handle adding a new comment
  const handleAddComment = (index) => {
    if (newComment.trim()) {
      const updatedThesisData = [...thesisData];
      updatedThesisData[index].comments.push(newComment);
      setThesisData(updatedThesisData);
      setNewComment(""); // Clear the input after adding the comment
    }
  };

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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <table className="papers-table">
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
              <th style={{ color: "#666666", textAlign: "center" }}>
                Publish Year
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>Keyword</th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Document
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Author Name
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {publishedPapers.map((paper) => (
              <tr key={paper.id}>
                <td style={{ textAlign: "center" }}>{paper?.title}</td>
                <td style={{ textAlign: "center" }}>{paper?.abstract}</td>
                <td style={{ textAlign: "center" }}>{paper?.other_authors}</td>
                <td style={{ textAlign: "center" }}>{paper?.referace}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                  >
                    View Paper
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>
                  {authorMap[paper.authorId]}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleDeletePaper(paper.id)}
                    style={{
                      backgroundColor: "#E74C3C",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} */}
            {thesisData.map((thesis, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{thesis.title}</td>
                <td style={{ textAlign: "center" }}>{thesis.abstract}</td>
                <td style={{ textAlign: "center" }}>
                  {thesis.contributorAuthors}
                </td>
                <td style={{ textAlign: "center" }}>{thesis.references}</td>
                <td style={{ textAlign: "center" }}>{thesis.publishYear}</td>
                <td style={{ textAlign: "center" }}>{thesis.keyword}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={`/${thesis.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {thesis.document}
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>{thesis.authorName}</td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => alert("Delete action for " + thesis.title)}
                      style={{
                        backgroundColor: "#2ECC71",
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        marginRight: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => toggleComments(index)}
                      style={{
                        backgroundColor: "#F1C40F",
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        marginRight: "10px",
                      }}
                    >
                      Comment
                    </button>
                  </div>

                  {commentView === index && (
                    <div
                      style={{
                        marginTop: "10px",
                        textAlign: "left",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    >
                      <strong>Comments:</strong>
                      <ul>
                        {thesis.comments.map((comment, i) => (
                          <li key={i}>User :{comment}</li>
                        ))}
                      </ul>
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        style={{ width: "80%" }}
                      />
                      <button onClick={() => handleAddComment(index)}>
                        Add Comment
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default PublishedPapersManagement;
