// src/components/JobManagement.js
import React, { useState, useEffect } from "react";
import { fetchJobs, createJob } from "../api";
import JobList from "./JobList";
import { useDebouncedCallback } from "use-debounce";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
  Fade,
} from "@mui/material";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    try {
      await createJob();
      // No need to call loadJobs here; updates will come via WebSocket
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
    }
  };

  const debounced = useDebouncedCallback(async () => {
    await handleCreateJob();
  }, 1000);

  useEffect(() => {
    loadJobs();

    // Establish WebSocket connection
    const websocket = new WebSocket("ws://localhost:3000");

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Job update received:", data);
      if (data.status === "resolved") {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.jobId === data.jobId
              ? { ...job, status: data.status, image: data.image }
              : job
          )
        );
      } else {
        setJobs((prevJobs) => [
          ...prevJobs,
          {
            jobId: data.jobId,
            status: data.status,
            image: data?.image ?? null,
          },
        ]);
      }
    };

    return () => {
      websocket.close(); // Cleanup on unmount
    };
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "10px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Job Management
        </Typography>
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <Button
            id="createJobButton"
            variant="contained"
            color="primary"
            size="small"
            onClick={debounced}
            disabled={loading}
          >
            Create Job
          </Button>
        </Box>
        <Fade in={loading}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Fade>
        <Fade in={!loading}>
          <div>
            <JobList jobs={jobs} />
          </div>
        </Fade>
      </Paper>
    </Container>
  );
};

export default JobManagement;
