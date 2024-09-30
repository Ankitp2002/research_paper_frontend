import React from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";

const UserHomePage = () => {
  // Sample data for published papers
  const publishedPapers = [
    { id: 1, title: "Research Paper 1", link: "http://example.com/paper1" },
    { id: 2, title: "Research Paper 2", link: "http://example.com/paper2" },
    { id: 3, title: "Research Paper 3", link: "http://example.com/paper3" },
  ];

  return (
    <div className="user-home-page">
      <NavbarUser />
      <div className="home-container">
        <h2>Published Papers</h2>
        <table className="papers-table">
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
      <Footer />
    </div>
  );
};

export default UserHomePage;
