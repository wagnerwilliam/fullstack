import express from "express";
let personas = [];

const server = express();

server.set("view engine", "ejs");

server.use(express.urlencoded());

server.use(express.static("./statics"))


server.get("/", (request, response) => {
    response.render("lista", { personas });
});

server.post("/crear", (request, response) => {
    let { nombre } = request.body;
    personas.push(nombre);
    response.redirect("/");
});

server.use((request, response) => {
    response.status(404);
    response.send("not found");
})

server.listen(3000);
