import React, { useEffect, useState } from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./RejectedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

const RejectedPapersPage = () => {
  const [rejectedPapers, setrejectedPapers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the paper status data when the component mounts
    const fetchReviewerApprovePapers = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await apiRequest(
          `${REVIEWEREndPoint}?status=rejected`,
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
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
      <ReviewerNavbar />
      <div className="reject-container">
        <h2>Rejected Thesis</h2>
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
              <th style={{ color: "#666666", textAlign: "center" }}>Keyword</th>
              <th style={{ color: "#666666", textAlign: "center" }}>
                Document
              </th>
              <th style={{ color: "#666666", textAlign: "center" }}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {rejectedPapers.map((paper) => (
              <tr key={paper.id}>
                <td style={{ textAlign: "center" }}>{paper.title}</td>
                <td style={{ textAlign: "center" }}>{paper.abstract}</td>
                <td style={{ textAlign: "center" }}>
                  {paper.contributorAuthors}
                </td>
                <td style={{ textAlign: "center" }}>{paper.references}</td>
                <td style={{ textAlign: "center" }}>{paper.publishYear}</td>
                <td style={{ textAlign: "center" }}>{paper.keyword}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={`/${paper.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {paper.document}
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>
                  {paper?.comments[0]?.comment}
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

export default RejectedPapersPage;
