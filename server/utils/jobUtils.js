const fs = require("fs");
const { randomDelay } = require("./photoUtils");

const JOBS_FILE = "./jobs.json";

const loadJobs = () => {
  if (fs.existsSync(JOBS_FILE)) {
    return JSON.parse(fs.readFileSync(JOBS_FILE));
  }
  return [];
};

const saveJobs = (jobs) => {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
};

const processNextJob = async (
  jobQueue,
  notifyAllClients,
  getRandomPhoto,
  saveJobs
) => {
  if (jobQueue.length === 0) {
    return;
  }

  const { jobId, resolve } = jobQueue.shift();

  const jobs = loadJobs();

  await randomDelay();

  try {
    const imageUrl = await getRandomPhoto();
    const job = { jobId, image: imageUrl, status: "resolved" };

    const updatedJobs = jobs.map((j) => (j.jobId === job.jobId ? job : j));
    saveJobs(updatedJobs);
    notifyAllClients(job);

    resolve(); // Resolve the promise to continue processing the next job
  } catch (error) {
    console.error("Error processing job:", error);
  } finally {
    processNextJob(jobQueue, notifyAllClients, getRandomPhoto, saveJobs); // Continue processing the next job
  }
};

module.exports = { loadJobs, saveJobs, processNextJob };
