import React from "react";
import "../assets/styles/job-listing.css";
import { API_URL } from "../constants/API";
import Axios from "axios";
import JobCard from "../components/job-listing-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

class JobListing extends React.Component {
  state = {
    jobs: [],
    currentPage: 1,
    description: "",
    location: "",
    fulltime: false,
    showFilter: false,
    isSmallScreen: false,
    loading: false,
  };

  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !this.state.loading) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 }),
        () => {
          this.fetchJobs();
        }
      );
    }
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name, value);

    this.setState({ [name]: value });
  };

  fetchJobs = () => {
    this.setState({ loading: true });

    let query = "?";
    const pageQuery = `page=${this.state.currentPage}`;
    const descriptionQuery = `&description=${this.state.description}`;
    const locationQuery = `&location=${this.state.location}`;
    let fullPartTimeQuery = "";
    if (this.state.fulltime) {
      fullPartTimeQuery += "&full_time=true";
    }

    query += pageQuery + descriptionQuery + locationQuery + fullPartTimeQuery;

    Axios.get(`${API_URL}.json${query}`)
      .then((result) => {
        this.setState((prevState) => ({
          jobs: [...prevState.jobs, ...result.data],
          loading: false,
        }));
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  handleSearch = () => {
    this.setState({ currentPage: 1 });
    this.fetchJobs();
  };

  componentDidMount() {
    this.fetchJobs();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScreenResize);
    this.handleScreenResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize);
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScreenResize = () => {
    this.setState({ isSmallScreen: window.innerWidth <= 980 });
  };

  render() {
    return (
      <div>
        <div
          className={`filter d-flex flex-wrap justify-content-between ${
            this.state.isSmallScreen && !this.state.showFilter
              ? "d-none px-3"
              : "px-4"
          } ${
            this.state.isSmallScreen
              ? "border shadow-sm m-2 py-3 flex-column"
              : " py-2 flex-row align-items-center"
          }`}
        >
          <form className="form-inline  d-flex flex-row flex-wrap align-items-center gap-3">
            <div>
              <label className="form-label">Job description</label>
              <input
                className="form-control"
                name="description"
                onChange={this.inputHandler}
                type="search"
                placeholder="Filter by title, benefits, companies, expertise"
              />
            </div>
            <div>
              <label className="form-label">Location</label>
              <input
                className="form-control"
                name="location"
                onChange={this.inputHandler}
                type="search"
                placeholder="Filter by city, state, zip code or country"
              />
            </div>
            <div className="d-flex flex-row gap-2">
              <input
                type="checkbox"
                value="true"
                name="fulltime"
                onChange={this.inputHandler}
              />
              <label className="form-label">Full time only</label>
            </div>
          </form>
          <div className="py-2 d-flex flex-row justify-content-end">
            <button
              onClick={this.handleSearch}
              className="btn btn-dark ms-2"
              type="submit"
            >
              <p>
                <FontAwesomeIcon icon={faSearch} /> Search
              </p>
            </button>
          </div>
        </div>
        <div
          className={`d-flex flex-row justify-content-end ${
            this.state.isSmallScreen && !this.state.showFilter ? "m-2" : "mx-2"
          }`}
        >
          {this.state.isSmallScreen && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() =>
                this.setState((prevState) => ({
                  showFilter: !prevState.showFilter,
                }))
              }
            >
              <FontAwesomeIcon icon={faFilter} /> Job Filters
            </button>
          )}
        </div>

        {/* jobs */}
        <div
          className={`${
            this.state.isSmallScreen
              ? "py-3 mx-3 my-2"
              : "border shadow-sm mx-4 my-3 p-4"
          }`}
        >
          <div className="py-2">
            <h1>Job List</h1>
          </div>
          {this.state.jobs?.map((job) =>
            job?.id ? (
              <div key={job.id} className="d-flex flex-col flex-wrap">
                <JobCard data={job} isSmallScreen={this.state.isSmallScreen} />
              </div>
            ) : null
          )}
          {this.state.loading && <p>Loading...</p>}
        </div>
      </div>
    );
  }
}

export default JobListing;
