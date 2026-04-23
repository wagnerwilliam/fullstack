import { readFile, writeFile } from "fs";

export function leerColores() {
    return new Promise((ok, ko) => {
        readFile("./colores.json", (error, data) => {
            if (!error) {
                let colores = JSON.parse(data.toString());
                return ok(colores);
            }
            ko();
        });
    });
}

export function crearColor(color) { // obj {r, g, b}
    return new Promise((ok, ko) => {
        leerColores()
        .then(colores => {
            let id = colores.length > 0 ? colores[colores.length - 1].id + 1 : 1;
            color.id = id;
            colores.push(color);

            writeFile("./colores.json", JSON.stringify(colores), error => {
                if (!error) {
                    return ok(id)
                }
                ko();
            });
        })
        .catch(() => ko())
    });
}

export function actualizarColor(id, objCambios) {
    return new Promise((ok, ko) => {
        leerColores()
        .then(colores => {
            colores = colores.map(color => {
                if (color.id == id) {
                    let {r,g,b} = objCambios;

                    // valida existencia de r g b en el objeto de cambio si es undefined deja el color que ya tenia el objeto en bd.
                    color.r = r != undefined ? r : color.r;
                    color.g = g != undefined ? g : color.g;
                    color.b = b != undefined ? b : color.b;
                }
                return color
            });
            
            writeFile("./colores.json", JSON.stringify(colores), error => {
                if (!error) {
                    return ok(id)
                }
                ko();
            });
        })
        .catch(() => ko())
    });
}
//editarColor({r:122, g:33, b: 44}) [{"r":122, "g":33, "b": 44, "id":1}]

export function borrarColor(id) {
    return new Promise((ok, ko) => {
        leerColores()
        .then(colores => {
            colores = colores.filter( color => color.id != id); // elemento que retone true se queda el que no sale pero siempre retorna aray

            writeFile("./colores.json", JSON.stringify(colores), error => {
                if (!error) {
                    return ok(id)
                }
                ko();
            });
        })
        .catch(() => ko())
    });
}
