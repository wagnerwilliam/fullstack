import express from "express";
import { leerColores, crearColor, borrarColor, actualizarColor } from "./datos.js";

const server = express();

server.use(express.json());

server.use(express.static("./front"));



server.get("/colores", async (request, response) => {
    try {
        let colores = await leerColores();
        response.json(colores);

    } catch (error) {
        response.status(500);
        response.json({error: "error en el servidor"});
    }
});

server.post("/nuevo", async (request, response) => {
    try {
        let id = await crearColor(request.body);
        response.json({id});

    } catch (error) {
        response.status(500);
        response.json({error: "error en el servidor"});
    }
});


server.listen(4000);


