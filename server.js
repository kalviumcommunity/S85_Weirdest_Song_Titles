const express = require("express"); // Import Express
const app = express(); // Create an Express app

const PORT = process.env.PORT || 3000; // Use environment variable if available

// Define the /ping route
app.get("/ping", (req, res) => {
  res.status(200).send("pong"); // Explicitly set the HTTP status code to 200
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
