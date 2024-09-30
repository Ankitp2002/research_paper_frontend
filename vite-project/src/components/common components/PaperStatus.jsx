import React from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PaperStatus.css";

const PaperStatusPage = () => {
  const papers = [
    {
      id: 1,
      title: "Research Paper Title 1",
      status: "Under Review",
      comments: "Minor revisions needed.",
    },
    {
      id: 2,
      title: "Research Paper Title 2",
      status: "Approved",
      comments: "No changes required.",
    },
    {
      id: 3,
      title: "Research Paper Title 3",
      status: "Rejected",
      comments: "Lacks sufficient data.",
    },
    // Add more papers as needed
  ];

  return (
    <div className="paper-status-page">
      <AuthorNavbar />
      <div className="paper-status-container">
        <h1>Check Paper Status</h1>
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
      </div>
      <AuthorFooter />
    </div>
  );
};

export default PaperStatusPage;
