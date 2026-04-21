import express from "express";

const server = express();

server.use(express.static("./front"));

server.listen(4000);


