import express from "express";

export const app = express();

app.get("/", function (req, res) {
  res.send({
    Output: "Hello World v3!",
  });
});

app.post("/", function (req, res) {
  res.send({
    Output: "Hello World!",
  });
});
