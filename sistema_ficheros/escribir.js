const { writeFile } = require("fs")


writeFile("./prueba.txt", "lo que sea", err => {
    console.log(err);
})
