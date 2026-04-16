const h1 = document.querySelector("h1");

h1.innerHTML = h1.innerText.split("").map(c => {
    return c == " " ? c : `<span style="background-color:rgb(${ [0,0,0].map(() => {
        return Math.floor(Math.random() * 256);
    }).join(",") });">${c}</span>`
}).join("");