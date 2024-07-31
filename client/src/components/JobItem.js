// src/components/JobItem.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Box,
  styled,
} from "@mui/material";
import placeholderImage from "../assets/placeholder.png"; // Import the local placeholder image

// Define an Enum for job statuses
const JobStatus = {
  RESOLVED: "RESOLVED",
  PENDING: "PENDING",
  UNKNOWN: "UNKNOWN",
};

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === JobStatus.RESOLVED
      ? "#4caf50"
      : status === JobStatus.PENDING
      ? "#ff9800"
      : "#9e9e9e",
  color: "white",
  fontWeight: "bold",
  marginLeft: "8px", // Space between label and chip
  fontSize: "0.75rem", // Slightly smaller font size
  borderRadius: "5px",
}));

const JobItem = ({ job }) => {
  // Determine the status, defaulting to UNKNOWN if not defined
  const status = job?.status ? job.status.toUpperCase() : JobStatus.UNKNOWN;

  return (
    <Card style={{ margin: "10px", maxWidth: "345px" }}>
      <CardMedia
        component="img"
        height="140"
        image={status === JobStatus.RESOLVED ? job.image : placeholderImage} // Show job image if loaded, else placeholder
        alt={`Job ${job.jobId}`}
      />
      <CardContent>
        <Typography variant="body1" component="div">
          Job ID: {job.jobId}
        </Typography>
        <Box display="flex" alignItems="center" marginTop="4px">
          <Typography variant="body2" color="text.secondary">
            Status:
          </Typography>
          <StatusChip size="small" label={status} status={status} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobItem;
