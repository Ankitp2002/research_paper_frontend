import React, { useEffect, useState } from "react";
import NavbarUser from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { fetchPaper, handleGetPaperB64 } from "../../utils/handleAuthor";
import NavbarWithOutLogin from "./Navbar_wihtout_login";
const UserPublishPaperPage = () => {
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

  const [publishPaper, setThesisData] = useState(initialThesisData);

  // const [publishPaper, setPublishedPapers] = useState([]);
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
      <NavbarWithOutLogin />
      <div className="home-container">
        <h2>Published Thesis</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
            </tr>
          </thead>
          <tbody>
            {publishPaper.map((paper) => (
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
