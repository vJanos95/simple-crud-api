const express = require("express");
const app = express();
const mongoose = require("mongoose");

const database = mongoose.connect("mongodb://localhost/practice-db");

app.listen(3000, function () {
  console.log("Now running on port 3000!");
});
