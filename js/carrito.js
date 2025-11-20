let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let contenedor = document.getElementById("carritoContainer");
let totalCarrito = document.getElementById("totalCarrito");
let botonVaciar = document.getElementById("vaciarCarrito");

function mostrarCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
        totalCarrito.textContent = "";
        return;
    }

    let total = 0;

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