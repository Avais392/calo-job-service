// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/jobs";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor to check network connectivity
apiClient.interceptors.request.use(
  (config) => {
    // Check if online
    if (!navigator.onLine) {
      // Show an error message to the user
      alert(
        "No network connection. Please check your internet connection and try again."
      );
      // Cancel the request
      return Promise.reject(new Error("No network connection"));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch jobs
export const fetchJobs = async () => {
  const response = await apiClient.get("/");
  return response.data;
};

// Function to create a job
export const createJob = async (jobData) => {
  await apiClient.post("/", jobData);
};
