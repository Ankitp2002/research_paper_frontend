import React, { useState, useEffect } from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PublishedPaper.css";
import { apiRequest } from "../RequestModul/requests"; // Adjust the import based on your project structure

const PublishedPapersPage = () => {
  const [publishedPapers, setPublishedPapers] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPublishedPapers = async () => {
  //     const token = localStorage.getItem("token"); // Adjust key based on how you store it

  //     // Define headers for the API request
  //     const headers = {
  //       Authorization: `Bearer ${token}`, // Include the token in the headers
  //       "Content-Type": "application/json", // Set content type if necessary
  //     };
  //     const response = await apiRequest(, "GET", {
  //       headers,
  //     }); // Adjust the endpoint as necessary
  //     if (Array.isArray(response) && response.length > 0) {
  //       const data = await response.json();
  //       setPublishedPapers(data); // Set the fetched papers to state
  //     } else {
  //       setError(`Error: ${response.status}`);
  //     }
  //   };

  //   fetchPublishedPapers();
  // }, []);

  return (
    <div className="published-papers-page">
      <AuthorNavbar />
      <div className="published-papers-container">
        <h1>Published Papers</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && publishedPapers.length === 0 && (
          <p>No published papers found.</p>
        )}
        {publishedPapers.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
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
