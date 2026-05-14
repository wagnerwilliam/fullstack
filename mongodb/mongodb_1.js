import { MongoClient } from "mongodb";

MongoClient.connect('mongodb+srv://wagner:Nerwaliam970619@cluster0.ezbwvfg.mongodb.net/')
.then( conecction => {
    console.log("consultas");
    const bd = conecction.db("colores")
    conecction.close();
})
.catch(error => {
    console.log(":/");
    
}); //return a promise with connection.