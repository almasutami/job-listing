import React from "react";
import "../assets/styles/job-details.css";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class JobDetails extends React.Component {
  state = {
    job: null,
    isSmallScreen: false,
  };

  fetchJobById = () => {
    this.setState({ loading: true });

    Axios.get(`${API_URL}/${this.props.params?.job_id}`)
      .then((result) => {
        this.setState({
          job: result.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchJobById();
    window.addEventListener("resize", this.handleScreenResize);
    this.handleScreenResize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize);
  }

  handleScreenResize = () => {
    this.setState({ isSmallScreen: window.innerWidth <= 980 });
  };

  render() {
    return (
      <div>
        <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className={`${
              this.state.isSmallScreen
                ? "border-bottom p-2 m-2"
                : "border-bottom p-2 m-4"
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </div>
        </Link>
        <div
          className={`${
            this.state.isSmallScreen ? "" : "border m-4 shadow-sm"
          }`}
        >
          <div
            className={`${
              this.state.isSmallScreen
                ? "border-bottom p-2 m-2"
                : "border-bottom p-2 m-4"
            }`}
          >
            <div>
              {this.state.job?.type} / {this.state.job?.location}
            </div>
            <div>
              <h1>{this.state.job?.title}</h1>
            </div>
          </div>
          <div
            className={`d-flex flex-row flex-wrap justify-content-between ${
              this.state.isSmallScreen ? "m-2 flex-column" : " m-4"
            }`}
          >
            <div
              className={`row flex-wrap justify-content-between ${
                this.state.isSmallScreen ? "p-2" : " p-4"
              }`}
              style={{ maxWidth: `${this.state.isSmallScreen ? "" : "50%"}` }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.job?.description,
                }}
              />
            </div>
            <div
              className={`${this.state.isSmallScreen ? "p-2" : " p-4"}`}
              style={{ maxWidth: `${this.state.isSmallScreen ? "" : "50%"}` }}
            >
              <div className="company-details mb-4">
                <div className="company-details-name border-bottom py-2">
                  {this.state.job?.company}
                </div>
                {/* <img
                  src={this.state.job?.company_logo}
                  alt={this.state.job?.company}
                /> */}
                <a href={this.state.job?.company_url}>Visit company website</a>
              </div>
              <div className="how-to-apply">
                <div className="how-to-apply-title border-bottom py-2">
                  How to Apply
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.job?.how_to_apply,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(JobDetails);
