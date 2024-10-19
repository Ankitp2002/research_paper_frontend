import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
const UserPublishPaperPage = () => {
  const [publishPaper, setPublishedPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const paperData = await fetchPaper();
      if (typeof paperData === "object" && paperData !== null) {
        setPublishedPapers(paperData);
      } else {
        setError(paperData); // paperData here could be an error message
      }
    };
    fetchData();
  }, []);

  return (
    <div className="user-home-page">
      <NavbarUser />
      <div className="home-container">
        <h2>Published Papers</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="papers-table">
          <thead>
            <tr>
              <th style={{ color: "#666666" }}>Title</th>
              <th style={{ color: "#666666" }}>Abstract</th>
              <th style={{ color: "#666666" }}>Other Authors</th>
              <th style={{ color: "#666666" }}>References</th>
              <th style={{ color: "#666666" }}>Link</th>
              <th style={{ color: "#666666" }}>Author Name</th>
              {/* <th style={{ color: "#666666" }}>Author ID</th> */}
            </tr>
          </thead>
          <tbody>
            {publishPaper.map((paper) => (
              <tr key={paper.id}>
                <td>{paper?.title}</td>
                <td>{paper?.abstract}</td>
                <td>{paper?.other_authors}</td>
                <td>{paper?.referace}</td>
                <td>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGetPaperB64(paper.id)}
                  >
                    View Paper
                  </a>
                </td>
                <td>{paper.authorName}</td>
                {/* <td>{paper.authorId}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default UserPublishPaperPage;
