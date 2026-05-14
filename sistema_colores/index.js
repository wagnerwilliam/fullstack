import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarUsuario, leerColores, crearColor, borrarColor, actualizarColor } from "./datos.js";



function autorizar(request, response, next) {
    // verificar que exista el header dentro del request.
    // si no hay autorization ---> 401
    // verificar token jwt
    // si es invalido ---> 401
    // si es valido --> guardar id en la peticion.
    // invocar funcion next

    let { authorization }  = request.headers

    if (!authorization) {
        return response.sendStatus(401);
    }

    let posibleToken = authorization.split(' '); // or splice(7);

    if (posibleToken[0] != "Bearer" || !posibleToken[1]) {
        return next(true);
    }

    jwt.verify(posibleToken[1], process.env.SECRET_KEY, (error, data) => {
        if (error) {
            return response.sendStatus(401);
        }
        request.user = data.id
        next();
    });
}

const server = express();

server.use(express.json());

//server.use(express.static("./front"));


server.post("/login", async (request, response, next) => {
    // Validar existencia de campos username y password en el json. si no existe devolver un 400 por que los datos son erroneos.
    // Verificar existencia del usuario.
    // Si usuario es null ---> 401
    // Si usuario existe ----> Verificar que la contraseña sea valida
    // Si password es incorrecto ---> 403 por que ya demostraste que existes pero tu contraseña es incorrecta.
    // Si el password es corecto le quiero dar un token al usuario usar { _id } del usuario ---> enviarlo en JSON token

    let { username, password } = request.body;
    
    if (username == undefined || password == undefined) {
        next(true);
    }

    // si existe es obj sino null
    let user = await buscarUsuario(username);
    
    if (!user) {
        return response.sendStatus(401);
    }

    let is_valid = await bcrypt.compare(password, user.password);

    if (!is_valid){
        return response.sendStatus(403);
    }

    let token = jwt.sign({id : user._id}, process.env.SECRET_KEY, { expiresIn: "5m" });

    response.json({token});

});

server.use(autorizar);

// apis
server.get("/colores", async (request, response) => {
    try {
        // obtiene colores en obj de javascript o array de objetos.
        let colores = await leerColores(request.user);
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
        valido = /^\d{1,3}$/.test(rgb[i]) && Number(rgb[i]) <= 255;
        i++;
    }

    if (!valido) {
        return next(true)
    }

    try {
        let _id = await crearColor({r, g, b, user_id: request.user});
        response.status(201);
        response.json({ _id });

    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }

});


// endpoint actualizar color
server.put("/actualizar/:id", async (request, response, next) => {

    // verificando que id sea un numero sino arroja 404

    //cambiar la expresion regular para validar el id
    let id = request.params.id;
    let valido = /^[0-9a-f]{24}$/.test(id);

    if (!valido) {
        return next();
    }
    
    let { r, g, b } = request.body;
    
    // crear un array rgb 
    let rgb = [r,g,b].map( n => {
        let isUndefined = n == undefined;
        let valido = /^\d{1,3}$/.test(n) && Number(n) < 255;
        return { valido, isUndefined }
    });
    
    let i = 0;

    valido = true;

    let claves = ["r", "g", "b"];

    let objActualizar = {};

    while (valido && i < rgb.length) {
        if (!rgb[i].isUndefined) {
            valido = rgb[i].valido;
            if (valido) {
                objActualizar[claves[i]] = request.body[claves[i]];
            }
        }
        i++;
    }

    /*
        {
            r: 200,
            g: 100,
            b: 2000
        }
        [200, undefined]
        [
            { valido: true, isUndefined: false},
            { valido: true, isUndefined: false},
            { valido: false, isUndefined: false},
        ]
    */

    if (!valido) {
        return next(true);
    }
    
    //match count es 0 o 1 --> 204
    // macth count 0 --> redirigir al 404
    
    try {
        let { matchedCount, modifiedCount } = await actualizarColor(id, objActualizar);

        if (!matchedCount) {
            return next();
        }

        response.sendStatus(204);

    } catch (error) {
        response.status(500);
        response.json({ error: "error en el servidor" });
    }
});


// endpoint borrar color
server.delete("/borrar/:id", async (request, response, next) => {

    // crear algun sistema que valide que el usuario que quiere borrar el color
    // solo pueda borrar sus colores.

    let {id} = request.params;
    let valido = /^[0-9a-f]{24}$/.test(id);

    if (!valido) {
        return next();
    }

    try {
        // elimina color desde la bd (prueba con archivo json)
        let color = await borrarColor(id);
        //validar deletedcount 0 y 1
        
        if (!color) {
            return next();   
        }

        response.sendStatus(204); // no content

    } catch (error) {
        response.status(500);
        
        response.json({ error: "error al eliminar el color" });
    }

});


// Express's error middleware. next(true)
server.use((error, request, response, next) => {

    response.status(400); // 400 --> bad request.
    response.json({ error: "error en la peticion" });
    
});


server.use((request, response) => {
    response.status(404); // not found.
    response.json({ error: "recurso no encontrado" });
});


server.listen(process.env.PORT);
