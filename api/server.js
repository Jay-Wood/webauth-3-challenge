const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");

const authRouter = require("../auth/authRouter.js");
const userRouter = require("../users/userRouter.js");

const server = express();

// server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter)
server.use("/users", userRouter)

server.get("/", (req, res) => {
    res.send("Server is working!")
})

module.exports = server;


