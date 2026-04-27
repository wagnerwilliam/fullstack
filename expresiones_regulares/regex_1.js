let string = "hola HOLA hOLA ola hilo hielo hule halo";

// i insensitivo a mayusculas
// g global agrupa p[arecidos en un array
// [] representa un solo caracter
//conjunto negativo --> representa un solo caracter que peude ser cualquiera menos los del conjunto [^aek] menos aek

// caracterees modificadores ---> ? + *
// estos afectan al caracteres presedente(el qe tiene detras) y solo un caracter
// ? --> el caracter es opcional puede o no estar
// + indica que el caracter presedente puede aparacer una o mas veces y no tiene que ser el mismo caracter

console.log(string.match(/h?[aeiou]+l[aeiou]/ig));
