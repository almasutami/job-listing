import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import JobListing from "./pages/job-listing";
import JobDetails from "./pages/job-details";
import MyNavbar from "./pages/my-navbar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route element={<JobListing />} path="/" />
          <Route element={<JobDetails />} path="/jobs/:job_id" />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
