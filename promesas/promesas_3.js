

function promesa() {
    return new Promise((fulfill, reject) => {
        Math.random() > 0.5 ? fulfill() : reject()
    })
}


// promesa()
// .then(() => console.log("todo ok"))
// .catch(() => console.log("rechazado"))

promesa()
.then(() => {
    console.log("primera promesa")
    return promesa()
})
.then(() => {
    console.log("segunda promesa")
    return promesa()
})
.then(() => {
    console.log("tercera promesa")
})
.catch(() => console.log("rechazado"))
.finally(() => console.log("siempre entra"))