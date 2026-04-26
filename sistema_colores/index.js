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
server.patch("/editar/:id", async (request, response) => {
    try {
        let id = request.params.id;
        let data = request.body;
        let newColor = await actualizarColor(id, data);
        response.status(204)
        response.json({ message: "color actualizao", color: newColor })
    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }
});


// endpoint borrar color
server.delete("/eliminar/:id", async (request, response) => {
    try {
        // elimina color desde la bd (prueba con archivo json)
        let id = await borrarColor(request.params.id)
        response.json({ message: `Color eliminardo: ${id}` })

    } catch (error) {
        response.status(500);
        response.json({ error: "error al eliminar el color" });
    }
});


server.listen(4000);


