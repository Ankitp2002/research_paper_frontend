import React, { useEffect, useState } from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./ApprovedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const ApprovedPapersPage = () => {
  const [approvedPapers, setapprovedPapers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the paper status data when the component mounts
    const fetchReviewerApprovePapers = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await apiRequest(
          `${REVIEWEREndPoint}/published`,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );

        if (Array.isArray(response) && response.length > 0) {
          setapprovedPapers(response); // Set the paper data to state
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchReviewerApprovePapers();
  }, [navigate]);

  return (
    <div className="approved-papers-page">
      <ReviewerNavbar />
      <div className="approved-papers-container">
        <h2>Approved Papers</h2>
        <table className="papers-table">
          <thead>
            <tr>
              <th style={{ color: "#666666", textAlign: "center" }}>Title</th>
              <th style={{ color: "#666666", textAlign: "center" }}>Author</th>
              <th style={{ color: "#666666", textAlign: "center" }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {approvedPapers.map((paper) => (
              <tr key={paper.id}>
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {paper.title}
                </td>
                <td style={{ color: "#666666", textAlign: "center" }}>
                  {paper?.User?.username}
                </td>
                <td style={{ color: "#666666", textAlign: "center" }}>
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
      </div>
      <ReviewerFooter />
    </div>
  );
};

export default ApprovedPapersPage;
