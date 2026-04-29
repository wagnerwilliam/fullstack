let string = "tristan.org joel3com joel.com william.net";

// i insensitivo a mayusculas
// g global agrupa p[arecidos en un array
// [] representa un solo caracter
//conjunto negativo --> representa un solo caracter que peude ser cualquiera menos los del conjunto [^aek] menos aek

// caracterees modificadores ---> ? + *
// estos afectan al caracteres precedente(el qe tiene detras) y solo un caracter
// ? --> el caracter es opcional puede o no estar
// + indica que el caracter precedente puede aparacer una o mas veces y no tiene que ser el mismo caracter

// repeticion de caracteres ---> {} --> afecta al caracter precedente (el de atras)
// {a} {min, max} {min,} minimo 3 maximo los que sea

// caracter escapado \ --> activa o desactiva la funcionalidad/significado de un caracter.
// \t ---> caracter tabulador
// n lertrar r \n --> neuva linea.
// \r --> return
// \s -->? spacio
// \d ---> digito 0 a 9
// \b --> boundary --->  representa un limite (principio o el fin de un input) o un caracter invisible
// al inicio debe estar el principio del input o un caracter no visible espacio tab etc.

//console.log(string.match(/[a-z]+\.[a-z]{3}/ig));

let string2 = "tristan.org rocio.edu joel.net joel.com william.net";

console.log(string2.match(/[a-z]+\.(org|net|edu)/ig));

