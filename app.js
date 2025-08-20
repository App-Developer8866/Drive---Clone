const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const server = express();
const PORT = process.env.PORT || 8080;

server.set("view engine", "ejs");

// Middleware to log requests
server.use(morgan("dev"));
// Middleware to parse cookies
server.use(cookieParser());
// Middleware to parse JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", userRoutes);

server.listen(PORT);
