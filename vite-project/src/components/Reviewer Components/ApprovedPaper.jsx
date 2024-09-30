import React from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./ApprovedPaper.css";

const ApprovedPapersPage = () => {
  const approvedPapers = [
    {
      id: 1,
      title: "Approved Paper Title 1",
      author: "Author Name 1",
      link: "http://example.com/paper1",
    },
    {
      id: 2,
      title: "Approved Paper Title 2",
      author: "Author Name 2",
      link: "http://example.com/paper2",
    },
    // Add more approved papers as needed
  ];

  return (
    <div className="approved-papers-page">
      <ReviewerNavbar />
      <div className="approved-papers-container">
        <h1>Approved Papers</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {approvedPapers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper.author}</td>
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
      </div>
      <ReviewerFooter />
    </div>
  );
};

export default ApprovedPapersPage;
