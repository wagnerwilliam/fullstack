import { MongoClient } from "mongodb";

MongoClient.connect('mongodb+srv://wagner:Nerwaliam970619@cluster0.ezbwvfg.mongodb.net/')
.then( conexion => {

    const coleccion = conexion.db("colores").collection("colores");
    coleccion.insertOne({r: 200, g: 200, b: 100})
    .then( resultado => {
        console.log(resultado);
        conexion.close();
    })
})
.catch(error => {
    console.log(":/");
    
}); //return a promise with connection.