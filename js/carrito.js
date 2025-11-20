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
                <button onclick="eliminar(${index})">Eliminar</button>
            </div>
        `;
    });

    totalCarrito.textContent = `Total: $${total}`;
}

function eliminar(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});

mostrarCarrito();