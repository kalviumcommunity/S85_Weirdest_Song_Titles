require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./Database/db");
const songRoutes = require("./router/routes"); // Import routes
const userRoutes = require("./router/userRouter"); // Import user routes
const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Home Route - Display Connection Status
app.get("/", (req, res) => {
  const status = require("mongoose").connection.readyState;
  const messages = [
    "Disconnected",
    "Connected",
    "Connecting...",
    "Disconnecting...",
  ];
  res.json({ database_status: messages[status] || "Unknown State" });
});

// CRUD API Routes
app.use("/api/songs", songRoutes);
app.use("/api/users", userRoutes); // Add user routes

// Ping Route
app.get("/ping", (req, res) => res.status(200).send("pong"));

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
