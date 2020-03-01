const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const studentsRouter = require("../students/students-router");
const projectsRouter = require("../projects/projects-router");
const restrict = require('../auth/restrict_middleware')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);

server.use("/api/users", restrict, usersRouter);

server.use("/api/students", restrict, studentsRouter);

server.use("/api/projects", restrict, projectsRouter);

server.get("/", (req, res) => {
  res.send("It's Alive!");
});

module.exports = server;