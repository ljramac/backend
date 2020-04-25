const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/users", users);

app.listen(8080, async error => {
  if (error) return console.error();

  console.log("dev server started at port 8080");

  try {
    await mongoose.connect('mongodb://localhost:27017/course', { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error(error);
  }
});
