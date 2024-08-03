## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/avais392/cola-job-service.git
   ```
2. Navigate to the project directory:
```bash
cd client
```
3.Install dependencies:
```bash
npm install
```
## Running the Application
To start the development server, run:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Setup Instructions](#setup-instructions)
4. [WebSocket Connection Handling](#websocket-connection-handling)
5. [Utility Functions](#utility-functions)
6. [Code Sections](#code-sections)
   - [App.js](#appjs)
   - [JobManagement.js](#jobmanagementjs)
   - [JobList.js](#joblistjs)
   - [JobItem.js](#jobitemjs)
   - [api.js](#apijs)
7. [Technologies Used](#technologies-used)

---

## Overview
The Job Management Client is a React application that allows users to interact with the Job Processing API. It provides a user-friendly interface for viewing, creating, and updating job postings.

---

## File Structure
```plaintext
/src
├── App.js                  # Main application file that renders the JobManagement component
├── api.js                  # API functions for fetching and creating jobs
├── components
│   ├── JobItem.js          # Component that displays individual job details
│   ├── JobList.js          # Component that lists all jobs
│   └── JobManagement.js     # Component for managing job operations
├── assets
│   └── placeholder.png      # Placeholder image for jobs without images
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Technologies Used
- **[React]** - JavaScript library for building user interfaces.
- **[Material-UI]** - React components for faster and easier web development.
- **[Axios]** - Promise-based HTTP client for making API requests.
- **[WebSocket]** - For real-time communication with the server.
## WebSocket Connection Handling
- When the client connects to the WebSocket server, a message is logged.
- When the client disconnects, a message is logged.
- All connected WebSocket clients are notified whenever a job is created or updated.
## Utility Functions
### API Functions
- **fetchJobs()**: Fetches the list of jobs from the server.
- **createJob(jobData)**: Sends a request to create a new job.
## Code Sections
1. ### **`App.js`**
- **Purpose**: The main entry point of the client application that renders the JobManagement component.
**Code Breakdown:**
```javascript

import React from "react";
import JobManagement from "./components/JobManagement";

const App = () => {
  return (
    <div className="App">
      <JobManagement />
    </div>
  );
};

export default App;
```
2. ### **`JobManagement.js`**
- **Purpose**: Manages job-related operations, including fetching jobs and handling job creation.
**Code Breakdown:**
```javascript

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

  const loadJobs = async () => { /* ... */ };
  const handleCreateJob = async () => { /* ... */ };

  const debounced = useDebouncedCallback(async () => {
    await handleCreateJob();
  }, 1000);

  useEffect(() => {
    loadJobs();
    // WebSocket connection handling here
  }, []);

  return (
    <Container maxWidth="md">
      {/* UI elements for job management */}
    </Container>
  );
};

export default JobManagement;
```
3. ### **`JobList.js`**
- **Purpose**: Displays a list of jobs.
**Code Breakdown:**
```javascript

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
```
4. ### **`JobItem.js`**
- **Purpose**: Renders individual job details, including status and associated image.
**Code Breakdown:**
```javascript

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Box,
  styled,
} from "@mui/material";

const JobItem = ({ job }) => {
  return (
    <Card>
      <CardMedia /* ... */ />
      <CardContent>
        <Typography>Job ID: {job.jobId}</Typography>
        {/* Status display */}
      </CardContent>
    </Card>
  );
};

export default JobItem;
```
5. ### **`api.js`**
- **Purpose:** Contains functions for API requests related to job management.
**Code Breakdown:**
```javascript
import axios from "axios";

const API_URL = "http://localhost:3000/jobs";

const fetchJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createJob = async (jobData) => {
  await axios.post(API_URL, jobData);
};

export { fetchJobs, createJob };
```
## Time Report

|Section|	Time Spent|
| ------------- | ------------- |
|Project Setup|	1 hour|
|API Integration|	1 hour|
|WebSocket Implementation|	1 hour|
|Component Development|	4 hours|
|Testing & Debugging|	3 hours|
|Documentation|	3 hours|
|Total|	13 hours|
