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
          As A Reviewer, You Play A Crucial Role In Maintaining The Quality Of
          Published Thesis. Your Feedback Is Invaluable In Ensuring That Authors
          Can Improve Their Work And Contribute To The Academic Community.
        </p>
        <h2>Available Actions</h2>
        <ul>
          <li>
            <strong>Review Thesis:</strong> Check The List Of Thesis Awaiting
            Your Review.
          </li>
          <li>
            <strong>Approved Thesis:</strong> View The Thesis You Have Approved
            For Publication.
          </li>
          <li>
            <strong>Rejected Thesis:</strong> Check The Thesis That Were Not
            Approved.
          </li>
        </ul>
        <h2>Next Steps</h2>
        <p>Click On "Review Thesis" To Begin Reviewing Submissions.</p>
      </div>
      <ReviewerFooter />
    </div>
  );
};

export default ReviewerHomePage;
