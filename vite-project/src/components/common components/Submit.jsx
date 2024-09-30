import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Submit.css";

const Submit = () => {
  const [formData, setFormData] = useState({
    title: "",
    authors: [{ name: "" }],
    designation: "",
    college: "",
    abstract: "",
    keywords: "",
    introduction: "",
    file: null,
    references: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle author name changes
  const handleAuthorChange = (index, event) => {
    const newAuthors = formData.authors.map((author, i) => {
      if (i === index) {
        return { name: event.target.value };
      }
      return author;
    });
    setFormData({ ...formData, authors: newAuthors });
  };

  // Add new author field
  const addAuthorField = () => {
    setFormData({ ...formData, authors: [...formData.authors, { name: "" }] });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic here
    console.log(formData);
    alert("Paper Submitted Successfully!");
  };

  return (
    <div className="submit-page">
      <Navbar />
      <div className="submit-container">
        <h2>Submit Your Paper</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Authors:</label>
          {formData.authors.map((author, index) => (
            <div key={index}>
              <input
                type="text"
                value={author.name}
                onChange={(e) => handleAuthorChange(index, e)}
                placeholder={`Author ${index + 1}`}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addAuthorField}>
            Add Author
          </button>

          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <label>College/University Name:</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />

          <label>Abstract:</label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            required
          ></textarea>

          <label>Keywords:</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            required
          />

          <label>Introduction:</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            required
          ></textarea>

          <label>Paper (Word File):</label>
          <input
            type="file"
            name="file"
            accept=".doc,.docx"
            onChange={handleFileChange}
            required
          />

          <label>References/Citations:</label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit Paper</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Submit;
