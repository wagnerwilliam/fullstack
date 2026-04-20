import express from "express";
const server = express();

server.use(express.static("./front"));

server.use((request, response, next) => {
    console.log("pase por aqui");
    next();
})

server.get("/algo", (request, response) => {
    response.send("post")
})


server.listen(4000)