let string = "'entre comillas simples' \"entre comillas dobles\" 'comillas combinadas\"";


console.log(string.match(/("|')[a-z ]+\1/ig));

