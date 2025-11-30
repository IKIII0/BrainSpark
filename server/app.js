const express = require("express");
const cors = require("cors");
const api = require("./routes/sparkRoutes");

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-user-email', 'Authorization']
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Brain Spark API is running",
    version: "1.0.0"
  });
});

// API routes
app.use("/api", api);

module.exports = app;
