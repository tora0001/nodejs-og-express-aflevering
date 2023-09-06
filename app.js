"use strict";

import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I'm working!");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
