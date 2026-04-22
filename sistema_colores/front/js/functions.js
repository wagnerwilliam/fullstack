// contenedor para los colores.
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const inputText = document.querySelector("input[type=text]");
const modlBorrar = document.querySelector(".modal-borrar");
const modalEditar = document.querySelector(".modal-editar");
const botonesModalBorrar = document.querySelectorAll(".modal-borrar button");
const botonesModalEditar = document.querySelectorAll(".modal-editar button");

const previewColor = document.querySelector(".color");
const inputsEditor = document.querySelectorAll(".modal-editar input");

let colorBorrar = null;
// colores a editar.
let colorEditar = null;

function color({ id, r, g, b }) {
    let rgb = [r, g, b];
    let li = document.createElement("li");
    let valor = rgb.join(",");

    li.style.backgroundColor = `rgb(${valor})`;
    li.setAttribute("data-id", id)
    li.innerHTML = `
        <span>${valor}</span>
        <button>editar</button>
        <button>borrar</button>
    `;

    // editar
    li.querySelector("button:nth-child(2)").addEventListener("click", () => {
        //se agrega objeto item li a editar y rgb valores de cada input range global
        colorEditar = { item: li, rgb };

        console.log(colorEditar);
        previewColor.style.backgroundColor = `rgb(${rgb.join(",")})`;
        colorEditar.rgb.forEach((valor, i) => inputsEditor[i].value = valor)
        modalEditar.classList.toggle("modal-visible");
    });

    // borrar
    li.querySelector("button:nth-child(3)").addEventListener("click", () => {
        // captura globalmente el elemento que se va a borrar.
        colorBorrar = li;
        modlBorrar.classList.toggle("modal-visible")

    });

    return li
}


form.addEventListener("submit", e => {
    e.preventDefault();
    //TODO: validar input
    let [ r, g, b ] = inputText.value.split(",");

    let objColor = {
        id: Math.random() * 3000,
        r, g, b
    }
    
    ul.appendChild(color(objColor))

    inputText.value = "";

});

// se recorre el array de nodos para obtener los botones.
botonesModalBorrar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        if (i == 0) {
            colorBorrar = null;
            modlBorrar.classList.toggle("modal-visible")
        } else {
            colorBorrar.remove();
            colorBorrar = null;
            modlBorrar.classList.toggle("modal-visible")
        }
    });
});

botonesModalEditar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        if (i == 0) {
            colorEditar = null;
            modalEditar.classList.remove("modal-visible")
        } else {
            //opcion de guardar al editar.
            colorEditar.item.style.backgroundColor = `rgb(${colorEditar.rgb.join(",")})`;
            colorEditar.item.children[0].innerText = colorEditar.rgb.join(",");
            colorEditar = null;
            modalEditar.classList.remove("modal-visible");
        }
    });
});

inputsEditor.forEach((input, i) => {
    input.addEventListener("input", () => {
        //actualiza los valores del rgb ya que se esta usando l;a referencia de variables globales.
        colorEditar.rgb[i] = input.value
        previewColor.style.backgroundColor = `rgb(${colorEditar.rgb.join(",")})`;
    });
});
