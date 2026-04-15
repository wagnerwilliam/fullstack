const { readFile } = require("fs")


// readFile(ruta, callback) -----> el calback recibe el error y el contenido (hexadecimal)

readFile("./hola.jpg", (error, content) => {
    if (error) {
        return console.log(error);
    }
    console.log(content);

})
