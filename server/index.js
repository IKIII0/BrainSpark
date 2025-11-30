const express = require("express");
const cors = require("cors");
const api = require("./routes/sparkRoutes");

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-user-email']
}));

app.use(express.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hi, Ini Backend Brain Spark!");
});

// For local development
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = app;
