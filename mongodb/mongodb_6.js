import { MongoClient, ObjectId } from "mongodb";

let colores = [];

for (let i = 0; i < 5; i++) {
    let [r, g, b] = [0,0,0].map(() => Math.floor(Math.random() * 255));
    colores.push({r, g, b});
}

MongoClient.connect('mongodb+srv://wagner:Nerwaliam970619@cluster0.ezbwvfg.mongodb.net/')
.then( conexion => {

    const coleccion = conexion.db("colores").collection("colores");
    coleccion.find({}).toArray()
    .then( resultado => {
        console.log(resultado);
        conexion.close();
    });
})
.catch(error => {
    console.log(":/");
    
}); //return a promise with connection.