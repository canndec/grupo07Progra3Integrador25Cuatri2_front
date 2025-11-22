let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let contenedor = document.getElementById("carritoContenedor");
let totalCarrito = document.getElementById("totalCarrito");
let botonVaciar = document.getElementById("vaciarCarrito");
let botonFinalizar = document.getElementById("botonFinalizar");
function mostrarCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
                            <div id="contenedorCarritoVacio"> 
                            <p>Tu carrito está vacío</p>
                            <img src="img/carritoVacio.png" alt="carritoVacio">
                            </div>`; //tiene el mismo id que el contendor(section id="carritoContenedor") porque se sobreescribe
        botonFinalizar.disabled = true; // lo desabilita pa tocar
        botonVaciar.disabled = true; //lo desabilita y se activa la opcion en css
        contenedor.disabled = true;
        totalCarrito.textContent = "";
        return;
    }

    let total = 0;
    console.table(carrito);
    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="itemCarrito">
                <img src="${item.imagen}" alt="${item.nombre}" />
                <h3>${item.nombre}</h3>
                <p $ ${item.precio}</p>
                <p> x${item.cantidad}</p>
                <p>Subtotal: $${subtotal}</p>
                <div class="cantidadControles">
                <button onclick="restar(${index})">-</button>
                <span> ${item.cantidad} </span>
                <button onclick="sumar(${index})">+</button>
            </div>
            <button onclick="eliminar(${index})">Eliminar</button>
        `;
    });

    totalCarrito.textContent = `Total: $${total}`;
}

function eliminar(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
function sumar(index) {
    carrito[index].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function restar(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});

mostrarCarrito();
