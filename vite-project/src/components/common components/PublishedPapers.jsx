import React, { useState, useEffect } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PublishedPaper.css";
import { apiRequest, tokenValidation } from "../RequestModul/requests"; // Adjust the import based on your project structure
import { useNavigate } from "react-router";
import { AuthorPaperEndPoint } from "../RequestModul/Endpoint";
import { handleGetPaperB64 } from "../../utils/handleAuthor";

const PublishedPapersPage = () => {
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthorId = async () => {
      const token_Details = await tokenValidation(navigate);
      if (token_Details) {
        setAuthorDetails({
          name: token_Details.username,
          id: token_Details.user_id,
        });
      } else {
        setError("Failed to fetch author details.");
      }
    };

    // Fetch the paper status data when the component mounts
    const fetchPapers = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await apiRequest(
          `${AuthorPaperEndPoint}/published`,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        ); // Adjust the endpoint URL as necessary
        if (Array.isArray(response) && response.length > 0) {
          setPublishedPapers(response); // Set the paper data to state
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchPapers();
    fetchAuthorId();
  }, [navigate]);

  return (
    <div className="management-page">
      <AuthorNavbar />
      <div className="management-container">
        <h1>Published Papers</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* {!error && publishedPapers.length === 0 && (
          <p>No published papers found.</p>
        )} */}
        {publishedPapers.length > -1 && (
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
                <th style={{ color: "#666666", textAlign: "center" }}>
                  Keyword
                </th>
                <th style={{ color: "#666666", textAlign: "center" }}>
                  Document
                </th>
                <th style={{ color: "#666666", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {publishedPapers.map((paper) => (
                <tr key={paper.id}>
                  <td style={{ textAlign: "center" }}>{paper.title}</td>
                  <td style={{ textAlign: "center" }}>{paper?.abstract}</td>
                  <td style={{ textAlign: "center" }}>
                    {paper?.other_authors}
                  </td>
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
                  <td style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <button
                        onClick={() =>
                          alert("Delete action for " + thesis.title)
                        }
                        style={{
                          backgroundColor: "#E74C3C",
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
                            <li key={i}>
                              <strong>User</strong> :{comment}
                            </li>
                          ))}
                        </ul>
                        {/* <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Othercomment..."
                        style={{ width: "80%" }}
                        readOnly
                      />
                      <button onClick={() => handleAddComment(index)}>
                        Add Comment
                      </button> */}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AuthorFooter />
    </div>
  );
};

export default PublishedPapersPage;
