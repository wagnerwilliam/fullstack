import { MongoClient } from "mongodb";

let usuarios = [
    {   unername: "william_97",
        passwornd : "william54321"
    },
    {   username: "obi_wan",
        passowrd: "*order66"
    }
];

MongoClient.connect('mongodb+srv://wagner:Nerwaliam970619@cluster0.ezbwvfg.mongodb.net/')
.then( conexion => {

    const coleccion = conexion.db("colores").collection("usuarios");
    coleccion.insertMany(usuarios)
    .then( resultado => {
        console.log(resultado);
        conexion.close();
    })
})
.catch(error => {
    console.log(":/");
    
});
