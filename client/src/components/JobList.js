// src/components/JobList.js
import React from "react";
import JobItem from "./JobItem";
import { Container } from "@mui/material";

const JobList = ({ jobs }) => {
  return (
    <Container>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {jobs.length > 0 ? (
          jobs.map((job) => <JobItem key={job.jobId} job={job} />)
        ) : (
          <li>No jobs available</li>
        )}
      </ul>
    </Container>
  );
};

export default JobList;
