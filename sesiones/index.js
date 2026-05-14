import express from "express";
import session from "express-session";

const server = express();

server.set("view engine", "ejs");

//server.use(express.static("./views"))

let usuarios = [
    {
        usuario: "tristan_24",
        password: "12345"
    },
    {
        usuario: "rocio_23",
        password: "54321"
    }
];

server.use(session({
    secret: "prueba",
    resave: true,
    saveUninitialized: false,
}));

server.use(express.urlencoded()); // permite enviar formularos html ssr

server.get("/", (request, response) => {
    console.log(request.session);
    if (!request.session.usuario) {
        return response.redirect("/login")
    }
    response.render("index");
});

server.get("/login", (request, response) => {
    if (request.session.usuario) {
        return response.redirect("/")
    }
    response.render("login");
});

server.post("/login", (request, response) => {

    const data = request.body;
    console.log(data);

    for(let i = 0; i < usuarios.length; i++) {
        if (
            data.usuario === usuarios[i].usuario
            && data.password === usuarios[i].password
        ) {
            request.session.usuario = data.usuario;
            return response.redirect('/');
        }
    }

    return response.redirect('login')

    // usuarios.forEach(u => {
    //     if (
    //         data.usuario === u.usuario
    //         && data.password === u.password
    //     ) {
    //         request.session.usuario = data.usuario;
    //         return response.redirect('/');
    //     }
    // })
    // return response.redirect('login')

});

server.get("/logout", (request, response) => {
    request.session.destroy(() => response.redirect("login"));
});

server.listen(3000);
