// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/jobs";

export const fetchJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createJob = async () => {
  await axios.post(API_URL, {});
};
