import React from "react";
import ReviewerNavbar from "./Navbar";
import ReviewerFooter from "./Footer";
import "./Home.css";

const ReviewerHomePage = () => {
  return (
    <div className="reviewer-home-page">
      <ReviewerNavbar />
      <div className="home-content">
        <h1>Welcome to the Reviewer Dashboard</h1>
        <p>
          As a reviewer, you play a crucial role in maintaining the quality of
          published papers. Your feedback is invaluable in ensuring that authors
          can improve their work and contribute to the academic community.
        </p>
        <h2>Available Actions</h2>
        <ul>
          <li>
            <strong>Review Papers:</strong> Check the list of papers awaiting
            your review.
          </li>
          <li>
            <strong>Approved Papers:</strong> View the papers you have approved
            for publication.
          </li>
          <li>
            <strong>Rejected Papers:</strong> Check the papers that were not
            approved.
          </li>
        </ul>
        <h2>Next Steps</h2>
        <p>Click on "Review Papers" to begin reviewing submissions.</p>
      </div>
      <ReviewerFooter />
    </div>
  );
};

export default ReviewerHomePage;
