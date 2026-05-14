

export class Color {
    constructor({ id, r, g, b }, contenedor){
        this.id = id;
        this.rgb = [r,g,b];
        this.DOM = null;
        this.crearColor(contenedor);
    }

    crearColor(contenedor){
        this.DOM = document.createElement("li");
        let valor = rgb.join(",");

        this.DOM.style.backgroundColor = `rgb(${valor})`;
        this.DOM.innerHTML = `
            <span>${valor}</span>
            <button>editar</button>
            <button>borrar</button>
        `;

        let botonEditar = thiis.DOM.querySelector("button:nth-child(2)");
        let botonEliminar = thiis.DOM.querySelector("button:nth-child(3)");

        contenedor.appendChild(this.DOM);
    }
}