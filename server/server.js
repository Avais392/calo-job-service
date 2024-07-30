const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Unsplash API URL and your access key
const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?query=food";
const ACCESS_KEY = "l2TpyUiBXD7RFaO4Hom4TOcHPifQSSncQWG9qSqjSCw"; // Replace with your Unsplash Access Key
let isProcessing = false; // Added
const jobQueue = []; // Added
// Function to introduce a random delay
const randomDelay = () => {
  const delay = Math.floor(Math.random() * 61) * 5000; // Random delay between 5s to 5min
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Load jobs from file
const loadJobs = () => {
  if (fs.existsSync("jobs.json")) {
    return JSON.parse(fs.readFileSync("jobs.json"));
  }
  return [];
};

const getRandomPhoto = async () => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    console.log("get random photo function", response.data.urls.regular);
    return response.data.urls.regular;
  } catch (error) {
    console.error("Error fetching the photo:", error);
  }
};
const notifyAllClients = (job) => {
  // Notify all connected clients about job resolution
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(job));
    }
  });
};
const runJob = (jobId) => {
  // Simulate job execution
  setTimeout(async () => {
    let jobs = loadJobs();
    const response = await getRandomPhoto();
    let job = { jobId };
    console.log("response - url ", response);
    job.image = response; // URL of the image
    job.status = "resolved";
    jobs = jobs.map((j) => (j.jobId === job.jobId ? job : j));
    saveJobs(jobs);
    notifyAllClients(job);
  }, Math.floor(Math.random() * 61) * 5000); // Random delay between 5s to 5min
};
const processNextJob = async () => {
  // Added
  if (jobQueue.length === 0) {
    isProcessing = false;
    return;
  }

  const { jobId, resolve } = jobQueue.shift();
  isProcessing = true;

  // Simulate job execution
  await randomDelay();
  let jobs = loadJobs();
  const response = await getRandomPhoto();
  let job = { jobId };
  job.image = response; // URL of the image
  job.status = "resolved";
  jobs = jobs.map((j) => (j.jobId === job.jobId ? job : j));
  saveJobs(jobs);
  notifyAllClients(job);

  resolve(); // Resolve the promise to continue processing the next job
  processNextJob(); // Process the next job
};
// POST /jobs
app.post("/jobs", async (req, res) => {
  const jobs = loadJobs() ?? [];
  const jobId = uuidv4(); // uuid use
  const job = { jobId: jobId, status: "pending" };
  jobs.push(job);
  saveJobs(jobs);
  notifyAllClients(job);
  // Add job to the queue
  const jobPromise = new Promise((resolve) => {
    jobQueue.push({ jobId, resolve });
  });

  if (!isProcessing) {
    processNextJob(); // Start processing if not already
  }
  res.status(201).json({ jobId: jobId });
});

// GET /jobs
app.get("/jobs", (req, res) => {
  const jobs = loadJobs();

  res.json(
    jobs.map((job) => ({
      jobId: job.jobId,
      status: job.status,
      image: job.image,
    }))
  );
});

// GET /jobs/:id
app.get("/jobs/:id", (req, res) => {
  const jobs = loadJobs();
  const job = jobs.find((j) => j.jobId === parseInt(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Save jobs to file
const saveJobs = (jobs) => {
  fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
};

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
