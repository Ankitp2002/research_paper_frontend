import React, { useEffect, useState } from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./RejectedPaper.css";
import { useNavigate } from "react-router";
import { REVIEWEREndPoint } from "../RequestModul/Endpoint";
import { apiRequest } from "../RequestModul/requests";

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
        const token = sessionStorage.getItem("authToken");
        const response = await apiRequest(
          `${REVIEWEREndPoint}/rejected`,
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
    <div className="rejected-papers-page">
      <ReviewerNavbar />
      <div className="rejected-papers-container">
        <h1>Rejected Papers</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {rejectedPapers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper?.User?.username}</td>
                <td>{paper.keywords}</td>
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
