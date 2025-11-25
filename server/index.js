const express = require("express");
const app = require("./app");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hi, Ini Backend Brain Spark!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
