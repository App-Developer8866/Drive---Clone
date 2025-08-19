const express = require("express");
const morgan = require("morgan");

const server = express();
const PORT = process.env.PORT || 8080;

server.set("view engine", "ejs");

// Middleware to log requests
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.render("index");
});

server.post("/user-form-data", (req, res) => {
  console.log("Received user form data:", req.body);
  res.send("Form data received successfully! " + JSON.stringify(req.body));
});

server.listen(PORT);
