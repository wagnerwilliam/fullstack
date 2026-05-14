import dotenv from "dotenv";
dotenv.config();
// ------------------------------
import { MongoClient, ObjectId } from "mongodb";


function connect() {
    return MongoClient.connect(process.env.MONGO_URL)
}

// implementar funcion buscar usuario recibe el nombre de usuario y retorna el obj de mongodb

export function buscarUsuario(username){
    return new Promise((ok, ko) => {
        let connection = null;
        connect()
        .then(connectMongo => {
            connection = connectMongo;
            let collection = connection.db("colores").collection("usuarios");
            return collection.findOne({ username })
        })
        .then(response => ok(response))
        .catch(error => ko(error))
        .finally(() => {
            if (connection) {
                connection.close();
            }
        });
    })
}

// let response = await buscarUsuario("william_97")
// console.log(response);


export function leerColores(user_id) {
    return new Promise((ok, ko) => {
        let connection = null;
        connect()
            .then(connectMongo => {
                connection = connectMongo;
                let collection = connection.db("colores").collection("colores");
                return collection.find({ user_id }).toArray();
            })
            .then(colores => ok(colores))
            .catch(error => ko({ error: "Error en bbdd" }))
            .finally(() => {
                if (connection) {
                    connection.close();
                }
            });

    });
}

export function crearColor(obj) {
    return new Promise((ok, ko) => {
        let connection = null;
        connect()
            .then(connectMongo => {
                connection = connectMongo;
                let collection = connection.db("colores").collection("colores");
                return collection.insertOne(obj);
            })
            .then(resultado => ok(resultado.insertedId))
            .catch(error => ko({ error: "Error en bbdd" }))
            .finally(() => {
                if (connection) {
                    connection.close();
                }
            });

    });
}

// let response = await crearColor({r: 122, g: 33, b: 55, user_id: "6a031ce6794a427fbad7079c"});
// console.log(response);

// crear funcion boorrar color recibe id | al cumplir la promesa --> 0 | 1

export function borrarColor(id) {
    return new Promise((ok, ko) => {
        let connection;
        connect()
            .then(connectMongoo => {
                connection = connectMongoo;
                let collection = connection.db("colores").collection("colores");
                return collection.deleteOne({ _id: new ObjectId(id) })
            })
            .then(response => ok(response.deletedCount))
            .catch(error => ko({ error: "Error en bbdd" })
            )
            .finally(() => {
                if (connection) {
                    connection.close();
                }
            });
    });
}


// actualizar color recibe y data y obj a actualizar retorna --> { matchedCount, modifiedCount }


export function actualizarColor(id, objData) {
    return new Promise((ok, ko) => {
        let connection;
        connect()
            .then(connectMongoo => {
                connection = connectMongoo;
                let collection = connection.db("colores").collection("colores");
                return collection.updateOne({ _id: new ObjectId(id) }, { $set: objData })
            })
            .then(response => ok(
                { 
                    "matchedCount": response.matchedCount, 
                    "modifiedCount": response.modifiedCount 
                }
            ))
            .catch(error => ko({ error: "Error en bbdd" })
            )
            .finally(() => {
                if (connection) {
                    connection.close();
                }
            });
    });
}
