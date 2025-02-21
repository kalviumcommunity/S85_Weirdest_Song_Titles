require("dotenv").config({ path: "./config/.env" });
const express = require("express"); // Import Express
const connectDB = require("./Database/db");
const app = express(); // Create an Express app

const PORT = process.env.PORT || 5000; // Use environment variable if available

connectDB();

// Home Route - Display Connection Status
app.get("/", (req, res) => {
  const status = require("mongoose").connection.readyState;
  let message = "";

  switch (status) {
    case 0:
      message = "Disconnected";
      break;
    case 1:
      message = "Connected";
      break;
    case 2:
      message = "Connecting...";
      break;
    case 3:
      message = "Disconnecting...";
      break;
    default:
      message = "Unknown State";
  }

  res.json({ database_status: message });
});

// Define the /ping route
app.get("/ping", (req, res) => {
  res.status(200).send("pong"); // Explicitly set the HTTP status code to 200
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
