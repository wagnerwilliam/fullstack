const { readFile, writeFile } = require("fs")

// console.log("escriba un nombre");

// const lista = []

// process.stdin.on("data", data => {
    
//     let input = data.toString().trim()
    
//     input !== "salir" && input !== "lista"
//     ? (lista.push(input), console.log("nombre guardado"))
//     : null;
    
//     console.log("escriba un nombre");
//     if (input == "salir") {
//         return process.exit()
//     }

//     if (input == "lista") {
//         lista.forEach(item => {
//             console.log(item);
//         })
        
//     }
    
// })


function read() {
    return new Promise( ok => {
        readFile("./lista.txt", (error, contenido) => {
            ok(contenido.toString())
        })
    })
}

function save(name) {
    return new Promise(ok => {
        read()
        .then(lista => {
            lista += lista.length > 0  ? `,${name}` : name
            writeFile("./lista.txt", lista, error => {
                ok()
            })
        })
    })
}

function preguntarNombre() {
    console.log("escriba un nombre");
}

process.stdin.on("data", async data => {
    let input = data.toString().trim();
    
    if (input == "salir") {
        return process.exit()

    }else if (input == "lista") {
        let lista = await read();
        if (lista.length > 0) {
            console.log(lista);
        } else {
            console.log("no hay nombres");
        }
        
    } else {
        await save(input)

    }

    preguntarNombre()
    
})
preguntarNombre()