import React from "react";
import AuthorNavbar from "./Navbar";
import AuthorFooter from "./Footer";
import "./PublishedPaper.css";

const PublishedPapersPage = () => {
  const publishedPapers = [
    {
      id: 1,
      title: "Published Paper Title 1",
      link: "http://example.com/paper1.pdf", // Replace with actual link
    },
    {
      id: 2,
      title: "Published Paper Title 2",
      link: "http://example.com/paper2.pdf", // Replace with actual link
    },
    {
      id: 3,
      title: "Published Paper Title 3",
      link: "http://example.com/paper3.pdf", // Replace with actual link
    },
    // Add more published papers as needed
  ];

  return (
    <div className="published-papers-page">
      <AuthorNavbar />
      <div className="published-papers-container">
        <h1>Published Papers</h1>
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
      </div>
      <AuthorFooter />
    </div>
  );
};

export default PublishedPapersPage;
