const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const { loadJobs, saveJobs, processNextJob } = require("./utils/jobUtils");
const { getRandomPhoto } = require("./utils/photoUtils");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let isProcessing = false;
const jobQueue = [];

// Notify all connected WebSocket clients
const notifyAllClients = (job) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(job));
    }
  });
};

// API Endpoints

// POST /jobs
app.post("/jobs", (req, res) => {
  const jobs = loadJobs();
  const jobId = uuidv4();
  const job = { jobId, status: "pending" };

  jobs.push(job);
  saveJobs(jobs);
  notifyAllClients(job);

  const jobPromise = new Promise((resolve) => {
    jobQueue.push({ jobId, resolve });
  });

  if (!isProcessing) {
    processNextJob(jobQueue, notifyAllClients, getRandomPhoto, saveJobs);
  }

  res.status(201).json({ jobId });
});

// GET /jobs
app.get("/jobs", (req, res) => {
  const jobs = loadJobs();
  res.json(jobs.map(({ jobId, status, image }) => ({ jobId, status, image })));
});

// GET /jobs/:id
app.get("/jobs/:id", (req, res) => {
  const jobs = loadJobs();
  const job = jobs.find((j) => j.jobId === req.params.id);

  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
