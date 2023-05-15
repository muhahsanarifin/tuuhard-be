require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./src/routes/main");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

server.use(mainRouter);

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running successfully, and listening on port ${port}`);
});
