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
  const [publishedPapers, setPublishedPapers] = useState([]);
  const [newPaper, setNewPaper] = useState({
    title: "",
    file: null,
    authorId: "",
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
    const { title, file, authorId } = newPaper;

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
        <div className="add-paper-form">
          <input
            type="text"
            name="title"
            placeholder="Paper Title"
            value={newPaper.title}
            style={{ color: "#666666", backgroundColor: "#f8f8f8" }}
            onChange={handleInputChange}
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
        </div>
        <table className="papers-table">
          <thead>
            <tr>
              <th style={{ color: "#666666" }}>Title</th>
              <th style={{ color: "#666666" }}>Link</th>
              <th style={{ color: "#666666" }}>Status</th>
              <th style={{ color: "#666666" }}>Author Name</th>
              <th style={{ color: "#666666" }}>Author ID</th>
              <th style={{ color: "#666666" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishedPapers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                  >
                    View Paper
                  </a>
                </td>
                <td>{paper.status}</td>
                <td>{authorMap[paper.authorId]}</td>
                <td>{paper.authorId}</td>
                <td>
                  <button onClick={() => handleDeletePaper(paper.id)}>
                    Delete
                  </button>
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
