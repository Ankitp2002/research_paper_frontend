import React, { useState, useEffect } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PublishedPaper.css";
import { apiRequest, tokenValidation } from "../RequestModul/requests"; // Adjust the import based on your project structure
import { useNavigate } from "react-router";
import { AuthorPaperEndPoint } from "../RequestModul/Endpoint";
import { handleGetPaperB64 } from "../../utils/handleAuthor";

const PublishedPapersPage = () => {
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
                  Other Author
                </th>
                <th style={{ color: "#666666", textAlign: "center" }}>
                  Referance
                </th>
                <th style={{ color: "#666666", textAlign: "center" }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {publishedPapers.map((paper) => (
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
