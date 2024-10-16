import React, { useEffect, useState } from "react";
import "./RejectedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const RejectedPapersPage = () => {
  const [rejectedPapers, setrejectedPapers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the paper status data when the component mounts
    const fetchReviewerApprovePapers = async () => {
      try {
        const response = await apiRequest(
          `${REVIEWEREndPoint}/rejected`,
          "GET",
          {}
        );

        if (Array.isArray(response) && response.length > 0) {
          setrejectedPapers(response); // Set the paper data to state
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
    <div className="reject-page">
      <AdminNavbar />
      <div className="reject-container">
        <h2>Rejected Papers</h2>
        <table className="papers-table">
          <thead>
            <tr>
              <th style={{ color: "#666666", textAlign: "center" }}>Title</th>
              <th style={{ color: "#666666", textAlign: "center" }}>Author</th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Reviewer
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {rejectedPapers.map((paper) => (
              <tr key={paper.id} style={{ color: "#666666" }}>
                <td style={{ textAlign: "center" }}>{paper.title}</td>
                <td style={{ textAlign: "center" }}>{paper?.User?.username}</td>
                <td style={{ textAlign: "center" }}>
                  {paper?.Reviewer[0]?.reviewer_name}
                </td>
                <td style={{ textAlign: "center" }}>{paper.keywords}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
};

export default RejectedPapersPage;
