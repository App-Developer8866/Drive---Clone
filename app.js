const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8080;

server.set("view engine", "ejs");

// Middleware to log requests
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", userRoutes);

server.listen(PORT);
