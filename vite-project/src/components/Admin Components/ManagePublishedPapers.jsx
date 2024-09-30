import React, { useState } from "react";
import NavbarAdmin from "./AdminNavbar";
import Footer from "./AdminFooter";
import "./ManagePublishedPapers.css";

const PublishedPapersManagement = () => {
  const [publishedPapers, setPublishedPapers] = useState([
    { id: 1, title: "Research Paper 1", link: "#", status: "Published" },
    { id: 2, title: "Research Paper 2", link: "#", status: "Published" },
  ]);
  const [newPaper, setNewPaper] = useState({ title: "", link: "" });

  const handleInputChange = (e) => {
    setNewPaper({ ...newPaper, [e.target.name]: e.target.value });
  };

  const handleAddPaper = () => {
    if (newPaper.title && newPaper.link) {
      setPublishedPapers([
        ...publishedPapers,
        { id: Date.now(), ...newPaper, status: "Published" },
      ]);
      setNewPaper({ title: "", link: "" }); // Reset input fields
    }
  };

  const handleDeletePaper = (id) => {
    setPublishedPapers(publishedPapers.filter((paper) => paper.id !== id));
  };

  return (
    <div className="management-page">
      <NavbarAdmin />
      <div className="management-container">
        <h2>Manage Published Papers</h2>
        <div className="add-paper-form">
          <input
            type="text"
            name="title"
            placeholder="Paper Title"
            value={newPaper.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Paper Link"
            value={newPaper.link}
            onChange={handleInputChange}
          />
          <button onClick={handleAddPaper}>Add Paper</button>
        </div>
        <table className="papers-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>{paper.status}</td>
                <td>
                  <button onClick={() => handleDeletePaper(paper.id)}>
                    Delete
                  </button>
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

export default PublishedPapersManagement;
