import React, { useState, useEffect, useRef } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PaperStatus.css";
import { apiRequest, tokenValidation } from "../RequestModul/requests";
import {
  AuthorPaperEndPoint,
  CreateAuthorPaperEndPoint,
} from "../RequestModul/Endpoint";
import { useNavigate } from "react-router";

const PaperStatusPage = () => {
  const papers = [
    {
      title: "Efficient Data Structures",
      abstract:
        "An in-depth look at modern data structures and their applications.",
      authors: "John Doe, Jane Smith",
      references: "Doe et al., 2020",
      keywords: "Data Structures, Algorithms",
      status: "Under Review",
      comments: ["Great paper!", "Needs more detail in section 3."],
    },
    {
      title: "AI in Healthcare",
      abstract: "A comprehensive study on the role of AI in modern healthcare.",
      authors: "Alice Johnson, Bob Brown",
      references: "Johnson et al., 2021",
      keywords: "Artificial Intelligence, Healthcare",
      status: "Approved",
      comments: ["Excellent research.", "Could improve conclusion."],
    },
    {
      title: "Blockchain Technology",
      abstract: "The future of decentralized systems and blockchain.",
      authors: "Mike Davis, Sarah Lee",
      references: "Davis et al., 2019",
      keywords: "Blockchain, Decentralization",
      status: "Rejected",
      comments: ["Needs more references.", "The argument is not clear."],
    },
  ];
  const [commentView, setCommentView] = useState(null);
  const toggleComments = (index) => {
    if (commentView === index) {
      setCommentView(null); // Hide comments if clicked again
    } else {
      setCommentView(index); // Show comments for the selected row
    }
  };
  // const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [authorDetails, setAuthorDetails] = useState({});
  const [editingPaper, setEditingPaper] = useState(null); // Track the paper being edited
  const [updatedPaper, setUpdatedPaper] = useState({
    title: "",
    content: "",
    file: null, // Include file in the state
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch author details and paper data on mount
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

    const fetchPapers = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await apiRequest(
          `${AuthorPaperEndPoint}/excluded`,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (Array.isArray(response) && response.length > 0) {
          setPapers(response); // Set the paper data to state
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchAuthorId();
    fetchPapers();
  }, [navigate]);

  // Handle file change
  const handleFileChange = (e) => {
    setUpdatedPaper((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  // Handle opening the edit form
  const handleEditClick = (paper) => {
    setEditingPaper(paper.id); // Set the ID of the paper being edited
    setUpdatedPaper({
      title: paper.title,
      file: null, // Keep file null unless changed by the user
    });
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPaper((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for paper update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", updatedPaper.title);
    formData.append("abstract", updatedPaper.abstract);
    formData.append("other_authors", updatedPaper.other_authors);
    formData.append("referace", updatedPaper.referace);
    formData.append("file", updatedPaper.file); // Append the file if a new one is selected
    formData.append("status", "submitted");
    try {
      const response = await fetch(`${AuthorPaperEndPoint}/${editingPaper}`, {
        method: "POST",
        body: formData,
      });

      if (response) {
        window.location.reload();
        setEditingPaper(null); // Close the edit form
      } else {
        setError(`Failed to update the paper: ${response.message}`);
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div className="paper-status-page">
      <AuthorNavbar />
      <div className="paper-status-container">
        <h2>Check Theses Status</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {papers.length > 0 ? (
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
                  Abstract
                </th>
                <th
                  style={{
                    color: "#666666",
                    textAlign: "center",
                    backgroundColor: "#fdfffe",
                  }}
                >
                  Contributor Authors
                </th>
                <th
                  style={{
                    color: "#666666",
                    textAlign: "center",
                    backgroundColor: "#fdfffe",
                  }}
                >
                  Referace
                </th>
                <th
                  style={{
                    color: "#666666",
                    textAlign: "center",
                    backgroundColor: "#fdfffe",
                  }}
                >
                  Keyword
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
              </tr>
            </thead>
            <tbody>
              {papers.map((thesis, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {thesis.title}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {thesis.abstract}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {thesis.authors}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {thesis.references}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {thesis.keywords}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color:
                        thesis.status === "Under Review"
                          ? "orange"
                          : thesis.status === "Approved"
                          ? "green"
                          : thesis.status === "Rejected"
                          ? "red"
                          : "black", // default color for other statuses
                    }}
                  >
                    {thesis.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No papers found.</p>
        )}

        {/* Edit form, shown only when editingPaper is set */}
        {editingPaper && (
          <form onSubmit={handleFormSubmit} className="edit-paper-form">
            <h2>Edit Paper</h2>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={updatedPaper?.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Abstract:
                <input
                  type="text"
                  name="abstract"
                  value={updatedPaper?.abstract}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Other Authors:
                <input
                  type="text"
                  name="other_authors"
                  value={updatedPaper?.other_authors}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Referace:
                <input
                  type="text"
                  name="referace"
                  value={updatedPaper?.referace}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>Authors:</label>
              <input
                type="text"
                value={authorDetails?.name ?? ""}
                readOnly // This makes the input non-editable
              />

              <label>Paper (PDF File):</label>
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <button type="submit">Submit Changes</button>
            <button type="button" onClick={() => setEditingPaper(null)}>
              Cancel
            </button>
          </form>
        )}
      </div>
      <AuthorFooter />
    </div>
  );
};

export default PaperStatusPage;
