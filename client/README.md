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

2. ### **`JobManagement.js`**
- **Purpose**: Manages job-related operations, including fetching jobs and handling job creation.

3. ### **`JobList.js`**
- **Purpose**: Displays a list of jobs.

4. ### **`JobItem.js`**
- **Purpose**: Renders individual job details, including status and associated image.

5. ### **`api.js`**
- **Purpose:** Contains functions for API requests related to job management.

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
