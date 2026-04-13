const Form = document.querySelector("form")
const inputText = document.querySelector('input[type="text"]')
const container = document.querySelector("ul")
const modal = document.querySelector("div")
const btnBorrar = document.querySelector("div :first-child")
const btnCancelar = document.querySelector("div :last-child")

let itemBorrar = null


function nombre(value){
    let li = document.createElement("li")
    li.innerHTML = `
    <p>${value}</p>
    <button>borrar</button>
    `
    const button = li.querySelector("button");

    button.addEventListener("click", () => {
        itemBorrar = li
        modal.classList.toggle("visible")
    })

    return li
}

Form.addEventListener("submit", e => {
    e.preventDefault();
    
    container.appendChild(nombre(inputText.value))
    inputText.value = ""
})

btnCancelar.addEventListener("click", () =>{
    itemBorrar = null;
    modal.classList.toggle("visible")
})

btnBorrar.addEventListener("click", () =>{
    modal.classList.toggle("visible")
    itemBorrar.remove()
})