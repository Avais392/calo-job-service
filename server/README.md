## Table of Contents
1. [Overview](#overview)
2. [API Documentation](#api-documentation)
3. [File Structure](#file-structure)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [Main Features](#main-features)
7. [Code Sections](#code-sections)
   - [server.js](#serverjs)
   - [jobUtils.js](#jobutilsjs)
   - [photoUtils.js](#photoutilsjs)
8. [Time Report](#time-report)


---

## Overview
The Job Processing APIs allows users to submit jobs, which are processed in a queue. The API integrates with Unsplash to fetch random images as part of the job processing.

---

## API Documentation

### Base URL
All API endpoints are accessible at: `http://localhost:3000`

### 1. Create a Job
- **Endpoint:** `POST /jobs`
- **Description:** Creates a new job to fetch a random photo.
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:** None
- **Response:**
  - **201 Created**
  - **Body:**
    ```json
    {
      "jobId": "unique-job-id"
    }
    ```
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/jobs -H "Content-Type: application/json"
  ```

### 2. Create a Job
- **Endpoint:** `GET /jobs`
- **Description:** Retrieves a list of all jobs along with their statuses.
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:** None
- **Response:**
  - **200 OK**
  - **Body:**
    ```json
        [
        {
            "jobId": "unique-job-id",
            "status": "pending/resolved",
            "image": "url-to-image"
        }
        ]
    ```
- **Example Request:**
  ```bash
  curl -X GET http://localhost:3000/jobs
  ```

### 3. Get Job by ID
- **Endpoint:** `GET /jobs/:id`
- **Description:** Retrieves the details of a specific job by its ID.
- **Path Parameter:** 
    - `**id:**` The unique ID of the job.
- **Response:**
  - **200 OK**
  - **Body:**
    ```json
    {
    "jobId": "unique-job-id",
    "status": "pending/resolved",
    "image": "url-to-image"
    }
    ```
    - **404 Not Found**: If job does not exist.
    - **Body:**
    ```json
    {
    "message": "Job not found"
    }

    ```
- **Example Request:**
    ```bash
    curl -X GET http://localhost:3000/jobs/<unique-job-id>
    ```

## File Structure
```plaintext
/server
├── server.js            # Main server file to handle API requests and WebSocket connections
├── utils
│   ├── jobUtils.js      # Utility functions for job management (loading, saving, processing)
│   └── photoUtils.js    # Utility functions for fetching random photos
├── jobs.json            # JSON file to store job data
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Technologies Used
- [Node.js] - JavaScript runtime for building the server.
- [Express] - Framework for building RESTful APIs.
- [WebSocket] - For real-time communication between the server and clients.
- [Axios] - Promise-based HTTP client for making API requests.
- [UUID] - For generating unique job IDs.


## Setup Instructions
1. **Clone the Repository**
    ```bash
    git clone https://github.com/avais392/cola-job-service.git
    cd server
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Set Up Environment Variables**

    Replace the `ACCESS_KEY` in `photoUtils.js` with your Unsplash API access key.
    Run the Server
    ```bash
    node server.js
    ```

The server will start on `http://localhost:3000`


## Main Features

### WebSocket Implementation
- Introduced WebSocket to communicate live updates or job statuses to clients.

### Job Queue System
- Maintains a queue for all pending and new incoming jobs, executing them sequentially.
- Each job completion triggers the execution of the next job.

### Server Crash Recovery
- In the event of a server crash, all pending jobs are retrieved and reinserted into the job queue, ensuring continuous sequential execution.


## Code Sections
1.  ### **`server.js`**
- **Purpose**: This is the main entry point of the application that sets up the Express server and WebSocket connections.
- Key Components:
   - Imports: Loads required modules including Express, WebSocket, and utility functions.
    - Middleware: Configures CORS and body parsing for incoming requests.
    - Job Queue Management: Manages job submissions and processing logic.
    - WebSocket Notifications: Notifies connected clients of job status updates.

2. ### **`jobUtils.js`**
- **Purpose**: Contains utility functions for managing jobs, including loading, saving, and processing jobs.
  - **Key Functions**:
    - **loadJobs()**: Loads job data from jobs.json.
    - **saveJobs(jobs)**: Saves job data to jobs.json.
    - **processNextJob()**: Processes the next job in the queue and updates its status.

3. ### **`photoUtils.js`**
- **Purpose**: Provides functions to fetch random photos from the Unsplash API and manage delays in job processing.
- **Key Functions:**
  - **getRandomPhoto()**: Fetches a random photo URL from Unsplash.
  - **randomDelay()**: Introduces a random delay before processing jobs.

## Time Report
| Section  | TimeSpent |
| ------------- | ------------- |
| Project Setup  | 1 hour  |
|API Development|	3 hours|
|WebSocket Implementation	|1 hours|
|Utility Functions|	2 hours|
|Queue Implementation| 1 hour |
| Resume Job Incase of Server Crash | 1 hour |
|Testing & Debugging|	3 hours|
|Documentation|	2 hour|
|Total|	14 hours|
