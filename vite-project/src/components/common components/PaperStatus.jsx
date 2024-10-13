import React, { useState, useEffect } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PaperStatus.css";
import { apiRequest, tokenValidation } from "../RequestModul/requests"; // Assuming this is your request utility
import { AuthorPaperEndPoint } from "../RequestModul/Endpoint";
import { useNavigate } from "react-router";

const PaperStatusPage = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [authorDetails, setAuthorDetails] = useState({});
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
      try {
        const response = await apiRequest(
          `${AuthorPaperEndPoint}/excluded`,
          "GET"
        ); // Adjust the endpoint URL as necessary
        debugger;
        if (Array.isArray(response) && response.length > 0) {
          setPapers(response); // Set the paper data to state
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchPapers();
    fetchAuthorId();
  }, [navigate]);

  return (
    <div className="paper-status-page">
      <AuthorNavbar />
      <div className="paper-status-container">
        <h1>Check Paper Status</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && papers.length === 0 && <p>No papers found.</p>}
        {papers.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.title}</td>
                  <td>{paper.status}</td>
                  <td>{paper.comments}</td>
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

export default PaperStatusPage;
