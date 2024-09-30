import React from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./RejectedPaper.css";

const RejectedPapersPage = () => {
  const rejectedPapers = [
    {
      id: 1,
      title: "Rejected Paper Title 1",
      author: "Author Name 1",
      comments: "Needs more research on the methodology.",
    },
    {
      id: 2,
      title: "Rejected Paper Title 2",
      author: "Author Name 2",
      comments: "The results are inconclusive.",
    },
    // Add more rejected papers as needed
  ];

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
                <td>{paper.author}</td>
                <td>{paper.comments}</td>
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
