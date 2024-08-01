# Job Processing API

![Job Processing API](https://via.placeholder.com/800x200.png?text=Job+Processing+API)

## Table of Contents
1. [File Structure](#file-structure)
2. [Setup Instructions](#setup-instructions)
3. [Time Report](#time-report)
4. [API Endpoints](#api-endpoints)
5. [Code Sections](#code-sections)
6. [Utility Functions](#utility-functions)
7. [Features and Approaches](#features-and-approaches)
8. [Technologies Used](#technologies-used)

---

## File Structure
```plaintext
/job-processing-api
├── server.js            # Main server file to handle API requests and WebSocket connections
├── utils
│   ├── jobUtils.js      # Utility functions for job management (loading, saving, processing)
│   └── photoUtils.js    # Utility functions for fetching random photos
├── jobs.json            # JSON file to store job data
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation

## File Structure
/job-processing-api
├── server.js            # Main server file to handle API requests and WebSocket connections
├── utils
│   ├── jobUtils.js      # Utility functions for job management (loading, saving, processing)
│   └── photoUtils.js    # Utility functions for fetching random photos
├── jobs.json            # JSON file to store job data
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation

bash
Copy

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd job-processing-api
Install Dependencies

bash
Copy
npm install
Set Up Environment Variables

Replace the ACCESS_KEY in photoUtils.js with your Unsplash API access key.
Run the Server

bash
Copy
node server.js
The server will start on http://localhost:3000.

Time Report
Section	Time Spent
Project Setup	1 hour
API Development	3 hours
WebSocket Implementation	2 hours
Utility Functions	2 hours
Testing & Debugging	2 hours
Documentation	1 hour
Total	11 hours
API Endpoints
1. POST /jobs
Description: Submits a new job to the queue.
Request Body:
json
Copy
{}
Response:
201 Created:
json
Copy
{
  "jobId": "generated-job-id"
}
2. GET /jobs
Description: Retrieves the list of all jobs.
Response:
json
Copy
[
  {
    "jobId": "job-id",
    "status": "pending/resolved",
    "image": "optional-image-url"
  },
  ...
]
3. GET /jobs/:id
Description: Retrieves a specific job by its ID.
Response:
200 OK:
json
Copy
{
  "jobId": "job-id",
  "status": "pending/resolved",
  "image": "optional-image-url"
}
404 Not Found:
json
Copy
{
  "message": "Job not found"
}
Code Sections
1. server.js
Purpose: Handles server setup, API endpoints, and WebSocket connections.
Key Features:
Uses Express for RESTful APIs.
Implements WebSocket for real-time updates.
Manages job queue and processing.
2. jobUtils.js
Purpose: Contains utility functions for job management.
Key Functions:
loadJobs(): Loads jobs from jobs.json.
saveJobs(jobs): Saves job data to jobs.json.
processNextJob(): Processes the next job in the queue.
3. photoUtils.js
Purpose: Fetches random photos from the Unsplash API.
Key Functions:
getRandomPhoto(): Retrieves a random food photo URL.
randomDelay(): Introduces a random delay before processing jobs.
Utility Functions
loadJobs()
Purpose: Loads existing jobs from the jobs.json file. Returns an array of jobs.
saveJobs(jobs)
Purpose: Saves the provided jobs array to the jobs.json file.
processNextJob(jobQueue, notifyAllClients, getRandomPhoto, saveJobs)
Purpose: Processes jobs in the queue, fetching a random photo and updating job status.
getRandomPhoto()
Purpose: Fetches a random photo from the Unsplash API using Axios.
randomDelay()
Purpose: Introduces a random delay between job processing, simulating variable processing times.
Features and Approaches
WebSocket Integration: Provides real-time notifications to clients when jobs are processed.
Job Queue Management: Efficiently processes jobs in a queue, ensuring orderly handling.
Random Delays: Simulates realistic job processing times, enhancing user experience.
Persistent Storage: Jobs are stored in a JSON file, allowing for data persistence across server restarts.
Technologies Used
Node.js: JavaScript runtime for building the server.
Express: Framework for building RESTful APIs.
WebSocket: For real-time communication between the server and clients.
Axios: Promise-based HTTP client for making API requests.
UUID: For generating unique job IDs.
This documentation provides a comprehensive overview of the project, its structure, and its functionality. Feel free to modify any sections to better fit your project's specifics or add any additional information as needed.

typescript
Copy

You can save this content in a `README.md` file in your project repository. Let me know if you need any changes or additional information!

You
provide slightly more details for approaches and feature, also if you put code section and explain what each part is doing and how .

And also manage the sequence all section and table of contents

Monica
Here's an enhanced README file with more detailed explanations for the features and approaches, as well as a breakdown of the code sections. The sequence has also been organized for better clarity.

markdown
Copy
# Job Processing API

## Table of Contents
1. [File Structure](#file-structure)
2. [Setup Instructions](#setup-instructions)
3. [Time Report](#time-report)
4. [API Endpoints](#api-endpoints)
5. [Code Sections](#code-sections)
6. [Utility Functions](#utility-functions)
7. [Features and Approaches](#features-and-approaches)
8. [Technologies Used](#technologies-used)

## File Structure
/job-processing-api
├── server.js            # Main server file to handle API requests and WebSocket connections
├── utils
│   ├── jobUtils.js      # Utility functions for job management (loading, saving, processing)
│   └── photoUtils.js    # Utility functions for fetching random photos
├── jobs.json            # JSON file to store job data
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation

bash
Copy

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd job-processing-api
Install Dependencies

bash
Copy
npm install
Set Up Environment Variables

Replace the ACCESS_KEY in photoUtils.js with your Unsplash API access key.
Run the Server

bash
Copy
node server.js
The server will start on http://localhost:3000.

Time Report
Section	Time Spent
Project Setup	1 hour
API Development	3 hours
WebSocket Implementation	2 hours
Utility Functions	2 hours
Testing & Debugging	2 hours
Documentation	1 hour
Total	11 hours
API Endpoints
1. POST /jobs
Description: Submits a new job to the queue.
Request Body:
json
Copy
{}
Response:
201 Created:
json
Copy
{
  "jobId": "generated-job-id"
}
2. GET /jobs
Description: Retrieves the list of all jobs.
Response:
json
Copy
[
  {
    "jobId": "job-id",
    "status": "pending/resolved",
    "image": "optional-image-url"
  },
  ...
]
3. GET /jobs/:id
Description: Retrieves a specific job by its ID.
Response:
200 OK:
json
Copy
{
  "jobId": "job-id",
  "status": "pending/resolved",
  "image": "optional-image-url"
}
404 Not Found:
json
Copy
{
  "message": "Job not found"
}
Code Sections
1. server.js
Purpose: This is the main entry point of the application that sets up the Express server and WebSocket connections.
Key Components:
Imports: Loads required modules including Express, WebSocket, and utility functions.
Middleware: Configures CORS and body parsing for incoming requests.
Job Queue Management: Manages job submissions and processing logic.
WebSocket Notifications: Notifies connected clients of job status updates.
Code Breakdown:
javascript
Copy
const express = require("express"); // Importing Express framework
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const cors = require("cors"); // Middleware for enabling CORS
const http = require("http"); // HTTP module for server creation
const WebSocket = require("ws"); // WebSocket library for real-time communication
const { v4: uuidv4 } = require("uuid"); // UUID library for generating unique IDs
const { loadJobs, saveJobs, processNextJob } = require("./utils/jobUtils"); // Job utilities
const { getRandomPhoto } = require("./utils/photoUtils"); // Photo utilities

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocket.Server({ server }); // Create a WebSocket server

const PORT = 3000; // Define server port

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

let isProcessing = false; // Flag to track job processing state
const jobQueue = []; // Array to hold pending jobs

// Notify all connected WebSocket clients
const notifyAllClients = (job) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(job)); // Send job update to client
    }
  });
};

// API Endpoints (defined below)
2. jobUtils.js
Purpose: Contains utility functions for managing jobs, including loading, saving, and processing jobs.
Key Functions:
loadJobs(): Loads job data from jobs.json.
saveJobs(jobs): Saves job data to jobs.json.
processNextJob(): Processes the next job in the queue and updates its status.
Code Breakdown:
javascript
Copy
const fs = require("fs"); // File system module for file operations
const { randomDelay } = require("./photoUtils"); // Import random delay function

const JOBS_FILE = "../jobs.json"; // Path to jobs file

const loadJobs = () => {
  if (fs.existsSync(JOBS_FILE)) {
    return JSON.parse(fs.readFileSync(JOBS_FILE)); // Load jobs from file
  }
  return []; // Return empty array if no jobs file exists
};

const saveJobs = (jobs) => {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2)); // Save jobs to file
};

const processNextJob = async (jobQueue, notifyAllClients, getRandomPhoto, saveJobs) => {
  if (jobQueue.length === 0) {
    return; // Exit if no jobs in queue
  }

  const { jobId, resolve } = jobQueue.shift(); // Get next job from queue

  const jobs = loadJobs(); // Load current jobs

  await randomDelay(); // Introduce random delay

  try {
    const imageUrl = await getRandomPhoto(); // Fetch a random photo
    const job = { jobId, image: imageUrl, status: "resolved" }; // Create job object

    const updatedJobs = jobs.map((j) => (j.jobId === job.jobId ? job : j)); // Update job status
    saveJobs(updatedJobs); // Save updated jobs
    notifyAllClients(job); // Notify clients of job resolution

    resolve(); // Resolve the promise to continue processing the next job
  } catch (error) {
    console.error("Error processing job:", error); // Log errors
  } finally {
    processNextJob(jobQueue, notifyAllClients, getRandomPhoto, saveJobs); // Continue processing
  }
};

module.exports = { loadJobs, saveJobs, processNextJob }; // Export functions
3. photoUtils.js
Purpose: Provides functions to fetch random photos from the Unsplash API and manage delays in job processing.
Key Functions:
getRandomPhoto(): Fetches a random photo URL from Unsplash.
randomDelay(): Introduces a random delay before processing jobs.
Code Breakdown:
javascript
Copy
const axios = require("axios"); // Axios for making HTTP requests

const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?query=food"; // Unsplash API URL
const ACCESS_KEY = "your-access-key"; // Unsplash Access Key (replace with your key)

const getRandomPhoto = async () => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`, // Set authorization header
      },
    });
    return response.data.urls.regular; // Return photo URL
  } catch (error) {
    console.error("Error fetching the photo:", error); // Log errors
    throw error; // Rethrow error for handling
  }
};

const getJobTime = () => {
  const minSeconds = 5;
  const maxSeconds = 5 * 60; // Max delay of 5 minutes
  const minMilliseconds = minSeconds * 1000;
  const maxMilliseconds = maxSeconds * 1000;

  const delay =
    Math.floor(Math.random() * (maxMilliseconds - minMilliseconds + 1)) +
    minMilliseconds; // Calculate random delay
  return delay; // Return delay value
};

// Function to introduce a random delay
const randomDelay = (jobTime = null) => {
  const delay = jobTime ?? getJobTime(); // Use provided time or generate new
  console.log("job time", delay); // Log job time
  return new Promise((resolve) => setTimeout(resolve, delay)); // Return promise for delay
};

module.exports = { getRandomPhoto, randomDelay }; // Export functions
Utility Functions
loadJobs()
Purpose: Loads existing jobs from the jobs.json file. Returns an array of jobs.
saveJobs(jobs)
Purpose: Saves the provided jobs array to the jobs.json file.
processNextJob(jobQueue, notifyAllClients, getRandomPhoto, saveJobs)
Purpose: Processes jobs in the queue, fetching a random photo and updating job status.
getRandomPhoto()
Purpose: Fetches a random photo from the Unsplash API using Axios.
randomDelay()
Purpose: Introduces a random delay between job processing, simulating variable processing times.
Features and Approaches
WebSocket Integration:

Benefit: Provides real-time notifications to clients when jobs are processed, enhancing user experience by keeping clients informed without needing to poll the server.
Job Queue Management:

Benefit: Efficiently processes jobs in a first-in-first-out manner, ensuring orderly handling and preventing server overload from simultaneous job processing.
Random Delays:

Benefit: Simulates realistic job processing times, making the application appear more dynamic and preventing bottlenecks during high load.
Persistent Storage:

Benefit: Jobs are stored in a JSON file, allowing for data persistence across server restarts, which is crucial for maintaining job states.
Error Handling:

Benefit: Robust error handling in job processing ensures that issues are logged and do not disrupt the entire job queue.
Technologies Used
Node.js: JavaScript runtime for building the server.
Express: Framework for building RESTful APIs.
WebSocket: For real-time communication between the server and clients.
Axios: Promise-based HTTP client for making API requests.
UUID: For generating unique job IDs.