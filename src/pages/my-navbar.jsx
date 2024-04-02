import React from "react";
import "../assets/styles/my-navbar.css";

class JobDetails extends React.Component {
  render() {
    return (
      <div className="text-white p-2 container">
        <h1>
          <strong>GitHub</strong> <span className="fw-light">Jobs</span>
        </h1>
      </div>
    );
  }
}

export default JobDetails;
