import { request } from "http";

//http port 80
// https port 443
const peticion = request({
    host: "localhost",
    port: 4000,
    path: "/nuevo",
    method: "POST",
    headers: {
        "Content-type" : "application/json"
    }
}, response => {
    // let string = "";
    // response.on("data", data => {
    //     string += data;
    // });

    // response.on("end", () => {
    //     console.log(string);
    // });
    console.log(response.statusCode);
});

peticion.write(JSON.stringify({r:0,g:234,b:9}));

peticion.end();