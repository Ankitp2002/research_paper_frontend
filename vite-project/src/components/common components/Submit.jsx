import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Submit.css";
import { tokenValidation } from "../RequestModul/requests"; // Import the apiRequest function
import { CreateAuthorPaperEndPoint } from "../RequestModul/Endpoint";
import { useNavigate } from "react-router";

const Submit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    other_authors: "",
    keywords: "",
    file: null,
    references: "",
    keyword: "",
  });
  const [authorDetails, setAuthorDetails] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
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

    fetchAuthorId(); // Call the function to fetch author ID
  }, [navigate]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("abstract", formData.abstract);
    submissionData.append("other_authors", formData.other_authors);
    submissionData.append("referace", formData.references);
    submissionData.append("file", formData.file);
    submissionData.append("author_id", authorDetails.id);
    submissionData.append("keyword", formData.keyword);
    submissionData.append("status", "submitted");

    try {
      // Make the API request
      const response = await fetch(CreateAuthorPaperEndPoint, {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        // Success: clear the form and show a success message
        setFormData({
          title: "",
          other_authors: "",
          abstract: "",
          keywords: "",
          file: null,
          references: "",
        });
        setSuccessMessage("Paper submitted successfully!");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input using ref
        }
        setError("");
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        setSuccessMessage("");
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="submit-page">
      <Navbar />
      <div className="submit-container">
        <h2>Submit Your Thesis</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            required
          />
          <label>abstract:</label>
          <input
            type="text"
            name="abstract"
            value={formData?.abstract}
            onChange={handleChange}
            required
          />
          <label>Contributor Authors:</label>
          <input
            type="text"
            name="other_authors"
            value={formData?.other_authors}
            onChange={handleChange}
            required
          />
          <label>References:</label>
          <input
            type="text"
            name="references"
            value={formData?.references}
            onChange={handleChange}
            required
          />
          <label>Keyword:</label>
          <input
            type="text"
            name="keyword"
            value={formData?.keyword ?? ""}
            onChange={handleChange}
            required // This makes the input non-editable
          />
          <label>Author:</label>
          <input
            type="text"
            value={authorDetails?.name ?? "Author"}
            readOnly // This makes the input non-editable
          />

          <label>Thesis (PDF File):</label>
          <input
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />

          <button type="submit">Submit Thesis</button>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} */}
      </div>
      <Footer />
    </div>
  );
};

export default Submit;
