import React, { useState } from "react";
import NavbarUser from "./Navbar_wihtout_login";
import Footer from "./Footer";
const ContactUs_without_login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send the data to an API)
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
  };

  return (
    <div className="submit-page">
      <NavbarUser />
      <div className="submit-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ color: "black" }}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              color: "black",
              backgroundColor: "#d3d3d3",
              borderColor: "#d3d3d3",
            }}
            required
          />
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ color: "black" }}
            required
          />
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ color: "black" }}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs_without_login;
