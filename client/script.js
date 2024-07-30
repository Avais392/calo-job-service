const jobList = document.getElementById("jobList");
const createJobButton = document.getElementById("createJob");

const fetchJobs = async () => {
  try {
    const response = await fetch("http://localhost:3000/jobs");
    const jobs = await response.json();
    console.log("Jobs fetched:", jobs); // Debugging line
    jobList.innerHTML = ""; // Clear the existing list
    if (jobs.length === 0) {
      jobList.innerHTML = "<li>No jobs available</li>"; // Display a message if no jobs
    } else {
      jobs.forEach((job) => {
        const li = document.createElement("li");
        li.textContent = `Job ID: ${job.jobid}, Status: ${job.status}`;
        jobList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error); // Log any fetch errors
  }
};

const createJob = async () => {
  console.log("Create Job button clicked"); // Debugging line
  try {
    const response = await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      console.log("Job created successfully"); // Debugging line
      // Wait a moment to ensure the job is processed
      setTimeout(fetchJobs, 1000); // Fetch jobs after 1 second
    } else {
      console.error("Failed to create job:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating job:", error); // Log any creation errors
  }
};

// Event listener for the Create Job button
createJobButton.addEventListener("click", createJob);

// Interval to fetch jobs every 5 seconds
setInterval(fetchJobs, 5000); // Fetch jobs every 5 seconds
