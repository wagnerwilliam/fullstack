// Prototipo funcional
function Persona(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
}

Persona.prototype.envejecer = function () {
    this.edad++;
}


let william = new Persona("william", 23)


console.log(william);

// las clases en js  por detras son un prototipo duncional
class Prueba {

}
