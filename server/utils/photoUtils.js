const axios = require("axios");

const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?query=food";
const ACCESS_KEY = "l2TpyUiBXD7RFaO4Hom4TOcHPifQSSncQWG9qSqjSCw"; // Replace with your Unsplash Access Key

const getRandomPhoto = async () => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    return response.data.urls.regular;
  } catch (error) {
    console.error("Error fetching the photo:", error);
    throw error;
  }
};

// Function to introduce a random delay
const randomDelay = () => {
  const minSeconds = 5;
  const maxSeconds = 5 * 60;
  const minMilliseconds = minSeconds * 1000;
  const maxMilliseconds = maxSeconds * 1000;

  const delay =
    Math.floor(Math.random() * (maxMilliseconds - minMilliseconds + 1)) +
    minMilliseconds; // Random delay between 5s to 5min
  return new Promise((resolve) => setTimeout(resolve, delay));
};

module.exports = { getRandomPhoto, randomDelay };
