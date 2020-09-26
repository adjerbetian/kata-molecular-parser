const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send({
    Output: "Hello World v2!",
  });
});

app.post("/", function (req, res) {
  res.send({
    Output: "Hello World!",
  });
});

module.exports = app;
