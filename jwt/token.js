import jwt from "jsonwebtoken";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKb2VsIiwiaWF0IjoxNzc4NTgyNTgzLCJleHAiOjE3Nzg1ODI4ODN9.pqWzgLrDFPYg34aBtUhddwE6SnxSKg5tRx-D2YDfMRY

let datos = { nombre : "Joel" };
const SECRET_KEY = "b7feadf3-b284-4051-ba41-8a7973c616cc";

const SignToken = (data) => {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "5m"});
}


jwt.verify(acceso, SECRET_KEY, (error, data) => {
    console.log(error);
    console.log(data);
});



