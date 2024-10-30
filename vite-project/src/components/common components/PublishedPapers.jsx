import React, { useState, useEffect } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PublishedPaper.css";
import { apiRequest, tokenValidation } from "../RequestModul/requests"; // Adjust the import based on your project structure
import { useNavigate } from "react-router";
import {
  AUTHOREndPoint,
  AuthorPaperEndPoint,
  USEREndPoint,
} from "../RequestModul/Endpoint";
import { handleGetPaperB64 } from "../../utils/handleAuthor";
import deleteIcon from "../../favIcon/delete.png";

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
          `${AuthorPaperEndPoint}?status=published`,
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

  const handleDelete = async (id) => {
    try {
      const response = await apiRequest(`${AUTHOREndPoint}?id=${id}`, "DELETE");
      if (response) {
        setPublishedPapers(publishedPapers.filter((user) => user.id !== id)); // Update state after delete
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="management-page">
      <AuthorNavbar />
      <div className="management-container">
        <h2>Published Theses</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
              {publishedPapers.map((thesis, index) => (
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
                      href={`http://localhost:3000/${thesis.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View-thesis
                    </a>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => handleDelete(thesis.id)}
                        style={{
                          backgroundColor: "#E74C3C", // Red background
                          color: "#fff", // White text
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={deleteIcon} // Add your delete icon source here
                          alt="delete_icon"
                          style={{
                            height: 20,
                            marginRight: "8px",
                            filter: "brightness(0) invert(1)",
                          }} // Makes the icon white
                        />
                        Delete
                      </button>
                    </div>
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
