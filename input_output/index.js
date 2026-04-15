// process.stdout.write("lo que sea")
// process.stdout.write("\tlo que sea")
// process.stdout.write("\nlo que sea\r")
// process.stdout.write("lo que sea")


// flujos de entrada y de salida 

//data.toString().trim() trim quita caracteres al inicio y al final de una cadena

console.log("Escriba 'salir' para salir.");

process.stdin.on("data", data => {
    
    if (data.toString().trim() == "salir") {
        return process.exit()
    }
    console.log("....siga intentando");
    
})

process.on("exit", () => {
    console.log("bye bye");
})
