// contenedor para los colores.
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const inputText = document.querySelector("input[type=text]");
const modlBorrar = document.querySelector(".modal-borrar");
const modlEditar = document.querySelector(".modal-editar");

function color({ id, r, g, b }) {
    let li = document.createElement("li");
    let valor = [r, g, b].join(",");
    console.log(valor);

    li.style.backgroundColor = `rgb(${valor})`;
    li.innerHTML = `
        <span>${valor}</span>
        <button class="editarBtn">editar</button>
        <button class="borrarBtn">borrar</button>
    `
    li.querySelector(".editarBtn").addEventListener("click", () => {
        console.log("editar" + id);
        
        modlEditar.classList.toggle("modal-visible")
    });

    li.querySelector(".borrarBtn").addEventListener("click", () => {
        console.log("borrar" + id);
        modlBorrar.classList.toggle("modal-visible")
    });

    return li
}


form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(inputText.value);
    
    //color({ id: 1, r: 1, g: 0, b: 180 });
});
