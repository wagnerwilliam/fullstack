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
let idColor = null
// colores a editar.
let colorEditar = null;

function color({ id, r, g, b }) {
    let rgb = [r, g, b];
    let li = document.createElement("li");
    let valor = rgb.join(",");

    li.style.backgroundColor = `rgb(${valor})`;
    li.innerHTML = `
        <span>${valor}</span>
        <button>editar</button>
        <button>borrar</button>
    `;

    // editar
    li.querySelector("button:nth-child(2)").addEventListener("click", () => {
        //se agrega objeto item li a editar y rgb valores de cada input range global
        colorEditar = { item: li, rgb, id };

        previewColor.style.backgroundColor = `rgb(${rgb.join(",")})`;
        colorEditar.rgb.forEach((valor, i) => inputsEditor[i].value = valor)
        idColor = id;
        modalEditar.classList.toggle("modal-visible");
    });

    // borrar
    li.querySelector("button:nth-child(3)").addEventListener("click", () => {
        // captura globalmente el elemento que se va a borrar.
        colorBorrar = { item: li, id };
        modlBorrar.classList.toggle("modal-visible")

    });

    return li
}

// carga inicial de los datos, peticiones fetch al backend.
fetch("/colores")
    .then(response => response.json())
    .then(colores => {
        colores.forEach(c => {
            ul.appendChild(color(c))
        });
    });



form.addEventListener("submit", e => {
    e.preventDefault();
    //TODO: validar input
    let [r, g, b] = inputText.value.split(",");

    let objColor = {
        //id: Math.random() * 3000,
        r, g, b
    }

    fetch("/nuevo", {
        method: "POST",
        body: JSON.stringify(objColor),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(({ id }) => {
            objColor.id = id;
            ul.appendChild(color(objColor))
            inputText.value = "";
        });


});

// se recorre el array de nodos para obtener los botones.
botonesModalBorrar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        if (i == 0) {
            colorBorrar = null;
            modlBorrar.classList.toggle("modal-visible")
        } else {
            //se apunta al endpoint para eliminar color.
            fetch(`/borrar/${colorBorrar.id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.status == 204) {
                    colorBorrar.item.remove();
                    colorBorrar = null;
                    return modlBorrar.classList.toggle("modal-visible")
                }
                console.log("informar al usuario del error");
            });
        }
    });
});

// recorre modal de nodos de botones para editar.
botonesModalEditar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
        if (i == 0) {
            colorEditar = null;
            modalEditar.classList.remove("modal-visible")
        } else {
            //opcion de guardar al editar.
            let { r, g, b } = colorEditar.rgb
            fetch(`/actualizar/${colorEditar.id}`, {
                method: "PUT",
                body: JSON.stringify({r, g, b}),
                headers: {
                    "Content-type": "application/json"
                }

            })
            .then(response => {                
                if (response.status == 204) {
                    colorEditar.item.style.backgroundColor = `rgb(${colorEditar.rgb.join(",")})`;
                    colorEditar.item.children[0].innerText = colorEditar.rgb.join(",");
                    colorEditar = null;
                    return modalEditar.classList.remove("modal-visible");
                }
                console.log("informar al usuario del error");
            });
        }
    });
});

inputsEditor.forEach((input, i) => {
    input.addEventListener("input", () => {
        //actualiza los valores del rgb ya que se esta usando la referencia de variables globales.
        colorEditar.rgb[i] = input.value
        previewColor.style.backgroundColor = `rgb(${colorEditar.rgb.join(",")})`;
    });
});
