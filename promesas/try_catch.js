try {
    let numero = Math.floor(Math.random() * 10) + 1

    if (numero >= 5) {
        throw new Error("Numero mayor o igual a 5");

    }
    
} catch (error) {
    console.log(error);
    
}