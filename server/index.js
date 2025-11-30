const express = require("express");
const cors = require("cors");
const api = require("./routes/sparkRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hi, Ini Backend Brain Spark!");
});

module.exports = (req, res) => {
  app(req, res);
};
