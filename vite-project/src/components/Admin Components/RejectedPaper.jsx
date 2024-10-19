import React, { useEffect, useState } from "react";
import "./RejectedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const RejectedPapersPage = () => {
  const initialThesisData = [
    {
      title: "Energy Efficient Cloud Computing",
      abstract:
        "This thesis focuses on reducing energy consumption in data centers...",
      contributorAuthors: "John Doe, Alice Smith",
      references: "Thesis A, Thesis B, Thesis C",
      publishYear: 2023,
      keyword: "Cloud Computing, Energy Efficiency",
      document: "Thesis1.pdf",
      authorName: "Ankit Kumar",
      comments: ["Great thesis!", "Needs more data on VM migration."],
    },
    {
      title: "AI and Machine Learning in Healthcare",
      abstract: "An overview of the impact of AI in medical diagnostics...",
      contributorAuthors: "Emily Johnson, Mark Lee",
      references: "Thesis X, Thesis Y",
      publishYear: 2022,
      keyword: "AI, Healthcare",
      document: "Thesis2.pdf",
      authorName: "Jane Doe",
      comments: ["Innovative approach.", "Consider additional case studies."],
    },
  ];

  const [rejectedPapers, setThesisData] = useState(initialThesisData);
  const [commentView, setCommentView] = useState(null); // Track which row is showing comments
  const [newComment, setNewComment] = useState(""); // Track new comment input

  // const [rejectedPapers, setrejectedPapers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const cancelReview = () => {
    setSelectedPaper(null); // This will hide the review form
    setComments(""); // Clear any entered comments
    setIsReviewed(false); // Reset review state if necessary
  };
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
              <tr key={paper.id} style={{ color: "#666666" }}>
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
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                    style={{ color: "#3498DB" }}
                  >
                    View Thesis
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>xyz...Comment...</td>
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
