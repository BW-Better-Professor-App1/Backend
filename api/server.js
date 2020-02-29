const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const studentsRouter = require("../students/students-router");
const projectsRouter = require("../projects/projects-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);

server.use("/api/users", usersRouter);

server.use("/api/students", studentsRouter);

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("It's Alive!");
});

module.exports = server;
