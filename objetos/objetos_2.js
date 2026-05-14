

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


class Estudiante extends Persona {

    constructor(nombre, edad, asignatura){
        super(nombre, edad)
        this.asignatura = asignatura
    }

    
}

let lucia = new Estudiante("Lucia", 24, "Matematica")

lucia.saludar()