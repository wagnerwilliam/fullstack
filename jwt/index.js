import express from "express";
import jwt from "jsonwebtoken";
const server = express();

server.use(express.static("./static"));

server.use(express.json());

const SECRET_KEY = "b7feadf3-b284-4051-ba41-8a7973c616cc";


///

const SignToken = (data) => {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "5m"});
}

const VerifyToken = (request, response, next) => {
    let token = request.headers.Authorization;
    
    if (token == undefined) {
        return response.send("No enviaste nada")
    }

    jwt.verify(token, SECRET_KEY, (error, data) => {
        if (error) {
            return response.send("no tiene permiso");
        }
        next();
    });
    response.send("no tiene permiso");
}   

function autorizar(request, response, next){
    response.send("no tiene permiso")
}

server.get("/a", VerifyToken, (request, response) => {
    response.send("informacion secreta")
});

server.get("/b", (request, response) => {
    response.send("informacion abierta")
});

server.post("/login", (request, response) => {
    let data = request.body;
    let token = SignToken(data);
    
    response.json({token})
});

server.listen(4000);
