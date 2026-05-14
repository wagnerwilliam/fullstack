

class Persona {

    constructor(nombre, edad) {
        this.nombre = nombre
        this.edad = edad
    }

    envejecer(){
        this.edad++;
    }

    saludar(){
        console.log(`Hola soy ${this.nombre} y tengo ${this.edad} años`);
        
    }
}

let instance = new Persona("william", 25)

console.log(instance.saludar());
