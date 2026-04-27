import express from "express";
import { leerColores, crearColor, borrarColor, actualizarColor } from "./datos.js";

const server = express();

server.use(express.json());

server.use(express.static("./front"));


// apis
server.get("/colores", async (request, response) => {
    try {
        // obtiene colores en obj de javascript o array de objetos.
        let colores = await leerColores();
        // devuelve los colores en formato json.
        response.json(colores);

    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }
});

server.post("/nuevo", async (request, response) => {
    try {
        let id = await crearColor(request.body);
        response.json({ id });

    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }
});

// endpoint actualizar color
server.put("/actualizar/:id", async (request, response) => {
    try {
        await actualizarColor(Number(request.params.id), request.body);
        response.sendStatus(204);
    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }
});


// endpoint borrar color
server.delete("/borrar/:id", async (request, response) => {
    try {
        // elimina color desde la bd (prueba con archivo json)
        await borrarColor(Number(request.params.id));
        response.sendStatus(204); // no content

    } catch (error) {
        response.status(500);
        response.json({ error: "error al eliminar el color" });
    }
});


server.listen(4000);


