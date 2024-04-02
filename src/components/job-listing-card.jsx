import React from "react";
import "../assets/styles/job-listing-card.css";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

class JobCard extends React.Component {
  render() {
    return (
      <div
        className={`card py-2 border-0 d-flex flex-wrap justify-content-between ${
          this.props.isSmallScreen
            ? "border-top flex-column"
            : "border-top flex-row align-items-center"
        }`}
        style={{
          width: "100%",
          height: `${this.props.isSmallScreen ? "" : "100px"}`,
        }}
      >
        <div className="d-flex flex-column">
          <div>
            <Link
              to={`/jobs/${this.props.data.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h4
                className={`job-title ${
                  this.props.isSmallScreen ? "" : "text-truncate"
                }`}
                style={{
                  maxWidth: `${this.props.isSmallScreen ? "" : "500px"}`,
                }}
              >
                {this.props.data.title}
              </h4>
            </Link>
          </div>
          <div>
            <p>
              {this.props.data.company} -{" "}
              <span
                className={`${
                  this.props.data.type === "Full Time"
                    ? "full_time"
                    : "part_time"
                }`}
              >
                {this.props.data.type}
              </span>
            </p>
          </div>
        </div>
        <div
          className={`d-flex flex-column ${
            this.props.isSmallScreen ? "" : "align-items-end"
          }`}
        >
          <div className="location">
            <p>{this.props.data.location}</p>
          </div>
          <div>
            <p
              className="created-at"
              data-toggle="tooltip"
              data-placement="top"
              title={this.props.data.created_at.toLocaleString()}
            >
              <ReactTimeAgo
                date={Date.parse(this.props.data.created_at)}
                locale="en-US"
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCard;
