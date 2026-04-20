import express from "express";
let personas = [];

const server = express();

server.set("view engine", "ejs");

server.use(express.static("./statics"))

server.get("/", (request, response) => {
    response.render("lista", { personas });
});

server.post("/crear", (request, response) => {
       
    
    response.send("procesando datos");
});

server.listen(3000);
