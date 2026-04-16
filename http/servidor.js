const { createServer } = require("http");
const { createReadStream } = require("fs");


createServer((request, response) => {
    let fichero = null;
    if (request.url == "/") {
        response.writeHead(200, { "Cotent-type" : "text/html" });
        fichero = createReadStream("./front/index.html");
        fichero.pipe(response);

        fichero.on("end", () => response.end());

    } else if (request.url == "/css/index.css"){
        response.writeHead(200, { "Cotent-type" : "text/css" });
        fichero = createReadStream("./front/css/index.css");
        fichero.pipe(response);

        fichero.on("end", () => response.end());

    } else if (request.url == "/js/index.js"){
        response.writeHead(200, { "Cotent-type" : "text/javascript" });
        fichero = createReadStream("./front/js/index.js");
        fichero.pipe(response);

        fichero.on("end", () => response.end());

    } else {
        response.writeHead(404, { "Cotent-type" : "text/html" });
        response.write("<h1>not found</h1>");
        response.end();
    }

}).listen(8000);