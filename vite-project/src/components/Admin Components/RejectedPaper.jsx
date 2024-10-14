import React, { useEffect, useState } from "react";
import "./RejectedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const RejectedPapersPage = () => {
  // const rejectedPapers = [
  // {
  //   id: 1,
  //   title: "Rejected Paper Title 1",
  //   author: "Author Name 1",
  //   comments: "Needs more research on the methodology.",
  // },
  // {
  //   id: 2,
  //   title: "Rejected Paper Title 2",
  //   author: "Author Name 2",
  //   comments: "The results are inconclusive.",
  // },
  // Add more rejected papers as needed
  // ];

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
    <div className="rejected-papers-page">
      <AdminNavbar />
      <div className="rejected-papers-container">
        <h1>Rejected Papers</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Reviewer</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {rejectedPapers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper?.User?.username}</td>
                <td>{paper?.Reviewer[0]?.reviewer_name}</td>
                <td>{paper.keywords}</td>
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
