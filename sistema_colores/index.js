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

server.post("/nuevo", async (request, response, next) => {

    //asegurar que r, g, b estan presentes en request.body
    //asegurar que r, g, b son enteros entre 0 y 255
    //en caso de error next(true)

    let { r, g, b } = request.body;
    let rgb = [r,g,b];
    let i = 0;
    let valido = true;

    while (valido && i < rgb.length) {
        valido = /^\d{1,3}$/.test(rgb[i]) && Number(rgb[i]) < 255;
        i++;
    }

    if (!valido) {
        return next(true)
    }

    try {
        let id = await crearColor(request.body);
        response.status(201);
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


// Express's error middleware.
server.use((error, request, response, next) => {

    response.status(400); // 400 --> bad request.
    response.json({error: "error revise los datos"})
    
});


server.listen(4000);
